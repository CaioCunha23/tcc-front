import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

export function ChartInfracoesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
    </Card>
  );
}

export function ChartInfracoesErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <Card className="border border-red-500">
      <CardHeader className="flex items-start space-x-2">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <div>
          <CardTitle className="text-red-600">Erro ao carregar gráfico</CardTitle>
          <CardDescription className="text-red-600">
            Não foi possível carregar os dados
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={resetErrorBoundary} className="border-red-500">
          Tentar novamente
        </Button>
      </CardContent>
    </Card>
  );
}