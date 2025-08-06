import { Button } from "@/components/ui/button"
import { Monitor, Tablet, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeviceSelectorProps {
    device: "mobile" | "tablet" | "desktop"
    onDeviceChange: (device: "mobile" | "tablet" | "desktop") => void
}

export function DeviceSelector({
    device,
    onDeviceChange,
}: DeviceSelectorProps) {
    const devices = [
        {
            id: "mobile" as const,
            icon: Smartphone,
            label: "Mobile",
            width: "w-4",
        },
        { id: "tablet" as const, icon: Tablet, label: "Tablet", width: "w-5" },
        {
            id: "desktop" as const,
            icon: Monitor,
            label: "Desktop",
            width: "w-5",
        },
    ]

    return (
        <div className="flex items-center gap-1 p-1 rounded-xl border">
            {devices.map(({ id, icon: Icon, label, width }) => (
                <Button
                    key={id}
                    variant={device === id ? "default" : "ghost"}
                    size="sm"
                    type="button"
                    onClick={() => onDeviceChange(id)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 h-auto transition-all duration-300 rounded-lg",
                        device === id ? "" : "text-muted-foreground ",
                    )}
                >
                    <Icon className={cn("h-4", width)} />
                    {/* <span className="hidden sm:inline font-medium">
                        {t(label)}
                    </span> */}
                </Button>
            ))}
        </div>
    )
}
