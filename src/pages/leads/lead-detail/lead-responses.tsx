import { Card, CardContent } from "@/components/ui/card"
import { useGet } from "@/hooks/useGet"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { useParams } from "@tanstack/react-router"

export default function LeadResponses() {
    const { user } = useParams({ strict: false })
    const { data } = useGet<LeadSubmission[]>(`leads/submissions/${user}`)

    return (
        <Card className="border-[1px] bg-background">
            <h2></h2>
            <CardContent className="grid grid-cols-2 gap-2">
                {data?.map((field) => (
                    <div
                        className={cn(
                            "flex flex-col bg-secondary p-2 rounded-md",
                            field.form_field.type === "textarea" ?
                                "col-span-2"
                            :   "",
                        )}
                    >
                        <p className="text-xs text-muted-foreground">
                            {field.form_field.label}
                        </p>
                        <p>
                            {field.form_field.type === "phone" ?
                                formatPhoneNumber(field.answer)
                            : Array.isArray(field.answer) ?
                                field.answer.join(", ")
                            :   field.answer}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
