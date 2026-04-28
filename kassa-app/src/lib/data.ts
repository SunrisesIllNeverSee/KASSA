import { Product, Seat } from "./types";

export const products: Product[] = [
  {
    id: "1",
    slug: "command",
    name: "COMMAND",
    founderName: "Deric J. McHenry",
    founderCompany: "Ello Cello LLC",
    founderVerified: true,
    description:
      "The operations console for AI governance. Configure agent behavior, set operational boundaries, manage compression protocols, and maintain full audit trails. Built on MO§E§™.",
    descriptionShort: "AI governance console for constitutional agent management",
    category: "AI Governance",
    cascadeType: "enterprise",
    waveZeroCleared: true,
    waveZeroPrice: 0,
    productScore: 8.4,
    trend: "rising",
    status: "active",
    waves: [
      { id: "w1-1", productId: "1", waveNumber: 1, seatPrice: 2400, totalSeats: 5, seatsSold: 5, status: "sold_out", isWaveZero: false },
      { id: "w1-2", productId: "1", waveNumber: 2, seatPrice: 3840, totalSeats: 5, seatsSold: 2, status: "active", isWaveZero: false },
      { id: "w1-3", productId: "1", waveNumber: 3, seatPrice: 6144, totalSeats: 4, seatsSold: 0, status: "upcoming", isWaveZero: false },
      { id: "w1-4", productId: "1", waveNumber: 4, seatPrice: 9830, totalSeats: 3, seatsSold: 0, status: "upcoming", isWaveZero: false },
    ],
    totalSeats: 17,
    totalSeatsSold: 7,
  },
  {
    id: "2",
    slug: "superdesign",
    name: "Superdesign",
    founderName: "A. Lindqvist",
    founderCompany: "Superdesign Studio",
    founderVerified: true,
    description:
      "Open-source AI product designer that lives inside VS Code, generating UI mockups from natural language. Design components, full pages, and interactive prototypes without leaving your editor.",
    descriptionShort: "AI product designer inside VS Code",
    category: "Design & Creative",
    cascadeType: "saas",
    waveZeroCleared: false,
    waveZeroPrice: 30,
    productScore: null,
    trend: "rising",
    status: "wave_zero",
    waves: [
      { id: "w2-0", productId: "2", waveNumber: 0, seatPrice: 30, totalSeats: 25, seatsSold: 22, status: "active", isWaveZero: true },
    ],
    totalSeats: 25,
    totalSeatsSold: 22,
  },
  {
    id: "3",
    slug: "instruct",
    name: "Instruct",
    founderName: "M. Chen",
    founderCompany: "Instruct AI Inc.",
    founderVerified: true,
    description:
      "Enterprise instruction tuning platform. Fine-tune foundation models on your proprietary data with constitutional guardrails, automated evaluation, and deployment pipelines.",
    descriptionShort: "Enterprise instruction tuning with constitutional guardrails",
    category: "AI & Machine Learning",
    cascadeType: "saas",
    waveZeroCleared: true,
    waveZeroPrice: 30,
    productScore: 7.2,
    trend: "steady",
    status: "active",
    waves: [
      { id: "w3-0", productId: "3", waveNumber: 0, seatPrice: 30, totalSeats: 25, seatsSold: 25, status: "sold_out", isWaveZero: true },
      { id: "w3-1", productId: "3", waveNumber: 1, seatPrice: 480, totalSeats: 30, seatsSold: 12, status: "active", isWaveZero: false },
    ],
    totalSeats: 55,
    totalSeatsSold: 37,
  },
  {
    id: "4",
    slug: "dvina",
    name: "Dvina",
    founderName: "K. Petrov",
    founderCompany: "Dvina Labs",
    founderVerified: true,
    description:
      "Autonomous code review agent that understands your codebase architecture. Catches bugs, suggests improvements, and enforces team standards before human reviewers see the PR.",
    descriptionShort: "Autonomous code review agent",
    category: "Developer Tools",
    cascadeType: "saas",
    waveZeroCleared: false,
    waveZeroPrice: 30,
    productScore: null,
    trend: "steady",
    status: "wave_zero",
    waves: [
      { id: "w4-0", productId: "4", waveNumber: 0, seatPrice: 30, totalSeats: 25, seatsSold: 6, status: "active", isWaveZero: true },
    ],
    totalSeats: 25,
    totalSeatsSold: 6,
  },
  {
    id: "5",
    slug: "aident-ai",
    name: "Aident AI",
    founderName: "R. Okonkwo",
    founderCompany: "Aident",
    founderVerified: false,
    description:
      "AI-powered accessibility auditor. Scans your web app, identifies WCAG violations, generates fix suggestions, and monitors for regressions across deployments.",
    descriptionShort: "AI accessibility auditor for web apps",
    category: "Developer Tools",
    cascadeType: "saas",
    waveZeroCleared: false,
    waveZeroPrice: 30,
    productScore: null,
    trend: "steady",
    status: "wave_zero",
    waves: [
      { id: "w5-0", productId: "5", waveNumber: 0, seatPrice: 30, totalSeats: 25, seatsSold: 2, status: "active", isWaveZero: true },
    ],
    totalSeats: 25,
    totalSeatsSold: 2,
  },
  {
    id: "6",
    slug: "flux",
    name: "Flux",
    founderName: "J. Park",
    founderCompany: "Flux Systems",
    founderVerified: true,
    description:
      "Real-time data pipeline orchestrator. Connect any source, transform with SQL or Python, and deliver to any destination. Built for teams that outgrew Fivetran.",
    descriptionShort: "Real-time data pipeline orchestrator",
    category: "Infrastructure & DevOps",
    cascadeType: "enterprise",
    waveZeroCleared: true,
    waveZeroPrice: 30,
    productScore: 9.1,
    trend: "steady",
    status: "completed",
    waves: [
      { id: "w6-0", productId: "6", waveNumber: 0, seatPrice: 30, totalSeats: 25, seatsSold: 25, status: "sold_out", isWaveZero: true },
      { id: "w6-1", productId: "6", waveNumber: 1, seatPrice: 1200, totalSeats: 8, seatsSold: 8, status: "sold_out", isWaveZero: false },
      { id: "w6-2", productId: "6", waveNumber: 2, seatPrice: 1920, totalSeats: 8, seatsSold: 8, status: "sold_out", isWaveZero: false },
    ],
    totalSeats: 41,
    totalSeatsSold: 41,
  },
  {
    id: "7",
    slug: "computer-agents",
    name: "Computer Agents",
    founderName: "T. Nakamura",
    founderCompany: "Independent",
    founderVerified: true,
    description:
      "Framework for building autonomous computer-use agents. Your agent can navigate browsers, use desktop apps, read screens, and complete multi-step workflows without APIs.",
    descriptionShort: "Framework for building autonomous computer-use agents",
    category: "AI Agents",
    cascadeType: "saas",
    waveZeroCleared: false,
    waveZeroPrice: 30,
    productScore: null,
    trend: "rising",
    status: "wave_zero",
    waves: [
      { id: "w7-0", productId: "7", waveNumber: 0, seatPrice: 30, totalSeats: 25, seatsSold: 19, status: "active", isWaveZero: true },
    ],
    totalSeats: 25,
    totalSeatsSold: 19,
  },
];

export const mySeats: Seat[] = [
  {
    id: "s1",
    serialNumber: "KS-2026-00001",
    productId: "1",
    productName: "COMMAND",
    waveNumber: 1,
    purchasePrice: 2400,
    escrowStatus: "released",
    purchasedAt: "2026-02-15",
  },
  {
    id: "s2",
    serialNumber: "KS-2026-00034",
    productId: "3",
    productName: "Instruct",
    waveNumber: 1,
    purchasePrice: 480,
    escrowStatus: "pending",
    purchasedAt: "2026-03-01",
  },
];

export const categories = [
  { slug: "all", label: "All", count: products.length },
  { slug: "ai-governance", label: "AI Governance", count: 1 },
  { slug: "ai-agents", label: "AI Agents", count: 1 },
  { slug: "ai-ml", label: "AI & Machine Learning", count: 1 },
  { slug: "developer-tools", label: "Developer Tools", count: 2 },
  { slug: "design-creative", label: "Design & Creative", count: 1 },
  { slug: "infrastructure", label: "Infrastructure & DevOps", count: 1 },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getActiveWave(product: Product) {
  return product.waves.find((w) => w.status === "active");
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.productScore && p.productScore >= 8);
}

export function getHotProducts(): Product[] {
  return products.filter((p) => {
    const active = getActiveWave(p);
    if (!active) return false;
    const fillRate = active.seatsSold / active.totalSeats;
    return fillRate >= 0.7 && active.status === "active";
  });
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.status === "wave_zero" && p.totalSeatsSold < 10);
}
