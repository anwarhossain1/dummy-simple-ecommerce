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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <TableContainer
        sx={{
          mt: 2,
          height: "65vh",
          minWidth: isMobile ? "auto" : 650,
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
        }}
      >
        <Table
          sx={{
            width: "100%",
            "& td, & th": {
              whiteSpace: isMobile ? "normal" : "nowrap",
              py: isMobile ? 1 : 2,
              px: isMobile ? 1 : 3,
            },
          }}
          stickyHeader
          aria-label="products table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", minWidth: isMobile ? 150 : 200 }}
              >
                Product
              </TableCell>
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
                  cursor: "pointer",
                }}
              >
                <TableCell>
                  <Link
                    href={`/products/${product.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? 1 : 2,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: isMobile ? 40 : 60,
                          height: isMobile ? 40 : 60,
                        }}
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                        />
                      </Box>
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        {product.title}
                      </Typography>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/products/${product.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      {product.category.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link
                    href={`/products/${product.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      ${product.price}
                    </Typography>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
