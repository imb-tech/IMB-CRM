import { useCallback, useState } from "react"
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
} from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Plus,
    Trash2,
    GripVertical,
    Type,
    FileText,
    ChevronDown,
    CheckSquare,
    Circle,
    Copy,
    Phone,
} from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import FormInput from "@/components/form/input"
import { FormSwitch } from "@/components/form/switch"
import { moveItem } from "../utils"

export function FormBuilderFields() {
    const [isDragging, setIsDragging] = useState(false)

    const form = useFormContext<FormConfig>()

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: "fields",
        keyName: "key",
    })
    const watchedFields = form.watch("fields")

    const addField = (type: LeadFormField["type"]) => {
        const newField: LeadFormField = {
            id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type,
            label: `Yangi ${type}`,
            placeholder: type === "select" ? undefined : "Yordamchi matn",
            required: false,
            extra_data: {
                options:
                    (
                        type === "select" ||
                        type === "radio" ||
                        type === "checkbox"
                    ) ?
                        ["Variant" + " 1", "Variant" + " 2"]
                    :   undefined,
            },
        }

        append(newField)
    }

    const onDragStart = () => {
        setIsDragging(true)
    }

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (result.destination) {
                const flds = form.getValues("fields")
                const cfg = moveItem(
                    flds,
                    result.source.index,
                    result.destination?.index,
                )
                form.setValue("fields", cfg)
            }
        },
        [fields, form],
    )

    return (
        <div className="space-y-3 w-full">
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="form-fields"
                    direction="vertical"
                    type="card"
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`relative py-1 flex flex-col gap-2 ${
                                fields.length === 0 ?
                                    "border-2 border-dashed border-secondary rounded-xl"
                                :   ""
                            }`}
                        >
                            {fields.length === 0 ?
                                <div className="text-center"></div>
                            :   fields.map((field, index) => (
                                    <Draggable
                                        key={field.key}
                                        draggableId={field.id.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }
                                                className={` ${
                                                    snapshot.isDragging ? "z-50"
                                                    : isDragging ? "opacity-80"
                                                    : ""
                                                }`}
                                            >
                                                <Card className="border-0 shadow-sm hover:shadow-md bg-secondary dark:bg-background">
                                                    <CardHeader className="pb-3">
                                                        <div className="flex items-center gap-3">
                                                            {/* Drag Handle */}
                                                            <div
                                                                className="rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors duration-200"
                                                                title="Sudrab tartiblash uchun ushlang"
                                                            >
                                                                <GripVertical className="w-4 h-4 text-slate-500" />
                                                            </div>

                                                            {/* Field Info */}
                                                            <div
                                                                className={`w-8 h-8 bg-gradient-to-br ${getFieldColor(field.type)} rounded-lg flex items-center justify-center flex-shrink-0`}
                                                            >
                                                                {(() => {
                                                                    const Icon =
                                                                        getFieldIcon(
                                                                            field.type,
                                                                        )
                                                                    return (
                                                                        <Icon className="w-4 h-4 text-white" />
                                                                    )
                                                                })()}
                                                            </div>

                                                            <div className="flex-1 min-w-0 flex items-center gap-2">
                                                                <div className="font-medium truncate">
                                                                    {
                                                                        field.label
                                                                    }
                                                                </div>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {field.type}
                                                                </Badge>
                                                                {watchedFields[
                                                                    index
                                                                ].required && (
                                                                    <Badge
                                                                        variant="destructive"
                                                                        className="text-xs"
                                                                    >
                                                                        Majburiy
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        append({
                                                                            ...field,
                                                                            id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                                                                            label: `${field.label} nusxa`,
                                                                            extra_data:
                                                                                {
                                                                                    ...field.extra_data,
                                                                                    is_fixed:
                                                                                        undefined,
                                                                                    fixed_name:
                                                                                        undefined,
                                                                                },
                                                                        })
                                                                    }
                                                                    className="w-8 h-8 p-0 text-blue-500 hover:text-blue-500 hover:bg-blue-500/10"
                                                                    title={
                                                                        "Nusxalash"
                                                                    }
                                                                >
                                                                    <Copy className="w-4 h-4" />
                                                                </Button>
                                                                {!field
                                                                    .extra_data
                                                                    ?.is_fixed && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            remove(
                                                                                index,
                                                                            )
                                                                        }
                                                                        className="w-8 h-8 p-0 text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                                                        title={
                                                                            "O'chirish"
                                                                        }
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <FormInput
                                                                label={
                                                                    "Input nomi"
                                                                }
                                                                placeholder={
                                                                    "Nima yozilishi haqida"
                                                                }
                                                                methods={form}
                                                                name={`fields.${index}.label`}
                                                                required
                                                            />
                                                            {isPlaceholder(
                                                                field.type,
                                                            ) && (
                                                                <FormInput
                                                                    label="Yordamchi matn"
                                                                    placeholder="Ixtiyoriy"
                                                                    methods={
                                                                        form
                                                                    }
                                                                    name={`fields.${index}.placeholder`}
                                                                />
                                                            )}
                                                        </div>

                                                        {isVariant(
                                                            field.type,
                                                        ) && (
                                                            <div className="space-y-3">
                                                                <Label className="text-xs font-medium text-slate-600">
                                                                    Variantlar
                                                                </Label>
                                                                <div className="space-y-2">
                                                                    {field.extra_data?.options?.map(
                                                                        (
                                                                            __,
                                                                            optionIndex,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    optionIndex
                                                                                }
                                                                                className="flex gap-2"
                                                                            >
                                                                                <FormInput
                                                                                    methods={
                                                                                        form
                                                                                    }
                                                                                    name={`fields.${index}.extra_data.options.${optionIndex}`}
                                                                                />
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        const newOptions =
                                                                                            field?.extra_data.options?.filter(
                                                                                                (
                                                                                                    _,
                                                                                                    i,
                                                                                                ) =>
                                                                                                    i !==
                                                                                                    optionIndex,
                                                                                            )
                                                                                        update(
                                                                                            index,
                                                                                            {
                                                                                                ...field,
                                                                                                extra_data:
                                                                                                    {
                                                                                                        ...field.extra_data,
                                                                                                        options:
                                                                                                            newOptions,
                                                                                                    },
                                                                                            },
                                                                                        )
                                                                                    }}
                                                                                    className="w-9 h-9 p-0 text-red-500 hover:text-red-500 hover:bg-red-700/10"
                                                                                >
                                                                                    <Trash2 className="w-4 h-4" />
                                                                                </Button>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                    <Button
                                                                        variant="default"
                                                                        type="button"
                                                                        size="lg"
                                                                        onClick={() => {
                                                                            const newOptions =
                                                                                [
                                                                                    ...(field
                                                                                        ?.extra_data
                                                                                        .options ||
                                                                                        []),
                                                                                    `Variant ${(field?.extra_data.options?.length || 0) + 1}`,
                                                                                ]
                                                                            update(
                                                                                index,
                                                                                {
                                                                                    ...field,
                                                                                    extra_data:
                                                                                        {
                                                                                            ...field.extra_data,
                                                                                            options:
                                                                                                newOptions,
                                                                                        },
                                                                                },
                                                                            )
                                                                        }}
                                                                        className="w-full"
                                                                    >
                                                                        <Plus className="w-4 h-4 mr-2" />
                                                                        Variant
                                                                        qo'shish
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {!field.extra_data
                                                            .is_fixed && (
                                                            <FormSwitch
                                                                label="Majburiy maydon"
                                                                control={
                                                                    form.control
                                                                }
                                                                name={`fields.${index}.required`}
                                                            />
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fieldTypes.map(({ type, icon: Icon, label, color }) => (
                    <Button
                        key={type}
                        type="button"
                        variant="outline"
                        onClick={() => addField(type)}
                        className="justify-start p-4 h-auto border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                        <div
                            className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center mr-3 transition-transform duration-300`}
                        >
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                            <div className="font-medium">{label}</div>
                            <div className="text-xs text-slate-500">
                                Qo'shish
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    )
}

function isPlaceholder(type: LeadFormField["type"]) {
    if (type === "input" || type === "textarea") {
        return true
    } else return false
}

function isVariant(type: LeadFormField["type"]) {
    if (type === "checkbox" || type === "select" || type == "radio") {
        return true
    } else return false
}

const fieldTypes = [
    {
        type: "input" as const,
        icon: Type,
        label: "Matn kiritish",
        color: "from-blue-500 to-cyan-500",
    },
    {
        type: "textarea" as const,
        icon: FileText,
        label: "Katta matn kiritish",
        color: "from-green-500 to-emerald-500",
    },
    {
        type: "select" as const,
        icon: ChevronDown,
        label: "Ro‘yxatdan tanlash",
        color: "from-purple-500 to-violet-500",
    },
    {
        type: "radio" as const,
        icon: Circle,
        label: "Variantni tanlash",
        color: "from-orange-500 to-red-500",
    },
    {
        type: "checkbox" as const,
        icon: CheckSquare,
        label: "Belgilash (✓)",
        color: "from-pink-500 to-rose-500",
    },
    {
        type: "phone" as const,
        icon: Phone,
        label: "Telefon raqam",
        color: "from-green-500 to-green-500",
    },
]

const getFieldIcon = (type: LeadFormField["type"]) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    return fieldType?.icon || Type
}

const getFieldColor = (type: LeadFormField["type"]) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    return fieldType?.color || "from-gray-500 to-slate-500"
}
