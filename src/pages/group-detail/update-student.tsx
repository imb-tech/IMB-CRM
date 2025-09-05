import { FormDatePicker } from "@/components/form/date-picker"
import { Button } from "@/components/ui/button"
import { GROUP, GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { handleFormError } from "@/lib/show-form-errors"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { TriangleAlert } from "lucide-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

export default function UpdateStudent() {
    const { store: current, remove } = useStore<GroupStudent>("student-data")
    const { id } = useParams({ strict: false })
    const { closeModal } = useModal("update")

    const form = useForm<GroupStudent>({
        defaultValues: current,
    })
    const qc = useQueryClient()

    const data = useMemo(() => qc.getQueryData<Group>([GROUP + "/" + id]), [id])
    const wd = form.watch()

    const { mutate, isPending } = usePatch()

    function handleSubmit(v: GroupStudent) {
        mutate(
            GROUP_STUDENTS + "/" + v.id,
            {
                start_date: v.start_date,
                activated_date: v.activated_date
            },
            {
                onSuccess() {
                    remove()
                    qc.removeQueries({ queryKey: [GROUP_STUDENTS] })
                    closeModal()
                },
                onError(error) {
                    handleFormError(error, form)
                },
            },
        )
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
            <div className="bg-rose-500/10 p-3 mb-2 rounded text-rose-500 flex gap-2">
                <p>
                    <TriangleAlert className="inline mr-2 mb-1" size={16} />
                    Qo‘shilish sanasini o‘zgartirsangiz, o‘quvchi balansi ham
                    o‘zgarishi mumkin. Ogoh bo‘ling.
                </p>
            </div>

            <FormDatePicker
                label="Guruhga qo'shilgan sana"
                control={form.control}
                name="start_date"
                fullWidth
                className="!w-full"
                calendarProps={{
                    fromDate: new Date(data?.start_date as string),
                    toDate: new Date(data?.end_date as string)
                }}
            />

            <FormDatePicker
                label="Aktivlashtirilgan sana"
                control={form.control}
                name="activated_date"
                fullWidth
                className="!w-full"
                disabled={!wd.start_date}
                calendarProps={{
                    fromDate: new Date(wd.start_date),
                    toDate: new Date(data?.end_date as string)
                }}
            />

            <Button className="w-full mt-4" loading={isPending}>
                Saqlash
            </Button>
        </form>
    )
}
