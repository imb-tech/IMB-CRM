import { MessageItem } from "./message-item"
import { formatDateChat } from "@/pages/leads/utils"
import { MessageContextMenu } from "./context-menu"

interface MessageListProps {
    messages: Message[] | undefined
    onReply: (message: Message) => void
    onEdit: (message: Message) => void
    onDelete: (messageId: string) => void
}

export function MessageList({
    messages = [],
    onReply,
    onEdit,
    onDelete,
}: MessageListProps) {
    const saveImage = (imageUrl: string, fileName: string) => {
        const a = document.createElement("a")
        a.href = imageUrl
        a.download = fileName
        a.target = "_blank"
        a.rel = "noopener noreferrer"
        a.click()
    }

    const groupMessagesByDate = (messages: Message[]) => {
        const groups: { [date: string]: Message[] } = {}
        messages.forEach((message) => {
            const dateKey = new Date(message.created_at).toDateString()
            if (!groups[dateKey]) groups[dateKey] = []
            groups[dateKey].push(message)
        })
        return groups
    }

    const messageGroups = groupMessagesByDate(messages)
    const dateKeys = Object.keys(messageGroups)

    return dateKeys.map((dateKey) => (
        <div key={dateKey}>
            <div className="bg-[#17212b] my-2 text-xs px-3 py-1 rounded-full sticky top-2 z-10 w-fit mx-auto">
                {formatDateChat(dateKey)}
            </div>
            <div className="flex gap-2  flex-col">
                {messageGroups[dateKey]
                    .slice()
                    .reverse()
                    .map((message) => (
                        <MessageContextMenu
                            key={message.id}
                            message={message}
                            onReply={onReply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onSaveImage={saveImage}
                        >
                            <MessageItem message={message} onReply={onReply} />
                        </MessageContextMenu>
                    ))}
            </div>
        </div>
    ))
}
