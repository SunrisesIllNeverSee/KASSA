import { Product } from "./types";

// Cascade math: wave_price = base_price × 1.6^(wave_number - 1)
// Sell-through gate: wave N+1 cannot open until wave N is full

export const products: Product[] = [
  {
    id: "1",
    slug: "command",
    name: "COMMAND",
    founderName: "Deric J. McHenry",
    founderContact: "deric@ellocello.com",
    description:
      "The operations console for AI governance. Configure agent behavior, set operational boundaries, manage compression protocols, and maintain full audit trails. Built on MO§E§™.",
    descriptionShort: "AI governance console for constitutional agent management",
    category: "AI Governance",
    cascadeType: "enterprise",
    productUrl: "https://command.kassa.com",
    status: "active",
    waves: [
      { id: "w1-1", productId: "1", waveNumber: 1, seatPrice: 2400, totalSeats: 5, seatsSold: 5, status: "sold_out" },
      { id: "w1-2", productId: "1", waveNumber: 2, seatPrice: 3840, totalSeats: 5, seatsSold: 2, status: "active" },
      { id: "w1-3", productId: "1", waveNumber: 3, seatPrice: 6144, totalSeats: 4, seatsSold: 0, status: "upcoming" },
      { id: "w1-4", productId: "1", waveNumber: 4, seatPrice: 9830, totalSeats: 3, seatsSold: 0, status: "upcoming" },
    ],
    totalSeats: 17,
    totalSeatsSold: 7,
  },
];

export const categories = [
  { slug: "all", label: "All", count: products.length },
  { slug: "ai-governance", label: "AI Governance", count: 1 },
  { slug: "developer-tools", label: "Developer Tools", count: 0 },
  { slug: "ai-agents", label: "AI Agents", count: 0 },
  { slug: "ai-ml", label: "AI & Machine Learning", count: 0 },
  { slug: "infrastructure", label: "Infrastructure & DevOps", count: 0 },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getActiveWave(product: Product) {
  return product.waves.find((w) => w.status === "active");
}

// Cascade preset generator — enforces deterministic multiplier
export function generateCascade(
  basePrice: number,
  seatCounts: number[],
  productId: string
): { waves: Product["waves"]; totalSeats: number } {
  const multiplier = 1.6;
  const waves = seatCounts.map((seats, i) => ({
    id: `w${productId}-${i + 1}`,
    productId,
    waveNumber: i + 1,
    seatPrice: Math.round(basePrice * Math.pow(multiplier, i)),
    totalSeats: seats,
    seatsSold: 0,
    status: (i === 0 ? "active" : "upcoming") as "active" | "upcoming",
  }));
  const totalSeats = seatCounts.reduce((sum, s) => sum + s, 0);
  return { waves, totalSeats };
}
