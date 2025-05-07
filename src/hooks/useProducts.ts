"use client";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  slug: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
