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
    <TableContainer
      sx={{
        mt: 2,
        height: "65vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.15)",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.25)",
          },
        },
        "& .MuiTableContainer-root": {
          overflow: "auto",
        },
        "& thead th": {
          position: "sticky",
          top: 0,
          backgroundColor: "background.default",
          zIndex: 1,
        },
      }}
    >
      <Table
        sx={{
          minWidth: { xs: "100%", sm: 650 },
          "& td, & th": {
            whiteSpace: "nowrap",
          },
        }}
        stickyHeader
        aria-label="products table"
      >
        <TableHead>
          <TableRow>
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
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "action.hover",
                },
                transition: "background-color 0.2s",
              }}
            >
              <TableCell>
                <Link
                  href={`/products/${product.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
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
                </Link>
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
