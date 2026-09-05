import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu, Phone, Sparkles, Star, Users, X } from "lucide-react";

const LIMITED_OFFER_END = new Date("2026-09-01T00:00:00+05:30").getTime();

const heroSlides = [
  { kicker: "A ONE UNISEX SALON & BEAUTY PARLOUR", title: "Hair that\ngets noticed.", copy: "Cuts, colour, care and confidence – all under one roof." },
  { kicker: "THE COLOUR ROOM", title: "Your next\nlook starts here.", copy: "From a fresh root touch-up to a full transformation, our stylists bring detail to every tone." },
  { kicker: "CARE THAT SHOWS", title: "Come for the\nrefresh.", copy: "Leave feeling lighter, brighter and ready for whatever is next." }
];

const menu = {
  "Women's hair": { image: "https://picsum.photos/800/600", accent: "#666", intro: "Cuts, styling, treatments" },
  "Skin & beauty": { image: "https://picsum.photos/800/600", accent: "#777", intro: "Quick refreshes to deep facial care" },
  "Spa & nails": { image: "https://picsum.photos/800/600", accent: "#888", intro: "Slow down with a relaxing session" },
  "Men's grooming": { image: "https://picsum.photos/800/600", accent: "#999", intro: "Sharp cuts, beard care, grooming" }
};

type Category = keyof typeof menu;
const categories = Object.keys(menu) as Category[];

const packages = [{ label: "WOMEN", title: "The occasion edit", copy: "Haircut + styling + root touch-up + nails + threading", price: "₹2,499" }];
const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"];
const providers = ["Any available provider", "Faiz", "Divya", "Sarang"];

// Dynamically generate paths for all 20 booklet pages
const galleryImages = Array.from({ length: 20 }, (_, i) => {
  const pageNum = String(i + 1).padStart(4, '0');
  return {
    src: `/Salon%20Book_compressed_page_${pageNum}.jpg`,
    label: `Salon Page ${i + 1}`
  };
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<Category>("Women's hair");
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="home-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <header className="salon-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1>A ONE UNISEX SALON</h1>
        <p>Badlapur West, Maharashtra</p>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2>{heroSlides[currentSlide].title}</h2>
        <p>{heroSlides[currentSlide].copy}</p>
      </section>

      {/* Booklet Showcase Section */}
      <section className="gallery-section" id="gallery" style={{ marginTop: '40px' }}>
        <div className="gallery-head" style={{ marginBottom: '20px', textAlign: 'center' }}>
          <span className="mini-label">02 / OUR WORK</span>
          <h2>A ONE Service Booklet</h2>
          <p>Explore all 20 pages of our full salon menu and pricing below.</p>
        </div>

        <div className="booklet-feature">
          <div className="booklet-cover">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              {galleryImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img.src} 
                  alt={img.label} 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  onError={(e) => {
                    const pageNum = String(index + 1).padStart(4, '0');
                    (e.target as HTMLImageElement).src = `/Salon Book_compressed_page_${pageNum}.jpg`;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <p><strong>ESTABLISHED 2023</strong> | FOR EVERYONE | BADLAPUR WEST, MH</p>
      </footer>
    </div>
  );
}
