import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FindPartsOutput } from "@/ai/flows/find-parts-flow";
import { Badge } from "./ui/badge";
import { Book, DollarSign, Link as LinkIcon, Tag, Truck, Wrench } from "lucide-react";

interface PartResultsAdvancedProps {
  result: FindPartsOutput;
}

export function PartResultsAdvanced({ result }: PartResultsAdvancedProps) {
  const { parts, manuals } = result;
  const hasResults = (parts && parts.length > 0) || (manuals && manuals.length > 0);

  if (!hasResults) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p>No results found for your query.</p>
        <p className="text-sm">Try adjusting your search terms or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {parts && parts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Part Results</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parts.map((part, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{part.name}</CardTitle>
                  <CardDescription>{part.brand}{part.partNumber && ` - ${part.partNumber}`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground"/> <span>Price: <span className="font-semibold">{part.price}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4 text-muted-foreground"/> <span>Type: <Badge variant={part.type === 'OEM' ? "default" : "secondary"}>{part.type}</Badge></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-muted-foreground"/> <span>Delivery: <span className="font-semibold">{part.delivery}</span></span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                    <a 
                        href={part.source.startsWith('http') ? part.source : `https://www.google.com/search?q=${encodeURIComponent(part.source)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                        <LinkIcon className="h-4 w-4" />
                        <span>View Source</span>
                    </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {manuals && manuals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Manual Results</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {manuals.map((manual, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{manual.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{manual.description}</p>
                   <a 
                        href={manual.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                        <LinkIcon className="h-4 w-4" />
                        <span>View Manual</span>
                    </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
