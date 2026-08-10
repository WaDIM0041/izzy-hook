import './style.css'
import { GALLERY, MENU } from './data'
import { mountIcons } from './icons'
import {
  initCounters,
  initGlowFollow,
  initHero,
  initMagnetic,
  initMarquee,
  initNav,
  initParticles,
  initReveal,
  initTilt,
  initYear
} from './effects'
import {
  type Booking,
  cancelBooking,
  createBooking,
  findBookings,
  formatDate,
  formatPhone,
  formatTime,
  isPastDate,
  phoneValid,
  pluralGuests,
  timeSlots,
  todayISO
} from './booking'

/* ---------- Рендер меню ---------- */
let activeCategory = MENU[0].id

function renderTabs(): void {
  const wrap = document.getElementById('menu-tabs')
  if (!wrap) return
  wrap.innerHTML = ''
  MENU.forEach((cat) => {
    const btn = document.createElement('button')
    btn.className = 'menu__tab' + (cat.id === activeCategory ? ' active' : '')
    btn.textContent = cat.title
    btn.setAttribute('role', 'tab')
    btn.setAttribute('aria-selected', String(cat.id === activeCategory))
    btn.addEventListener('click', () => switchCategory(cat.id))
    wrap.appendChild(btn)
  })
}

function renderPanel(): void {
  const panel = document.getElementById('menu-panel')
  if (!panel) return
  const cat = MENU.find((c) => c.id === activeCategory) || MENU[0]
  const list = document.createElement('div')
  list.className = 'menu__list'

  cat.items.forEach((item, i) => {
    const el = document.createElement('article')
    el.className = 'menu__item menu__list-enter'
    el.style.animationDelay = `${i * 45}ms`
    const badge = item.badge ? `<span class="menu__item-badge">${item.badge}</span>` : ''
    const desc = item.desc ? `<p class="menu__item-desc">${item.desc}</p>` : ''
    el.innerHTML = `
      <div class="menu__item-main">
        <div class="menu__item-name">${item.name}${badge}</div>
        ${desc}
      </div>
      <div class="menu__item-dots" aria-hidden="true"></div>
      <span class="menu__item-price">${item.price.toLocaleString('ru-RU')} ₽</span>
    `
    list.appendChild(el)
  })

  panel.innerHTML = ''
  panel.appendChild(list)
}

function switchCategory(id: string): void {
  if (id === activeCategory) return
  activeCategory = id
  renderTabs()
  renderPanel()
}

/* ---------- Рендер галереи ---------- */
function renderGallery(): void {
  const grid = document.getElementById('gallery-grid')
  if (!grid) return
  grid.innerHTML = ''
  GALLERY.forEach((g, i) => {
    const item = document.createElement('figure')
    item.className = 'gallery__item reveal'
    item.style.setProperty('--reveal-delay', `${(i % 3) * 90}ms`)
    item.innerHTML = `
      <img src="${g.src}" alt="${g.caption}" loading="lazy" />
      <figcaption class="gallery__item-caption">
        <span>${g.caption}</span>
        <span class="gallery__item-type">${g.type === 'interior' ? 'Интерьер' : 'Фасад'}</span>
      </figcaption>
    `
    item.addEventListener('click', () => openLightbox(i))
    grid.appendChild(item)
  })
}

/* ---------- Лайтбокс ---------- */
function openLightbox(index: number): void {
  const overlay = document.createElement('div')
  overlay.className = 'lightbox'
  const img = document.createElement('img')
  img.src = GALLERY[index].src
  img.alt = GALLERY[index].caption
  const cap = document.createElement('div')
  cap.className = 'lightbox__cap'
  cap.textContent = `${GALLERY[index].caption} · ${index + 1} / ${GALLERY.length}`
  overlay.append(img, cap)
  const onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') close()
  }
  const close = (): void => {
    overlay.remove()
    document.removeEventListener('keydown', onKey)
    document.body.classList.remove('no-scroll')
  }
  overlay.addEventListener('click', close)
  document.addEventListener('keydown', onKey)
  document.body.appendChild(overlay)
  document.body.classList.add('no-scroll')
}

/* ---------- Бронирование: модалка ---------- */
const modal = document.getElementById('booking-modal') as HTMLElement
const openers = Array.from(document.querySelectorAll<HTMLElement>('[data-open-booking]'))
const views = {
  form: document.getElementById('view-form'),
  success: document.getElementById('view-success'),
  check: document.getElementById('view-check')
}
const timeSelect = document.querySelector<HTMLSelectElement>('select[name="time"]')

function showView(name: 'form' | 'success' | 'check'): void {
  Object.entries(views).forEach(([key, el]) => el?.classList.toggle('is-active', key === name))
}

function openModal(view: 'form' | 'check' = 'form'): void {
  showView(view)
  modal.classList.add('open')
  document.body.classList.add('no-scroll')
  if (view === 'form') setTimeout(() => document.querySelector<HTMLInputElement>('input[name="name"]')?.focus(), 350)
}

function closeModal(): void {
  modal.classList.remove('open')
  document.body.classList.remove('no-scroll')
}

openers.forEach((btn) => btn.addEventListener('click', () => openModal('form')))
modal.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal))
document.getElementById('goto-check')?.addEventListener('click', () => showView('check'))
document.getElementById('goto-book')?.addEventListener('click', () => showView('form'))
document.getElementById('btn-check-booking')?.addEventListener('click', () => openModal('check'))
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})

if (timeSelect) {
  timeSlots().forEach((slot) => {
    const opt = document.createElement('option')
    opt.value = slot
    opt.textContent = formatTime(slot)
    timeSelect.appendChild(opt)
  })
}

const dateInput = document.querySelector<HTMLInputElement>('input[name="date"]')
if (dateInput) {
  dateInput.min = todayISO()
  dateInput.value = todayISO()
}

const phoneInput = document.querySelector<HTMLInputElement>('#booking-form input[name="phone"]')
phoneInput?.addEventListener('input', () => {
  const pos = phoneInput.selectionStart ?? phoneInput.value.length
  const before = phoneInput.value.length
  phoneInput.value = formatPhone(phoneInput.value)
  const diff = phoneInput.value.length - before
  phoneInput.setSelectionRange(Math.min(pos + diff, phoneInput.value.length), Math.min(pos + diff, phoneInput.value.length))
})

function setInvalid(name: string, message: string): void {
  const field = document.querySelector<HTMLElement>(`.form__field:has(input[name="${name}"])`)
  const select = document.querySelector<HTMLElement>(`.form__field:has(select[name="${name}"])`)
  const wrap = field || select
  if (!wrap) return
  wrap.classList.add('invalid')
  const err = wrap.querySelector<HTMLElement>('.form__error')
  if (err) err.textContent = message
}

function clearInvalid(form: HTMLElement): void {
  form.querySelectorAll('.form__field.invalid').forEach((el) => el.classList.remove('invalid'))
}

/* ---------- Toast ---------- */
let toastTimer: number | undefined
function toast(message: string, isError = false): void {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = message
  el.classList.toggle('error', isError)
  el.classList.add('show')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => el.classList.remove('show'), 4200)
}

/* ---------- Форма бронирования ---------- */
const bookingForm = document.getElementById('booking-form') as HTMLFormElement
const submitBtn = document.getElementById('booking-submit') as HTMLButtonElement

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  clearInvalid(bookingForm)

  const fd = new FormData(bookingForm)
  const data = {
    name: String(fd.get('name') || ''),
    phone: String(fd.get('phone') || ''),
    date: String(fd.get('date') || ''),
    time: String(fd.get('time') || ''),
    guests: parseInt(String(fd.get('guests') || '2'), 10),
    comment: String(fd.get('comment') || '')
  }

  if (data.name.trim().length < 2) return setInvalid('name', 'Укажите имя (минимум 2 буквы).')
  if (!phoneValid(data.phone)) return setInvalid('phone', 'Введите корректный номер: +7 (911) 277-45-45.')
  if (!data.date || isPastDate(data.date)) return setInvalid('date', 'Выберите будущую дату.')
  if (!data.time) return setInvalid('time', 'Выберите время.')
  if (!data.guests || data.guests < 1 || data.guests > 20) return setInvalid('guests', 'От 1 до 20 гостей.')

  submitBtn.disabled = true
  submitBtn.textContent = 'Проверяем места…'

  setTimeout(() => {
    const result = createBooking(data)
    submitBtn.disabled = false
    submitBtn.textContent = 'Забронировать'

    if (!result.ok) {
      toast(result.message, true)
      return
    }
    if (result.booking) showSuccess(result.booking)
  }, 700)
})

function showSuccess(b: Booking): void {
  const details = document.getElementById('success-details')
  const code = document.getElementById('success-code')
  if (details) {
    details.textContent = `${b.name}, ждём вас ${formatDate(b.date)} в ${formatTime(b.time)} · ${b.guests} ${pluralGuests(b.guests)}`
  }
  if (code) code.textContent = b.code
  bookingForm?.reset()
  if (dateInput) dateInput.value = todayISO()
  showView('success')
}

/* ---------- Проверка брони ---------- */
const checkForm = document.getElementById('check-form') as HTMLFormElement
const resultsWrap = document.getElementById('check-results')

function renderCheckResults(query: string): void {
  if (!resultsWrap) return
  const list = findBookings(query)
  resultsWrap.innerHTML = ''

  if (list.length === 0) {
    resultsWrap.innerHTML = `<div class="check-empty">По запросу «${query.trim()}» брони не найдено.<br/>Проверьте номер или код брони.</div>`
    return
  }

  list.forEach((b) => {
    const item = document.createElement('div')
    item.className = 'check-item'
    item.innerHTML = `
      <div class="check-item__main">
        <b>${b.name} · ${b.guests} ${pluralGuests(b.guests)}</b>
        <span>${formatDate(b.date)} в ${formatTime(b.time)} · Код ${b.code}</span>
      </div>
      <span class="check-item__status">Подтверждена</span>
      <button class="check-item__cancel" data-cancel="${b.id}">Отменить</button>
    `
    const cancelBtn = item.querySelector<HTMLButtonElement>('[data-cancel]')
    cancelBtn?.addEventListener('click', () => {
      if (cancelBooking(b.id)) {
        toast('Бронь отменена')
        renderCheckResults(query)
      }
    })
    resultsWrap.appendChild(item)
  })
}

checkForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  clearInvalid(checkForm)
  const input = checkForm.querySelector<HTMLInputElement>('input[name="query"]')
  if (!input) return
  const q = input.value.trim()
  if (!q) {
    setInvalid('query', 'Введите номер телефона или код брони.')
    return
  }
  renderCheckResults(q)
})

/* ---------- Инициализация ---------- */
function init(): void {
  mountIcons()
  renderTabs()
  renderPanel()
  renderGallery()
  initParticles()
  initGlowFollow()
  initReveal()
  initCounters()
  initTilt()
  initMagnetic()
  initNav()
  initHero()
  initMarquee()
  initYear()
}

window.addEventListener('DOMContentLoaded', init)

const preloader = document.getElementById('preloader')
window.addEventListener('load', () => {
  setTimeout(() => preloader?.classList.add('done'), 350)
})
setTimeout(() => preloader?.classList.add('done'), 4000)

// Экспорт для удобства отладки
declare global {
  interface Window {
    IZZY: { findBookings: typeof findBookings; bookings: typeof findBookings }
  }
}
window.IZZY = { findBookings, bookings: findBookings }
