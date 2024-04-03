import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Rating from '@/components/rating/rating';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/cartContext';
import { useProducts } from '../../context/productsContext';

function Home() {
  const {
    productsState: { products, loading, error },
  } = useProducts();

  const { addCartItem, cartState, updateCartItem, deleteCartItem } = useCart();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 ">
      {products.map(product => {
        const cartItem = cartState?.cart?.products?.find(
          x => x.productId === product.id,
        );
        return (
          <Card key={product.id} className="aspect-vrect overflow-hidden">
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
              {cartItem ? (
                <div className="flex w-full">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (cartItem.quantity < 10) {
                        updateCartItem({
                          ...cartItem,
                          quantity: cartItem.quantity + 1,
                        });
                      } else {
                        alert('you can buy max 10 items');
                      }
                    }}
                  >
                    +
                  </Button>
                  <p className="flex-1 text-2xl font-bold text-center">
                    {cartItem.quantity}
                  </p>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (cartItem.quantity > 1) {
                        updateCartItem({
                          ...cartItem,
                          quantity: cartItem.quantity - 1,
                        });
                      } else {
                        deleteCartItem(cartItem);
                      }
                    }}
                  >
                    -
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    addCartItem({ productId: product.id, quantity: 1 })
                  }
                >
                  Add To Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default Home;
