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
import { Plus, Trash2, GripVertical, Type, Copy } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import FormInput from "@/components/form/input"
import { moveItem } from "../utils"
import { fieldTypes } from "./form-builder-add"
import { cn } from "@/lib/utils"
import PhoneField from "@/components/form/phone-field"
import { FormBuilderStyling } from "./form-builder-styling"
import InputText from "@/components/custom/input-text"
import { FormSwitch } from "@/components/form/switch"

export function FormBuilderFields() {
    const [isDragging, setIsDragging] = useState(false)

    const form = useFormContext<FormConfig>()

    const { append, remove, update } = useFieldArray({
        control: form.control,
        name: "fields",
        keyName: "key",
    })
    const fields = form.watch("fields")

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
                                fields.length === 0
                                    ? "border-2 border-dashed border-secondary rounded-xl"
                                    : ""
                            }`}
                        >
                            {fields.length === 0 ? (
                                <div className="text-center"></div>
                            ) : (
                                fields.map((field, index) => (
                                    <Draggable
                                        key={field.id}
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
                                                    snapshot.isDragging
                                                        ? "z-50"
                                                        : isDragging
                                                        ? "opacity-80"
                                                        : ""
                                                }`}
                                            >
                                                <Card className="border-0 shadow-sm hover:shadow-md bg-secondary dark:bg-background">
                                                    <CardHeader className="pb-3">
                                                        <div
                                                            className={cn(
                                                                "flex items-center gap-3",
                                                            )}
                                                        >
                                                            {/* Drag Handle */}
                                                            <div
                                                                className="rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors duration-200"
                                                                title="Sudrab tartiblash uchun ushlang"
                                                            >
                                                                <GripVertical className="w-4 h-4 text-slate-500" />
                                                            </div>
                                                            {/* Field Info */}
                                                            <div
                                                                className={cn(
                                                                    `w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0`,
                                                                    getFieldColor(
                                                                        field.type,
                                                                    ),
                                                                )}
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
                                                                {fields[index]
                                                                    .required && (
                                                                    <Badge
                                                                        variant="destructive"
                                                                        className="text-xs"
                                                                    >
                                                                        {
                                                                            "Majburiy"
                                                                        }
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            {/* Actions */}
                                                            <div
                                                                className={
                                                                    "flex items-center gap-1 flex-shrink-0"
                                                                }
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        append({
                                                                            ...field,
                                                                            id: `field_${Date.now()}_${Math.random()
                                                                                .toString(
                                                                                    36,
                                                                                )
                                                                                .substr(
                                                                                    2,
                                                                                    9,
                                                                                )}`,
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

                                                    <CardContent className="space-y-4 pt-0">
                                                        <div className="flex flex-col">
                                                            <InputText
                                                                methods={form}
                                                                name={`fields.${index}.label`}
                                                                label={
                                                                    field.label
                                                                }
                                                            />

                                                            {isPlaceholder(
                                                                field.type,
                                                            ) && (
                                                                <FormInput
                                                                    placeholder={
                                                                        "Ixtiyoriy"
                                                                    }
                                                                    methods={
                                                                        form
                                                                    }
                                                                    name={`fields.${index}.placeholder`}
                                                                />
                                                            )}

                                                            {isPlaceholderPhone(
                                                                field.type,
                                                            ) && (
                                                                <PhoneField
                                                                    methods={
                                                                        form
                                                                    }
                                                                    label=""
                                                                    name={`fields.${index}.placeholder`}
                                                                />
                                                            )}
                                                        </div>

                                                        {isVariant(
                                                            field.type,
                                                        ) && (
                                                            <div className="space-y-3">
                                                                <Label className="text-xs font-medium text-slate-600">
                                                                    {
                                                                        "Variantlar"
                                                                    }
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
                                                                                    `${"Variant"} ${
                                                                                        (field
                                                                                            ?.extra_data
                                                                                            .options
                                                                                            ?.length ||
                                                                                            0) +
                                                                                        1
                                                                                    }`,
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
                                                                        {
                                                                            "Variant qo'shish"
                                                                        }
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {!field.extra_data
                                                            .is_fixed && (
                                                            <FormSwitch
                                                                label={
                                                                    "Majburiy maydon"
                                                                }
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
                            )}
                            {provided.placeholder}
                            <FormBuilderStyling />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

function isPlaceholder(type: LeadFormField["type"]) {
    if (type === "input" || type === "textarea") {
        return true
    } else return false
}

function isPlaceholderPhone(type: LeadFormField["type"]) {
    if (type === "phone") {
        return true
    } else return false
}

function isVariant(type: LeadFormField["type"]) {
    if (type === "checkbox" || type === "select" || type == "radio") {
        return true
    } else return false
}

const getFieldIcon = (type: LeadFormField["type"]) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    return fieldType?.icon || Type
}

const getFieldColor = (type: LeadFormField["type"]) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    return fieldType?.color
}
