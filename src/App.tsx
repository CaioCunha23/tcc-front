import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/loginForm"
import { ModeToggle } from "./components/mode-toggle"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-10">
        <div className="flex items-center justify-between w-full">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Fleet Guard
          </a>

          <ModeToggle />
          
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
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