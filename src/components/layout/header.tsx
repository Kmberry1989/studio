import { Wrench } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center gap-3">
          <Wrench className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">PartSnap</h1>
        </div>
      </div>
    </header>
  );
}
