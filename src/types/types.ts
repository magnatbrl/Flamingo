export interface Room {
  id: number;
  number: string;
  type: string;
  beds: Bed[];
  description: string;
  image: string;
  price: number;
}

export interface Bed {
  id: number;
  number: string;
  type: string;
  price: number;
  roomId: number;
}

export interface CartItemBed {
  id: number;
  entryDate: string;
  departureDate: string;
  bed: Bed;
  cartId: number;
}
