import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

const emailSchema = z.object({ email: z.string().email('Email inválido') })
const passwordSchema = z
    .object({ password: z.string(), confirm: z.string() })
    .refine(data => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(data.password), {
        message: 'Senha precisa ter ≥8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 especial',
        path: ['password'],
    })
    .refine(data => data.password === data.confirm, {
        message: 'As senhas devem coincidir',
        path: ['confirm'],
    })

type EmailFormValues = z.infer<typeof emailSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

export function FirstAccessPage() {
    const [step, setStep] = useState<'email' | 'password'>('email')
    const [uid, setUid] = useState('')
    const [serverError, setServerError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()

    const emailForm = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '' },
    })

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: '', confirm: '' },
    })

    useEffect(() => {
        emailForm.reset()
        passwordForm.reset()
    }, [step])

    async function onEmailSubmit(values: EmailFormValues) {
        setServerError(null)
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/first-access`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                }
            )
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setUid(data.uidMSK)
            setStep('password')
        } catch (err: any) {
            setServerError(err.message)
        }
    }

    async function onPasswordSubmit(values: PasswordFormValues) {
        setServerError(null)
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/colaborador/${uid}/password`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: values.password })
                }
            )
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success('Senha registrada com sucesso!')
            navigate('/', { replace: true })
        } catch (err: any) {
            setServerError(err.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">
                        {step === 'email' ? 'Primeiro Acesso' : 'Defina sua Senha'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {serverError && <p className="text-sm text-destructive mb-4">{serverError}</p>}

                    {step === 'email' ? (
                        <Form {...emailForm} key="email">
                            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                                <FormField
                                    control={emailForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Corporativo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="seu.email@empresa.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Continuar</Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...passwordForm} key="password">
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                <FormField
                                    control={passwordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
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
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
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
                                                    >
                                                        {showConfirm ? (
                                                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Criar Senha</Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
                <div className="px-6 pb-6 text-center">
                    <Button variant="link" onClick={() => navigate('/')} className="text-sm hover:underline">
                        Voltar ao Login
                    </Button>
                </div>
            </Card>
        </div>
    )
}