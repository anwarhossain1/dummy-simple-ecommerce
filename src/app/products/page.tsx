"use client";
import ProductTable from "@/components/ProductTable";
import SearchInput from "@/components/SearchInput";
import { useProducts } from "@/hooks/useProducts";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const Index = () => {
  const { products, loading, error, handleSearchedProducts } = useProducts();

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h5" gutterBottom fontWeight={"bold"}>
        Product List
      </Typography>
      <Grid
        container
        spacing={2}
        component={Paper}
        sx={{ p: 2, bgcolor: "white", mt: 2 }}
      >
        <Grid size={{ xs: 6 }}>
          {" "}
          <SearchInput
            placeholder="Search products by title/desription..."
            onSearch={(value) => {
              handleSearchedProducts(value);
            }}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>filter</Grid>
        <Grid size={{ xs: 12 }}>
          <ProductTable products={products} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
