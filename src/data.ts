export const CAFE = {
  name: 'Izzy Hook',
  tagline: 'кальянная · ресторан · бар',
  city: 'Санкт-Петербург',
  address: 'Октябрьская набережная, 34к2',
  phone: '+7 (911) 277-45-45',
  phoneHref: '+79112774545',
  rating: 5.0,
  reviews: 174,
  award: 'Хорошее место 2026',
  schedule: 'Ежедневно · 12:00 — 03:00',
  metro: 'Проспект Большевиков',
  stop: '«Октябрьская набережная, 38» · 182 м',
  mapsUrl: 'https://yandex.ru/maps/-/CTWUz2Y1',
  routeUrl: 'https://yandex.ru/maps/-/CTWUz2Y1',
  telegram: 'https://t.me/noonloungebar',
  telegramBot: 'https://t.me/noonloungebar',
  vk: 'https://vk.ru/izzyhook',
  omnom: 'https://omnom.rest/izzy-hook',
  coords: { lat: 59.9116, lon: 30.5062 }
}

export const STATS = [
  { value: 5.0, decimals: 1, suffix: '', label: 'Рейтинг на Яндекс Картах' },
  { value: 174, suffix: '', label: 'Оценок и 117 отзывов' },
  { value: 96, suffix: '%', label: 'Хвалят атмосферу и сервис' },
  { value: 100, suffix: '%', label: 'Отзывов об интерьере' }
]

export const FEATURES = [
  {
    icon: 'couch',
    title: 'Атмосфера уюта',
    text: 'Мягкие диваны, тёплый свет лаунж-зон и музыка, которая не мешает разговору.'
  },
  {
    icon: 'hookah',
    title: 'Кальянная на высоте',
    text: '96% гостей ставят кальян выше пятёрки. За креветками темпура приезжают с другого конца города.'
  },
  {
    icon: 'dog',
    title: 'Можно с собакой',
    text: 'Ваш питомец — желанный гость. Почувствуйте себя как дома вместе.'
  },
  {
    icon: 'bag',
    title: 'Еда на вынос',
    text: 'Заберите любимые блюда с собой — забронируйте онлайн и заберите без ожидания.'
  }
]

export interface MenuItem {
  name: string
  price: number
  desc?: string
  badge?: string
}

export interface MenuCategory {
  id: string
  title: string
  icon: string
  items: MenuItem[]
}

export const MENU: MenuCategory[] = [
  {
    id: 'starters',
    title: 'Салаты',
    icon: 'leaf',
    items: [
      { name: 'Салат греческий', price: 480, desc: 'Свежие огурцы, томаты, болгарский перец, маслины, сыр фета и лук' },
      { name: 'Салат с хрустящим баклажаном', price: 520, desc: 'Хрустящие баклажаны, томаты, мягкий сыр, фирменный соус, мята, петрушка, семечки, сладкий соус чили' },
      { name: 'Цезарь с креветками', price: 610 },
      { name: 'Цезарь с запечённой куриной грудкой', price: 540 }
    ]
  },
  {
    id: 'burgers',
    title: 'Бургеры',
    icon: 'burger',
    items: [
      { name: 'Бургер с говядиной', price: 690 },
      { name: 'Бургер с куриным шницелем', price: 580 },
      { name: 'Бургер с рыбной котлеткой', price: 490 }
    ]
  },
  {
    id: 'pasta',
    title: 'Паста',
    icon: 'noodle',
    items: [
      { name: 'Паста с морепродуктами', price: 710, badge: 'Хит' },
      { name: 'Паста карбонара', price: 580 },
      { name: 'Паста болоньезе', price: 520 },
      { name: 'Паста с грибами', price: 520 }
    ]
  },
  {
    id: 'soups',
    title: 'Супы',
    icon: 'soup',
    items: [
      { name: 'Грибной крем-суп', price: 460 },
      { name: 'Борщ', price: 420 },
      { name: 'Куриный суп', price: 380 }
    ]
  },
  {
    id: 'snacks',
    title: 'Закуски',
    icon: 'snack',
    items: [
      { name: 'Креветки темпура', price: 510, desc: 'Говорят, за нашими креветками приезжают с другого конца города', badge: 'Хит' },
      { name: 'Куриные стрипсы', price: 420 },
      { name: 'Сырные палочки', price: 410, desc: 'Хрустящие палочки из моцареллы с ягодным соусом' },
      { name: 'Луковые колечки', price: 380 },
      { name: 'Картофель фри', price: 320 }
    ]
  },
  {
    id: 'main',
    title: 'Горячее',
    icon: 'steak',
    items: [
      { name: 'Бефстроганов', price: 590 },
      { name: 'Омлет', price: 390 },
      { name: 'Каша овсяная', price: 390 },
      { name: 'Каша рисовая', price: 390 }
    ]
  },
  {
    id: 'pizza',
    title: 'Пицца',
    icon: 'pizza',
    items: [
      { name: 'Пицца римская в ассортименте', price: 660, desc: 'Для примера — пицца поло песто' }
    ]
  },
  {
    id: 'sandwiches',
    title: 'Сэндвичи',
    icon: 'sandwich',
    items: [
      { name: 'Сэндвич с куриной грудкой', price: 390 },
      { name: 'Сэндвич с ветчиной', price: 360 }
    ]
  }
]

export interface GalleryItem {
  src: string
  caption: string
  type: 'interior' | 'exterior'
}

export const HERO_SLIDES: GalleryItem[] = [
  { src: 'photos/hero-interior.svg', caption: 'Уютный зал', type: 'interior' },
  { src: 'photos/hero-exterior.svg', caption: 'Фасад кафе', type: 'exterior' },
  { src: 'photos/hero-interior-2.svg', caption: 'Лаунж-зона', type: 'interior' }
]

export const GALLERY: GalleryItem[] = [
  { src: 'photos/gallery-1.svg', caption: 'Уютный зал', type: 'interior' },
  { src: 'photos/gallery-2.svg', caption: 'Вечерний свет', type: 'interior' },
  { src: 'photos/gallery-3.svg', caption: 'Фасад кафе', type: 'exterior' },
  { src: 'photos/gallery-4.svg', caption: 'Лаунж-зона', type: 'interior' },
  { src: 'photos/gallery-5.svg', caption: 'Кофе и кальян', type: 'interior' },
  { src: 'photos/gallery-6.svg', caption: 'Вход', type: 'exterior' }
]
