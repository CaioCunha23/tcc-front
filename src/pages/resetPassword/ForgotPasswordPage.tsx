import { useState } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

const forgotSchema = z.object({
    email: z.string().email('Email inválido'),
})
type ForgotFormValues = z.infer<typeof forgotSchema>

export function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<ForgotFormValues>({
        resolver: zodResolver(forgotSchema),
        defaultValues: { email: '' },
    })

    async function onSubmit(values: ForgotFormValues) {
        setLoading(true)
        try {
            const res = await fetch('${process.env.VITE_BACKEND_URL}forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            if (!res.ok) throw new Error((await res.json()).error)
            toast.success('Se email existir, link de redefinição enviado!')
            navigate('/', { replace: true })
        } catch (err: any) {
            toast.error(err.message || 'Erro ao enviar email')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">Esqueci minha senha</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="seu.email@empresa.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Enviando...' : 'Enviar link'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}