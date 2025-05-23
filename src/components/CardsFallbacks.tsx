import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="relative">
        <CardDescription>
          <Skeleton className="h-4 w-40" />
        </CardDescription>
        <CardTitle className="text-2xl font-semibold">
          <Skeleton className="h-8 w-24" />
        </CardTitle>
      </CardHeader>
      <CardFooter className="text-sm text-muted-foreground">
        <Skeleton className="h-3 w-32" />
      </CardFooter>
    </Card>
  );
}

export function CardErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <Card className="border border-red-500">
      <CardHeader className="flex items-start space-x-2">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <div>
          <CardTitle className="text-red-600">Erro ao carregar os dados</CardTitle>
          <CardDescription className="text-red-600">
            Tente novamente mais tarde.
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" onClick={resetErrorBoundary} className="border-red-500">
          Tente novamente
        </Button>
      </CardFooter>
    </Card>
  );
}