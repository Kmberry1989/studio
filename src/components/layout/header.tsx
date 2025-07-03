'use client';

import Link from 'next/link';
import { Wrench, LogIn, LogOut, Car, Home, Search, Zap } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              PartSnap
            </h1>
            <Zap className="w-6 h-6 text-primary" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/search"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Search
            </Link>
            <Link
              href="/garage"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Garage
            </Link>
            <Link
              href="/house"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              House
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* We check if the user exists and is not anonymous before showing profile */}
          {user && !user.isAnonymous ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL ?? ''}
                      alt={user.displayName ?? 'User'}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          'https://placehold.co/40x40/000000/FFFFFF?text=U';
                      }}
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0).toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => useAuth().logout?.()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => useAuth().signInWithGoogle?.()}>Login with Google</Button>
          )}
        </div>
      </div>
    </header>
  );
}
