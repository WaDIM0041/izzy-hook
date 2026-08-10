const ICONS: Record<string, string> = {
  couch: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3"/><path d="M3 15v-2a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v2"/><path d="M3 15h18v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3z"/></svg>`,
  hookah: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M9 21v-4"/><path d="M15 21v-4"/><path d="M12 17v-3"/><path d="M8 8h8v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4V8z"/><path d="M8 8V6h8v2"/><path d="M10 6a2 2 0 0 1 4 0"/><path d="M6 8H4"/><path d="M18 8h2"/><path d="M3 17c1.5 0 2-1 2-2 0 1 1.5 2 3 2"/></svg>`,
  dog: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 8l-3-1-1.5-2.5L14 5l-4-1L7 8 4 9"/><path d="M2 12l2-2 4 1h4l3 1 3-1 4 2v6l-3 1-1-2-4 1-5-1-3 2-3-1z"/><path d="M9 10v1"/><path d="M15 10v1"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 13H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20c0-8 6-14 15-15-1 9-7 15-15 15z"/><path d="M4 21c3-5 6-8 10-10"/></svg>`,
  burger: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18"/><path d="M3 11c0-4 4-7 9-7s9 3 9 7"/><path d="M5 15h14l-1 5H6z"/><path d="M8 20v1"/><path d="M16 20v1"/></svg>`,
  noodle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4c5 4 11 4 16 0"/><path d="M4 9c5 4 11 4 16 0"/><path d="M4 14c5 4 11 4 16 0"/><path d="M3 20h18"/></svg>`,
  soup: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h16a8 8 0 0 1-16 0z"/><path d="M5 13V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M12 4V2"/><path d="M8 3V1"/><path d="M16 3V1"/></svg>`,
  snack: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M15 21a3 3 0 0 0 3-3v-3"/><circle cx="12" cy="12" r="1"/><circle cx="16" cy="11" r="1"/><circle cx="9" cy="10" r="1"/><circle cx="12" cy="16" r="1"/></svg>`,
  steak: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11c3-2 5-1 7 0 3 1.5 4 4 6 4 1.5 0 2.5-1 3-2"/><path d="M4 11a8 8 0 1 0 16 0 8 8 0 0 0-4-7"/><path d="M4 11c-1-2-1-5 1-7"/></svg>`,
  pizza: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5c2.5-1 5-1.5 8-1.5s5.5.5 8 1.5l-8 15z"/><circle cx="9" cy="9" r="1"/><circle cx="13" cy="8" r="1"/><circle cx="11" cy="13" r="1"/></svg>`,
  sandwich: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h20l-9-6z"/><path d="M4 9v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M4 14v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M4 19h16"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 9.2c-1.2.5-1.1 2.2.1 2.6l4.5 1.4 1.7 5.3c.4 1.1 1.8 1.4 2.6.6l2.4-2.4 4.6 3.4c.9.7 2.2.2 2.4-1l3-14.5zM8.4 12.9l9.3-5.7c.4-.2.8.3.5.6l-7.3 6.9-.3 3.2-2.2-5z"/></svg>`,
  vk: `<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M13 17.5c-6.5 0-10.2-4.5-10.4-12h3.2c.1 5.7 2.6 8.1 4.6 8.6V5.5h3.2v4.9c2-.2 4-2.5 4.7-4.9h3.2c-.5 3-2.6 5.3-4.1 6.2 1.5.7 3.9 2.6 4.8 6.8h-3.3c-.7-2.2-2.4-3.9-4.6-4.1v4.1H13z"/></svg>`
}

export function mountIcons(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-icon]').forEach((el) => {
    const name = el.dataset.icon || ''
    const icon = ICONS[name]
    if (icon) el.innerHTML = `<span class="icon">${icon}</span>`
  })
}

export function iconHTML(name: string): string {
  return ICONS[name] ? `<span class="icon">${ICONS[name]}</span>` : ''
}
