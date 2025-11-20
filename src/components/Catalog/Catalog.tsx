'use client';

import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { useCarsStore } from "@/store/useCarsStore";
import styles from "./Catalog.module.css";



type Car = {
  brand?: string;
  id: string;
  make?: string;            
  model?: string;
  year?: number;
  rentalPrice?: string;
  img?: string;
  address?: string;
  rentalCompany?: string;
  company?: string;
  type?: string;
  mileage?: number;
};


export default function Catalog() {
  const { cars, isLoading, error, fetchCars, favorites, toggleFavorite, page, totalPages } = useCarsStore();

  useEffect(() => {
    fetchCars(false);
  }, []);

  const handleLoadMore = () => {
    fetchCars(true); 
  };


  return (
    <main className={styles.catalog}>
      <div className={styles.grid}>
        {cars.map((car: Car) => {
            const brand = car.brand || "";
            const model = car.model || "";
            const year = car.year ?? "";
            const price = car.rentalPrice || "—";
            const company = car.rentalCompany || car.company || "";

            const addressParts = car.address?.split(", ") || [];
            const city = addressParts[addressParts.length - 2] || "";
            const country = addressParts[addressParts.length - 1] || "";
            const addressWithCompany = [city, country, company].filter(Boolean).join(" | ");

          const typeText = car.type || "—";
          const mileageText = car.mileage !== undefined ? `${car.mileage} km` : "km";
          const typeMileage = [typeText, mileageText].join(" | ");
          const imgSrc = car.img || "/images/placeholder-car.jpg";

          return (
            <article key={car.id} className={styles.card}>
                 <div className={styles.imageWrap}>
                <Image
                  src={imgSrc}
                  alt={`${brand} ${model}`}
                  width={401}
                  height={268}
                  className={styles.image}
                />
                <button
                  className={`${styles.favoriteBtn} ${favorites.includes(car.id) ? styles.active : ""}`}
                  onClick={() => toggleFavorite(car.id)}
                  aria-pressed={favorites.includes(car.id)}
                  title="Toggle favorite"
                >
                  💙
                </button>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                  <div className={styles.nameGroup}> 
                  <span className={styles.brand}> {brand}</span>
                  <span className={styles.model}> {model},</span>
                  <span className={styles.year}> {year}</span>
                  </div>
                  <div className={styles.price}>${price}</div>
                </div>

                <div className={styles.rowFirst}>
                  <p className={styles.address}>{addressWithCompany}</p>
                </div>

                <div className={styles.rowSecond}>
                  <span className={styles.typeMileage}>{typeMileage}</span>
                </div>

                <div className={styles.actions}>
                  <Link href={`/catalog/${car.id}`} className={styles.button}>
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && page < totalPages && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}

      {isLoading && <p className={styles.loader}>Loading...</p>}
 
    </main>
  );
}

            