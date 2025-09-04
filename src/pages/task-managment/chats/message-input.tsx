import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, X, ImageIcon, Video, CircleX } from "lucide-react"
import { EmojiPicker } from "./emoji-picker"
import { useAutoResize } from "@/hooks/useResize"
import { useModal } from "@/hooks/useModal"
import Modal from "@/components/custom/modal"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"

interface MessageInputProps {
    onSendMessage: (text: string, files?: File[]) => void
    onEditMessage: (messageId: string, newText: string) => void
    replyingTo: Message | null
    editingMessage: Message | null
    onCancelReply: () => void
    onCancelEdit: () => void
    selectedFiles: File[]
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>
    isPending: boolean
    onSubmit: (data: QuoteCard) => Promise<void>
}

export function MessageInput({
    onSendMessage,
    onEditMessage,
    replyingTo,
    editingMessage,
    onCancelReply,
    onCancelEdit,
    selectedFiles,
    setSelectedFiles,
    isPending,
    onSubmit,
}: MessageInputProps) {
    const [text, setText] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const textareaRefModal = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { openModal, closeModal, isOpen: isOpenChats } = useModal("chats")
    useAutoResize(textareaRef, text, isOpenChats)
    useAutoResize(textareaRefModal, text)
    const form = useFormContext<QuoteCard>()

    const { isOpen } = useModal("task-modal")

    useEffect(() => {
        if (editingMessage && isOpen) {
            setText(editingMessage.text)

            setTimeout(() => {
                textareaRef.current?.focus()
            }, 800)
        }
    }, [editingMessage, isOpen])

    useEffect(() => {
        if (replyingTo && isOpen) {
            setTimeout(() => {
                textareaRef.current?.focus()
            }, 800)
        }
    }, [replyingTo, isOpen])

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()

            const shouldSubmitForm = form.formState.isDirty

            if (shouldSubmitForm) {
                form.handleSubmit(onSubmit)
            }

            if (!text.trim() && selectedFiles.length === 0) return

            if (editingMessage) {
                onEditMessage(editingMessage.id, text.trim())
            } else {
                onSendMessage(
                    text.trim(),
                    selectedFiles.length > 0 ? selectedFiles : undefined,
                )
            }

            setText("")
            setSelectedFiles([])
        },
        [text, selectedFiles, editingMessage, onEditMessage, onSendMessage],
    )

    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
            }
        },
        [handleSubmit],
    )

    const handleFileChange = useCallback((files: FileList | null) => {
        if (!files || files.length === 0) return

        textareaRef.current?.focus()

        if (files.length > 0) {
            setSelectedFiles((prev) => [...prev, ...files])
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    const removeFile = useCallback((index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    const removeAllFiles = useCallback(() => {
        setSelectedFiles([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    const handleEmojiSelect = useCallback((emoji: string) => {
        setText((prev) => prev + emoji)
    }, [])

    useEffect(() => {
        if (!!selectedFiles?.length) {
            openModal()
        } else {
            closeModal()
        }
    }, [selectedFiles])

    useEffect(() => {
        if (text) {
            setText((prev) => {
                if (isOpenChats) {
                    return prev.endsWith(" ") ? prev : prev + " "
                } else {
                    return prev.endsWith(" ") ? prev.slice(0, -1) : prev
                }
            })
        }
    }, [isOpenChats])

    return (
        <div
            className={
                "border-t bg-[#18222C] translate-y-[0.5px] border-t-[#213040] px-3 py-2.5   lg:rounded-br-md"
            }
        >
            {replyingTo && (
                <div className="mb-3 px-3 py-1  border-l-4 border-[#2F9FF5] rounded">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[13px] font-medium text-[#2F9FF5]">
                                {"Javob"}: {replyingTo.user.full_name}
                            </p>
                            <p className="text-[13px]  line-clamp-1 break-all">
                                {replyingTo.text}
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant={"ghost"}
                            onClick={() => {
                                setText("")
                                onCancelReply()
                            }}
                            className="text-[#B1C3D5] hover:text-[#B1C3D5] hover:bg-transparent p-0 "
                        >
                            <CircleX className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}

            {editingMessage && (
                <div className="mb-2 p-1  border-l-4 border-[#2F9FF5] rounded">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[13px] font-medium pl-2">
                                {"Xabarni tahrirlash"}
                            </p>
                            <p className="text-[13px] font-medium pl-2 line-clamp-1 break-all">
                                {editingMessage.text}
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                setText("")
                                onCancelEdit()
                            }}
                            className="text-[#B1C3D5] hover:text-[#B1C3D5] hover:bg-transparent p-0"
                        >
                            <CircleX className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={cn("flex items-end", isOpenChats && "items-center")}
            >
                {!editingMessage && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-9 w-9 p-0 text-[#B1C3D4]  hover:bg-transparent"
                    >
                        <Paperclip size={22} />
                    </Button>
                )}
                <div className="flex-1">
                    {!isOpenChats ? (
                        <Textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={"Xabar yozing..."}
                            className="min-h-[30px] placeholder:text-[#B1C3D5] text-white  no-scrollbar-x  resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 "
                            rows={1}
                        />
                    ) : (
                        <span className="text-sm text-center pl-4  text-[#B1C3D5] ">
                            {"Xabar yozing..."}
                        </span>
                    )}
                </div>
                <div className="flex">
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={(e) => handleFileChange(e.target.files)}
                        className="hidden"
                        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                        multiple
                    />

                    <EmojiPicker onSelectEmoji={handleEmojiSelect} />
                    <Button
                        type="submit"
                        variant={"ghost"}
                        disabled={
                            (!text && selectedFiles.length === 0) || isPending
                        }
                        className="h-9 w-9 p-0 disabled:text-[#B1C3D4] text-[#2EA6FE]  hover:bg-transparent"
                    >
                        <Send className="rotate-45" size={22} />
                    </Button>
                </div>
            </form>

            <Modal
                size="max-w-md"
                modalKey="chats"
                title={`${selectedFiles.length} ${"ta fayl tanlandi"}`}
                className={"dark:bg-[#18222C] gap-1 border-[#213040] !pb-0 "}
                classNameTitle={"pb-2"}
                onClose={() => {
                    closeModal()
                    removeAllFiles()
                }}
            >
                {selectedFiles?.length > 0 && (
                    <div className=" bg-[#18222C] ">
                        <div className="max-h-[75vh] overflow-y-auto no-scrollbar-x">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2  rounded"
                                >
                                    {selectedFiles?.length === 1 ? (
                                        file.type.startsWith("image/") ? (
                                            <img
                                                src={
                                                    URL.createObjectURL(file) ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Preview"
                                                className="w-full h-[40vh] object-contain rounded-md"
                                            />
                                        ) : null
                                    ) : (
                                        <>
                                            <div className="flex items-center space-x-3">
                                                {file.type.startsWith(
                                                    "image/",
                                                ) ? (
                                                    <img
                                                        src={
                                                            URL.createObjectURL(
                                                                file,
                                                            ) ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt="Preview"
                                                        className="w-10 h-10 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="p-2 bg-[#2EA6FE] text-white rounded-full flex items-center justify-center">
                                                        {getFileIcon(file.type)}
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium  line-clamp-1 break-all">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-[#B1C3D4]">
                                                        {formatFileSize(
                                                            file.size,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                                className="text-[#B1C3D4]  hover:text-red-500 hover:bg-transparent"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="flex py-3 items-end  border-t border-t-[#213040]"
                >
                    <div className="flex-1 ">
                        <Textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={"Xabar yozing..."}
                            className="min-h-[30px] placeholder:text-[#B1C3D5] no-scrollbar-x max-h-[30vh]  resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 "
                            rows={1}
                        />
                    </div>
                    <div className="flex">
                        <EmojiPicker onSelectEmoji={handleEmojiSelect} />
                        <Button
                            type="submit"
                            variant={"ghost"}
                            disabled={!text && selectedFiles.length === 0}
                            className="h-9 w-9 p-0 disabled:text-[#B1C3D4] text-[#2EA6FE]  hover:bg-transparent"
                        >
                            <Send className="rotate-45" size={22} />
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    )
}

export const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/") || fileType.startsWith("image"))
        return <ImageIcon className="w-5 h-5 " />
    if (fileType.startsWith("video/") || fileType.startsWith("video"))
        return <Video className="w-5 h-5 " />
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
        >
            <path
                d="M21 10.19H18.11C15.74 10.19 13.81 8.26 13.81 5.89V3C13.81 2.45 13.36 2 12.81 2H8.57C5.49 2 3 4 3 7.57V16.43C3 20 5.49 22 8.57 22H16.43C19.51 22 22 20 22 16.43V11.19C22 10.64 21.55 10.19 21 10.19Z"
                fill="currentColor"
            />
            <path
                d="M16.2997 2.20999C15.8897 1.79999 15.1797 2.07999 15.1797 2.64999V6.13999C15.1797 7.59999 16.4197 8.80999 17.9297 8.80999C18.8797 8.81999 20.1997 8.81999 21.3297 8.81999C21.8997 8.81999 22.1997 8.14999 21.7997 7.74999C20.3597 6.29999 17.7797 3.68999 16.2997 2.20999Z"
                fill="currentColor"
            />
        </svg>
    )
}
