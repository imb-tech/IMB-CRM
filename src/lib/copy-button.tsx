import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const CopyButton = (
    text: string | number,
    size?: "sm" | "md",
    icon = false,
) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 1000)
        }
    }, [copied])

    return (
        <Button
            variant="link"
            className={`font-light ${size === "md" ? "" : ""}`}
            onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(text?.toString())
                toast.success(text + " nusxaga olindi")
                setCopied(true)
            }}
            icon={
                !icon ? undefined
                : copied ?
                    <Check width={16} />
                :   <Copy width={16} />
            }
            size={size === "md" ? "default" : "sm"}
        >
            {text}
        </Button>
    )
}
