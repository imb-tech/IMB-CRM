import Header from "@/components/header"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ReactNode } from "@tanstack/react-router"

type Props = {
    children: ReactNode
    rigthChildren?: ReactNode
}

const PageLayout = ({ children, rigthChildren }: Props) => {
    const { open } = useSidebar()
    return (
        <div className="w-full">
            <div
                className={cn(
                    "fixed top-0 right-0  z-10 transition-[width,height,padding] ",
                    open
                        ? "lg:w-[calc(100%-192px)] duration-300 w-full"
                        : "lg:w-[calc(100%-47px)] duration-200 w-full",
                )}
            >
                <Header rigthChildren={rigthChildren} />
            </div>
            <main className="flex xl:gap-2 px-3 md:px-4 pt-20  relative ">
                {children}
            </main>
           
        </div>
    )
}

export default PageLayout
