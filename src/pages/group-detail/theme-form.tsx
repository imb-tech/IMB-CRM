import { FileInput } from "@/components/form/file-input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import FormTextarea from "@/components/form/textarea"

export default function ThemeForm() {
    const form = useForm<GroupExam>()

    function handleSubmit(vals: GroupExam) {
        console.log(vals)
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-3 flex flex-col gap-4 min-h-[320px]">
                <FormTextarea
                    methods={form}
                    name="name"
                    label="Mavzu"
                    placeholder="Misol: CRM loyixalari tuzilmasi"
                    required
                />

                <FileInput
                    control={form.control}
                    name="files"
                    maxFiles={5}
                    label="Qo'shimcha fayllar"
                    className="bg-secondary"
                />
            </div>

            <Button className="ml-auto block">Yaratish</Button>
        </form>
    )
}
