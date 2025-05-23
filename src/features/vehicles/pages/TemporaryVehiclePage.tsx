import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { QrReader } from 'react-qr-reader';

const vehicleUseSchema = z.object({
  vehicleId: z.string().nonempty('QR Code do veículo é obrigatório'),
});
type FormValues = z.infer<typeof vehicleUseSchema>;

export function TemporaryVehiclePage() {
  const [scanning, setScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(vehicleUseSchema),
    defaultValues: { vehicleId: '' },
  });

  const handleScan = (data: string | null) => {
    if (data) {
      form.setValue('vehicleId', data);
      setScanning(false);
      setErrorMsg(null);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    setErrorMsg('Não foi possível acessar a câmera. Verifique as permissões e se você está em HTTPS.');
    setScanning(false);
  };

  const onSubmit = (values: FormValues) => {
     // POST para criar histórico de uso
    console.log('Registrando uso do veículo ID:', values.vehicleId);
  };

  return (
    <div className="p-8 flex flex-col w-full items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Uso de Carro Temporário</CardTitle>
        </CardHeader>
        <CardContent>
          {!scanning && !form.getValues('vehicleId') && (
            <Button onClick={() => { setErrorMsg(null); setScanning(true); }} className="w-full">
              Registrar uso de carro temporário
            </Button>
          )}

          {errorMsg && (
            <p className="text-sm text-red-600 mb-4 text-center">{errorMsg}</p>
          )}

          {scanning && (
            <div className="flex flex-col items-center">
              <div className="scanner-wrapper w-full h-64 overflow-hidden rounded-lg mb-2">
                <QrReader
                  constraints={{ facingMode: 'environment' }}
                  scanDelay={500}
                  onResult={(result, error) => {
                    if (error) handleError(error);
                    else if (result) handleScan(result.getText());
                  }}
                  videoStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <Button variant="outline" onClick={() => setScanning(false)}>
                Cancelar leitura
              </Button>
            </div>
          )}

          {form.getValues('vehicleId') && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="vehicleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID do Veículo</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Confirmar Uso
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
