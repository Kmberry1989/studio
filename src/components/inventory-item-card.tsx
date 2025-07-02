"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Wrench, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

export interface InventoryItem {
    name: string;
    category: string;
    imageUrl: string;
    parts: { name: string; partNumber: string; }[];
    manuals: { name:string; url: string; }[];
}

interface InventoryItemCardProps {
    item: InventoryItem;
}

export function InventoryItemCard({ item }: InventoryItemCardProps) {
    return (
        <Card className="bg-card/50">
            <CardHeader className="p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                        data-ai-hint="vehicle appliance"
                    />
                    <div className="flex-grow">
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{item.category}</Badge>
                    </div>
                </div>
            </CardHeader>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="parts">
                    <AccordionTrigger className="px-4 text-base">
                        <div className="flex items-center gap-2">
                            <Wrench className="h-5 w-5" />
                            Saved Parts ({item.parts.length})
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        {item.parts.length > 0 ? (
                            <ul className="space-y-2">
                                {item.parts.map((part, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                                        <div>
                                            <p className="font-semibold">{part.name}</p>
                                            <p className="text-muted-foreground font-mono">{part.partNumber}</p>
                                        </div>
                                        <Button variant="outline" size="sm">Find</Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No parts saved yet.</p>
                        )}
                         <Button variant="ghost" className="w-full mt-2 text-primary">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add a Part
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="manuals">
                    <AccordionTrigger className="px-4 text-base">
                        <div className="flex items-center gap-2">
                            <Book className="h-5 w-5" />
                            Manuals & Guides ({item.manuals.length})
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       {item.manuals.length > 0 ? (
                            <ul className="space-y-2">
                                {item.manuals.map((manual, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                                        <p className="font-semibold">{manual.name}</p>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={manual.url} target="_blank">View</Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No manuals found.</p>
                        )}
                        <Button variant="ghost" className="w-full mt-2 text-primary">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add a Manual
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
