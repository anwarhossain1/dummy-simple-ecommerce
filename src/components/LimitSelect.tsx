"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface LimitSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const LimitSelect = ({ value, onChange }: LimitSelectProps) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange(event.target.value as number);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="limit-select-label">Items per page</InputLabel>
      <Select
        labelId="limit-select-label"
        id="limit-select"
        value={value}
        label="Items per page"
        onChange={handleChange}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LimitSelect;
