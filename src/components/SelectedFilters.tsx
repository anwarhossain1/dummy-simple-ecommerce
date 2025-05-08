import { Box, Chip } from "@mui/material";

interface SelectedFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (ranges: string[]) => void;
}

export default function SelectedFilters({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRanges,
  setSelectedPriceRanges,
}: SelectedFiltersProps) {
  const handleDeleteCategory = (categoryToDelete: string) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== categoryToDelete)
    );
  };

  const handleDeletePriceRange = (rangeToDelete: string) => {
    setSelectedPriceRanges(
      selectedPriceRanges.filter((range) => range !== rangeToDelete)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: 1,
        mt: 2,
        mb: 2,
      }}
    >
      {selectedCategories.map((category) => (
        <Chip
          key={category}
          label={category}
          onDelete={() => handleDeleteCategory(category)}
          color="primary"
          variant="outlined"
        />
      ))}
      {selectedPriceRanges.map((range) => (
        <Chip
          key={range}
          label={`$${range}`}
          onDelete={() => handleDeletePriceRange(range)}
          color="secondary"
          variant="outlined"
        />
      ))}
    </Box>
  );
}
