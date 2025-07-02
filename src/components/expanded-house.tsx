"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Home, PlusCircle } from "lucide-react";
import { InventoryItemCard, type InventoryItem } from "./inventory-item-card";

interface ExpandedHouseProps {
    onClose: () => void;
}

export function ExpandedHouse({ onClose }: ExpandedHouseProps) {
    const houseItems: InventoryItem[] = [];

    return (
        <Card className="w-full max-w-7xl animate-fade-in">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Home className="h-8 w-8 text-primary" />
                            <CardTitle className="text-4xl">My House</CardTitle>
                        </div>
                        <CardDescription>Manage your saved home appliances.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Mascot */}
                    <div className="hidden md:block md:w-1/4 flex-shrink-0">
                        <Image
                            src="https://i.imgur.com/XWGTfkV.png"
                            alt="PartSnap Mascot in House"
                            width={150}
                            height={240}
                            data-ai-hint="smiling man"
                            className="drop-shadow-2xl mx-auto"
                        />
                    </div>
                    
                    {/* Inventory List */}
                    <div className="flex-grow md:w-3/4 space-y-4">
                        {houseItems.length > 0 ? (
                            houseItems.map(item => <InventoryItemCard key={item.name} item={item} />)
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-48 bg-muted/50">
                                <p className="text-lg font-medium text-muted-foreground">Your house is empty.</p>
                                <p className="text-sm text-muted-foreground">Click below to add your first appliance.</p>
                            </div>
                        )}
                        <Button variant="outline" className="w-full py-6 border-dashed">
                            <PlusCircle className="mr-2" />
                            Add Appliance
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
