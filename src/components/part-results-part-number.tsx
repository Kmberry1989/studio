import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Link as LinkIcon } from "lucide-react";
import type { CrossReferencePartNumbersOutput } from "@/ai/flows/cross-reference-part-numbers";

interface PartResultsPartNumberProps {
  result: CrossReferencePartNumbersOutput;
}

const renderList = (title: string, items: string[]) => {
    if (!items || items.length === 0) return null;
    return (
        <div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="font-mono">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function PartResultsPartNumber({ result }: PartResultsPartNumberProps) {
  const noResults = !result.compatibleParts.length && !result.equivalentParts.length && !result.alternativeVendors.length;

  return (
    <div className="space-y-4 animate-fade-in">
        <h3 className="text-lg font-semibold">Cross-Reference Results</h3>
        <Card>
            <CardHeader>
                <CardTitle>Part Analysis</CardTitle>
                {result.unavailableOriginalPart && (
                    <Badge variant="destructive" className="w-fit">Original Part May Be Unavailable</Badge>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {noResults && <p className="text-muted-foreground">No cross-reference information found.</p>}
                
                {renderList("Compatible Parts", result.compatibleParts)}
                
                {result.compatibleParts.length > 0 && result.equivalentParts.length > 0 && <Separator />}
                
                {renderList("Equivalent Parts", result.equivalentParts)}
                
                {(result.compatibleParts.length > 0 || result.equivalentParts.length > 0) && result.alternativeVendors.length > 0 && <Separator />}

                {result.alternativeVendors && result.alternativeVendors.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2">Alternative Vendors</h4>
                        <ul className="space-y-1 text-sm">
                            {result.alternativeVendors.map((vendor, index) => (
                                <li key={index}>
                                    <a 
                                        href={`https://www.google.com/search?q=${encodeURIComponent(vendor)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-primary hover:underline"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                        <span>{vendor}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
