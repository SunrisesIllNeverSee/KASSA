export type WaveStatus = "upcoming" | "active" | "sold_out";
export type ProductStatus = "active" | "completed";
export type CascadeType = "saas" | "enterprise";

export interface Wave {
  id: string;
  productId: string;
  waveNumber: number;
  seatPrice: number;
  totalSeats: number;
  seatsSold: number;
  status: WaveStatus;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  founderName: string;
  founderContact: string;
  description: string;
  descriptionShort: string;
  category: string;
  cascadeType: CascadeType;
  productUrl: string;
  status: ProductStatus;
  waves: Wave[];
  totalSeats: number;
  totalSeatsSold: number;
}
