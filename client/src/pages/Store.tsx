import { ArrowLeft, ExternalLink, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: "Hair care" | "Skin care";
  detail: string;
  price: number;
  mrp?: number;
  image: string;
  sourceUrl: string;
  sourceLabel: string;
};

const products: Product[] = [
  { id: 1, name: "Chave Neoplex Hair Mask", brand: "Cabelo Chave", category: "Hair care", detail: "250g · Green caviar care", price: 1530, image: "/assets/store/cabelo-chave-neoplex-mask.png", sourceUrl: "https://cabelochave.com/collections/neoplex", sourceLabel: "View brand range" },
  { id: 2, name: "W One Professional Set", brand: "Floractive", category: "Hair care", detail: "Shampoo + conditioner · 300ml each", price: 3559, mrp: 3600, image: "/assets/store/floractive-w-one-set.jpg", sourceUrl: "https://floractiveusa.ecwid.com/Floractive-Shampoo-W-One-300-ml-p100802212", sourceLabel: "View product source" },
  { id: 3, name: "BC Repair Rescue Combo", brand: "Schwarzkopf Professional", category: "Hair care", detail: "Shampoo + conditioner + mask", price: 2925, mrp: 3250, image: "/assets/store/schwarzkopf-repair-rescue.jpg", sourceUrl: "https://www.schwarzkopf-professional.com/in/en/care/bonacure.html", sourceLabel: "View brand range" },
  { id: 4, name: "BC Frizz Away Combo", brand: "Schwarzkopf Professional", category: "Hair care", detail: "Shampoo + conditioner + mask", price: 2438, mrp: 3250, image: "/assets/store/schwarzkopf-frizz-away.jpg", sourceUrl: "https://www.schwarzkopf-professional.com/au/en/care/bonacure/frizz-away/treatment.html", sourceLabel: "View product source" },
  { id: 5, name: "Xtenso Care Sulfate-Free Set", brand: "L'Oréal Professionnel", category: "Hair care", detail: "Shampoo + masque · gold packaging", price: 2335, image: "/assets/store/loreal-xtenso-sulfate-free.jpg", sourceUrl: "https://us.lorealprofessionnel.com/", sourceLabel: "View brand range" },
  { id: 6, name: "Xtenso Care Pro-Keratin Set", brand: "L'Oréal Professionnel", category: "Hair care", detail: "Shampoo + masque · blue packaging", price: 1515, image: "/assets/store/loreal-xtenso-pro-keratin.jpeg", sourceUrl: "https://us.lorealprofessionnel.com/", sourceLabel: "View brand range" },
  { id: 7, name: "Brazilian Essence Neoplex Mask", brand: "Cabelo Chave", category: "Hair care", detail: "250g · Homecare mask", price: 1530, image: "/assets/store/cabelo-chave-neoplex-brazilian.jpg", sourceUrl: "https://cabelochave.com/collections/neoplex", sourceLabel: "View brand range" },
  { id: 8, name: "Marroco Golden Plus Duo", brand: "Floractive", category: "Hair care", detail: "Shampoo + conditioner · 300g each", price: 2699, mrp: 2985, image: "/assets/store/floractive-marroco-golden.jpg", sourceUrl: "https://floractive-usa.com/products/marocco-hair-mask-deep-hydration", sourceLabel: "View product source" },
  { id: 9, name: "Gentle Skin Cleanser", brand: "Cetaphil", category: "Skin care", detail: "236ml · Gentle daily cleanser", price: 692, mrp: 799, image: "/assets/store/cetaphil-gentle-cleanser.jpg", sourceUrl: "https://www.cetaphil.in/products/cleansers", sourceLabel: "View product range" },
  { id: 10, name: "Repair Reviver Hair Mask", brand: "iluvia Professional", category: "Hair care", detail: "200g · Repair care", price: 895, image: "/assets/store/iluvia-repair-mask.png", sourceUrl: "https://iluviapro.com/en-us", sourceLabel: "View product range" },
  { id: 11, name: "Vitariche Gloss Hair Serum", brand: "Streax Professional", category: "Hair care", detail: "50ml / 115ml · Gloss finish", price: 180, image: "/assets/store/streax-vitariche-serum.jpg", sourceUrl: "https://www.streaxprofessional.com/", sourceLabel: "View brand range" },
  { id: 12, name: "Rosemary Anti-Hair Fall Shampoo", brand: "Plix", category: "Hair care", detail: "100ml · Rosemary care", price: 199, image: "/assets/store/plix-rosemary-shampoo.jpg", sourceUrl: "https://theplix.com/", sourceLabel: "View brand range" },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function Store() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Product["category"]>("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesQuery = `${product.name} ${product.brand}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);
  const updateCart = (id: number, amount: number) => setCart((current) => {
    const next = { ...current, [id]: Math.max(0, (current[id] || 0) + amount) };
    if (!next[id]) delete next[id];
    return next;
  });

  return <main className="store-shell">
    <div className="store-ticker">A ONE / BEAUTY EDIT · PROFESSIONAL CARE FOR HOME</div>
    <header className="store-header">
      <Link className="store-back" href="/"><ArrowLeft size={16} /> BACK TO A ONE</Link>
      <Link className="store-logo" href="/">A ONE <span>STORE</span></Link>
      <button className="store-cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={18} /><span>{cartCount}</span></button>
    </header>
    <section className="store-hero"><div><span className="mini-label">THE A ONE STORE / 01</span><h1>Care worth<br /><em>taking home.</em></h1><p>Salon-loved hair and skin essentials, selected for your everyday ritual.</p></div><div className="store-hero-note"><strong>12</strong><span>curated products</span><small>Browse by care, then order directly with A ONE.</small></div></section>
    <section className="store-toolbar"><label className="store-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or brands" aria-label="Search products or brands" /></label><div className="store-filters">{(["All", "Hair care", "Skin care"] as const).map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></section>
    <section className="store-grid" aria-label="Store products">{filtered.map((product) => <article className="store-product" key={product.id}><div className="store-product-image"><img src={product.image} alt={`${product.brand} ${product.name}`} /><span>{product.category}</span></div><div className="store-product-copy"><p className="store-brand">{product.brand}</p><h2>{product.name}</h2><p className="store-detail">{product.detail}</p><div className="store-price"><strong>{money(product.price)}</strong>{product.mrp && <del>{money(product.mrp)}</del>}</div><div className="store-product-actions"><button onClick={() => updateCart(product.id, 1)}>ADD TO BAG <Plus size={14} /></button><a href={product.sourceUrl} target="_blank" rel="noreferrer">{product.sourceLabel} <ExternalLink size={13} /></a></div></div></article>)}</section>
    {filtered.length === 0 && <div className="store-empty">No products match that search.</div>}
    {cartOpen && <div className="store-cart-backdrop" onClick={() => setCartOpen(false)}><aside className="store-cart" onClick={(event) => event.stopPropagation()}><div className="store-cart-head"><div><span className="mini-label">YOUR BAG</span><h2>{cartCount} item{cartCount === 1 ? "" : "s"}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cartItems.length === 0 ? <p className="store-cart-empty">Your bag is ready for its first ritual.</p> : <>{cartItems.map((product) => <div className="store-cart-row" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{money(product.price)}</span><div><button onClick={() => updateCart(product.id, -1)}><Minus size={12} /></button><b>{cart[product.id]}</b><button onClick={() => updateCart(product.id, 1)}><Plus size={12} /></button></div></div></div>)}<div className="store-cart-total"><span>ESTIMATED TOTAL</span><strong>{money(cartTotal)}</strong></div><a className="store-checkout" href={`https://wa.me/919730510517?text=${encodeURIComponent(`Hello A ONE Salon, I would like to order: ${cartItems.map((item) => `${item.name} x${cart[item.id]}`).join(", ")}. Estimated total: ${money(cartTotal)}.`)}`} target="_blank" rel="noreferrer">ORDER ON WHATSAPP <ExternalLink size={15} /></a></>}</aside></div>}
  </main>;
}
