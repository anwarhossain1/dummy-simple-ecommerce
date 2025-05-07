"use client";
import { Clear, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchInput = ({
  placeholder = "Search...",
  onSearch,
}: SearchInputProps) => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <Clear />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default SearchInput;
