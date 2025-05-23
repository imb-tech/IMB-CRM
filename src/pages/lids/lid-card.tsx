import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Eye,
    MoreHorizontal,
    Calendar,
    Monitor,
    PhoneCall,
    MessageSquare,
    Star,
    StarOff,
    Trash2,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface LeadCardProps {
    name: string
    phone: string
    date: string
    category: string
    status: string
    avatarUrl?: string
}

export default function LeadCard({
    name = "Shohjahon Hamidov",
    phone = "+998881239124",
    date = "23 May 2025",
    category = "test",
    status = "Bog'lanildi",
    avatarUrl,
}: LeadCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(status)

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "bog'lanildi":
                return "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400 hover:bg-rose-500/20"
            case "yangi":
                return "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-500/20"
            case "kutilmoqda":
                return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400 hover:bg-amber-500/20"
            default:
                return "bg-slate-500/10 text-slate-500 dark:bg-slate-500/20 dark:text-slate-400 hover:bg-slate-500/20"
        }
    }

    const cycleStatus = () => {
        const statuses = ["Bog'lanildi", "Yangi", "Kutilmoqda"]
        const currentIndex = statuses.indexOf(currentStatus)
        const nextIndex = (currentIndex + 1) % statuses.length
        setCurrentStatus(statuses[nextIndex])
    }

    return (
        <Card className="group border rounded-lg overflow-hidden transition-all duration-300 dark:hover:shadow-slate-800/30 dark:border-slate-800">
            <CardContent className="p-4 relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:border-violet-100 dark:group-hover:border-violet-900">
                                <AvatarImage
                                    src={
                                        avatarUrl ||
                                        "/placeholder.svg?height=48&width=48"
                                    }
                                />
                                <AvatarFallback className="bg-violet-50 text-violet-500 dark:bg-violet-900/20 dark:text-violet-300">
                                    {name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 border border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                {isFavorite ?
                                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                :   <StarOff className="h-3 w-3 text-slate-400" />
                                }
                            </button>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg text-slate-900 dark:text-slate-100">
                                {name}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full transition-opacity duration-200 text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400"
                            onClick={() => alert("View details")}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full transition-opacity duration-200 text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                    onClick={() => alert("Edit lead")}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert("Call lead")}
                                >
                                    Call
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Monitor className="h-3 w-3" />
                        <span>{category}</span>
                    </div>
                    <Badge
                        onClick={cycleStatus}
                        className={cn(
                            "ml-auto cursor-pointer transition-colors duration-200 text-xs font-normal",
                            getStatusColor(currentStatus),
                        )}
                    >
                        {currentStatus}
                    </Badge>
                </div>

                <div className="absolute bottom-0 bg-background left-0 p-2 right-0 mt-3 pt-3 grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 bg-transparent hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/20 dark:hover:text-violet-400 border-slate-200 dark:border-slate-700"
                        onClick={() => alert(`Calling ${phone}`)}
                    >
                        <PhoneCall className="h-3 w-3 mr-1.5" />
                        Call
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 bg-violet-50 hover:bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400 dark:hover:bg-violet-900/30 border-violet-100 dark:border-violet-800"
                        onClick={() => alert(`Sending message to ${phone}`)}
                    >
                        <MessageSquare className="h-3 w-3 mr-1.5" />
                        Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
