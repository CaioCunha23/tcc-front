import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useTokenStore } from "@/hooks/useTokenStore";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
    login: z.string().nonempty("Email ou UID é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
    /*password: z.string()
        .nonempty("Senha é obrigatória")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}\-_=+<>.,;:])[A-Za-z\d@$!%*?&()[\]{}\-_=+<>.,;:]{8,}$/,
            "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
        ),*/
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [serverError, setServerError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setToken, setColaborador } = useTokenStore();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        setServerError(null);

        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                setServerError("Falha ao realizar login");
                return;
            }

            const json = await response.json();

            const responseEu = await fetch(`http://localhost:3000/eu`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${json.token}`,
                },
                body: JSON.stringify(data),
            });

            if (!responseEu.ok) {
                setServerError("Erro ao realizar autenticação. Verifique seus dados.");
                return;
            }

            const colaborador = await responseEu.json();

            if (colaborador?.status === false) {
                setServerError(
                    "Sua conta está inativa. Entre em contato com o suporte."
                );
                return;
            }

            localStorage.setItem("token", json.token);
            setToken(json.token);
            setColaborador(colaborador);
            navigate("/home");
        } catch (error) {
            setServerError("Erro na comunicação com o servidor.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login na sua conta</h1>
                <p className="text-muted-foreground text-sm">
                    Insira seu email ou UID abaixo para efetuar login na sua conta.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="login">Email ou UID</Label>
                    <Input
                        id="login"
                        type="text"
                        placeholder="email@maersk.com ou UID"
                        {...register("login")}
                    />
                    {errors.login && (
                        <p className="text-red-500 text-sm">{errors.login.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Sua senha"
                                {...register("password")}
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
                                {showPassword
                                    ? <EyeOff className="h-5 w-5 text-muted-foreground" />
                                    : <Eye className="h-5 w-5 text-muted-foreground" />
                                }
                            </button>
                        </div>

                         <div className="text-sm mt-1 hover:underline">
                                <Link to="/forgot-password">
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                </div>

                {serverError && (
                    <p className="text-red-500 text-center">{serverError}</p>
                )}

                <Button type="submit" className="w-full cursor-pointer">
                    Entrar
                </Button>
            </div>

            <div className="text-center text-sm hover:underline">
                <Link to="/primeiro-acesso">
                    Primeiro acesso
                </Link>
            </div>
        </form>
    );
}