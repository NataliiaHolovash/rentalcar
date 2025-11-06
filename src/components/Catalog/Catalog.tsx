'use client';

import { useEffect } from "react";
import Image from "next/image";
import { useCarsStore } from "@/store/useCarsStore";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const { cars, isLoading, error, fetchCars, favorites, toggleFavorite } = useCarsStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (isLoading) return <p className={styles.loading}>Loading cars...</p>;
  if (error) return <p className={styles.error}>❌ {error}</p>;

  return (
    <main className={styles.catalog}>
      <h1 className={styles.title}>Car Catalog</h1>
      <div className={styles.grid}>
        {cars.map((car) => (
          <div key={car.id} className={styles.card}>
            <Image
              src={car.img}
              alt={`${car.make} ${car.model}`}
              width={300}
              height={200}
              className={styles.image}
            />
            <h2 className={styles.name}>
              {car.make} {car.model}
            </h2>
            <p className={styles.details}>
              {car.year} • {car.type}
            </p>
            <p className={styles.price}>{car.rentalPrice}</p>
            <button
              className={`${styles.favoriteBtn} ${
                favorites.includes(car.id) ? styles.active : ""
              }`}
              onClick={() => toggleFavorite(car.id)}
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
