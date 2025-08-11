import { useThemeContext } from "@/layouts/color"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/layouts/theme"
import { useEffect } from "react"
import { getIcon } from "./getIcon"
import { themes } from "@/lib/theme-colors"

export function ThemeColorToggle() {
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        const currentPrimary =
            themes["Green"][theme as "light" | "dark"].primary
        const currentTextColor =
            themes["Green"][theme as "light" | "dark"].foreground
        const svgString = getIcon(currentPrimary, currentTextColor)
        const blob = new Blob([svgString], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)

        let favicon = document.getElementById("favicon") as HTMLLinkElement
        if (favicon) {
            document.head.removeChild(favicon)
        }

        favicon = document.createElement("link")
        favicon.id = "favicon"
        favicon.rel = "icon"
        favicon.type = "image/svg+xml"
        favicon.href = url

        document.head.appendChild(favicon)

        return () => URL.revokeObjectURL(url)
    }, [theme])

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
