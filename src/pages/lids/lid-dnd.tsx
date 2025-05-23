import React, { useState } from "react"
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd"
import LeadCard from "./lid-card"
import TableActions from "@/components/custom/table-actions"
import { Button } from "@/components/ui/button"
import { User, UserPlus } from "lucide-react"

type QuoteCard = {
    id: string
    quote: string
}

type Column = {
    id: string
    name: string
    items: QuoteCard[]
}

const initialData: { columns: Column[] } = {
    columns: [
        {
            id: "jake",
            name: "Yangi",
            items: [
                {
                    id: "2",
                    quote: "Sucking at something is the first step towards being sorta good at something.",
                },
                { id: "3", quote: "You got to focus on what's real, man" },
            ],
        },
        {
            id: "bmo",
            name: "Bog'lanildi",
            items: [
                { id: "1", quote: "Sometimes life is scary and dark" },
                { id: "5", quote: "Homies help homies. Always" },
                {
                    id: "9",
                    quote: "Don’t you always call sweatpants 'give up on life pants,' Jake?",
                },
                {
                    id: "4",
                    quote: "Is that where creativity comes from? From sad biz?",
                },
                {
                    id: "8",
                    quote: "People make mistakes. It's all a part of growing up and you never really stop growing",
                },
            ],
        },
        {
            id: "finn",
            name: "To'lov qilgan",
            items: [
                {
                    id: "7",
                    quote: "That’s it! The answer was so simple, I was too smart to see it!",
                },
            ],
        },
        {
            id: "bubblegum",
            name: "Bog'lanib bo'lmadi",
            items: [
                { id: "10", quote: "I should not have drunk that much tea!" },
                { id: "11", quote: "Please! I need the real you!" },
                {
                    id: "12",
                    quote: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
                },
                { id: "6", quote: "Responsibility demands sacrifice" },
            ],
        },
        {
            id: "cancelled",
            name: "Bog'lanib bo'lmadi",
            items: [
                { id: "13", quote: "I should not have drunk that much tea!" },
                { id: "14", quote: "Please! I need the real you!" },
                {
                    id: "15",
                    quote: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
                },
            ],
        },
    ],
}

const LidDnd: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>(initialData.columns)

    const onDragEnd = (result: DropResult) => {
        const { source, destination, type } = result
        if (!destination) return

        // COLUMN DRAG
        if (type === "column") {
            const newColumns = [...columns]
            const [moved] = newColumns.splice(source.index, 1)
            newColumns.splice(destination.index, 0, moved)
            setColumns(newColumns)
            return
        }

        // CARD DRAG
        const sourceColIndex = columns.findIndex(
            (col) => col.id === source.droppableId,
        )
        const destColIndex = columns.findIndex(
            (col) => col.id === destination.droppableId,
        )

        const sourceItems = [...columns[sourceColIndex].items]
        const destItems = [...columns[destColIndex].items]
        const [movedItem] = sourceItems.splice(source.index, 1)

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, movedItem)
            const newColumns = [...columns]
            newColumns[sourceColIndex].items = sourceItems
            setColumns(newColumns)
        } else {
            destItems.splice(destination.index, 0, movedItem)
            const newColumns = [...columns]
            newColumns[sourceColIndex].items = sourceItems
            newColumns[destColIndex].items = destItems
            setColumns(newColumns)
        }
    }

    return (
        <div className="py-3">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex gap-2 items-start"
                        >
                            {columns.map((column, colIndex) => (
                                <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={colIndex}
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            className="bg-background w-[400px] py-2 px-4 rounded-md"
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="flex items-center justify-between py-2"
                                            >
                                                <h3 className="text-xl">
                                                    {column.name}
                                                </h3>
                                                <div>
                                                    <TableActions
                                                        onDelete={() =>
                                                            console.log(
                                                                "delete",
                                                            )
                                                        }
                                                        onEdit={() =>
                                                            console.log(
                                                                "delete",
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <Droppable
                                                droppableId={column.id}
                                                type="card"
                                            >
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            minHeight: 50,
                                                        }}
                                                        className="max-h-[70vh] overflow-y-auto"
                                                    >
                                                        <Button
                                                            className="w-full mb-2"
                                                            size="sm"
                                                            variant="secondary"
                                                        >
                                                            <UserPlus size={18} />
                                                        </Button>
                                                        {column.items.map(
                                                            (item, index) => (
                                                                <Draggable
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    draggableId={
                                                                        item.id
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                >
                                                                    {(
                                                                        provided,
                                                                    ) => (
                                                                        <div
                                                                            ref={
                                                                                provided.innerRef
                                                                            }
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                marginBottom: 8,
                                                                                ...provided
                                                                                    .draggableProps
                                                                                    .style,
                                                                            }}
                                                                        >
                                                                            <LeadCard
                                                                                {...{
                                                                                    name: "Doniyor Eshmamatov",
                                                                                    phone: "+998931231177",
                                                                                    date: "23 May 2025",
                                                                                    category:
                                                                                        "test",
                                                                                    status: "Bog'lanildi",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ),
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default LidDnd
