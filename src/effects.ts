export function initParticles(): void {
  const canvas = document.getElementById('particles') as HTMLCanvasElement | null
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = 0
  let h = 0
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const COUNT = Math.min(70, Math.floor(window.innerWidth / 22))

  interface Ember {
    x: number
    y: number
    r: number
    vy: number
    vx: number
    phase: number
    alpha: number
  }

  let embers: Ember[] = []

  const spawn = (): Ember => ({
    x: Math.random() * w,
    y: h + Math.random() * h * 0.4,
    r: 0.6 + Math.random() * 2.1,
    vy: 0.18 + Math.random() * 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.3 + Math.random() * 0.6
  })

  const resize = (): void => {
    w = canvas.width = Math.floor(window.innerWidth * dpr)
    h = canvas.height = Math.floor(window.innerHeight * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    w = window.innerWidth
    h = window.innerHeight
    embers = Array.from({ length: COUNT }, spawn)
  }

  let t = 0
  const tick = (): void => {
    if (reduced) return
    t += 0.004
    ctx.clearRect(0, 0, w, h)
    for (const e of embers) {
      e.y -= e.vy
      e.x += e.vx + Math.sin(t * 2 + e.phase) * 0.25
      e.alpha = Math.max(0, 1 - (h - e.y) / h)
      if (e.y < -20) Object.assign(e, spawn())

      const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3)
      grad.addColorStop(0, `rgba(240, 195, 120, ${e.alpha})`)
      grad.addColorStop(1, 'rgba(240, 195, 120, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2)
      ctx.fill()
    }
    requestAnimationFrame(tick)
  }

  resize()
  window.addEventListener('resize', resize)
  requestAnimationFrame(tick)
}

export function initGlowFollow(): void {
  const glow = document.getElementById('glow-follow') as HTMLElement | null
  if (!glow) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let tx = window.innerWidth / 2
  let ty = window.innerHeight / 2
  let x = tx
  let y = ty

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX
    ty = e.clientY
  })

  const loop = (): void => {
    x += (tx - x) * 0.07
    y += (ty - y) * 0.07
    glow.style.transform = `translate(${x - 240}px, ${y - 240}px)`
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

export function initReveal(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  els.forEach((el) => io.observe(el))
}

export function initCounters(): void {
  const stats = Array.from(document.querySelectorAll<HTMLElement>('.stat[data-count]'))
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animate = (el: HTMLElement): void => {
    const target = parseFloat(el.dataset.count || '0')
    const decimals = parseInt(el.dataset.decimals || '0', 10)
    const suffix = el.dataset.suffix || ''
    const valueEl = el.querySelector('.stat__value')
    if (!valueEl) return

    if (reduced) {
      valueEl.textContent = target.toFixed(decimals) + suffix
      return
    }

    const dur = 1600
    const start = performance.now()
    const step = (now: number): void => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      const val = target * eased
      valueEl.textContent = val.toFixed(decimals) + suffix
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement)
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.4 }
  )
  stats.forEach((el) => io.observe(el))
}

export function initTilt(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-feature]')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  els.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      if (reduced || (e.target as HTMLElement).closest('a, button')) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (py - 0.5) * -8
      const ry = (px - 0.5) * 8
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`
    })
    el.addEventListener('mouseleave', () => {
      el.style.transform = ''
    })
  })
}

export function initMagnetic(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-magnetic]')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  els.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - rect.left - rect.width / 2
      const dy = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${dx * 0.16}px, ${dy * 0.22}px)`
    })
    el.addEventListener('mouseleave', () => {
      el.style.transform = ''
    })
  })
}

export function initNav(): void {
  const nav = document.getElementById('nav')
  const burger = document.getElementById('nav-burger')
  const mobile = document.getElementById('nav-mobile')

  const onScroll = (): void => {
    if (!nav) return
    nav.classList.toggle('scrolled', window.scrollY > 40)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  burger?.addEventListener('click', () => {
    const open = mobile?.classList.toggle('open') ?? false
    burger.classList.toggle('open', open)
    document.body.classList.toggle('no-scroll', open)
  })

  mobile?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobile.classList.remove('open')
      burger?.classList.remove('open')
      document.body.classList.remove('no-scroll')
    })
  )
}

export function initHero(): void {
  const container = document.getElementById('hero-slides')
  const dotsWrap = document.getElementById('hero-dots')
  const currentEl = document.getElementById('hero-current')
  const totalEl = document.getElementById('hero-total')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!container || !dotsWrap || !totalEl) return

  const slideDefs: Array<{ label: string; url: string }> = [
    { label: 'ИНТЕРЬЕР', url: 'photos/hero-interior.svg' },
    { label: 'ФАСАД', url: 'photos/hero-exterior.svg' },
    { label: 'ЛАУНЖ', url: 'photos/hero-interior-2.svg' }
  ]

  const slides: HTMLElement[] = []
  for (const def of slideDefs) {
    const el = document.createElement('div')
    el.className = 'hero__slide'
    el.style.backgroundImage = `url(${def.url})`
    el.dataset.label = def.label
    container.appendChild(el)
    slides.push(el)
  }

  const dots: HTMLElement[] = []
  slideDefs.forEach((_, i) => {
    const dot = document.createElement('i')
    dot.setAttribute('role', 'button')
    dot.setAttribute('aria-label', `Слайд ${i + 1}`)
    dot.addEventListener('click', () => goto(i))
    dotsWrap.appendChild(dot)
    dots.push(dot)
  })

  let active = 0
  let timer: number

  const render = (): void => {
    slides.forEach((el, i) => el.classList.toggle('is-active', i === active))
    dots.forEach((d, i) => d.classList.toggle('active', i === active))
    if (currentEl) currentEl.textContent = String(active + 1).padStart(2, '0')
    totalEl.textContent = `/ ${String(slides.length).padStart(2, '0')}`
  }

  const goto = (i: number): void => {
    const next = (i + slides.length) % slides.length
    if (next === active) return
    const prev = active
    active = next
    slides.forEach((el) => el.classList.remove('is-leaving'))
    slides[prev].classList.add('is-leaving')
    render()
    restart()
  }

  const next = (): void => goto(active + 1)
  const restart = (): void => {
    window.clearInterval(timer)
    if (!reduced) timer = window.setInterval(next, 5600)
  }

  render()
  if (slides.length > 0) slides[active].classList.add('is-active')
  restart()
}

export function initMarquee(): void {
  const track = document.querySelector<HTMLElement>('.marquee__track')
  if (!track) return
  const items = track.innerHTML
  track.innerHTML = items + items
}

export function initYear(): void {
  const el = document.getElementById('year')
  if (el) el.textContent = String(new Date().getFullYear())
}
