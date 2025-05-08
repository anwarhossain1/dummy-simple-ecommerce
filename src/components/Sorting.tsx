"use client";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

export type SortField = "title" | "price";
export type SortDirection = "asc" | "desc";

export default function Sorting({
  handleSorting,
}: {
  handleSorting: (field: SortField, direction: SortDirection) => void;
}) {
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    handleSorting(sortField, sortDirection);
  }, [sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      localStorage.setItem("sortDirection", newDirection);
    } else {
      setSortField(field);
      setSortDirection("asc");
      localStorage.setItem("sortField", field);
      localStorage.setItem("sortDirection", "asc");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 4,
        alignItems: "center",
      }}
    >
      <ButtonGroup variant="outlined" aria-label="sorting options">
        <Button
          variant={sortField === "title" ? "contained" : "outlined"}
          onClick={() => handleSort("title")}
          endIcon={
            sortField === "title" ? (
              sortDirection === "asc" ? (
                <ArrowUpward />
              ) : (
                <ArrowDownward />
              )
            ) : null
          }
        >
          Title
        </Button>

        <Button
          variant={sortField === "price" ? "contained" : "outlined"}
          onClick={() => handleSort("price")}
          endIcon={
            sortField === "price" ? (
              sortDirection === "asc" ? (
                <ArrowUpward />
              ) : (
                <ArrowDownward />
              )
            ) : null
          }
        >
          Price
        </Button>
      </ButtonGroup>
    </Box>
  );
}
