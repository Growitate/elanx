import heroCartonsImg from '../assets/hero-cartons.webp'
import bentoHandPinkImg from '../assets/bento-hand-pink.webp'
import bentoSkyHandsImg from '../assets/bento-sky-hands.webp'
import bentoFlatlayImg from '../assets/bento-flatlay-ingredients.webp'
import bentoGridImg from '../assets/bento-grid-cartons.webp'
import flavorColaImg from '../assets/flavor-cola.webp'
import flavorLemonImg from '../assets/flavor-lemon.webp'
import flavorOrangeImg from '../assets/flavor-orange.webp'
import flavorBlueberryImg from '../assets/flavor-blueberry.webp'
import flavorCoffeeColaImg from '../assets/flavor-coffee-cola.webp'

export type Page = 'home' | 'products' | 'about'
export type LegalKey = 'privacy' | 'terms' | 'disclaimer'

export type Flavor = {
  id: string
  code: string
  name: string
  tagline: string
  description: string
  taste: string
  bestFor: string
  pairing: string
  image: string
  cardBg: string
  ctaBg: string
  detailBg: string
  detailText: string
  accent: string
}

export type PillTag = {
  label: string
  bg: string
  color: string
}

export type Testimonial = {
  quote: string
  author: string
  role: string
  bg: string
  color: string
}

export const MEDIA = {
  heroCartons: heroCartonsImg,
  bentoHandPink: bentoHandPinkImg,
  bentoSkyHands: bentoSkyHandsImg,
  bentoFlatlay: bentoFlatlayImg,
  bentoGrid: bentoGridImg,
}

export const FLAVORS: Flavor[] = [
  {
    id: 'cola',
    code: '01',
    name: 'Cola',
    tagline: 'Rich cola depth. Smooth sparkle. Classic soul.',
    description:
      'A confident, smooth cola pour crafted for crisp everyday refreshment across cafés, dining tables, and chilled grab-and-go coolers.',
    taste: 'Rich · Smooth · Familiar',
    bestFor: 'Everyday enjoyment & meals',
    pairing: 'Chilled over clear ice with lime zest',
    image: flavorColaImg,
    cardBg: '#be9880',
    ctaBg: '#441b12',
    detailBg: '#5a281d',
    detailText: '#fff8f0',
    accent: '#d8b29a',
  },
  {
    id: 'lemon',
    code: '02',
    name: 'Lemon',
    tagline: 'Crisp citrus zest. Cool sparkle. Zero dull sips.',
    description:
      'A bright, zesty lemon refresher built for sunny afternoons, quick resets, and sharp palate-cleansing sparkle.',
    taste: 'Crisp · Tart · Cool',
    bestFor: 'Hot-day refreshment & hospitality',
    pairing: 'Fresh mint sprig and crushed ice',
    image: flavorLemonImg,
    cardBg: '#f8da98',
    ctaBg: '#c96514',
    detailBg: '#f4a622',
    detailText: '#3b160d',
    accent: '#fff1c9',
  },
  {
    id: 'orange',
    code: '03',
    name: 'Orange',
    tagline: 'Bright citrus lift. Juicy fizz. Pure sunshine.',
    description:
      'Vibrant orange fizz with a clean, juicy finish designed to energize social hangouts, family tables, and retail displays.',
    taste: 'Zesty · Juicy · Bright',
    bestFor: 'Afternoon resets & family tables',
    pairing: 'Chilled carton with an orange wheel',
    image: flavorOrangeImg,
    cardBg: '#f8a59e',
    ctaBg: '#d8303d',
    detailBg: '#ef6b6d',
    detailText: '#3b160d',
    accent: '#ffd8d4',
  },
  {
    id: 'blueberry',
    code: '04',
    name: 'Blueberry',
    tagline: 'Lush berry notes. Playful fizz. Unexpectedly cool.',
    description:
      'Deep, fruity blueberry aroma balanced with lively carbonation for curious sippers and standout café menus.',
    taste: 'Fruity · Lush · Playful',
    bestFor: 'New flavour seekers & cafés',
    pairing: 'Served chilled in tall glassware',
    image: flavorBlueberryImg,
    cardBg: '#b8d9ed',
    ctaBg: '#176792',
    detailBg: '#2b88ba',
    detailText: '#fff8f0',
    accent: '#d9effb',
  },
  {
    id: 'coffee-cola',
    code: '05',
    name: 'Coffee Cola',
    tagline: 'Roasted coffee warmth. Crisp cola fizz. Bold fusion.',
    description:
      'An inventive pairing of roasted coffee richness and classic sparkling cola crafted for late-day momentum and modern menus.',
    taste: 'Roasted · Bold · Smooth',
    bestFor: 'Late-day momentum & creative spaces',
    pairing: 'Over a single large ice cube',
    image: flavorCoffeeColaImg,
    cardBg: '#edd3b4',
    ctaBg: '#5e2e16',
    detailBg: '#9a5f3c',
    detailText: '#fff8f0',
    accent: '#f7e4cd',
  },
]

export const PILL_ROW_ONE: PillTag[] = [
  { label: 'Five signature flavours', bg: '#d9534f', color: '#fff8f0' },
  { label: 'Orange citrus lift', bg: '#4e2116', color: '#fff8f0' },
  { label: 'Classic Cola depth', bg: '#f6cbd0', color: '#4e2116' },
  { label: 'Crisp Lemon sparkle', bg: '#f5a61c', color: '#4e2116' },
  { label: 'Blueberry lush', bg: '#bf282f', color: '#fff8f0' },
  { label: 'Coffee Cola fusion', bg: '#ee777c', color: '#fff8f0' },
  { label: 'Retail & wholesale', bg: '#df8b4a', color: '#fff8f0' },
  { label: 'Refresh your energy', bg: '#f2dfd0', color: '#4e2116' },
]

export const PILL_ROW_TWO: PillTag[] = [
  { label: 'Taste the difference', bg: '#f5a61c', color: '#4e2116' },
  { label: 'Cafés & restaurants', bg: '#d9534f', color: '#fff8f0' },
  { label: 'Supermarkets & retail', bg: '#4e2116', color: '#fff8f0' },
  { label: 'Distributor ready', bg: '#f6cbd0', color: '#4e2116' },
  { label: 'Young adults & families', bg: '#bf282f', color: '#fff8f0' },
  { label: 'Vibrant carton design', bg: '#df8b4a', color: '#fff8f0' },
  { label: 'Smooth crisp finish', bg: '#ee777c', color: '#fff8f0' },
  { label: 'Chilled hospitality pours', bg: '#f2dfd0', color: '#4e2116' },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '“Finally a soft drink range with real personality? Clean packaging, bold citrus and cola notes — our café guests pick ElanX straight off the counter.”',
    author: 'Arjun Mehta',
    role: 'Café & Bistro Owner',
    bg: '#f7dce5',
    color: '#3d170e',
  },
  {
    quote:
      '“We stocked all five ElanX flavours for our supermarket shelves and family weekend events. Coffee Cola and Blueberry moved faster than any classic soda.”',
    author: 'Meera Krishnan',
    role: 'Retail & Supermarket Buyer',
    bg: '#f5a61c',
    color: '#3d170e',
  },
  {
    quote:
      '“Lemon and Orange have that bright, crisp finish you actually want to finish every drop of — zero heavy syrup feel, pure refreshment.”',
    author: 'Rohan Sharma',
    role: 'Hospitality Partner',
    bg: '#d9ecf8',
    color: '#3d170e',
  },
]

export const AUDIENCES = [
  {
    title: 'Young adults & families',
    detail: 'Five playful, approachable flavours made for everyday meals, drives, and gatherings.',
  },
  {
    title: 'Restaurants & cafés',
    detail: 'Distinctive shelf-ready cartons and bold fusions like Coffee Cola that elevate beverage menus.',
  },
  {
    title: 'Supermarkets & retailers',
    detail: 'Colour-coded Tetra Prisma packaging engineered to stand out in chilled coolers.',
  },
  {
    title: 'Distributors & wholesale',
    detail: 'Dedicated partner support with direct ordering via email or WhatsApp at +91 83390 94094.',
  },
]

export const LEGAL_CONTENT: Record<LegalKey, { title: string; kicker: string; paragraphs: string[] }> = {
  privacy: {
    title: 'Privacy, with clarity.',
    kicker: 'Privacy policy',
    paragraphs: [
      'ElanX Beverages respects the information you choose to share with us. We use enquiries and contact details only to respond to your request, discuss our products, or support a potential retail or wholesale relationship.',
      'We do not sell personal information. To update or remove information you have shared, email elanx.beverages@gmail.com.',
    ],
  },
  terms: {
    title: 'Simple terms. Better business.',
    kicker: 'Terms of use',
    paragraphs: [
      'This website introduces ElanX Beverages, its flavour range, and its business contact channels. Product availability, pricing, minimum order quantities, and distribution terms may vary by location and are confirmed directly with our team.',
      'By using this website, you agree to use its content for lawful purposes and not to copy, misuse, or misrepresent ElanX brand materials without permission.',
    ],
  },
  disclaimer: {
    title: 'Good taste, honest detail.',
    kicker: 'Disclaimer',
    paragraphs: [
      'Product descriptions are for brand and flavour communication. Packaging, availability, and product specifications may change as ElanX grows its range and distribution network.',
      'For current retail, wholesale, and distribution information, contact elanx.beverages@gmail.com or +91 83390 94094.',
    ],
  },
}
