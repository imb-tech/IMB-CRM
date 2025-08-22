import { FileInput } from "@/components/form/file-input"
import { Button } from "@/components/ui/button"
import { useFormContext } from "react-hook-form"
import FormTextarea from "@/components/form/textarea"

export default function ThemeForm({ loading }: { loading: boolean }) {
    const form = useFormContext<GroupModule>()

    return (
        <div>
            <div className="mb-3 flex flex-col gap-4 min-h-[320px]">
                <FormTextarea
                    methods={form}
                    name="title"
                    label="Mavzu"
                    placeholder="Misol: CRM loyixalari tuzilmasi"
                    required
                />

                <FormTextarea
                    methods={form}
                    name="description"
                    label="Qo'shimcha izoh"
                    placeholder="Ixtiyoriy"
                />

                <FileInput
                    control={form.control}
                    name="uploaded_files"
                    maxFiles={5}
                    label="Qo'shimcha fayllar"
                    className="bg-secondary"
                    acceptedTypes={[".pdf"]}
                />
            </div>

            <Button className="ml-auto block" loading={loading}>
                Yaratish
            </Button>
        </div>
    )
}
