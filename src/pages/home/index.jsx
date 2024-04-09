import React, { useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import Rating from '@/components/rating/rating';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/cartContext';
import { useProducts } from '../../context/productsContext';

function Home() {
  const isMounted = useRef(false);
  const {
    productsState: { products },
  } = useProducts();

  const { addCartItem, cartState, updateCartItem, deleteCartItem } = useCart();

  useEffect(() => {
    if (isMounted.current) {
      toast('Event has been created.');
    }
  }, [cartState.error]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 ">
        {products.map(product => {
          const cartItem = cartState?.cart?.products?.find(
            x => x.productId === product.id,
          );

          const isLoading = cartState.loading.some(x => x.id === product.id);

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
                <Rating
                  rate={product.rating.rate}
                  count={product.rating.count}
                />
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                    disabled={isLoading}
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
    </>
  );
}

export default Home;
