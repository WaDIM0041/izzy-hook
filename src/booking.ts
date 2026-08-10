const STORAGE_KEY = 'izzy_hook_bookings_v1'
const MAX_GUESTS_PER_SLOT = 20
const SLOT_START_HOUR = 12
const SLOT_END_HOUR = 2

export interface Booking {
  id: string
  code: string
  name: string
  phone: string
  date: string
  time: string
  guests: number
  comment: string
  createdAt: number
}

export interface BookingResult {
  ok: boolean
  message: string
  booking?: Booking
  slotLeft?: number
}

function loadAll(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Booking[]) : []
  } catch {
    return []
  }
}

function saveAll(list: Booking[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatPhone(raw: string): string {
  const digits = normalizePhone(raw)
  if (!digits) return ''
  const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length >= 4) out += ') ' + d.slice(4, 7)
  if (d.length >= 7) out += '-' + d.slice(7, 9)
  if (d.length >= 9) out += '-' + d.slice(9, 11)
  return out
}

export function phoneValid(value: string): boolean {
  const n = normalizePhone(value)
  return n.length === 11 && (n.startsWith('7') || n.startsWith('8'))
}

export function timeSlots(): string[] {
  const slots: string[] = []
  for (let h = SLOT_START_HOUR; h <= SLOT_END_HOUR + 1; h++) {
    const hh = (h % 24).toString().padStart(2, '0')
    slots.push(`${hh}:00`)
    slots.push(`${hh}:30`)
  }
  return slots
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

export function formatTime(iso: string): string {
  const [h, m] = iso.split(':')
  return `${h}:${m}`
}

export function todayISO(): string {
  const d = new Date()
  const pad = (x: number): string => String(x).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function isPastDate(iso: string): boolean {
  return iso < todayISO()
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function genCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `IH-${code}`
}

export function slotGuests(list: Booking[], date: string, time: string): number {
  return list
    .filter((b) => b.date === date && b.time === time)
    .reduce((sum, b) => sum + b.guests, 0)
}

export function createBooking(data: {
  name: string
  phone: string
  date: string
  time: string
  guests: number
  comment: string
}): BookingResult {
  const list = loadAll()

  if (data.name.trim().length < 2) {
    return { ok: false, message: 'Укажите имя, чтобы мы знали, как к вам обращаться.' }
  }
  if (!phoneValid(data.phone)) {
    return { ok: false, message: 'Проверьте номер телефона — нужно 11 цифр.' }
  }
  if (!data.date || isPastDate(data.date)) {
    return { ok: false, message: 'Выберите корректную дату — бронь на будущее.' }
  }
  if (!data.time) {
    return { ok: false, message: 'Выберите удобное время.' }
  }
  if (!data.guests || data.guests < 1 || data.guests > 20) {
    return { ok: false, message: 'Количество гостей — от 1 до 20.' }
  }

  const existing = slotGuests(list, data.date, data.time)
  if (existing + data.guests > MAX_GUESTS_PER_SLOT) {
    const left = Math.max(0, MAX_GUESTS_PER_SLOT - existing)
    return {
      ok: false,
      message:
        left === 0
          ? `К сожалению, на ${formatDate(data.date)} в ${formatTime(data.time)} уже всё занято. Выберите другое время.`
          : `На это время осталось мест только на ${left} ${pluralGuests(left)}. Попробуйте соседний слот.`,
      slotLeft: left
    }
  }

  const booking: Booking = {
    id: genId(),
    code: genCode(),
    name: data.name.trim(),
    phone: normalizePhone(data.phone),
    date: data.date,
    time: data.time,
    guests: data.guests,
    comment: data.comment.trim(),
    createdAt: Date.now()
  }

  list.push(booking)
  saveAll(list)
  return { ok: true, message: 'Бронь сохранена', booking }
}

export function findBookings(query: string): Booking[] {
  const q = query.trim().toUpperCase()
  if (!q) return []
  const phoneDigits = normalizePhone(q)
  const list = loadAll()
  return list.filter((b) => {
    if (q.startsWith('IH-') && b.code.toUpperCase() === q) return true
    if (b.code.toUpperCase() === q) return true
    if (phoneDigits && b.phone.includes(phoneDigits.slice(-10))) return true
    return false
  })
}

export function cancelBooking(id: string): boolean {
  const list = loadAll()
  const idx = list.findIndex((b) => b.id === id)
  if (idx === -1) return false
  list.splice(idx, 1)
  saveAll(list)
  return true
}

export function pluralGuests(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'гостя'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'гостей'
  return 'гостей'
}
