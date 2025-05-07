'use client';
import { Button, Container, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to our store
      </Typography>
      <Button variant="contained" startIcon={<ShoppingCartIcon />}>
        Start Shopping
      </Button>
    </Container>
  );
}