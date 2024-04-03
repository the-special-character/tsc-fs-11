import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MountainIcon, ShoppingCartIcon } from 'lucide-react';
import { useAuth } from '../context/authContext';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '../context/cartContext';
import { useProducts } from '../context/productsContext';

function DashboardLayout() {
  const { user } = useAuth();
  const {
    cartState: { cart },
    deleteCartItem,
  } = useCart();
  const {
    productsState: { products },
  } = useProducts();

  console.log(user);

  if (!user) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      <header className="flex items-center h-14 px-4 border-b bg-gray-100 dark:bg-gray-800">
        <Link className="mr-4" href="#logo">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="flex-1 justify-center hidden md:flex">
          <Link className="mx-2 font-medium" href="#features">
            Features
          </Link>
          <Link className="mx-2 font-medium" href="#pricing">
            Pricing
          </Link>
          <Link className="mx-2 font-medium" href="#docs">
            Docs
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-auto" size="icon" variant="outline">
              <ShoppingCartIcon className="h-4 w-4" />
              <span className="sr-only">Open cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart?.products?.map(cartItem => {
                    const product = products.find(
                      x => x.id === cartItem.productId,
                    );
                    return (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">
                                {Intl.NumberFormat('en-IN', {
                                  currency: 'INR',
                                  style: 'currency',
                                }).format(product.price * cartItem.quantity)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Qty {cartItem.quantity}
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => deleteCartItem(cartItem)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <SheetFooter>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$262.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <a
                    href="#checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </a>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <SheetClose asChild>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </SheetClose>
                  </p>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>
      <main className="m-4">
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
