import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFieldArray, useFormContext } from "react-hook-form"
import PhoneField from "@/components/form/phone-field"
import { useCallback } from "react"

export function LeadPhones() {
    const form = useFormContext<Lead>()

    const { fields, remove, append } = useFieldArray({
        control: form.control,
        name: "contacts_list",
        keyName: "key",
    })
    const lenPhones = fields.length

    const addPhone = useCallback(() => {
        const newPhone: LeadContact = {
            phone: "",
            full_name: "Qo'shimcha raqam",
            is_main: false,
        }
        append(newPhone)
    }, [lenPhones])

    return (
        <div>
            <div className="space-y-3">
                <div className="flex flex-col gap-1">
                    {fields.map((phone, i) => (
                        <div
                            key={phone.key}
                            className="flex items-end gap-3 py-2"
                        >
                            <div className="flex flex-col gap-2 flex-1">
                                <PhoneField
                                    required
                                    placeholder="Telefon raqam"
                                    methods={form}
                                    label={
                                        phone.is_main ?
                                            "Asosy telefon raqam"
                                        :   "Qo'shimcha telefon raqam"
                                    }
                                    name={`contacts_list.${i}.phone`}
                                    inputProps={{ autoComplete: "off" }}
                                />
                            </div>

                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="lg"
                                    onClick={() => remove(i)}
                                    className="text-red-500 bg-red-500/10 hover:text-red-600 hover:bg-red-500/15"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addPhone}
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Qo'shimcha telefon raqam
                    </Button>
                </div>
            </div>
            {form.formState.errors.contacts_list && (
                <p className="text-destructive text-xs mt-2">
                    {form.formState.errors.contacts_list.message}
                </p>
            )}
        </div>
    )
}
