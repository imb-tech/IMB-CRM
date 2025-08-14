import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/layouts/theme"


export function ThemeColorToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center gap-2">
            {theme === "light" ?
                <button className="m-[1px]" onClick={() => setTheme("dark")}>
                    <Moon width={16} />
                </button>
            :   <button className="m-[1px]" onClick={() => setTheme("light")}>
                    <Sun width={16} />
                </button>
            }
        </div>
    )
}
