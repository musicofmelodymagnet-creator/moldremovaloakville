// Бизнес-данные сайта — ЕДИНСТВЕННОЕ место, где они хранятся.
//
// Правило NO FAKE DATA: значение null = данных пока нет.
// - В режиме разработки (npm run dev, или сборка с PUBLIC_SHOW_DRAFT=true) вместо него
//   показывается placeholder вида [PHONE NUMBER] с пометкой VERIFY BEFORE PUBLISHING.
// - В production-сборке (npm run build / npm run deploy) такие элементы НЕ выводятся вовсе.
// Чтобы показать значение на сайте — впишите реальное подтверждённое значение вместо null.

import type { ImageMetadata } from 'astro';
import avatarJason from '../assets/reviews/jason-turner.jpg';
import avatarMatthew from '../assets/reviews/matthew-reed.jpg';
import avatarSarah from '../assets/reviews/sarah-collins.jpg';
import avatarDaniel from '../assets/reviews/daniel-foster.jpg';

export const SHOW_DRAFT = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFT === 'true';

export const site = {
  name: 'Mold Removal Oakville',
  url: 'https://moldremovaloakville.ca',
  locale: 'en-CA',
  city: 'Oakville',
  region: 'Ontario',
  country: 'Canada',

  // Подтверждено владельцем 2026-10-02
  phone: '(905) 243-0055' as string | null,
  phoneE164: '+19052430055' as string | null, // для tel:
  email: 'info@moldremovaloakville.ca' as string | null,
  // NAP — реальный адрес от владельца. Гео-координаты не добавлять, пока их не дадут.
  address: {
    street: '475 Wyecroft Rd',
    locality: 'Oakville',
    region: 'ON',
    postalCode: 'L6K 2H2',
    country: 'CA',
  } as { street: string; locality: string; region: string; postalCode: string; country: string } | null,
  napText: '475 Wyecroft Rd, Oakville, ON L6K 2H2' as string | null,
  // Только реально существующие профили (Google Business, Facebook, Instagram…)
  sameAs: [] as string[],
  // GA4 Measurement ID (G-XXXXXXX). Пока null — аналитика не подключается.
  ga4Id: null as string | null,
};

// Achievement strip — 6 эмблем. value: null → в production не показывается.
// Значения подтверждены владельцем 2026-10-02.
export const achievements: { icon: string; value: string | null; draft: string; label: string }[] = [
  { icon: 'calendar', value: '8+', draft: '[XX]+', label: 'Years Combined Experience' },
  { icon: 'home', value: '250+', draft: '[XXX]+', label: 'Remediation Projects' },
  { icon: 'clock', value: '24/7', draft: '[XX]-Hour', label: 'Emergency Response' },
  { icon: 'shield', value: '$2 Million', draft: '[$X Million]', label: 'Liability Coverage' },
  { icon: 'badge', value: 'IICRC-Trained', draft: '[CREDENTIAL]', label: 'Technicians' },
  { icon: 'award', value: 'Up to 10-Year', draft: '[X]-Year', label: 'Workmanship Warranty' },
];

// Professional Standards strip. verified: false → в production скрыто (пункты со * в тексте).
export const standards = [
  { icon: 'badge', label: 'Industry-Trained Team', verified: true },
  { icon: 'shield', label: 'Liability Insurance', verified: true },
  { icon: 'file', label: 'Written Project Scope', verified: true },
  { icon: 'fan', label: 'HEPA-Controlled Remediation', verified: true },
  { icon: 'camera', label: 'Photo Documentation', verified: true },
  { icon: 'award', label: 'Workmanship Warranty', verified: true },
  { icon: 'check-circle', label: 'Independent Verification Available', verified: true },
  { icon: 'hard-hat', label: 'Safety Procedures', verified: true },
];

// Таблица цен (planning ranges) — от владельца 2026-10-02.
// price: null → в production вся таблица скрыта (текст раздела остаётся).
export const pricing: { project: string; price: string | null }[] = [
  { project: 'Small contained area', price: '$500–$1,500' },
  { project: 'Bathroom / single-wall remediation', price: '$1,200–$2,800' },
  { project: 'Medium one-to-two-room project', price: '$1,500–$5,000' },
  { project: 'Attic mold remediation', price: '$1,800–$6,000' },
  { project: 'Larger basement or attic', price: '$4,500–$12,000+' },
  { project: 'Extensive / multi-room remediation', price: '$5,000–$15,000+' },
];

// Отзывы — только настоящие (переданы владельцем 2026-10-02). Пустой массив → в production раздел скрыт.
// date — дата отзыва (ISO); на сайте показывается относительно даты сборки («2 months ago»),
// поэтому надпись обновляется при каждом деплое. Review/AggregateRating в schema НЕ добавлять.
export const reviews: { name: string; date: string; rating: number; text: string; avatar?: ImageMetadata }[] = [
  {
    name: 'Amanda Brooks',
    date: '2026-08-02',
    rating: 5,
    text: 'We noticed a musty smell in the basement after a few heavy rains. They found the problem behind one section of drywall and explained what actually needed to come out. The whole thing was less stressful than I expected.',
  },
  {
    name: 'Jason Turner',
    date: '2026-09-25',
    avatar: avatarJason,
    rating: 5,
    text: 'Called because we found mold in the attic during a home inspection. They showed up when they said they would and walked me through what they found without trying to scare me into extra work. That part I really appreciated.',
  },
  {
    name: 'Kelsey Lawson',
    date: '2026-06-02',
    rating: 5,
    text: "Had some mold come back around our bathroom ceiling even after cleaning it twice ourselves. They pointed out that the fan wasn't doing a great job and dealt with the affected area. A few weeks later and so far everything still looks good.",
  },
  {
    name: 'Matthew Reed',
    date: '2026-09-02',
    avatar: avatarMatthew,
    rating: 5,
    text: "We had a small leak behind the wall and didn't realize there was mold until the baseboard came off. The quote wasn't the cheapest one we received, but it was the clearest. They only opened the area that actually needed work.",
  },
  {
    name: 'Sarah Collins',
    date: '2026-08-02',
    avatar: avatarSarah,
    rating: 5,
    text: "Pretty straightforward experience. They covered the floors, kept the work area separated and cleaned up properly before leaving. I was mostly worried about having dust everywhere, but that wasn't an issue.",
  },
  {
    name: 'Daniel Foster',
    date: '2026-04-02',
    avatar: avatarDaniel,
    rating: 5,
    text: 'I called after seeing dark spots in one corner of our basement. I thought the whole wall would have to be removed, but it ended up being a much smaller area. Nice to deal with people who actually explained what they were doing instead of just giving us a number.',
  },
];

/** «2 months ago» относительно даты сборки */
export function timeAgo(iso: string, now = new Date()): string {
  const days = Math.max(0, Math.round((now.getTime() - new Date(iso + 'T12:00:00').getTime()) / 86_400_000));
  if (days < 1) return 'today';
  if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
  if (days < 30) { const w = Math.round(days / 7); return w === 1 ? '1 week ago' : `${w} weeks ago`; }
  if (days < 365) { const m = Math.round(days / 30.44); return m <= 1 ? '1 month ago' : `${m} months ago`; }
  const y = Math.round(days / 365.25);
  return y === 1 ? '1 year ago' : `${y} years ago`;
}

// Будущие страницы услуг. Ссылка активируется, только когда страница реально существует
// (exists: true) — иначе текст без ссылки, чтобы не было ссылок на 404.
export const servicePages = {
  inspection: { url: '/mold-inspection-oakville/', exists: false },
  attic: { url: '/attic-mold-removal-oakville/', exists: false },
  basement: { url: '/basement-mold-removal-oakville/', exists: false },
  black: { url: '/black-mold-removal-oakville/', exists: false },
  bathroom: { url: '/bathroom-mold-removal-oakville/', exists: false },
  crawl: { url: '/crawl-space-mold-removal-oakville/', exists: false },
  commercial: { url: '/commercial-mold-remediation-oakville/', exists: false },
  water: { url: '/water-damage-mold-remediation-oakville/', exists: false },
  emergency: { url: '/emergency-mold-removal-oakville/', exists: false },
} as const;
export type ServiceKey = keyof typeof servicePages;
export const pageLink = (key?: ServiceKey | null) =>
  key && servicePages[key].exists ? servicePages[key].url : null;

// Политика конфиденциальности: страницы пока нет → ссылка не выводится.
export const privacyPolicyUrl: string | null = null;
