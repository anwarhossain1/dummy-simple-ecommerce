"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to our store
      </Typography>
      <Button variant="contained" startIcon={<ShoppingCartIcon />}>
        Start Shopping
      </Button>
    </Container>
  );
}
