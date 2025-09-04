import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { formatFileSize, getFileIcon } from "./message-input"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SeeInView from "@/components/ui/see-in-view"

interface MessageItemProps {
    message: Message
    onReply: (message: Message) => void
}

export function MessageItem({ message, onReply, ...props }: MessageItemProps) {
    const doubleClickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const isMyMessage = message.is_self

    const handleClick = () => {
        if (doubleClickTimeoutRef.current) {
            clearTimeout(doubleClickTimeoutRef.current)
            doubleClickTimeoutRef.current = null
            onReply(message)
        } else {
            doubleClickTimeoutRef.current = setTimeout(() => {
                doubleClickTimeoutRef.current = null
            }, 300)
        }
    }

    const scrollToMessage = (messageId: string) => {
        const el = document.getElementById(`message-${messageId}`)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
            el.classList.add("bg-[#416588]", "transform", "transition-all")
            setTimeout(() => {
                el.classList.remove(
                    "bg-[#416588]",
                    "transform",
                    "transition-all",
                )
            }, 1500)
        }
    }

    const downloadFile = (file: any) => {
        const a = document.createElement("a")
        a.href = file.url
        a.download = file.name
        a.click()
    }

    const images =
        message.files?.filter((file) => file.type.startsWith("image")) || []
    const otherFiles =
        message.files?.filter((file) => !file.type.startsWith("image")) || []

    const isEmojiOnly =
        /^[\u{1F300}-\u{1FAFF}]+$/u.test(message.text?.trim() || "") &&
        !message.files?.length

    return (
        <div
            id={`message-${message.id}`}
            className={`flex gap-2   ${
                isMyMessage ? "justify-end" : "justify-start items-end"
            } group`}
            onClick={handleClick}
            {...props}
        >
            {!isMyMessage && (
                <Avatar className="h-9 w-9">
                    <AvatarImage
                        src={message?.user.face || undefined}
                        alt={message?.user.full_name}
                    />
                    <AvatarFallback
                        className={cn("uppercase bg-primary/10 text-primary")}
                    >
                        {message?.user.full_name.slice(0, 1)}
                    </AvatarFallback>
                </Avatar>
            )}

            <div className={`max-w-xs  lg:max-w-md relative `}>
                <div className="relative">
                    <div
                        className={cn(
                            "rounded-2xl p-2 shadow-md",
                            isMyMessage
                                ? "bg-[#3E6A97] text-white"
                                : "bg-[#213040]",
                            isEmojiOnly && "bg-transparent shadow-none",
                        )}
                    >
                        {!isMyMessage && (
                            <h1 className={"mb-1 text-[13px] text-[#63BCF8]"}>
                                {message?.user.full_name}
                            </h1>
                        )}

                        {message.reply && (
                            <div
                                onClick={() =>
                                    scrollToMessage(message.reply?.id!)
                                }
                                className={`cursor-pointer px-1 py-[3px] mb-1 border-l-4   rounded-lg ${
                                    isMyMessage
                                        ? "border-white bg-[#5179A3]"
                                        : "border-[#D67722] bg-[#34383F] text-[#D67722]"
                                }`}
                            >
                                <div className="flex  gap-2">
                                    {message?.reply?.files?.[0]?.type ===
                                        "image" && (
                                        <img
                                            src={message?.reply?.files[0]?.url}
                                            className="w-9 h-9 rounded-lg"
                                        />
                                    )}
                                    <div className="flex flex-col text-[13px]">
                                        <p className=" font-medium">
                                            {message.reply.user.full_name}
                                        </p>
                                        <p className="text-white line-clamp-1 break-all">
                                            {message.reply.text ||
                                                message.reply.files?.[0]?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Images */}
                        {images.length > 0 && (
                            <div>
                                {images.length === 1 ? (
                                    <SeeInView
                                        url={images[0].url}
                                        fullWidth
                                        className="w-full h-full object-cover rounded"
                                    />
                                ) : (
                                    <div className="grid grid-cols-2 gap-1 w-full">
                                        {images
                                            .slice(0, 4)
                                            .map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="relative group cursor-pointer"
                                                >
                                                    <SeeInView
                                                        url={image.url}
                                                        fullWidth
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Other files */}
                        {otherFiles.length > 0 && (
                            <div className=" space-y-1">
                                {otherFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center space-x-3 p-1 px-2 rounded-lg ${
                                            isMyMessage
                                                ? "bg-[#3E6A97]"
                                                : "bg-[#213040]"
                                        }`}
                                    >
                                        <div
                                            className={
                                                isMyMessage
                                                    ? "text-[#3E6A97] p-2 bg-white rounded-full "
                                                    : "text-[#223040] rounded-full p-2  bg-[#B2C4D5]"
                                            }
                                        >
                                            {getFileIcon(file.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-[13px] font-medium line-clamp-1 break-all ${
                                                    isMyMessage
                                                        ? "text-white"
                                                        : "text-gray-200"
                                                }`}
                                            >
                                                {file.name}
                                            </p>
                                            <p
                                                className={`text-xs ${
                                                    isMyMessage
                                                        ? "text-blue-200"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className={
                                                isMyMessage
                                                    ? "text-white hover:text-white hover:bg-primary/20"
                                                    : ""
                                            }
                                            onClick={() => downloadFile(file)}
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div
                            className={cn(
                                "flex  gap-2 items-end",
                                message?.text?.length < 65
                                    ? "justify-between"
                                    : "justify-end",
                            )}
                        >
                            {isEmojiOnly ? (
                                <p className="text-[64px] whitespace-pre-wrap break-words">
                                    {message.text}
                                </p>
                            ) : (
                                <p className="text-[13px] whitespace-pre-wrap break-words overflow-hidden">
                                    {message.text}
                                </p>
                            )}

                            <div
                                className={`flex items-center justify-end mt-0.5 space-x-1 text-xs ${
                                    isMyMessage
                                        ? "text-[#CCDEE9]"
                                        : " text-[#B1C3D5]"
                                }`}
                            >
                                {message.edited ? (
                                    <>
                                        <span className="italic">
                                            tahrirlangan
                                        </span>
                                        <span>
                                            {format(
                                                message.updated_at,
                                                "HH:mm",
                                            )}
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        {format(message.created_at, "HH:mm")}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
