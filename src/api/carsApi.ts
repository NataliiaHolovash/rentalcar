import axios from "axios";

export const BASE_URL = "https://car-rental-api.goit.global";

export const getCarsListUrl = (page = 1, limit = 12) =>
  `${BASE_URL}/cars?page=${page}&limit=${limit}`;

export const fetchCars = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(getCarsListUrl(page, limit));
    return response.data; 
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

