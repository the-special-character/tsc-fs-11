import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useProducts } from '../../context/productsContext';
import Rating from '@/components/rating/rating';
import { Button } from '@/components/ui/button';

function Home() {
  const {
    productsState: { products, loading, error },
  } = useProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 ">
      {products.map(product => (
        <Card className="aspect-vrect overflow-hidden">
          <CardHeader>
            <img
              src={product.image}
              alt={product.title}
              className="aspect-square object-contain"
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CardTitle className="line-clamp-1">{product.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
            <Rating rate={product.rating.rate} count={product.rating.count} />
            <p>
              {Intl.NumberFormat('en-IN', {
                currency: 'INR',
                style: 'currency',
              }).format(product.price)}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add To Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Home;
