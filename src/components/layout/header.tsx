"use client";

import { Wrench, LogIn, LogOut, Car, Home, Search } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export function Header() {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  const userInitial = user?.email?.charAt(0).toUpperCase() || '?';

  return (
    <header className="bg-card border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Wrench className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">PartSnap</h1>
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-10 w-24" />
          ) : user ? (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/search">
                  <Search className="mr-2" />
                  Search
                </Link>
              </Button>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/house">
                  <Home className="mr-2" />
                  House
                </Link>
              </Button>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/garage">
                  <Car className="mr-2" />
                  Garage
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User avatar'} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild className="md:hidden">
                     <Link href="/search">
                      <Search className="mr-2 h-4 w-4" />
                      <span>Search</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild className="md:hidden">
                     <Link href="/house">
                      <Home className="mr-2 h-4 w-4" />
                      <span>House</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild className="md:hidden">
                    <Link href="/garage">
                      <Car className="mr-2 h-4 w-4" />
                      <span>Garage</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="md:hidden"/>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={signInWithGoogle}>
              <LogIn className="mr-2" />
              Login with Google
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
