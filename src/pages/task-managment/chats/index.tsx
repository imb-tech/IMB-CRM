import { useState, useRef, useEffect, useCallback } from "react"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { TASKLY_COMMENT } from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import { useDelete } from "@/hooks/useDelete"
import { InfiniteData, useQueryClient } from "@tanstack/react-query"
import { useInfinite } from "@/hooks/useInfite"
import { ScrollToBottomButton } from "./scroll-bottom-button"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}

export default function TaskChat({
    currentId,
}: {
    currentId: number | undefined
}) {
    const navigate = useNavigate()
    const { id } = useParams({ from: "/_main/project/$id" })
    const queryClient = useQueryClient()
    const search: any = useSearch({ from: "/_main/project/$id" })
    const [showScrollButton, setShowScrollButton] = useState(false)
    const [replyingTo, setReplyingTo] = useState<Message | null>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [editingMessage, setEditingMessage] = useState<Message | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const { mutate: updateMutate } = usePatch({}, config)
    const { mutate: deleteMutate } = useDelete()

    const {
        data: messages,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch,
        isLoading,
    } = useInfinite<Message[]>(TASKLY_COMMENT, {
        deps: [],
        params: {
            task_id: search.task,
        },
        options: {
            enabled: !!search.task,
        },
    })

    const { mutate: createMutate, isPending } = usePost(
        {
            onSuccess: (data) => {
                refetch()
                if (data?.task) {
                    navigate({
                        to: "/project/$id",
                        params: { id },
                        search: { task: data?.task },
                    })
                }
            },
        },
        config,
    )

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }

    useEffect(() => {
        if (!search.task) {
            queryClient.removeQueries({
                queryKey: [TASKLY_COMMENT],
            })
        }
    }, [search.task])

    useEffect(() => {
        const el = scrollAreaRef.current
        if (!el) return

        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = el

            const threshold = 150

            const currentPosition = Math.abs(scrollTop) + clientHeight

            if (currentPosition >= scrollHeight - threshold) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }

            setShowScrollButton(Math.abs(scrollTop) >= 350)
        }

        el.addEventListener("scroll", handleScroll)
        return () => el.removeEventListener("scroll", handleScroll)
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    const handleSendMessage = (text: string, files?: File[]) => {
        const formData = new FormData()
        if (text) formData.append("text", text)
        if (replyingTo?.id) formData.append("reply", String(replyingTo.id))
        if (search?.task) formData.append("task", search.task)
        if (currentId) formData.append("status", String(currentId))
        if (files && files.length)
            files.forEach((file) => formData.append("files", file))

        createMutate(TASKLY_COMMENT, formData)
        setReplyingTo(null)
    }

    const handleEditMessage = (messageId: string, newText: string) => {
        updateMutate(
            `${TASKLY_COMMENT}/${messageId}`,
            { text: newText },
            {
                onSuccess: () => {
                    queryClient.setQueryData<
                        InfiniteData<{
                            results: Message[]
                            total_pages: number
                            count: number
                        }>
                    >([TASKLY_COMMENT, Number(search.task)], (oldData) => {
                        if (!oldData) return oldData

                        const newPages = oldData.pages.map((page) => ({
                            ...page,
                            results: page.results.map((msg) =>
                                msg.id === messageId
                                    ? {
                                          ...msg,
                                          text: newText,
                                          edited: true,
                                          updated_at: String(new Date()),
                                      }
                                    : msg,
                            ),
                        }))

                        return {
                            ...oldData,
                            pages: newPages,
                        }
                    })

                    setEditingMessage(null)
                },
            },
        )
    }

    const handleDeleteMessage = (messageId: string) => {
        deleteMutate(`${TASKLY_COMMENT}/${messageId}`, {
            onSuccess: () => {
                queryClient.setQueryData<
                    InfiniteData<{
                        results: Message[]
                        has_next_page: boolean
                        next_cursor: number
                    }>
                >([TASKLY_COMMENT, Number(search.task)], (oldData) => {
                    if (!oldData) return oldData

                    const newPages = oldData.pages.map((page) => ({
                        ...page,
                        results: page.results.filter(
                            (msg) => msg.id !== messageId,
                        ),
                    }))

                    return {
                        ...oldData,
                        pages: newPages,
                    }
                })
            },
        })
    }

    const handleReply = (message: Message) => {
        setReplyingTo(message)
        cancelEdit()
    }
    const handleEdit = (message: Message) => {
        setEditingMessage(message)
        cancelReply()
    }
    const cancelReply = () => setReplyingTo(null)
    const cancelEdit = () => setEditingMessage(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        if (files.length) {
            setSelectedFiles((prev) => [...prev, ...files])
        }
    }, [])

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        const files = Array.from(e.clipboardData.files)
        if (files.length) {
            setSelectedFiles((prev) => [...prev, ...files])
        }
    }, [])

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onPaste={handlePaste}
            className={cn(
                "w-full  h-[90vh] flex flex-col-reverse",
                isDragging && "relative",
            )}
        >
            <MessageInput
                onSendMessage={handleSendMessage}
                onEditMessage={handleEditMessage}
                replyingTo={replyingTo}
                editingMessage={editingMessage}
                onCancelReply={cancelReply}
                onCancelEdit={cancelEdit}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                isPending={isPending}
            />

            <div
                className="relative  bg-[#213040] px-2 py-3 h-full scroll-smooth no-scrollbar-x overflow-y-auto rounded-tr-md flex flex-col-reverse"
                ref={scrollAreaRef}
                style={{ backgroundImage: "url(/telegram-bg.png)" }}
            >
                {!!messages?.length ? (
                    <MessageList
                        messages={messages}
                        onReply={handleReply}
                        onEdit={handleEdit}
                        onDelete={handleDeleteMessage}
                    />
                ) : null}

                {isLoading && (
                    <div className="w-full h-[65vh] flex flex-col justify-center gap-4 px-4">
                        {[...Array(16)].map((_, i) => (
                            <div
                                key={i}
                                className={`flex ${
                                    i % 2 === 0
                                        ? "justify-start"
                                        : "justify-end"
                                }`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 animate-pulse ${
                                        i % 2 === 0
                                            ? "bg-[#B1C3D5]/30 rounded-bl-none"
                                            : "bg-[#4F8EF7]/30 rounded-br-none"
                                    }`}
                                >
                                    <div className="lg:w-[250px] w-32 h-3 bg-white/40 rounded mb-2" />
                                    <div className="w-20 h-3 bg-white/40 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {messages?.length === 0 && (
                    <div
                        className={
                            "w-full flex items-center flex-col  h-[65vh] justify-center gap-2"
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                opacity="0.4"
                                d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
                                fill="#B1C3D5"
                            />
                            <path
                                d="M9.99023 14C9.43023 14 8.99023 13.55 8.99023 13C8.99023 12.45 9.44023 12 9.99023 12C10.5402 12 10.9902 12.45 10.9902 13C10.9902 13.55 10.5502 14 9.99023 14Z"
                                fill="#B1C3D5"
                            />
                            <path
                                d="M13.4902 14C12.9302 14 12.4902 13.55 12.4902 13C12.4902 12.45 12.9402 12 13.4902 12C14.0402 12 14.4902 12.45 14.4902 13C14.4902 13.55 14.0402 14 13.4902 14Z"
                                fill="#B1C3D5"
                            />
                            <path
                                d="M6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14Z"
                                fill="#B1C3D5"
                            />
                            <path
                                d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
                                fill="#B1C3D5"
                            />
                        </svg>
                        <p className="text-[#B1C3D5]">
                            {"Yozishmalar topilmadi"}
                        </p>
                    </div>
                )}

                <ScrollToBottomButton
                    onClick={() => scrollToBottom()}
                    visible={showScrollButton}
                />
            </div>

            {isDragging && (
                <div className="bg-[#17212b] z-10 flex justify-center items-center border border-blue-400 inset-0 rounded-md absolute">
                    <p className="text-center">
                        {"Fayllarni yuborish uchun bu yerga tashlang"}
                    </p>
                </div>
            )}
        </div>
    )
}
