import { create } from "zustand";
import axios from "axios";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  rentalPrice: string;
  img: string;
}

interface CarsState {
  cars: Car[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;

  fetchCars: () => Promise<void>;
  toggleFavorite: (id: string) => void;
}

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  favorites: [],
  isLoading: false,
  error: null,

  fetchCars: async () => {
  set({ isLoading: true, error: null });

  try {
    const { data } = await axios.get("https://car-rental-api.goit.global/cars");

    if (Array.isArray(data.cars)) {
      set({ cars: data.cars, isLoading: false });
    } else {
      console.error("Unexpected API format:", data);
      set({ error: "Unexpected API format", isLoading: false });
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      set({ error: err.message, isLoading: false });
    } else if (err instanceof Error) {
      set({ error: err.message, isLoading: false });
    } else {
      set({ error: "Failed to fetch cars", isLoading: false });
    }
  }
},


  toggleFavorite: (id) => {
    const { favorites } = get();
    if (favorites.includes(id)) {
      set({ favorites: favorites.filter((fav) => fav !== id) });
    } else {
      set({ favorites: [...favorites, id] });
    }
  },
}));
