import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Reply, Edit, Trash2, Download, Copy } from "lucide-react"

interface MessageContextMenuProps {
    message: Message
    onReply: (message: Message) => void
    onEdit: (message: Message) => void
    onDelete: (messageId: string) => void
    onSaveImage?: (imageUrl: string, fileName: string) => void
    children: React.ReactNode
}

export function MessageContextMenu({
    message,
    onReply,
    onEdit,
    onDelete,
    onSaveImage,
    children,
}: MessageContextMenuProps) {
    const isMyMessage = message.is_self
    const hasImages = message.files?.some((file) =>
        file.type.startsWith("image"),
    )

    const handleSaveImage = () => {
        if (message.files && hasImages) {
            const firstImage = message.files.find((file) =>
                file.type.startsWith("image"),
            )
            if (firstImage && onSaveImage) {
                onSaveImage(firstImage.url, firstImage.name)
            }
        }
    }

    const handleCopyText = () => {
        if (message.text) {
            navigator.clipboard.writeText(message.text)
        }
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent className="w-48 bg-[#1F242D]">
                <ContextMenuItem
                    onClick={() => {
                        onReply(message)
                    }}
                >
                    <Reply className="w-4 h-4 mr-2" />
                    {"Javob berish"}
                </ContextMenuItem>

                {message.text && (
                    <ContextMenuItem onClick={handleCopyText}>
                        <Copy className="w-4 h-4 mr-2" />
                        {"Matnni nusxalash"}
                    </ContextMenuItem>
                )}

                {hasImages && (
                    <ContextMenuItem onClick={handleSaveImage}>
                        <Download className="w-4 h-4 mr-2" />
                        {"Rasmni saqlash"}
                    </ContextMenuItem>
                )}

                {isMyMessage && (
                    <>
                        <ContextMenuItem
                            onClick={() => {
                                onEdit(message)
                            }}
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            {"Tahrirlash"}
                        </ContextMenuItem>

                        <ContextMenuItem
                            onClick={() => {
                                onDelete(message.id)
                            }}
                            className="!text-red-500 focus:bg-red-900/20"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {"O'chirish"}
                        </ContextMenuItem>
                    </>
                )}
            </ContextMenuContent>
        </ContextMenu>
    )
}
