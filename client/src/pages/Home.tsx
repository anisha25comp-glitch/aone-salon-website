// A ONE Salon homepage: monochrome luxury typography, authentic branding, separate service menus, and direct appointment booking.
import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu, Phone, Sparkles, Star, Users, X } from "lucide-react";

const LIMITED_OFFER_END = new Date("2026-09-01T00:00:00+05:30").getTime();

const heroSlides = [
  { kicker: "A ONE UNISEX SALON & BEAUTY PARLOUR", title: "Hair that\ngets noticed.", copy: "Cuts, colour, care and confidence — all under one roof in Badlapur.",image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", badge: "EST. 2023" },
  { kicker: "THE COLOUR ROOM", title: "Your next\nlook starts here.", copy: "From a fresh root touch-up to a full transformation, let’s make it yours.",image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", badge: "COLOUR / CARE" },
  { kicker: "CARE THAT SHOWS", title: "Come for the\nrefresh.", copy: "Leave feeling lighter, brighter and ready for whatever is next.",image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", badge: "BADLAPUR WEST" },
];

const menu = {
  "Women’s hair": { image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", accent: "#666", intro: "Cuts, styling, colour and treatments made around your hair.", items: [["Basic Haircut + Styling", "₹499"], ["Advanced Haircut + Styling", "₹699"], ["Kids Haircut", "₹399"], ["Hair Styling — Iron/Curls", "₹599"], ["Shampoo & Blow Dry", "₹399"], ["Dry Styling", "₹399"], ["Highlights — per streak", "₹249"], ["Root Touch-Up", "₹999"], ["Global Colour", "₹2,999"], ["Balayage", "₹3,999"], ["Ombre", "₹7,799"], ["Highlights with Global Colour", "₹6,499"], ["Keratin — short / medium / long", "₹4,999 / ₹5,999 / ₹6,999"], ["Nanoplastia — short / medium / long", "₹4,999 / ₹5,999 / ₹7,999"], ["Botox — short / medium / long", "₹5,999 / ₹6,999 / ₹8,599"], ["Smoothening — short / medium / long", "₹5,999 / ₹6,499 / ₹7,799"], ["Kera Smoothening — short / medium / long", "₹5,999 / ₹7,999 / ₹8,999"], ["Hair Pumming — short / medium / long", "₹2,999 / ₹3,999 / ₹4,999"], ["Women’s Hair Spa", "₹750 / ₹1,000 / ₹1,500"], ["Premium Hair Spa", "₹850 / ₹1,250 / ₹1,700"], ["Advanced Hair Spa", "₹1,000 / ₹1,500 / ₹2,000"]] },
  "Skin & beauty": { image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", accent: "#777", intro: "Quick refreshes, facials and feel-good rituals for your skin.", items: [["Basic Cleanup", "₹499"], ["Advance Cleanup", "₹999"], ["Aroma D-Tan", "₹499"], ["Pacific D-Tan", "₹999"], ["Eyebrows", "₹60"], ["Upper Lip", "₹50"], ["Chin", "₹50"], ["Forehead", "₹50"], ["Side Locks", "₹60"], ["Full Face Threading", "₹200"], ["Full Face Wax — regular / premium", "₹300 / ₹500"], ["Full Arms Wax — regular / premium", "₹350 / ₹500"], ["Full Legs Wax — regular / premium", "₹500 / ₹1,000"], ["Underarms Wax — regular / premium", "₹150 / ₹200"], ["Bikini Wax — regular / premium", "₹1,500 / ₹2,000"], ["Fruit Facial", "₹699", "₹1,499"], ["Oshia Gold Facial", "₹999", "₹1,499"], ["OxyLife Facial", "₹1,299", "₹1,999"], ["Richfeel Facial", "₹1,799", "₹2,499"], ["O3+ Facial", "₹2,499", "₹3,499"], ["FYC Korean Facial", "₹2,499", "₹3,499"], ["FYC Hydra Facial", "₹2,499", "₹3,499"], ["O3+ Bridal Facial", "₹3,499", "₹3,499"], ["Thalgo Facial", "₹6,999", "₹7,999"]] },
  "Spa & nails": {image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", accent: "#888", intro: "Slow down with a little care from head to toe.", items: [["Head Massage", "₹299"], ["Foot Massage — 20 min", "₹499"], ["Hand Massage — 20 min", "₹499"], ["Full Body Massage — 60 min", "₹1,399"], ["Body Scrub", "₹1,999"], ["Body Polishing", "₹2,999"], ["Basic Manicure", "₹499"], ["Premium Manicure", "₹699"], ["Advanced Manicure", "₹999"], ["Basic Pedicure", "₹599"], ["Premium Pedicure", "₹999"], ["Advanced Pedicure", "₹1,499"], ["Men’s Hair Spa — L’Oréal", "₹499 / ₹699 / ₹999"], ["Beard Spa", "₹299"]] },
  "Men’s grooming": {image: "[https://picsum.photos/800/600](https://picsum.photos/800/600)", accent: "#999", intro: "Sharp cuts, beard care and everyday grooming, sorted.", items: [["Men’s Haircut", "₹199"], ["Kids Haircut", "₹149"], ["Shampoo & Styling", "₹149"], ["Dry Styling", "₹100"], ["Oil Head Massage", "₹199"], ["Hair Colour", "₹699"], ["D-Tan", "₹300 / ₹500 / ₹1,000"], ["Beard Trim/Shave", "₹149"], ["Beard Colour", "₹299"]] },
};

type Category = keyof typeof menu;
const categories = Object.keys(menu) as Category[];
const packages = [{ label: "WOMEN", title: "The occasion edit", copy: "Haircut + styling + root touch-up + nails + threading", price: "₹2,999", color: "yellow" }, { label: "MEN", title: "The clean-up", copy: "Haircut + hair wash + beard + D-Tan", price: "₹699", color: "mint" }, { label: "GROUPS", title: "Platinum people", copy: "Up to five family or friends, with VIP booking priority", price: "₹2,000 / year", color: "purple" }];
const galleryImages = [{ src: "/hair-result-1_f6ac3975.jpeg", label: "HAIR / RESULT" }, { src: "/colour-result_70bbb9e7.jpeg", label: "COLOUR / RESULT" }, { src: "/grooming-result_8839661c.jpeg", label: "GROOMING / RESULT" }, { src: "/salon-brand_132314f5.jpg", label: "THE A ONE SPACE" }];
const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];
const providers = ["Any available provider", "Faiz", "Divya", "Sarang"];
const subsectionFor = (category: Category, service: string) => {
  if (category === "Women’s hair") {
    if (/Keratin|Nanoplastia|Botox|Smoothening|Kera|Pumming/i.test(service)) return "Hair Treatments";
    if (/Colour|Highlights|Balayage|Ombre|Touch-Up/i.test(service)) return "Hair Colour";
    if (/Spa/i.test(service)) return "Hair Spa";
    return "Haircut & Styling";
  }
  if (category === "Skin & beauty") {
    if (/Facial/i.test(service)) return "Facial & Hydra";
    if (/Eyebrows|Lip|Chin|Forehead|Locks|Threading/i.test(service)) return "Threading";
    if (/Wax/i.test(service)) return "Waxing";
    return "Cleanup & D-Tan";
  }
  if (category === "Spa & nails") {
    if (/Manicure/i.test(service)) return "Manicure";
    if (/Pedicure/i.test(service)) return "Pedicure";
    if (/Body|Scrub|Polishing/i.test(service)) return "Body Care";
    if (/Hair Spa|Beard Spa/i.test(service)) return "Hair & Beard Spa";
    return "Massage";
  }
  if (/Beard/i.test(service)) return "Beard Grooming";
  if (/Colour|D-Tan/i.test(service)) return "Colour & Skin Care";
  return "Haircut & Styling";
};

export default function Home() {
  const { user } = useAuth({ redirectOnUnauthenticated: false });
  const publicActivityQuery = trpc.appointments.publicSummary.useQuery(undefined, { retry: false });
  const publicCountQuery = trpc.appointments.publicCount.useQuery(undefined, { retry: false });
  const adminActivityQuery = trpc.appointments.list.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const createAppointmentMutation = trpc.appointments.create.useMutation();
  const markWhatsappSentMutation = trpc.appointments.markWhatsappSent.useMutation();
  const [slide, setSlide] = useState(0);
  const [limitedOfferActive, setLimitedOfferActive] = useState(() => Date.now() < LIMITED_OFFER_END);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [creatorAudioBlocked, setCreatorAudioBlocked] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "recording" | "error">("idle");
  const [bookingService, setBookingService] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [bookingProvider, setBookingProvider] = useState("Any available provider");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const current = heroSlides[slide];
  const minBookingDate = new Date().toISOString().split("T")[0];
  const whatsappBooking = `https://api.whatsapp.com/send?phone=919730510517&text=${encodeURIComponent(`Hello A ONE Salon, I would like to book ${bookingService} on ${bookingDate} at ${bookingTime}. My name is ${bookingName} and my phone number is ${bookingPhone}, preferred provider ${bookingProvider}.`)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const selectService = (service: string) => {
    setSelectedServices((current) => {
      const next = current.includes(service) ? current.filter((item) => item !== service) : [...current, service];
      setBookingService(next.join(", "));
      return next;
    });
  };
  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingStatus("recording");
    window.open(whatsappBooking, "_blank", "noopener,noreferrer");
    try {
      const created = await createAppointmentMutation.mutateAsync({
        service: bookingService,
        appointmentDate: bookingDate,
        timeSlot: bookingTime,
        provider: bookingProvider,
        customerName: bookingName,
        customerPhone: bookingPhone,
      });
      await markWhatsappSentMutation.mutateAsync({ id: created.appointmentId });
      await publicActivityQuery.refetch();
      await publicCountQuery.refetch();
      if (user?.role === "admin") await adminActivityQuery.refetch();
      setBookingService("");
      setSelectedServices([]);
      setBookingDate("");
      setBookingTime("");
      setBookingName("");
      setBookingPhone("");
      setBookingStatus("idle");
    } catch {
      setBookingStatus("error");
    }
  };
  useEffect(() => {
    const remaining = LIMITED_OFFER_END - Date.now();
    if (remaining <= 0) {
      setLimitedOfferActive(false);
      return;
    }
    const timer = window.setTimeout(() => setLimitedOfferActive(false), remaining);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { const timer = window.setInterval(() => setSlide((n) => (n + 1) % heroSlides.length), 6500); return () => window.clearInterval(timer); }, []);

  return <main className="instagram-shell">
    <div className="top-ticker"><span>BADLAPUR WEST’S UNISEX SALON & BEAUTY PARLOUR</span><span>NOW BOOKING <Sparkles size={13} /></span><span>EST. 2023</span></div>
    <header className="ig-header"><a className="ig-brand" href="#top"><span className="ig-mark"><img src="/aone-authentic-logo_d251e44f.jpg" alt="A ONE Unisex Salon and Beauty Parlour" /></span></a><nav className={menuOpen ? "ig-nav open" : "ig-nav"}><a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a><a href="#packages" onClick={() => setMenuOpen(false)}>Offers</a><a href="#membership" onClick={() => setMenuOpen(false)}>Membership</a><a href="#contact" onClick={() => setMenuOpen(false)}>Find us</a></nav><div className="ig-head-actions"><a href="https://www.instagram.com/aone_salon_spa/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><button className="ig-book" onClick={() => go("book")}>BOOK NOW <ArrowUpRight size={15} /></button></div><button className="ig-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></header>

    <section className="ig-hero" id="top"><div className="hero-left"><div className="hero-kicker"><span />{current.kicker}</div><h1>{current.title.split("\n").map((line, i) => <span key={line} className={i === 1 ? "hero-pop" : ""}>{line}</span>)}</h1><p>{current.copy}</p><div className="hero-buttons"><button className="ig-book big" onClick={() => go("book")}>BOOK YOUR APPOINTMENT <ArrowRight size={17} /></button><button className="outline-button" onClick={() => go("menu")}>SEE THE MENU</button><a className="call-button" href="tel:+919730510517"><Phone size={16} /> CALL A ONE</a><a className="locate-button" href="https://maps.app.goo.gl/tZdJL9xggo6fZRxC8" target="_blank" rel="noreferrer"><MapPin size={14} /> LOCATE US</a>{limitedOfferActive && <button className="special-offers-button" onClick={() => go("limited-offer")}>SPECIAL OFFERS <ArrowUpRight size={14} /></button>}<button className="full-packages-button" onClick={() => go("packages")}>FULL PACKAGES <ArrowUpRight size={14} /></button></div><div className="hero-bottom"><span><Star size={15} fill="currentColor" /> 267+ local followers</span><span>Shop no. 1, Rameshwadi</span></div></div><div className="hero-right"><div className="hero-photo" style={{ backgroundImage: `url(${current.image})` }} /><div className="hero-sticker">{current.badge}<br /><b>♥</b></div><div className="hero-slide-control"><button onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous"><ChevronLeft /></button><strong>0{slide + 1}</strong><span>/ 03</span><button onClick={() => setSlide((slide + 1) % heroSlides.length)} aria-label="Next"><ChevronRight /></button></div><div className="hero-hashtag">#AONELOOK</div></div></section>

    <div className="ig-marquee"><div>HAIR <i>✦</i> SKIN <i>✦</i> SPA <i>✦</i> NAILS <i>✦</i> GROOMING <i>✦</i> HAIR <i>✦</i> SKIN <i>✦</i> SPA <i>✦</i> NAILS <i>✦</i> GROOMING <i>✦</i></div></div>

{limitedOfferActive && <section className="limited-offer" id="limited-offer"><div className="offer-badge">VALID UNTIL 31 AUGUST</div><div className="limited-offer-copy"><span className="mini-label">A ONE / SPECIAL EDIT</span><h2>Full care.<br /><b>₹1,499.</b></h2><p>One beautiful appointment, nine feel-good services, one irresistible price. Available only until 31 August.</p><div className="limited-offer-proof"><strong>09</strong><span>services in one visit</span><strong>₹1,499</strong><span>until 31 August</span></div></div><div className="limited-offer-services"><span>CLEANUP / D-TAN</span><span>HAIR SPA</span><span>HAIR WASH</span><span>HAND WAX</span><span>LEG WAX</span><span>UNDERARM</span><span>UPPER LIPS</span><span>EYEBROWS</span><span>HEAD MASSAGE</span></div><button className="limited-offer-cta" onClick={() => { setBookingService("Limited Offer — Cleanup / D-Tan, Hair Spa, Hair Wash, Hand Wax, Leg Wax, Underarm, Upper Lips, Eyebrows & Head Massage"); go("book"); }}>CLAIM THE ₹1,499 OFFER <ArrowUpRight size={16} /></button></section>}

    <section className="ig-menu-section" id="menu"><div className="ig-section-intro"><div><span className="mini-label">01 / THE MENU</span><h2>Choose your<br /><b>service.</b></h2></div><p>Every A ONE category has its own menu. Tap any service to continue directly to your appointment request.</p></div><div className="menu-category-grid">{categories.map((name, categoryIndex) => <article className="menu-category-card" key={name}><div className="menu-category-photo" style={{ backgroundImage: `url(${menu[name].image})` }}><span className="category-index">0{categoryIndex + 1}</span><span className="photo-caption">{name.toUpperCase()} / A ONE</span></div><div className="menu-category-content"><div className="menu-list-head"><span>{menu[name].intro}</span><strong>{menu[name].items.length} services</strong></div><div className="category-service-list">{Array.from(new Set(menu[name].items.map(([service]) => subsectionFor(name, service)))).map((subsection) => <div className="menu-subsection" key={subsection}><h4>{subsection}</h4>{menu[name].items.filter(([service]) => subsectionFor(name, service) === subsection).map(([service, price, hydraPrice], index) => <button className={selectedServices.includes(service) ? "service-row selected" : "service-row"} key={service} onClick={() => selectService(service)} aria-pressed={selectedServices.includes(service)}><span className="line-number">{String(index + 1).padStart(2, "0")}</span><strong>{service}</strong><span className="line-dots" />{hydraPrice ? <span className="dual-prices"><span><small>FACIAL</small>{price}</span><span><small>HYDRA</small>{hydraPrice}</span></span> : <b>{price}</b>}<span className="service-check">{selectedServices.includes(service) ? "✓ SELECTED" : "ADD"}</span></button>)}</div>)}</div></div></article>)}</div>{selectedServices.length > 0 && <div className="service-selection-bar"><div><span className="mini-label">YOUR SELECTION</span><strong>{selectedServices.length} service{selectedServices.length === 1 ? "" : "s"} selected</strong><p>{selectedServices.join(" · ")}</p></div><div className="selection-actions"><button className="selection-clear" onClick={() => { setSelectedServices([]); setBookingService(""); }}>CLEAR</button><button className="ig-book" onClick={() => go("book")}>BOOK SELECTED SERVICES <ArrowUpRight size={15} /></button></div></div>}<div className="menu-all-options"><div><span className="mini-label">FULL A ONE MENU</span><p>{limitedOfferActive ? "Choose from every service, offer and package in one appointment request." : "Choose from every service and full package in one appointment request."}</p></div><button className="ig-book" onClick={() => { setBookingService(selectedServices.length ? selectedServices.join(", ") : limitedOfferActive ? "All A ONE services, special offers and full packages" : "All A ONE services and full packages"); go("book"); }}>ALL OPTIONS / BOOK APPOINTMENT <ArrowUpRight size={15} /></button></div></section>

    <section className="providers-section" id="providers"><div className="providers-head"><div><span className="mini-label">02 / THE TEAM</span><h2>Best service<br /><b>providers.</b></h2></div><p>Meet the A ONE team. Choose a preferred provider when you send your appointment request, or let us match you with the right person.</p></div><div className="provider-grid">{providers.slice(1).map((provider, index) => { const role = provider === "Faiz" || provider === "Sarang" ? "Hair dresser" : "Beautician"; return <article className="provider-card" key={provider}><div className="provider-avatar" aria-hidden="true">{provider.slice(0, 1)}</div><div className="provider-number">0{index + 1}</div><h3>{provider}</h3><span>{role}</span><button onClick={() => { setBookingProvider(provider); go("book"); }}>CHOOSE {provider.toUpperCase()} <ArrowUpRight size={15} /></button></article>; })}</div></section>

    <section className="booking-section" id="book"><div className="booking-intro"><span className="mini-label">05 / BOOK YOUR SLOT</span><h2>Make time<br /><b>for you.</b></h2><p>Choose your service, preferred day and a time that works. We’ll confirm your appointment on WhatsApp.</p><div className="booking-note"><Clock3 size={17} /> Expanded schedule · confirmation by A ONE team</div></div><div className="booking-card"><form onSubmit={submitBooking}><label>SERVICE YOU WANT<input type="text" placeholder="Type a service or choose one from the menu" value={bookingService} onChange={(event) => setBookingService(event.target.value)} required /></label><label>CHOOSE DATE<input type="date" min={minBookingDate} value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} required /></label><label>CHOOSE YOUR PROVIDER<select value={bookingProvider} onChange={(event) => setBookingProvider(event.target.value)}>{providers.map((provider) => <option key={provider} value={provider}>{provider}</option>)}</select></label><fieldset><legend>CHOOSE TIME</legend><div className="time-slots">{timeSlots.map((time) => <button type="button" key={time} className={bookingTime === time ? "time-slot selected" : "time-slot"} onClick={() => setBookingTime(time)}>{time}</button>)}</div>{!bookingTime && <small>Select an available time slot</small>}</fieldset><div className="booking-fields"><label>YOUR NAME<input type="text" placeholder="Full name" value={bookingName} onChange={(event) => setBookingName(event.target.value)} required /></label><label>PHONE NUMBER<input type="tel" placeholder="10-digit number" pattern="[0-9]{10}" value={bookingPhone} onChange={(event) => setBookingPhone(event.target.value)} required /></label></div><button className="booking-submit" type="submit" disabled={!bookingTime || !bookingService.trim() || bookingStatus === "recording"}>{bookingStatus === "recording" ? "RECORDING HANDOFF…" : "OPEN WHATSAPP & BOOK"} <ArrowRight size={17} /></button><p className="booking-disclaimer">WhatsApp opens with your appointment details ready to send. A ONE confirms the request directly.</p>{bookingStatus === "error" && <p className="booking-error">WhatsApp opened, but this handoff could not be added to the activity list. Please contact A ONE directly if needed.</p>}</form></div></section>

    <section className="booking-activity-section" id="booking-activity"><div className="activity-head"><div><span className="mini-label">06 / BOOKING ACTIVITY</span><h2>Recent<br /><b>requests.</b></h2></div></div><div className="activity-summary"><strong>{publicCountQuery.data ?? 0}</strong><span>WhatsApp handoffs recorded</span></div>{publicActivityQuery.isLoading ? <p className="activity-empty">Loading booking activity…</p> : publicActivityQuery.data?.length ? <div className="activity-list">{publicActivityQuery.data.map((appointment) => <article className="activity-row" key={appointment.id}><div><strong>{appointment.service}</strong><span>{appointment.provider} · {new Date(`${String(appointment.appointmentDate).slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {appointment.timeSlot}</span></div><div><strong>HANDOFF</strong><span>{appointment.whatsappSentAt ? new Date(appointment.whatsappSentAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) : "Pending"}</span></div>{user?.role === "admin" && <div className="activity-admin-phone"><strong>ADMIN PHONE</strong><span>{adminActivityQuery.data?.find((record) => record.id === appointment.id)?.customerPhone ?? "Loading…"}</span></div>}</article>)}</div> : <p className="activity-empty">No WhatsApp booking handoffs have been recorded yet.</p>}{user?.role === "admin" && <p className="activity-admin-note">Admin view enabled. Customer numbers are shown only in this signed-in admin view.</p>}</section>

    <section className="gallery-section" id="gallery"><div className="gallery-head"><div><span className="mini-label">02 / OUR WORK</span><h2>Made to be<br /><b>seen.</b></h2></div><a className="gallery-instagram" href="https://www.instagram.com/aone_salon_spa/" target="_blank" rel="noreferrer">SEE MORE ON INSTAGRAM <Instagram size={15} /></a></div><div className="gallery-grid">{galleryImages.map((image, index) => <figure className={`gallery-tile gallery-tile-${index + 1}`} key={image.src}><img src={image.src} alt={`A ONE Salon ${image.label.toLowerCase()}`} /><figcaption>{image.label}<span>0{index + 1}</span></figcaption></figure>)}</div></section>

    <section className="booklet-feature">
  <div className="booklet-cover">
<img src="https://placehold.co/800x600/222222/ffffff/png?text=A+ONE+Salon" alt="A ONE Unisex Salon and Beauty Parlour booklet cover" /></div>
    <div className="booklet-copy">
      <span className="mini-label">FROM THE A ONE BOOK</span>
      <h2>The look<br /><b>starts here.</b></h2>
      <p>Hair treatment, hair cutting, spa and beauty care — all the A ONE details, now easier to explore online.</p>
      <div className="booklet-facts">
        <span><strong>2023</strong>ESTABLISHED</span>
        <span><strong>UNISEX</strong>FOR EVERYONE</span>
        <span><strong>BADLAPUR</strong>WEST, MH</span>
      </div>
      <button className="best-works-preview" onClick={() => { setCreatorAudioBlocked(false); setVideoOpen(true); }} aria-label="Open the creator's personal favourite video with sound">
        <video muted autoPlay loop playsInline preload="metadata">
          <source src="/IMG_6021-3-creator-favourite_d5923eee.mp4" type="video/mp4" />
        </video>
        <span>CREATOR’S PERSONAL FAVOURITE <ArrowUpRight size={15} /></span>
      </button>
    </div>
  <span>REAL PEOPLE.<br />REAL RESULTS.</span>
</section>

{videoOpen && (
  <div className="video-lightbox" role="dialog" aria-modal="true" aria-label="A ONE creator favourite video">
    <button className="video-close" onClick={() => setVideoOpen(false)} aria-label="Close video">×</button>
    <video controls autoPlay playsInline preload="metadata" onCanPlay={(event) => { const player = event.currentTarget; player.muted = false; player.volume = 1; player.play().catch(() => setCreatorAudioBlocked(true)); }}>
      <source src="/IMG_6021-3-creator-favourite_d5923eee.mp4" type="video/mp4" />
      Your browser does not support this video.
    </video>
    {creatorAudioBlocked && (
      <button className="video-sound-button" type="button" onClick={(event) => { const player = event.currentTarget.parentElement?.querySelector("video"); if (player instanceof HTMLVideoElement) { player.muted = false; player.volume = 1; player.play().then(() => setCreatorAudioBlocked(false)).catch(() => undefined); } }}>
        TURN SOUND ON <ArrowUpRight size={14} />
      </button>
    )}
  </div>
)}

    <section className="offers-section" id="packages"><div className="offers-head"><div><span className="mini-label">03 / OFFERS & PACKAGES</span><h2>More care.<br /><b>More value.</b></h2></div><p>Make it a full day. Or make it a family thing. Our packages and plans keep the good energy going.</p></div><div className="offer-cards">{packages.map((item) => <article className={`offer-card ${item.color}`} key={item.title}><div className="offer-top"><span>{item.label}</span><ArrowUpRight size={18} /></div><div><h3>{item.title}</h3><p>{item.copy}</p></div><div className="offer-bottom"><strong>{item.price}</strong><button onClick={() => go("book")}>ENQUIRE</button></div></article>)}</div></section>

    <section className="membership-section" id="membership"><div className="membership-copy"><span className="mini-label">04 / MEMBERSHIP</span><h2>Join the<br /><b>care club.</b></h2><p>Gold at ₹500/year or Platinum at ₹2,000/year. Save on services, get priority scheduling, and keep your AONE moments closer.</p><button className="ig-book" onClick={() => go("book")}>ENQUIRE ABOUT MEMBERSHIP <ArrowUpRight size={15} /></button></div><div className="membership-poster"><div className="poster-star">✦</div><span>A ONE / MEMBERSHIP</span><strong>GOLD<br /><em>10% OFF</em></strong><small>ALL SERVICES · PRIORITY BOOKING · FESTIVE GIFT</small></div></section>


    <section className="contact-ig" id="contact"><div><span className="mini-label">06 / COME BY</span><h2>Let’s make<br /><b>an entrance.</b></h2><button className="ig-book big" onClick={() => go("book")}>BOOK YOUR APPOINTMENT <ArrowRight size={17} /></button></div><div className="contact-details"><div className="contact-icon"><MapPin size={22} /></div><span className="mini-label">FIND US</span><a className="address-link" href="https://maps.app.goo.gl/tZdJL9xggo6fZRxC8" target="_blank" rel="noreferrer"><address>Shop No. 1, Shrushree Apartment,<br />Chowk, Rameshwadi,<br />Badlapur West</address></a><a className="direction-link" href="https://maps.app.goo.gl/tZdJL9xggo6fZRxC8" target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={15} /></a><p><Phone size={15} /> 9730510517 &nbsp; · &nbsp; WhatsApp available</p></div></section>

    <section className="feedback-section"><div><span className="mini-label">07 / STAY CONNECTED</span><h2>Your visit.<br /><b>Your voice.</b></h2><p>Tell us how your A ONE experience felt, or explore genuine feedback from the A ONE community.</p></div><div className="feedback-actions"><a href="https://api.whatsapp.com/send?phone=919730510517&text=Hello%20A%20ONE%20Salon,%20I%20would%20like%20to%20share%20feedback%20about%20my%20visit." target="_blank" rel="noreferrer"><span>SHARE FEEDBACK</span><ArrowUpRight size={17} /></a><a href="https://maps.app.goo.gl/tZdJL9xggo6fZRxC8" target="_blank" rel="noreferrer"><span>READ REVIEWS</span><Star size={16} /></a></div></section>
    <footer className="ig-footer"><a className="ig-brand" href="#top"><span className="ig-mark"><img src="/aone-authentic-logo_d251e44f.jpg" alt="A ONE Unisex Salon and Beauty Parlour" /></span></a><span>MORE CARE, MORE BEAUTY, MORE CONFIDENCE.</span><a href="https://www.instagram.com/aone_salon_spa/" target="_blank" rel="noreferrer"><Instagram size={17} /> @aone_salon_spa</a></footer>
  </main>
}
