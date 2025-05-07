import { Metadata } from "next";
import ProductDetails from "./ProductDetails";

interface Props {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/products/slug/${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductDetails product={product} />;
}
