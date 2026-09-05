import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu, Phone, Sparkles, Star, Users, X } from "lucide-react";

const LIMITED_OFFER_END = new Date("2026-09-01T00:00:00+05:30").getTime();

const heroSlides = [
  { kicker: "A ONE UNISEX SALON & BEAUTY PARLOUR", title: "Hair that gets noticed.", copy: "Cuts, colour, care and confidence – all under one roof." },
  { kicker: "THE COLOUR ROOM", title: "Your next look starts here.", copy: "From a fresh root touch-up to a full transformation, our stylists bring detail to every single strand." },
  { kicker: "CARE THAT SHOWS", title: "Come for the refresh.", copy: "Leave feeling lighter, brighter and ready for whatever is next." }
];

const menu = {
  "Women's hair": { image: "https://picsum.photos/800/600", accent: "#666", intro: "Cuts, styling, treatments" },
  "Skin & beauty": { image: "https://picsum.photos/800/600", accent: "#777", intro: "Quick refreshes to deep facial care" },
  "Spa & nails": { image: "https://picsum.photos/800/600", accent: "#888", intro: "Slow down with a relaxing session" },
  "Men's grooming": { image: "https://picsum.photos/800/600", accent: "#999", intro: "Sharp cuts, beard care, grooming" }
};

type Category = keyof typeof menu;

const galleryImages = Array.from({ length: 20 }, (_, i) => {
  const pageNum = String(i + 1).padStart(4, '0');
  return {
    src: `/Salon%20Book_compressed_page-${pageNum}.jpg`,
    label: `Salon Page ${i + 1}`
  };
});

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>A ONE Salon Booklet</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {galleryImages.map((img, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <img
              src={img.src}
              alt={img.label}
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
              onError={(e) => {
                const pageNum = String(index + 1).padStart(4, '0');
                (e.target as HTMLImageElement).src = `/Salon Book_compressed_page-${pageNum}.jpg`;
              }}
            />
            <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>{img.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
