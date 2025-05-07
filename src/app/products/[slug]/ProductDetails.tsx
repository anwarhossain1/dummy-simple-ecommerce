"use client";
import { Product } from "@/hooks/useProducts";
import { Container } from "@mui/material";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return <Container maxWidth="lg">{product.slug}</Container>;
};

export default ProductDetails;
