import {create}  from "zustand";
import axios from "axios";

type Car = {
  id: string;
  brand?: string;
  model?: string;
  year?: number;
  rentalPrice?: string;
  img?: string;
  address?: string;
  rentalCompany?: string;
  company?: string;
  type?: string;
  mileage?: number;
}

type CarsStore = {
  cars: Car[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
   favorites: string[];
  toggleFavorite: (id: string) => void;
  fetchCars: (next?: boolean) => Promise<void>;
};

export const useCarsStore = create<CarsStore>((set, get) => ({
  cars: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  favorites: [],

  toggleFavorite: (id: string) => {
    const current = get().favorites;
    set({ favorites: current.includes(id) ? current.filter(f => f !== id) : [...current, id] });
  },

  fetchCars: async (next = false) => {
    try {
      set({ isLoading: true, error: null });
      const limit = 12;
      const page = next ? get().page + 1 : 1;
      

      const response = await axios.get(
        'https://car-rental-api.goit.global/cars', 
        { params: { page, limit } }
       );

      const data = response.data; 

       console.log("API data:", data);


      if (!data || !Array.isArray(data.cars)) {
        set({ error: "Unexpected API format" });
        return;
      }

      const totalPages = Math.ceil(data.totalCars / limit);

      set({
        cars: next ? [...get().cars, ...data.cars] : data.cars,
        page: Number(data.page),
        totalPages,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error fetching cars",
      });
    } finally {
      set({ isLoading: false });

}
  },
}));
