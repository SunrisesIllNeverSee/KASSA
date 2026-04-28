export type WaveStatus = "upcoming" | "active" | "sold_out" | "refunded";
export type ProductStatus = "draft" | "in_review" | "wave_zero" | "active" | "paused" | "completed";
export type Trend = "rising" | "steady" | "cooling";
export type EscrowStatus = "held" | "pending" | "released" | "refunded";
export type CascadeType = "saas" | "enterprise";

export interface Wave {
  id: string;
  productId: string;
  waveNumber: number;
  seatPrice: number;
  totalSeats: number;
  seatsSold: number;
  status: WaveStatus;
  isWaveZero: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  founderName: string;
  founderCompany: string;
  founderVerified: boolean;
  description: string;
  descriptionShort: string;
  category: string;
  cascadeType: CascadeType;
  waveZeroCleared: boolean;
  waveZeroPrice: number;
  productScore: number | null;
  trend: Trend;
  status: ProductStatus;
  waves: Wave[];
  totalSeats: number;
  totalSeatsSold: number;
}

export interface Seat {
  id: string;
  serialNumber: string;
  productId: string;
  productName: string;
  waveNumber: number;
  purchasePrice: number;
  escrowStatus: EscrowStatus;
  purchasedAt: string;
}
