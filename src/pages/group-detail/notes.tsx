import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, User, Edit2, Trash2, Check, X, Plus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import SectionHeader from "@/components/elements/section-header"

interface Reminder {
    id: string
    text: string
    createdAt: Date
    createdBy: string
}

const initialReminders: Reminder[] = [
    {
        id: "1",
        text: "oftob chiqdi olamga yugurib bordim xolamga xola xola kulcha ber xolam dedi toshing ter",
        createdAt: new Date("2024-01-15T09:30:00"),
        createdBy: "Aziz Karimov",
    },
    {
        id: "2",
        text: "Hisobotni tayyorlash",
        createdAt: new Date("2024-01-14T14:20:00"),
        createdBy: "Malika Tosheva",
    },
    {
        id: "4",
        text: "Darslik sotib olish lorem ipsum dolor sit.",
        createdAt: new Date("2024-01-12T11:15:00"),
        createdBy: "Nigora Rahimova",
    },
    {
        id: "5",
        text: "Dam olish joyini band qilish lorem ipsum dolor sit. lorem ipsum dolor sit.",
        createdAt: new Date("2024-01-11T19:30:00"),
        createdBy: "Sardor Umarov",
    },
]

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("uz-UZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

export default function GroupNotes() {
    const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editText, setEditText] = useState("")

    const handleEdit = (reminder: Reminder) => {
        setEditingId(reminder.id)
        setEditText(reminder.text)
    }

    const handleSaveEdit = (id: string) => {
        if (editText.trim()) {
            setReminders(
                reminders.map((reminder) =>
                    reminder.id === id ?
                        { ...reminder, text: editText.trim() }
                    :   reminder,
                ),
            )
        }
        setEditingId(null)
        setEditText("")
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditText("")
    }

    const handleDelete = (id: string) => {
        if (confirm("Bu eslatmani o'chirishni xohlaysizmi?")) {
            setReminders(reminders.filter((reminder) => reminder.id !== id))
        }
    }

    return (
        <div>
            <SectionHeader
                title="Eslatmalar"
                rightComponent={
                    <Button variant="secondary">
                        <Plus />
                        Yangi
                    </Button>
                }
            />

            <div className="space-y-4">
                {reminders.map((reminder) => (
                    <div
                        key={reminder.id}
                        className="border-0 shadow-sm bg-secondary backdrop-blur-sm transition-all duration-200 hover:bg-secondary/50 border-l-4 border-l-emerald-400 rounded-md"
                    >
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center  gap-3">
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-200  hover:bg-green-300 w-fit py-1"
                                    >
                                        <User className="w-3 h-3 mr-1" />
                                        {reminder.createdBy}
                                    </Badge>

                                    <div className="flex items-center gap-2 text-emerald-700">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">
                                            {formatDate(reminder.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between gap-4">
                                    {editingId === reminder.id ?
                                        <div className="flex-1 flex items-start gap-2">
                                            <Textarea
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                                className="flex-1 border-emerald-200 focus:border-emerald-400 w-full"
                                                // fullWidth
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSaveEdit(
                                                            reminder.id,
                                                        )
                                                    } else if (
                                                        e.key === "Escape"
                                                    ) {
                                                        handleCancelEdit()
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handleSaveEdit(reminder.id)
                                                }
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                            >
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={handleCancelEdit}
                                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    :   <>
                                            <p className="light:text-emerald-900 text-base leading-relaxed font-medium flex-1">
                                                {reminder.text}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        handleEdit(reminder)
                                                    }
                                                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        handleDelete(
                                                            reminder.id,
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {reminders.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-emerald-600 text-lg">
                        Hozircha eslatmalar yo'q
                    </div>
                </div>
            )}
        </div>
    )
}
