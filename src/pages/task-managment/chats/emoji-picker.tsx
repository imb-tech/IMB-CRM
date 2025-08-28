import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Smile } from "lucide-react"
import type React from "react"

interface EmojiPickerProps {
    onSelectEmoji: (emoji: string) => void
    children?: React.ReactNode
}

const commonEmojis = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
    "🥰",
    "😗",
    "😙",
    "😚",
    "🙂",
    "🤗",
    "🤩",
    "🤔",
    "🤨",
    "😐",
    "😑",
    "😶",
    "🙄",
    "😏",
    "😣",
    "😥",
    "😮",
    "🤐",
    "😯",
    "😪",
    "😫",
    "🥱",
    "😴",
    "😌",
    "😛",
    "😜",
    "😝",
    "🤤",
    "😒",
    "😓",
    "😔",
    "😕",
    "🙃",
    "🤑",
    "😲",
    "☹️",
    "🙁",
    "😖",
    "😞",
    "😟",
    "😤",
    "😢",
    "😭",
    "😦",
    "😧",
    "😨",
    "😩",
    "🤯",
    "😬",
    "😰",
    "😱",
    "🥵",
    "🥶",
    "😳",
    "🤪",
    "😵",
    "😡",
    "😠",
    "🤬",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "😇",
    "🥳",
    "🥸",
    "🤠",
    "🥺",
    "🤡",
    "🤥",
    "🤫",
    "🤭",
    "🧐",
    "🤓",
]

export function EmojiPicker({ onSelectEmoji, children }: EmojiPickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children || (
                    <Button variant="ghost" className="h-9 w-9 p-0 text-[#B1C3D4]  hover:bg-transparent">
                        <Smile size={22} />
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 grid grid-cols-9 gap-1 border-[#18222C] bg-[#18222C] shadow-2xl">
                {commonEmojis.map((emoji) => (
                    <Button
                        key={emoji}
                        variant="ghost" 
                        size="sm"
                        className="p-1 text-2xl "
                        onClick={() => onSelectEmoji(emoji)}
                    >
                        {emoji}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    )
}
