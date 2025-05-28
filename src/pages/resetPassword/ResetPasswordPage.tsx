import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

const resetSchema = z
    .object({
        password: z.string(),
        confirm: z.string(),
    })
    .refine(data => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(data.password), {
        message: 'Senha precisa ter ≥8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 especial',
        path: ['password'],
    })
    .refine(data => data.password === data.confirm, {
        message: 'As senhas devem coincidir',
        path: ['confirm'],
    })

type ResetFormValues = z.infer<typeof resetSchema>

export function ResetPasswordPage() {
    const { token } = useParams<{ token: string }>()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: { password: '', confirm: '' },
    })

    async function onSubmit(values: ResetFormValues) {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}reset-password/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: values.password }),
            })
            if (!res.ok) throw new Error((await res.json()).error)
            toast.success('Senha redefinida com sucesso!')
            navigate('/', { replace: true })
        } catch (err: any) {
            toast.error(err.message || 'Erro ao redefinir senha')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error('Token inválido')
            navigate('/')
        }
    }, [token])

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">Redefinir Senha</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nova Senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Senha"
                                                    {...field}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-2 flex items-center"
                                                    onMouseDown={() => setShowPassword(true)}
                                                    onMouseUp={() => setShowPassword(false)}
                                                    onMouseLeave={() => setShowPassword(false)}
                                                    onTouchStart={() => setShowPassword(true)}
                                                    onTouchEnd={() => setShowPassword(false)}
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirme a Senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirm ? 'text' : 'password'}
                                                    placeholder="Confirmação"
                                                    {...field}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-2 flex items-center"
                                                    onMouseDown={() => setShowConfirm(true)}
                                                    onMouseUp={() => setShowConfirm(false)}
                                                    onMouseLeave={() => setShowConfirm(false)}
                                                    onTouchStart={() => setShowConfirm(true)}
                                                    onTouchEnd={() => setShowConfirm(false)}
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    {showConfirm ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}