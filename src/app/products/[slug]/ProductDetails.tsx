"use client";
import { Product } from "@/hooks/useProducts";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={6} mt={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              width: "100%",
              height: { xs: 200, sm: "350px", md: "400px" },
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Image
              src={product.images?.[0] || "/placeholder-image.jpg"}
              alt={product.title}
              fill
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            pt: { xs: 0, sm: 1 },
          }}
        >
          <Typography variant="h4" fontWeight={"bold"}>
            {product?.title}
          </Typography>
          <Typography variant="h6" fontWeight={"bold"} color="primary.main">
            ${product?.price}
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "text.secondary",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Category
            </Typography>
            <Chip label={product?.category?.name || "-"} />
          </Box>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {product?.description || "-"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
