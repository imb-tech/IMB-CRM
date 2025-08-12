import {
    type Control,
    type FieldValues,
    type Path,
    useController,
} from "react-hook-form"
import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, X, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileInputProps<TForm extends FieldValues> {
    control: Control<TForm>
    name: Path<TForm>
    label?: string
    required?: boolean
    maxFiles?: number
    maxSize?: number // MB
    className?: string
    acceptedTypes?: string[]
}

export function FileInput<TForm extends FieldValues>({
    control,
    name,
    label,
    required = false,
    maxFiles = 5,
    maxSize = 10,
    className,
    acceptedTypes = ["image/*", ".pdf", ".doc", ".docx"],
}: FileInputProps<TForm>) {
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const maxSizeBytes = maxSize * 1024 * 1024

    const {
        field: { value, onChange },
        fieldState,
    } = useController({
        control,
        name,
        defaultValue: [] as any,
        rules: {
            validate: (files: File[]) => {
                if (required && (!files || files.length === 0)) {
                    return "Ushbu maydon majburiy"
                }

                if (files && files.length > maxFiles) {
                    return `Maksimum ${maxFiles} ta fayl yuklash mumkin`
                }

                if (files) {
                    for (const file of files) {
                        if (file.size > maxSizeBytes) {
                            return `"${file.name}" fayli ${maxSize} MB dan katta`
                        }
                    }
                }

                return true
            },
        },
    })

    const files: File[] = value || []

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return

        const fileArray = Array.from(newFiles)
        const remainingSlots = maxFiles - files.length
        const filesToAdd = fileArray.slice(0, remainingSlots)

        const oversizedFiles = filesToAdd.filter(
            (file) => file.size > maxSizeBytes,
        )
        if (oversizedFiles.length > 0) {
            alert(
                `Quyidagi fayllar juda katta: ${oversizedFiles.map((f) => f.name).join(", ")}`,
            )
            return
        }

        const updatedFiles = [...files, ...filesToAdd]
        onChange(updatedFiles)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        handleFiles(e.dataTransfer.files)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files)
    }

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index)
        onChange(updatedFiles)
    }

    const openFileDialog = () => {
        if (canAddMore) {
            fileInputRef.current?.click()
        }
    }

    const canAddMore = files.length < maxFiles

    return (
        <div
            className={cn(
                "space-y-2 bg-background px-3 py-2 rounded-md",
                className,
            )}
        >
            {label && (
                <label
                    className={cn(
                        "text-sm font-medium",
                        fieldState.error ? "text-red-600" : "text-slate-700",
                    )}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedTypes.join(",")}
                className="hidden"
                onChange={handleInputChange}
                disabled={!canAddMore}
            />

            <div
                onClick={openFileDialog}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-md p-2 text-center transition-all duration-200",
                    canAddMore ? "cursor-pointer" : "cursor-not-allowed",
                    isDragOver ? "border-blue-400 bg-blue-50"
                    : canAddMore ?
                        fieldState.error ?
                            "border-red-300 hover:border-red-400 hover:bg-red-50"
                        :   "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                    :   "border-slate-200 bg-slate-50 opacity-60",
                )}
            >
                <div className="flex items-center justify-center space-x-2">
                    <Upload
                        className={cn(
                            "w-4 h-4",
                            isDragOver ? "text-blue-500"
                            : fieldState.error ? "text-red-500"
                            : "text-slate-500",
                        )}
                    />
                    <div>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                fieldState.error ? "text-red-700" : (
                                    "text-slate-700"
                                ),
                            )}
                        >
                            {canAddMore ? "Fayllarni tanlang" : "To'ldi"}
                        </p>
                    </div>
                </div>
            </div>

            {fieldState.error && (
                <p className="text-xs text-red-600">
                    {fieldState.error.message}
                </p>
            )}

            {files.length > 0 && (
                <div className="space-y-1">
                    <p className="text-xs text-slate-600">
                        {files.length} ta fayl tanlandi
                    </p>

                    <div className="space-y-1">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between px-2 py-1 bg-white rounded border border-slate-200"
                            >
                                <div className="flex items-center space-x-1 flex-1 min-w-0">
                                    <File className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <p className="text-xs text-slate-700 truncate">
                                        {file.name}
                                    </p>
                                    <span className="text-xs text-slate-500">
                                        ({(file.size / 1024 / 1024).toFixed(1)}{" "}
                                        MB)
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(index)
                                    }}
                                    className="p-0.5 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                                >
                                    <X className="w-3 h-3 text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
