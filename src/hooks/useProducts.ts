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
  handleSearchedProducts: (searchTerm: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export const useProducts = (): UseProductsReturn => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0); // Add offset state
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/products?offset=${offset}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setAllProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, offset]);

  const handleSearchedProducts = (searchTerm: string) => {
    console.log(searchTerm);
    if (!searchTerm) return setProducts(allProducts);
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };
  return {
    products,
    loading,
    error,
    handleSearchedProducts,
    offset,
    setOffset,
    limit,
    setLimit,
  };
};
