import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MountainIcon, ShoppingCartIcon } from 'lucide-react';
import { useAuth } from '../context/authContext';

function DashboardLayout() {
  const { user } = useAuth();

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
        <Button className="ml-auto" size="icon" variant="outline">
          <ShoppingCartIcon className="h-4 w-4" />
          <span className="sr-only">Open cart</span>
        </Button>
      </header>
      <main className="m-4">
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
