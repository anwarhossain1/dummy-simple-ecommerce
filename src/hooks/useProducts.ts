"use client";
import { SortField } from "@/components/Sorting";
import { SortDirection } from "@mui/material";
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
  handleSorting: (sortField: SortField, sortDirection: SortDirection) => void;
}

const getSortedProducts = (
  products: Product[],
  sortField: SortField,
  sortDirection: SortDirection
) => {
  if (sortField === "title") {
    return [...products].sort((a, b) =>
      sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }
  if (sortField === "price") {
    return [...products].sort((a, b) =>
      sortDirection === "asc" ? a.price - b.price : b.price - a.price
    );
  }
  return products;
};

export const useProducts = (): UseProductsReturn => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [offset, setOffset] = useState(0);
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
        if (data.length > 0) {
          const savedSortField =
            (localStorage.getItem("sortField") as SortField) || "title";
          const savedSortDirection =
            (localStorage.getItem("sortDirection") as SortDirection) || "asc";

          setProducts(
            getSortedProducts(data, savedSortField, savedSortDirection)
          );
          setAllProducts(
            getSortedProducts(data, savedSortField, savedSortDirection)
          );
          return;
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, offset]);

  const handleSearchedProducts = (searchTerm: string) => {
    if (!searchTerm) return setProducts(allProducts);
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleSorting = (
    sortField: SortField,
    sortDirection: SortDirection
  ) => {
    const sortedProducts = [...products].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
    setProducts(sortedProducts);
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
    handleSorting,
  };
};
