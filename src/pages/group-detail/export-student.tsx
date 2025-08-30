import { FormCombobox } from '@/components/form/combobox'
import { FormDatePicker } from '@/components/form/date-picker'
import { FormSelect } from '@/components/form/select'
import { Button } from '@/components/ui/button'
import { OPTION_GROUPS } from '@/constants/api-endpoints'
import { useGet } from '@/hooks/useGet'
import { useForm } from 'react-hook-form'
import { newStudentStatusKeys } from '../students/student-status'
import { useStore } from '@/hooks/use-store'
import { usePost } from '@/hooks/usePost'
import { useMemo, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useParams } from '@tanstack/react-router'
import useMe from '@/hooks/useMe'
import Select from '@/components/ui/select'

export default function ExportStudent({ onSuccess }: { onSuccess?: () => void }) {
    const { store } = useStore<GroupStudent>("student-data")
    const { closeModal } = useModal('export-student')
    const { id } = useParams({ strict: false })
    const { data: user, active_branch } = useMe()

    const [branch, setBranch] = useState<number>(Number(active_branch))

    const { data } = useGet<Group[]>(OPTION_GROUPS, {
        params: {
            branch
        }
    })
    const options = useMemo(() => data?.filter(g => g.id !== Number(id))?.map(gr => ({ ...gr, name: `${gr.name} - ${gr.teacher_name}` })) ?? [], [data])

    const form = useForm<Student>({
        defaultValues: {
            status: '1',
        }
    })

    const { control, watch, handleSubmit, reset } = form

    const { mutate, isPending } = usePost()

    const val = watch()

    function onSubmit(vals: Student) {
        const payload = {
            start_date: vals.start_date,
            group_student: store?.id,
            group: vals.group_data.group,
            status: vals.status
        }

        mutate('platform/group-students/exchange', payload, {
            onError(error) {
                const ers = error.response?.data
                if (ers.group) {
                    form.setError('group_data.group', {
                        type: "validate",
                        message: ers.group
                    })
                }
                if (ers.start_date) {
                    form.setError("start_date", {
                        type: "validate",
                        message: ers.start_date
                    })
                }
            },
            onSuccess() {
                reset()
                closeModal()
                onSuccess?.()
            }
        })
    }

    const [fromDate, toDate] = useMemo(() => {
        const gr = data?.find(t => t.id == val?.group_data?.group)

        if (gr?.start_date && gr?.end_date) {
            form.setValue('start_date', gr?.start_date)
            return [new Date(gr?.start_date), new Date(gr.end_date)]
        } else return [undefined, undefined]
    }, [val?.group_data?.group])

    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Select
                label="Oy bo'yicha"
                options={user?.branches ?? []}
                labelKey="name"
                valueKey="id"
                value={branch}
                setValue={(v) => setBranch(Number(v))}
            />

            <FormCombobox
                options={options}
                control={control}
                name="group_data.group"
                label='Guruh tanlang'
                labelKey="name"
                valueKey="id"
                required
            />

            <FormSelect
                options={Object.entries(
                    newStudentStatusKeys,
                )?.map(([id, name]) => ({
                    id,
                    name,
                }))}
                control={control}
                name={'status'}
                labelKey="name"
                valueKey="id"
                className="bg-secondary h-10 border-none"
                wrapperClassName="!max-w-auto"
                label="Holati"
                required
            />

            <FormDatePicker
                required
                control={control}
                name="start_date"
                className="!w-full"
                label={val.status == '1' ? "Aktivlashish sanasi" : "Guruhga qo'shilish sanasi"}
                calendarProps={{ fromDate, toDate }}
            />

            <Button loading={isPending}>Qo'shish</Button>
        </form>
    )
}
