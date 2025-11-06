export const BASE_URL = "https://car-rental-api.goit.global/api-docs/#/Cars/getCarsList";

export const getCarsListUrl = (page = 1, limit = 12) =>
  `${BASE_URL}/cars?page=${page}&limit=${limit}`;
