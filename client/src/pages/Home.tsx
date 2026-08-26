// Quiet Luxury Studio: warm editorial hospitality, tactile surfaces, asymmetric layout, and direct local booking actions.
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

const heroSlides = [
  {
    eyebrow: "THE AONE EDIT / 01",
    title: "More care.\nMore confidence.",
    body: "A thoughtful beauty ritual for hair, skin, grooming and the little reset you have been waiting for.",
    image: "/manus-storage/aone-hero_d342bf01.jpg",
    feature: "Signature salon care",
  },
  {
    eyebrow: "THE AONE EDIT / 02",
    title: "Your next\nlook, considered.",
    body: "From a polished blow dry to a colour transformation, choose a service that feels like you.",
    image: "/manus-storage/aone-colour-detail_af7415c5.jpg",
    feature: "Colour & treatment",
  },
  {
    eyebrow: "THE AONE EDIT / 03",
    title: "Make room\nfor your moment.",
    body: "Priority booking, family value and a little more ease with our annual membership plans.",
    image: "/manus-storage/aone-interior_4f4202a6.jpg",
    feature: "Gold & Platinum",
  },
];

const serviceGroups = [
  { number: "01", title: "Women’s hair", copy: "Cuts, styling, colour and restorative treatments.", price: "From ₹399", anchor: "#services" },
  { number: "02", title: "Skin & beauty", copy: "Cleanup, D-Tan, threading and smooth waxing rituals.", price: "From ₹50", anchor: "#services" },
  { number: "03", title: "Spa & nails", copy: "Manicure, pedicure, hair spa and body treatments.", price: "From ₹299", anchor: "#services" },
  { number: "04", title: "Men’s grooming", copy: "Sharp hair, beard, colour and everyday grooming.", price: "From ₹100", anchor: "#mens" },
];

const packages = [
  { tag: "WOMEN", title: "The full reset", copy: "Haircut + hair spa + head massage + pedicure", price: "₹2,299" },
  { tag: "WOMEN", title: "The occasion edit", copy: "Haircut + styling + root touch-up + nails + threading", price: "₹2,999" },
  { tag: "MEN", title: "The clean-up", copy: "Haircut + hair wash + beard + D-Tan", price: "₹699" },
];

const topServices = [
  ["Basic Haircut + Styling", "₹499"],
  ["Keratin — short", "₹4,999"],
  ["Global Colour", "₹2,999"],
  ["Full Body Massage — 60 min", "₹1,399"],
  ["Men’s Haircut", "₹199"],
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Women’s hair");

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const current = heroSlides[slide];
  const nextSlide = () => setSlide((slide + 1) % heroSlides.length);
  const previousSlide = () => setSlide((slide - 1 + heroSlides.length) % heroSlides.length);

  return (
    <main className="site-shell">
      <div className="announcement"><span>Now welcoming appointments in Badlapur West</span><a href="#contact">Find us <ArrowUpRight size={13} /></a></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AONE Salon home"><span className="brand-mark"><img src="/manus-storage/aone-mark_e21acb3f.png" alt="" /></span><span>AONE<span className="brand-dot">.</span></span></a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
          <a href="#memberships" onClick={() => setMenuOpen(false)}>Memberships</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Visit us</a>
        </nav>
        <div className="header-actions"><a className="phone-link" href="#contact"><Phone size={15} /> <span>Call AONE</span></a><a className="button button-dark button-small" href="#contact">Book an appointment <ArrowUpRight size={14} /></a></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" />{current.eyebrow}</div>
          <h1>{current.title.split("\n").map((line, i) => <span key={line} className={i === 1 ? "accent-underline" : ""}>{line}</span>)}</h1>
          <p>{current.body}</p>
          <div className="hero-actions"><a className="button button-coral" href="#contact">Book your moment <ArrowUpRight size={16} /></a><a className="text-link" href="#services">Explore services <span>↗</span></a></div>
          <div className="hero-meta"><span><Sparkles size={14} /> {current.feature}</span><span className="meta-rule" /><span>Rameshwadi, Badlapur West</span></div>
        </div>
        <div className="hero-image-wrap"><div className="hero-image" style={{ backgroundImage: `url(${current.image})` }} role="img" aria-label="AONE Salon editorial beauty scene" /><div className="hero-image-note">AONE / 2026<br /><span>Care, confidence, clarity.</span></div><div className="hero-concierge"><span>CONCIERGE</span><strong>Book by phone<br />or message</strong><a href="#contact">Start here <ArrowUpRight size={13} /></a></div><div className="hero-controls"><button onClick={previousSlide} aria-label="Previous feature"><ChevronLeft size={18} /></button><span>0{slide + 1} <i>/</i> 03</span><button onClick={nextSlide} aria-label="Next feature"><ChevronRight size={18} /></button></div></div>
      </section>

      <section className="quick-rail" aria-label="Quick actions"><div><span className="rail-label">YOUR LOCAL BEAUTY DESK</span><strong>One address. Every kind of care.</strong></div><a href="#services">Browse the menu <ArrowUpRight size={15} /></a><a href="#packages">See package value <ArrowUpRight size={15} /></a><a href="#memberships">Join AONE <ArrowUpRight size={15} /></a></section>

      <section className="section services-section" id="services"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" />THE MENU</div><h2>Care, <em>curated.</em></h2></div><p>From your everyday refresh to a complete transformation, find your AONE ritual.</p></div><div className="service-layout"><div className="service-list">{serviceGroups.map((service) => <a href={service.anchor} className={`service-row ${activeCategory === service.title ? "active" : ""}`} key={service.title} onMouseEnter={() => setActiveCategory(service.title)} onFocus={() => setActiveCategory(service.title)}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.copy}</p></div><span className="service-price">{service.price}</span><ArrowUpRight className="service-arrow" size={20} /></a>)}</div><div className="service-feature"><img src="/manus-storage/aone-hands-service_1dfc03b6.jpg" alt="Hands-in-service hair styling detail" /><div className="service-feature-caption"><span>{activeCategory}</span><strong>Make the change<br />feel like you.</strong></div></div></div></section>

      <section className="editorial-band" id="about"><div className="editorial-image"><img src="/manus-storage/aone-interior_4f4202a6.jpg" alt="Warm, welcoming AONE Salon interior" /><span className="vertical-label">THE AONE APPROACH</span></div><div className="editorial-copy"><div className="eyebrow"><span className="eyebrow-line" />WHY AONE</div><h2>Beauty is how<br /><em>you feel</em> after.</h2><p>We create moments of care, confidence, and relaxation so you leave feeling refreshed, radiant, and truly yourself.</p><div className="value-list"><div><span>01</span><strong>Considered care</strong><p>Professional services, chosen around you.</p></div><div><span>02</span><strong>Local ease</strong><p>A warm studio in the heart of Rameshwadi.</p></div><div><span>03</span><strong>Visible value</strong><p>Clear pricing, thoughtful packages, no guesswork.</p></div></div></div></section>

      <section className="section packages-section" id="packages"><div className="section-heading packages-heading"><div><div className="eyebrow"><span className="eyebrow-line" />THE PACKAGE EDIT</div><h2>More in one<br /><em>beautiful plan.</em></h2></div><a className="text-link" href="#contact">Ask about availability <span>↗</span></a></div><div className="package-grid">{packages.map((item, i) => <article className={`package-card card-${i}`} key={item.title}><div className="package-top"><span>{item.tag}</span><span>0{i + 1}</span></div><div><h3>{item.title}</h3><p>{item.copy}</p></div><div className="package-bottom"><strong>{item.price}</strong><a href="#contact" aria-label={`Enquire about ${item.title}`}><ArrowUpRight size={18} /></a></div></article>)}</div></section>

      <section className="membership-strip" id="memberships"><div className="membership-mark"><img src="/manus-storage/aone-mark_e21acb3f.png" alt="" /></div><div><div className="eyebrow light"><span className="eyebrow-line" />THE AONE MEMBERSHIP</div><h2>Good care gets<br /><em>even better.</em></h2></div><div className="membership-plans"><div><span>GOLD / ₹500 yearly</span><strong>10% off all services</strong><p>Plus priority scheduling, retail savings and a festive gift.</p></div><div><span>PLATINUM / ₹2,000 yearly</span><strong>For your people</strong><p>Up to five family or friends, with priority booking and shared value.</p></div><a className="button button-coral" href="#contact">Enquire about membership <ArrowUpRight size={16} /></a></div></section>

      <section className="section menu-section" id="mens"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" />A FEW AONE FAVOURITES</div><h2>The details<br /><em>matter.</em></h2></div><p>Prices from the current salon menu. Treatments may vary by length, product, or consultation.</p></div><div className="menu-table">{topServices.map(([name, price], i) => <div className="menu-item" key={name}><span>0{i + 1}</span><strong>{name}</strong><span className="menu-dots" /><b>{price}</b></div>)}</div><a className="text-link full-menu-link" href="#contact">Ask for the complete menu <span>↗</span></a></section>

      <section className="contact-section" id="contact"><div className="contact-main"><div className="eyebrow light"><span className="eyebrow-line" />COME BY</div><h2>Your next<br /><em>good feeling</em><br />starts here.</h2><div className="contact-actions"><a className="button button-coral" href="#contact">Book an appointment <ArrowUpRight size={16} /></a><a className="contact-call" href="#contact"><Phone size={16} /> Call or WhatsApp AONE</a></div></div><div className="contact-card"><div className="contact-card-icon"><MapPin size={20} /></div><span className="rail-label">FIND US IN BADLAPUR WEST</span><address>Shop No. 1, Shrushree Apartment,<br />Chowk, Rameshwadi,<br />Badlapur West</address><a className="text-link light-link" href="https://www.google.com/maps/search/?api=1&query=Shop+No+1+Shrushree+Apartment+Chowk+Rameshwadi+Badlapur+West" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a><div className="contact-note"><Clock3 size={15} /> Hours and booking details coming soon</div></div></section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><img src="/manus-storage/aone-mark_e21acb3f.png" alt="" /></span><span>AONE<span className="brand-dot">.</span></span></a><span className="footer-copy">MORE CARE, MORE BEAUTY, MORE CONFIDENCE.</span><div className="footer-links"><a href="#services">Services</a><a href="#packages">Packages</a><a href="#memberships">Memberships</a><a href="#contact">Contact</a><a href="#contact" aria-label="AONE on Instagram"><Instagram size={17} /></a></div></footer>
    </main>
  );
}
