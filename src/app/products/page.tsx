"use client";
import ProductTable from "@/components/ProductTable";
import { useProducts } from "@/hooks/useProducts";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

const Index = () => {
  const { products, loading, error } = useProducts();

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
      <Paper sx={{ p: 2, bgcolor: "white", mt: 2 }}>
        <ProductTable products={products} />
      </Paper>
    </Container>
  );
};

export default Index;
