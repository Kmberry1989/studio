import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IdentifyPartFromImageOutput } from "@/ai/flows/identify-part-from-image";

interface PartResultsImageProps {
  result: IdentifyPartFromImageOutput;
}

export function PartResultsImage({ result }: PartResultsImageProps) {
  return (
    <div className="space-y-4 animate-fade-in">
        <h3 className="text-lg font-semibold">Identification Results</h3>
        <Card>
            <CardHeader>
                <CardTitle>Identified Part Number</CardTitle>
                <CardDescription>The part number our AI detected from the image.</CardDescription>
            </CardHeader>
            <CardContent>
                {result.partNumber ? (
                    <Badge variant="secondary" className="text-lg font-mono py-1 px-3">{result.partNumber}</Badge>
                ) : (
                    <p className="text-muted-foreground">No specific part number identified.</p>
                )}
            </CardContent>
        </Card>
        
        {result.potentialMatches && result.potentialMatches.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>Potential Matches</CardTitle>
                    <CardDescription>These parts may be what you're looking for.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {result.potentialMatches.map((match, index) => (
                            <Badge key={index} variant="outline">{match}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
