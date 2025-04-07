import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/loginForm"
import { ModeToggle } from "./components/ui/mode-toggle"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>

          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D12AQE2pTob4BxMiA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1711543574420?e=2147483647&v=beta&t=hFXPNVcH1jhskeVKtyg0ctJhwVI3Tiw1OH1CA2OMWHU"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}