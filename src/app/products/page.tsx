"use client";
import LimitSelect from "@/components/LimitSelect";
import ProductTable from "@/components/ProductTable";
import SearchInput from "@/components/SearchInput";
import Sorting from "@/components/Sorting";
import { useProducts } from "@/hooks/useProducts";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";

const Index = () => {
  const {
    products,
    loading,
    error,
    handleSearchedProducts,
    offset,
    setOffset,
    limit,
    setLimit,
    handleSorting,
  } = useProducts();

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
  const totalPages = Math.ceil(50 / limit);

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
            placeholder="Search products by title/description..."
            onSearch={(value) => {
              handleSearchedProducts(value);
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Sorting handleSorting={handleSorting} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ProductTable products={products} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <LimitSelect value={limit} onChange={(value) => setLimit(value)} />
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Pagination
            count={totalPages}
            page={offset + 1}
            onChange={(_, newPage) => setOffset(newPage - 1)}
            color="primary"
            shape="rounded"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
