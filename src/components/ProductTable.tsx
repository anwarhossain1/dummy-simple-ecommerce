"use client";
import { Product } from "@/hooks/useProducts";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="products table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "background.default" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              component={Link}
              href={`/products/${product.slug}`}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
                transition: "background-color 0.2s",
                textDecoration: "none",
                color: "inherit",
                display: "table-row",
              }}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ position: "relative", width: 60, height: 60 }}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  </Box>
                  <Typography>{product.title}</Typography>
                </Box>
              </TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell align="right">${product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
