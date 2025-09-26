import { ReactNode } from "react";

export interface Creator {
  likes: ReactNode;
  id: number;
  name: string;
  rating: number;
  price: number;
  isAd: boolean;
  image: string;
  type: string;
}
