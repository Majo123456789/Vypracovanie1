export interface Offer {
  title: string;
  description: string;
  price: number;
}

export interface BazosFilters {
  title?: string | null;
  description?: string | null;
  minPrice?: number | null; // New property for minimum price
  maxPrice?: number | null; // New property for maximum price
}

