import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Store,
  Users,
  X,
} from 'lucide-react'
import {
  AUDIENCES,
  FLAVORS,
  LEGAL_CONTENT,
  MEDIA,
  PILL_ROW_ONE,
  PILL_ROW_TWO,
  TESTIMONIALS,
  WHATSAPP_MESSAGES,
  WHATSAPP_NUMBER,
  WHATSAPP_TEL,
  whatsappHref,
  type Flavor,
  type LegalKey,
  type Page,
} from './data/elanx'
import {
  BrandLogo,
  FloatingBerriesProp,
  FloatingCaramelBeansProp,
  FloatingOrangeProp,
  InstagramIcon,
  PlayStoryBadge,
  WaveDivider,
} from './components/Graphics'

const CONNECT_APPS = [
  {
    id: 'gmail',
    label: 'Email elanx.beverages@gmail.com',
    title: 'Gmail · elanx.beverages@gmail.com',
    href: 'mailto:elanx.beverages@gmail.com',
    icon: MEDIA.gmailLogo,
    alt: 'Gmail',
    external: false,
  },
  {
    id: 'whatsapp',
    label: `WhatsApp ${WHATSAPP_NUMBER}`,
    title: `WhatsApp · ${WHATSAPP_NUMBER}`,
    href: whatsappHref(WHATSAPP_MESSAGES.general),
    icon: MEDIA.whatsappLogo,
    alt: 'WhatsApp',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram — ElanX Beverages',
    title: 'Instagram · ElanX Beverages',
    href: 'https://instagram.com/elanxbeverages',
    icon: MEDIA.instagramLogo,
    alt: 'Instagram',
    external: true,
  },
] as const

const pageFromPath = (): Page => {
  if (window.location.pathname.startsWith('/products')) return 'products'
  if (window.location.pathname.startsWith('/about')) return 'about'
  return 'home'
}

function HeroTopBar({
  page,
  onNavigate,
}: {
  page: Page
  onNavigate: (page: Page, flavorId?: string) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const go = (next: Page) => {
    setMenuOpen(false)
    onNavigate(next)
  }

  return (
    <header className="hero-topbar">
      <div className="container hero-topbar__inner">
        <div className="hero-socials" aria-label="Social and contact channels">
          <a
            href="https://instagram.com/elanxbeverages"
            target="_blank"
            rel="noreferrer"
            className="social-circle"
            aria-label="ElanX Beverages on Instagram"
            title="Instagram — ElanX Beverages"
          >
            <InstagramIcon size={16} strokeWidth={2.2} />
          </a>
          <a
            href="mailto:elanx.beverages@gmail.com"
            className="social-circle"
            aria-label="Email ElanX Beverages"
            title="elanx.beverages@gmail.com"
          >
            <Mail size={16} strokeWidth={2.2} />
          </a>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noreferrer"
            className="social-circle"
            aria-label="WhatsApp ElanX Beverages"
            title={`WhatsApp ${WHATSAPP_NUMBER}`}
          >
            <MessageCircle size={16} strokeWidth={2.2} />
          </a>
        </div>

        <button
          type="button"
          className="brand-logo-btn"
          onClick={() => go('home')}
          aria-label="ElanX Beverages Home"
        >
          <BrandLogo variant="transparent" size="md" decorative />
        </button>

        <nav className="hero-nav-pills" aria-label="Primary navigation">
          <button
            type="button"
            className={`nav-chip ${page === 'about' ? 'nav-chip--active' : ''}`}
            onClick={() => go('about')}
          >
            Our story
          </button>
          <button
            type="button"
            className={`nav-chip ${page === 'products' ? 'nav-chip--active' : ''}`}
            onClick={() => go('products')}
          >
            Our flavours
          </button>
        </nav>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-drawer">
          <button type="button" onClick={() => go('home')}>
            Home
          </button>
          <button type="button" onClick={() => go('products')}>
            Our flavours
          </button>
          <button type="button" onClick={() => go('about')}>
            Our story &amp; Contact
          </button>
          <div className="mobile-drawer__apps" aria-label="Connect channels">
            {CONNECT_APPS.map((app) => (
              <a
                key={app.id}
                href={app.href}
                className="mobile-drawer__app"
                aria-label={app.label}
                title={app.title}
                target={app.external ? '_blank' : undefined}
                rel={app.external ? 'noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <img src={app.icon} alt={app.alt} decoding="async" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function FlavorPedestalCard({
  flavor,
  ctaLabel = 'LEARN MORE',
  onSelect,
}: {
  flavor: Flavor
  ctaLabel?: string
  onSelect?: (flavor: Flavor) => void
}) {
  return (
    <article
      className="flavor-card"
      style={{ backgroundColor: flavor.cardBg }}
    >
      <div className="flavor-card__top">
        <h3>{flavor.name}</h3>
        <p>{flavor.tagline}</p>
      </div>
      <img
        src={flavor.image}
        alt={`ElanX ${flavor.name} can`}
        className="flavor-card__img"
        loading="lazy"
      />
      {onSelect && (
        <button
          type="button"
          className="flavor-card__cta"
          style={{ backgroundColor: flavor.ctaBg }}
          onClick={() => onSelect(flavor)}
        >
          <span>{ctaLabel}</span>
          <ArrowRight size={12} strokeWidth={2.5} />
        </button>
      )}
    </article>
  )
}

function PillMarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof PILL_ROW_ONE
  reverse?: boolean
}) {
  const loopItems = [...items, ...items, ...items, ...items]
  return (
    <div className="pill-row">
      <div className={`pill-track ${reverse ? 'pill-track--reverse' : ''}`}>
        {loopItems.map((pill, idx) => (
          <span
            key={`${pill.label}-${idx}`}
            className="benefit-pill"
            style={{ backgroundColor: pill.bg, color: pill.color }}
          >
            {pill.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function HomePage({
  onNavigate,
  onOpenStory,
}: {
  onNavigate: (page: Page, flavorId?: string) => void
  onOpenStory: () => void
}) {
  return (
    <main className="page-home">
      <div className="hero-fold">
        <section className="hero-stage">
          <div className="hero-media-wrap" aria-hidden="true">
            <img
              src={MEDIA.heroCartons}
              alt=""
              className="hero-media"
            />
          </div>

          <HeroTopBar page="home" onNavigate={onNavigate} />

          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>
                Your day’s favorite
                <br />
                sparkling drink
              </h1>
              <p>
                ElanX is the refreshing soft drink you’ll actually finish and crave again tomorrow.
              </p>
              <div className="hero-play-wrap">
                <PlayStoryBadge onClick={onOpenStory} />
              </div>
            </div>

            <div className="hero-mobile-pack">
              <img
                src={MEDIA.heroMobileCartons}
                alt="Chilled ElanX Lemon, Cola, and Orange cans"
              />
            </div>
          </div>
        </section>

        <section className="pill-marquee-band" aria-label="ElanX highlights">
          <PillMarqueeRow items={PILL_ROW_ONE} />
          <PillMarqueeRow items={PILL_ROW_TWO} reverse />
        </section>
      </div>

      <section className="benefits-section" id="benefits">
        <div className="container benefits-inner">
          <div className="section-header">
            <span className="pill-eyebrow">BENEFITS</span>
            <h2>
              <strong>Your palate knows</strong>
              <span>so does every sip</span>
            </h2>
          </div>

          <div className="bento-wrapper">
            <FloatingOrangeProp />

            <div className="bento-mosaic">
              <article className="bento-tile bento-tile--cocoa">
                <h3>Better pour, better mood</h3>
                <p>
                  Crisp sparkle. Bold citrus and cola notes. Smooth finish for your everyday lift.
                </p>
              </article>

              <article className="bento-tile bento-tile--amber">
                <h3>Daily energy starts with flavour</h3>
                <p>
                  Crafted across five distinct taste profiles for cafés, tables, and moments on the move.
                </p>
              </article>

              <article className="bento-tile bento-tile--tall-right bento-tile--photo">
                <img
                  src={MEDIA.productsLineup}
                  alt="Five hands holding ElanX Blueberry, Coffee, Cola, Lemon, and Orange cans against blue clouds and sky"
                  style={{ objectPosition: 'center' }}
                  loading="lazy"
                />
              </article>

              <article className="bento-tile bento-tile--tall-left bento-tile--photo">
                <img
                  src={MEDIA.bentoTableTrio}
                  alt="ElanX Cola, Lemon, and Orange cans on a sunlit café table with citrus slices and ice"
                  style={{ objectPosition: '50% 48%' }}
                  loading="lazy"
                />
              </article>

              <article className="bento-tile bento-tile--photo">
                <img
                  src={MEDIA.bentoGardenLineup}
                  alt="ElanX Lemon, Cola, Coffee Cola, and Blueberry cans chilled with fruit, coffee beans, and ice"
                  style={{ objectPosition: '50% 55%' }}
                  loading="lazy"
                />
              </article>

              <article className="bento-tile bento-tile--coral">
                <h3>Fizz never tasted this good</h3>
                <p>
                  Bright cans, clean refreshment, zero dull pours. Built to brighten the shelf.
                </p>
              </article>

              <article className="bento-tile bento-tile--photo">
                <img
                  src={MEDIA.bentoGoldenStack}
                  alt="Stacked ElanX Lemon, Coffee Cola, Cola, and Blueberry cans in warm golden light"
                  style={{ objectPosition: '50% 48%' }}
                  loading="lazy"
                />
              </article>
            </div>

            <FloatingCaramelBeansProp />
          </div>
        </div>
      </section>

      <WaveDivider topColor="#fcf5ec" bottomColor="#fde4d8" />

      <section className="flavors-section" id="flavors">
        <div className="container">
          <div className="section-header">
            <span className="pill-eyebrow">OUR FLAVOURS</span>
            <h2>
              <strong>Choose your flavour</strong>
              <span>crush the craving</span>
            </h2>
          </div>

          <div className="flavor-cards-grid">
            {FLAVORS.map((flavor) => (
              <FlavorPedestalCard
                key={flavor.id}
                flavor={flavor}
                onSelect={(item) => onNavigate('products', item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider topColor="#fde4d8" bottomColor="#fcf5ec" flip />

      <section className="testimonials-section">
        <div className="container testimonials-inner">
          <div className="section-header">
            <h2>
              <strong>Why people keep</strong>
              <span>coming back</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.author}
                className="quote-card"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <p className="quote-card__text">{item.quote}</p>
                <div className="quote-card__meta">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="audience-strip">
            <div className="audience-strip__brand">
              <BrandLogo variant="badge" size="xs" decorative />
              <span>
                Built for young adults, families, restaurants, cafés, supermarkets &amp; distributors
              </span>
            </div>
            <button
              type="button"
              className="audience-strip__link"
              onClick={() => onNavigate('about')}
            >
              <span>Partner with ElanX</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <FloatingBerriesProp />
        </div>
      </section>
    </main>
  )
}

function ProductsPage({
  onNavigate,
}: {
  onNavigate: (page: Page) => void
}) {
  return (
    <main className="page-products">
      <section className="subhero">
        <HeroTopBar page="products" onNavigate={onNavigate} />

        <div className="container subhero__grid">
          <div className="subhero__copy">
            <span className="pill-eyebrow pill-eyebrow--hero">OUR FLAVOURS • 05 POURS</span>
            <h1>
              Meet the five
              <br />
              signature pours
            </h1>
            <p>
              Five distinct flavours crafted for retail coolers, cafés, restaurants, and joyful
              everyday refreshment.
            </p>
            <div className="subhero__actions">
              <button
                type="button"
                className="pill-btn pill-btn--cocoa"
                onClick={() => onNavigate('about')}
              >
                <span>Stock ElanX</span>
                <ArrowUpRight size={15} />
              </button>
              <a
                href={whatsappHref(WHATSAPP_MESSAGES.products)}
                target="_blank"
                rel="noreferrer"
                className="pill-btn pill-btn--cream"
              >
                <span>WhatsApp enquiries</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="subhero__preview">
            <div className="subhero__card subhero__card--lineup">
              <img
                src={MEDIA.bentoTableTrio}
                alt="ElanX Cola, Lemon, and Orange cans on a sunlit café table with citrus slices and ice"
              />
              <span className="subhero__tag">ELANX · 05 FLAVOURS</span>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#f9cfce" bottomColor="#fde4d8" />

      <section className="flavors-section">
        <div className="container">
          <div className="section-header">
            <span className="pill-eyebrow">COMPLETE CATALOGUE</span>
            <h2>
              <strong>Pick your side</strong>
              <span>of refreshment</span>
            </h2>
          </div>

          <div className="flavor-cards-grid">
            {FLAVORS.map((flavor) => (
              <FlavorPedestalCard
                key={flavor.id}
                flavor={flavor}
              />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider topColor="#fde4d8" bottomColor="#fcf5ec" flip />

      <section className="range-summary-band">
        <div className="container range-summary-band__inner">
          <div className="range-summary-band__lead">
            <BrandLogo variant="badge" size="sm" decorative />
            <div>
              <span className="pill-eyebrow">FOR RETAIL &amp; HOSPITALITY</span>
              <h2>
                <strong>Five flavours.</strong>
                <span>One shelf-ready range.</span>
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="pill-btn pill-btn--cocoa"
            onClick={() => onNavigate('about')}
          >
            <span>Talk retail &amp; wholesale</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>
    </main>
  )
}

function AboutPage({
  onNavigate,
}: {
  onNavigate: (page: Page, flavorId?: string) => void
}) {
  const [sent, setSent] = useState(false)
  const [enquiryHref, setEnquiryHref] = useState('mailto:elanx.beverages@gmail.com')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const interest = String(form.get('interest') ?? '')
    const message = String(form.get('message') ?? '')
    const body = `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`
    setEnquiryHref(
      `mailto:elanx.beverages@gmail.com?subject=${encodeURIComponent(
        `ElanX enquiry from ${name}`
      )}&body=${encodeURIComponent(body)}`
    )
    setSent(true)
  }

  return (
    <main className="page-about">
      <section className="subhero">
        <HeroTopBar page="about" onNavigate={onNavigate} />

        <div className="container subhero__grid">
          <div className="subhero__copy">
            <span className="pill-eyebrow pill-eyebrow--hero">OUR STORY • FOUNDED BY DR. SUHANA SHABNAM</span>
            <h1>
              Good energy
              <br />
              runs deep
            </h1>
            <p>
              Founded by Dr. Suhana Shabnam, ElanX Beverages was created to make everyday soft drinks
              feel more joyful, more expressive, and more memorable on every table and shelf.
            </p>
            <div className="subhero__actions">
              <a href="#contact" className="pill-btn pill-btn--cocoa">
                <span>Get in touch</span>
                <ArrowUpRight size={15} />
              </a>
              <button
                type="button"
                className="pill-btn pill-btn--cream"
                onClick={() => onNavigate('products')}
              >
                <span>Explore flavours</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="subhero__preview">
            <div className="subhero__card subhero__card--story">
              <img
                src={MEDIA.productsLineup}
                alt="Five hands holding ElanX Blueberry, Coffee, Cola, Lemon, and Orange cans against blue sky"
              />
              <span className="subhero__tag">ELANX BEVERAGES</span>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#f9cfce" bottomColor="#fcf5ec" />

      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div>
              <span className="pill-eyebrow">THE BEGINNING</span>
              <h2>
                <strong>A modern brand</strong>
                <span>with a human pulse</span>
              </h2>
              <div className="brand-lockup">
                <BrandLogo variant="badge" size="sm" decorative />
                <span className="brand-lockup__meta">
                  ElanX Beverages
                  <br />
                  Founded by Dr. Suhana Shabnam
                </span>
              </div>
            </div>
            <div className="story-copy">
              <p className="story-copy__lead">
                We believe a soft drink can do more than quench thirst — it sets the mood of a room,
                brings people to the same table, and makes a familiar moment feel fresh.
              </p>
              <p>
                Led by founder Dr. Suhana Shabnam, ElanX Beverages brings classic crowd favourites
                alongside distinctive twists like Coffee Cola and Blueberry in clean, vibrant
                cartons made to shine in hand and on shelf.
              </p>
            </div>
          </div>

          <div className="story-pillars">
            <article className="bento-tile bento-tile--cocoa">
              <Sparkles size={20} className="pillar-icon" />
              <h3>Flavour first, always</h3>
              <p>
                Every pour starts with balanced aroma, crisp sparkle, and a clean memorable finish.
              </p>
            </article>
            <article className="bento-tile bento-tile--amber">
              <Store size={20} className="pillar-icon" />
              <h3>Shelf &amp; menu presence</h3>
              <p>
                Colour-coded Tetra Prisma cartons built for supermarkets, cafés, and restaurant coolers.
              </p>
            </article>
            <article className="bento-tile bento-tile--coral">
              <Users size={20} className="pillar-icon" />
              <h3>Built for partners</h3>
              <p>
                Direct, responsive supply for retail partners, hospitality buyers, and distributors.
              </p>
            </article>
          </div>

          <div className="audiences-block">
            <div className="section-header">
              <span className="pill-eyebrow">WHO WE SERVE</span>
              <h2>
                <strong>Made for every</strong>
                <span>kind of buyer</span>
              </h2>
            </div>

            <div className="audiences-grid">
              {AUDIENCES.map((aud) => (
                <article key={aud.title} className="audience-card">
                  <h3>{aud.title}</h3>
                  <p>{aud.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#fcf5ec" bottomColor="#fde4d8" />

      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="pill-eyebrow">LET’S TALK</span>
            <h2>
              <strong>Bring some</strong>
              <span>good energy</span>
            </h2>
            <p>
              Whether you run a café, restaurant, supermarket, retail store, or distribution
              network — or simply want to find ElanX near you — reach us directly below.
            </p>

            <div className="contact-links">
              <a href="mailto:elanx.beverages@gmail.com">
                <span className="contact-links__icon">
                  <Mail size={16} />
                </span>
                <div>
                  <small>EMAIL</small>
                  <strong>elanx.beverages@gmail.com</strong>
                </div>
              </a>
              <a href={`tel:${WHATSAPP_TEL}`}>
                <span className="contact-links__icon">
                  <Phone size={16} />
                </span>
                <div>
                  <small>PHONE &amp; WHATSAPP</small>
                  <strong>{WHATSAPP_NUMBER}</strong>
                </div>
              </a>
              <a
                href={whatsappHref(WHATSAPP_MESSAGES.contact)}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-links__icon">
                  <MessageCircle size={16} />
                </span>
                <div>
                  <small>WHATSAPP CHAT</small>
                  <strong>Message ElanX Beverages</strong>
                </div>
              </a>
              <a
                href="https://instagram.com/elanxbeverages"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-links__icon">
                  <InstagramIcon size={16} />
                </span>
                <div>
                  <small>INSTAGRAM</small>
                  <strong>ElanX Beverages</strong>
                </div>
              </a>
            </div>
          </div>

          <div className="enquiry-panel">
            {sent ? (
              <div className="enquiry-success">
                <span className="enquiry-success__badge">
                  <Check size={20} />
                </span>
                <span className="pill-eyebrow">DRAFT READY</span>
                <h3>Let’s keep it moving.</h3>
                <p>
                  Your message is prepared as an email draft addressed to{' '}
                  <strong>elanx.beverages@gmail.com</strong>.
                </p>
                <div className="enquiry-success__actions">
                  <a className="pill-btn pill-btn--cocoa" href={enquiryHref}>
                    <span>Open email draft</span>
                    <Mail size={15} />
                  </a>
                  <button
                    type="button"
                    className="pill-btn pill-btn--soft"
                    onClick={() => setSent(false)}
                  >
                    Write another note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <span className="pill-eyebrow">SEND A NOTE</span>
                <h3>Let’s talk flavour.</h3>
                <label>
                  Your name
                  <input required name="name" placeholder="Your name" />
                </label>
                <label>
                  Your email
                  <input required name="email" type="email" placeholder="you@company.com" />
                </label>
                <label className="select-field">
                  I’m interested in
                  <select name="interest" defaultValue="retail">
                    <option value="retail">Supermarket &amp; retail stocking</option>
                    <option value="hospitality">Restaurants &amp; cafés</option>
                    <option value="wholesale">Wholesale &amp; distribution</option>
                    <option value="flavours">Retail customers &amp; flavours</option>
                  </select>
                  <ChevronDown size={15} />
                </label>
                <label>
                  Your message
                  <textarea
                    required
                    name="message"
                    rows={3}
                    placeholder="Tell us about your order, outlet, or question..."
                  />
                </label>
                <button className="pill-btn pill-btn--cocoa pill-btn--full" type="submit">
                  <span>Prepare enquiry</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function Footer({
  topWaveColor,
  onNavigate,
  onLegal,
}: {
  topWaveColor: string
  onNavigate: (page: Page, flavorId?: string) => void
  onLegal: (key: LegalKey) => void
}) {
  return (
    <>
      <WaveDivider topColor={topWaveColor} bottomColor="#0f1842" />
      <footer className="site-footer">
        <div className="container">
          <div className="footer-hero-row">
            <div className="footer-statement">
              <h2>
                <strong>ElanX is a delicious</strong>
                <br />
                soft drink your table
                <br />
                will thank you for.
              </h2>
              <p>
                Founded by Dr. Suhana Shabnam · Refresh your energy across Orange, Cola, Lemon,
                Blueberry &amp; Coffee Cola.
              </p>
            </div>

            <div className="footer-cta-block">
              <div className="footer-logos-row">
                <button
                  type="button"
                  className="brand-logo-btn brand-logo-btn--footer"
                  onClick={() => onNavigate('home')}
                  aria-label="ElanX Beverages Home"
                >
                  <BrandLogo variant="badge" size="lg" decorative />
                </button>

                <div className="footer-made-in-oman">
                  <img src={MEDIA.madeInOman} alt="Made in Oman — صُنع في عُمان" decoding="async" />
                </div>
              </div>
              <button
                type="button"
                className="pill-btn pill-btn--cream"
                onClick={() => onNavigate('about')}
              >
                <span>Make an enquiry</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="footer-columns">
            <div>
              <span>Explore</span>
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <button type="button" onClick={() => onNavigate('products')}>
                Products
              </button>
              <button type="button" onClick={() => onNavigate('about')}>
                Our story
              </button>
            </div>

            <div>
              <span>Flavours</span>
              {FLAVORS.map((flavor) => (
                <button
                  key={flavor.id}
                  type="button"
                  onClick={() => onNavigate('products', flavor.id)}
                >
                  {flavor.name}
                </button>
              ))}
            </div>

            <div>
              <span>Connect</span>
              <div className="footer-connect-apps" aria-label="Connect channels">
                {CONNECT_APPS.map((app) => (
                  <a
                    key={app.id}
                    href={app.href}
                    className="footer-app-btn"
                    aria-label={app.label}
                    title={app.title}
                    target={app.external ? '_blank' : undefined}
                    rel={app.external ? 'noreferrer' : undefined}
                  >
                    <img src={app.icon} alt={app.alt} decoding="async" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ElanX Beverages</span>
            <div className="footer-legal">
              <button type="button" onClick={() => onLegal('privacy')}>
                Privacy
              </button>
              <button type="button" onClick={() => onLegal('terms')}>
                Terms
              </button>
              <button type="button" onClick={() => onLegal('disclaimer')}>
                Disclaimer
              </button>
            </div>
            <span className="footer-credit">
              Built by{' '}
              <a
                href="https://growitate.com"
                target="_blank"
                rel="noreferrer"
                className="footer-credit__link"
              >
                GROWITATE
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

function StoryReelModal({
  onClose,
  onExplore,
}: {
  onClose: () => void
  onExplore: () => void
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="story-modal"
        role="dialog"
        aria-modal="true"
        aria-label="ElanX Beverages story"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close story modal"
          autoFocus
        >
          <X size={18} />
        </button>

        <div className="story-modal__media">
          <img
            src={MEDIA.bentoFlatlay}
            alt="ElanX Orange, Coffee, and Blueberry cans surrounded by fresh fruit and coffee beans"
          />
        </div>

        <div className="story-modal__body">
          <div className="modal-brand-row">
            <BrandLogo variant="badge" size="xs" decorative />
            <span className="pill-eyebrow">THE ELANX EXPERIENCE</span>
          </div>
          <h2>
            <strong>Five bold pours.</strong>
            <span>One unmistakable lift.</span>
          </h2>
          <p>
            Created by Dr. Suhana Shabnam, ElanX Beverages crafts vibrant soft drinks built for
            everyday enjoyment, café culture, and retail shelves — Orange, Cola, Lemon, Blueberry,
            and Coffee Cola.
          </p>
          <div className="story-modal__actions">
            <button type="button" className="pill-btn pill-btn--cocoa" onClick={onExplore}>
              <span>Explore all 5 flavours</span>
              <ArrowUpRight size={15} />
            </button>
            <button type="button" className="pill-btn pill-btn--soft" onClick={onClose}>
              Back to page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegalModal({ legalKey, onClose }: { legalKey: LegalKey; onClose: () => void }) {
  const content = LEGAL_CONTENT[legalKey]

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="legal-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close legal dialog"
          autoFocus
        >
          <X size={18} />
        </button>
        <div className="modal-brand-row">
          <BrandLogo variant="badge" size="xs" decorative />
          <span className="pill-eyebrow">{content.kicker}</span>
        </div>
        <h2>{content.title}</h2>
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <button className="pill-btn pill-btn--cocoa" type="button" onClick={onClose}>
          <span>Back to ElanX</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  )
}

function App() {
  const [page, setPage] = useState<Page>(pageFromPath)
  const [legalKey, setLegalKey] = useState<LegalKey | null>(null)
  const [storyOpen, setStoryOpen] = useState(false)

  useEffect(() => {
    const handlePop = () => {
      setPage(pageFromPath())
    }
    window.addEventListener('popstate', handlePop)
    document.body.style.overflow = legalKey || storyOpen ? 'hidden' : ''
    return () => {
      window.removeEventListener('popstate', handlePop)
      document.body.style.overflow = ''
    }
  }, [legalKey, storyOpen])

  const navigate = (next: Page, flavorId?: string) => {
    const basePath = next === 'home' ? '/' : `/${next}`
    const path = flavorId ? `${basePath}?flavor=${encodeURIComponent(flavorId)}` : basePath
    window.history.pushState({}, '', path)
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerTopColor = page === 'about' ? '#fde4d8' : '#fcf5ec'

  return (
    <div className="site-shell">
      {page === 'home' && (
        <HomePage onNavigate={navigate} onOpenStory={() => setStoryOpen(true)} />
      )}
      {page === 'products' && <ProductsPage onNavigate={navigate} />}
      {page === 'about' && <AboutPage onNavigate={navigate} />}

      <Footer
        topWaveColor={footerTopColor}
        onNavigate={navigate}
        onLegal={setLegalKey}
      />

      {storyOpen && (
        <StoryReelModal
          onClose={() => setStoryOpen(false)}
          onExplore={() => {
            setStoryOpen(false)
            navigate('products')
          }}
        />
      )}

      {legalKey && <LegalModal legalKey={legalKey} onClose={() => setLegalKey(null)} />}
    </div>
  )
}

export default App
