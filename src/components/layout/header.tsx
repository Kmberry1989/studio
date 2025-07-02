import { Wrench } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wrench className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PartSnap</h1>
        </div>
        <div>
          <Image
            src="https://i.imgur.com/6DK6Ibu.png"
            alt="PartSnap Mascot"
            width={50}
            height={50}
            className="rounded-full object-cover"
            data-ai-hint="smiling man"
          />
        </div>
      </div>
    </header>
  );
}
