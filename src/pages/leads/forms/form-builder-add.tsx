import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Type, FileText, CheckSquare, Circle, Phone, List } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

type Props = {}

function FormBuilderAdd({}: Props) {
    const form = useFormContext<FormConfig>()

    const { append } = useFieldArray({
        control: form.control,
        name: "fields",
        keyName: "key",
    })


    const addField = (type: LeadFormField["type"]) => {
        const newField: LeadFormField = {
            id: `field_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            type,
            label: `${"Yangi"} ${type}`,
            placeholder: type === "select" ? undefined : `Yordamchi matn`,
            required: false,
            extra_data: {
                options:
                    type === "select" || type === "radio" || type === "checkbox"
                        ? ["Variant" + " 1", "Variant" + " 2"]
                        : undefined,
            },
        }

        append(newField)
    }

    return (
        <div className="flex lg:flex-col no-scrolbar-x overflow-x-auto gap-3 bg-card rounded-lg p-3">
            {fieldTypes.map(({ type, icon: Icon, label, color }) => (
                <Button
                    key={type}
                    type="button"
                    variant="ghost"
                    onClick={() => addField(type)}
                    className={cn(
                        " border-0 flex-col h-16 !p-2  min-w-[64px] shadow-sm hover:shadow-lg transition-all duration-300 group",
                        color,
                    )}
                >
                    <Icon className="h-5 min-w-5" />

                    <span className="font-medium text-[10px]">{label}</span>
                </Button>
            ))}
        </div>
    )
}

export default FormBuilderAdd

export const fieldTypes = [
    {
        type: "input" as const,
        icon: Type,
        label: "Matn",
        color: "bg-primary/10 text-primary",
    },
    {
        type: "textarea" as const,
        icon: FileText,
        label: "Katta matn",
        color: "bg-sky-600/10 hover:bg-sky-600/10 text-sky-600 hover:text-sky-500",
    },
    {
        type: "select" as const,
        icon: List,
        label: "Ro'yxat",
        color: "bg-purple-600/10 hover:bg-purple-600/10 text-purple-600 hover:text-purple-500",
    },
    {
        type: "radio" as const,
        icon: Circle,
        label: "Variant",
        color: "bg-orange-600/10 hover:bg-orange-600/10 text-orange-600 hover:text-orange-500",
    },
    {
        type: "checkbox" as const,
        icon: CheckSquare,
        label: "Belgilash",
        color: "bg-pink-600/10 hover:bg-pink-600/10 text-pink-600 hover:text-pink-500",
    },
    {
        type: "phone" as const,
        icon: Phone,
        label: "Telefon",
        color: "bg-green-600/10 hover:bg-green-600/10 text-green-600 hover:text-green-500",
    },
]
