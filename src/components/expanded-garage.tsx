"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Car, PlusCircle } from "lucide-react";
import { InventoryItemCard, type InventoryItem } from "./inventory-item-card";

interface ExpandedGarageProps {
    onClose: () => void;
}

const mockGarageItems: InventoryItem[] = [
    {
        name: "2021 Ford F-150",
        category: "Truck",
        imageUrl: "https://placehold.co/200x200.png",
        parts: [
            { name: "Oil Filter", partNumber: "FL-500S" },
            { name: "Brake Pads - Front", partNumber: "BR-1477-B" },
        ],
        manuals: [{ name: "Owner's Manual", url: "#" }],
    },
    {
        name: "2019 Honda Civic",
        category: "Sedan",
        imageUrl: "https://placehold.co/200x200.png",
        parts: [],
        manuals: [],
    }
];


export function ExpandedGarage({ onClose }: ExpandedGarageProps) {
    return (
        <Card className="w-full max-w-7xl animate-fade-in">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Car className="h-8 w-8 text-primary" />
                            <CardTitle className="text-4xl">My Garage</CardTitle>
                        </div>
                        <CardDescription>Manage your saved vehicles and equipment.</CardDescription>
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
                            alt="PartSnap Mascot in Garage"
                            width={150}
                            height={240}
                            data-ai-hint="smiling man"
                            className="drop-shadow-2xl mx-auto"
                        />
                    </div>
                    
                    {/* Inventory List */}
                    <div className="flex-grow md:w-3/4 space-y-4">
                        {mockGarageItems.map(item => <InventoryItemCard key={item.name} item={item} />)}
                        <Button variant="outline" className="w-full py-6 border-dashed">
                             <PlusCircle className="mr-2" />
                            Add Vehicle or Equipment
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
