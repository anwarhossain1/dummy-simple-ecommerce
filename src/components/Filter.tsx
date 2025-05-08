import { Product } from "@/hooks/useProducts";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRanges: string[];
  }) => void;
  products: Product[];
}

const priceRanges = ["0-50", "51-100", "101-200", "201-500", "500+"];

export default function Filter({ onFilterChange, products }: FilterProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState(true);
  const [expandedPrice, setExpandedPrice] = useState(true);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Map(
        products.map((product) => [product.category.id, product.category])
      ).values()
    ).sort((a, b) => a.name.localeCompare(b.name));
    return uniqueCategories;
  }, [products]);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilterChange({
      categories: updatedCategories,
      priceRanges: selectedPriceRanges,
    });
  };

  const handlePriceRangeChange = (range: string) => {
    const updatedPriceRanges = selectedPriceRanges.includes(range)
      ? selectedPriceRanges.filter((r) => r !== range)
      : [...selectedPriceRanges, range];

    setSelectedPriceRanges(updatedPriceRanges);
    onFilterChange({
      categories: selectedCategories,
      priceRanges: updatedPriceRanges,
    });
  };

  const filterContent = (
    <Box sx={{ width: 280, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Categories
          </Typography>
          <IconButton
            onClick={() => setExpandedCategory(!expandedCategory)}
            size="small"
          >
            {expandedCategory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expandedCategory}>
          <FormControl component="fieldset">
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                  }
                  label={category.name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Collapse>
      </Box>

      {/* Price Ranges Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Price Range
          </Typography>
          <IconButton
            onClick={() => setExpandedPrice(!expandedPrice)}
            size="small"
          >
            {expandedPrice ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expandedPrice}>
          <FormControl component="fieldset">
            <FormGroup>
              {priceRanges.map((range) => (
                <FormControlLabel
                  key={range}
                  control={
                    <Checkbox
                      checked={selectedPriceRanges.includes(range)}
                      onChange={() => handlePriceRangeChange(range)}
                    />
                  }
                  label={`$${range}`}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Collapse>
      </Box>
    </Box>
  );

  return (
    <>
      <Button
        variant="text"
        startIcon={<FilterListIcon />}
        onClick={() => setIsDrawerOpen(true)}
        size="small"
        sx={{ width: "100px", height: "38px" }}
      >
        Filters
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {filterContent}
      </Drawer>
    </>
  );
}
