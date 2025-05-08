"use client";
import Filter from "@/components/Filter";
import LimitSelect from "@/components/LimitSelect";
import ProductTable from "@/components/ProductTable";
import SearchInput from "@/components/SearchInput";
import SelectedFilters from "@/components/SelectedFilters";
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
import { useState } from "react";

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

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

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category.name)
      );
    }

    if (selectedPriceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        return selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          if (max) {
            return product.price >= min && product.price <= max;
          } else {
            return product.price >= min;
          }
        });
      });
    }
    return filteredProducts;
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h5" gutterBottom fontWeight={"bold"}>
        Product List
      </Typography>
      <SelectedFilters
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedPriceRanges={selectedPriceRanges}
        setSelectedPriceRanges={setSelectedPriceRanges}
      />
      <Grid
        container
        spacing={1}
        component={Paper}
        sx={{
          p: 2,
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <SearchInput
            placeholder="Search products by title/description..."
            onSearch={(value) => {
              handleSearchedProducts(value);
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Sorting handleSorting={handleSorting} />
          <Filter
            products={products}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedPriceRanges={selectedPriceRanges}
            setSelectedPriceRanges={setSelectedPriceRanges}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ProductTable products={getFilteredProducts()} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LimitSelect value={limit} onChange={(value) => setLimit(value)} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
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
