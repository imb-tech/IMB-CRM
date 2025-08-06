import { cn } from "@/lib/utils"
import {
    Globe,
    Instagram,
    Send,
    Facebook,
    Video,
    Phone,
    MessageSquare,
    MessageCircle,
    UserPlus,
    CalendarCheck,
    MapPin,
    Mail,
    Youtube,
    Handshake,
    MoreHorizontal,
    ArrowBigRightDash,
    ExternalLink,
} from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

export default function GetSourceIcon({
    className,
    icon,
    size = 24,
}: {
    className?: ClassNameValue
    icon: string
    size?: number
}) {
    const Item = leadSources.find((ic) => ic.key === icon)

    return (
        <div className={cn("bg-background rounded-md", className)}>
            {Item?.icon ?
                <Item.icon style={{ color: Item.color }} size={size} />
            :   <ArrowBigRightDash style={{ color: "#9CA3AF" }} size={size} />}
        </div>
    )
}

export const leadSources = [
    { key: "website", label: "Website", icon: Globe, color: "#3B82F6" }, // ko'k
    {
        key: "instagram",
        label: "Instagram",
        icon: Instagram,
        color: "#E1306C",
    }, // pushti
    { key: "telegram", label: "Telegram", icon: Send, color: "#0088cc" }, // telegram ko'k
    { key: "facebook", label: "Facebook", icon: Facebook, color: "#1877F2" }, // facebook ko'k
    { key: "tiktok", label: "TikTok", icon: Video, color: "#000000" }, // qora
    { key: "phone_call", label: "Phone Call", icon: Phone, color: "#10B981" }, // yashil
    { key: "sms", label: "SMS", icon: MessageSquare, color: "#6366F1" }, // binafsha
    {
        key: "whatsapp",
        label: "WhatsApp",
        icon: MessageCircle,
        color: "#25D366",
    }, // WhatsApp yashil
    {
        key: "recommendation",
        label: "Recommendation",
        icon: UserPlus,
        color: "#F59E0B",
    }, // to'q sariq
    { key: "event", label: "Event", icon: CalendarCheck, color: "#EC4899" }, // pushti
    { key: "walk_in", label: "Walk-in", icon: MapPin, color: "#EF4444" }, // qizil
    { key: "email", label: "Email", icon: Mail, color: "#6366F1" }, // binafsha
    { key: "youtube", label: "YouTube", icon: Youtube, color: "#FF0000" }, // qizil
    { key: "partner", label: "Partner", icon: Handshake, color: "#14B8A6" }, // och yashil
    { key: "other", label: "Other", icon: MoreHorizontal, color: "#9CA3AF" }, // kulrang
    { key: "link", label: "Link", icon: ExternalLink, color: "#9CA3AF" }, // kulrang
]
