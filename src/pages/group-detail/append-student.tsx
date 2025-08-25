import { FormDatePicker } from "@/components/form/date-picker"
import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS, OPTION_STUDENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useParams } from "@tanstack/react-router"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { studentStatusKeys } from "../students/student-status"
import StudentSelector from "@/components/form/student-selector"
import { Trash } from "lucide-react"
import { FormNumberInput } from "@/components/form/number-input"
import FormInput from "@/components/form/input"

type MultiStudent = Student & {
    discount: {
        amount: number | string
        reason?: string
    }
    start_date: string
    status: string
}

type Fields = {
    student: number
    group: number
    start_date: string
    discount: {
        amount: number
        reason?: string
    }
    status: string
    students: MultiStudent[]
}

type ErrorType = {
    group_students: MultiStudent[]
}

export default function AppendStudent({
    onSuccess,
}: {
    onSuccess: () => void
}) {
    const { id } = useParams({ strict: false })
    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("append-student")

    const { data } = useGet<Student[]>(OPTION_STUDENT, {
        params: { search, exclude_group: id },
    })

    const { mutate, isPending } = usePost({
        onSuccess() {
            onSuccess()
            closeModal()
        },
    })

    const form = useForm<Fields>({
        defaultValues: {
            group: Number(id),
            start_date: format(new Date().toISOString(), "yyyy-MM-dd"),
            status: "1",
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "students",
        keyName: "key",
    })

    const wStudents = form.watch("students")?.map((f) => f.id)

    function showError(state: Record<string, any>, prefix: string) {
        for (const [k, v] of Object.entries(state)) {
            if (typeof v === "string" || v.length) {
                form.setError(`${prefix}${k}` as any, {
                    type: "server",
                    message: v,
                })
            } else if (typeof v === "object" && v !== null) {
                showError(v, `${prefix}${k}.`)
            }
        }
    }

    function normalizeDiscount(discount?: {
        amount?: number | string
        reason?: string
    }) {
        if (discount?.amount && discount?.reason) {
            return {
                amount: discount.amount,
                reason: discount.reason,
            }
        }
        return undefined
    }

    function buildPayload(v: Fields): { group_students: any[] } {
        return {
            group_students: v.students.map((st) => ({
                group: v.group,
                student: st.id,
                start_date: st.start_date,
                status: st.status,
                discount: normalizeDiscount(st.discount),
            })),
        }
    }

    function onSubmit(v: Fields) {
        const payload = buildPayload(v)

        mutate(GROUP_STUDENTS, payload, {
            onError(err) {
                const errors = err.response.data as ErrorType
                errors.group_students.forEach((element, i) =>
                    showError(element, `students.${i}.`),
                )
            },
        })
    }

    function handleSelect(id: string) {
        if (fields.every((u) => u.id !== Number(id))) {
            const s = data?.find((st) => st.id.toString() == id)!
            append({
                ...s,
                discount: {
                    amount: "",
                },
                status: "1",
                start_date: format(new Date().toISOString(), "yyyy-MM-dd"),
            })
        }
    }

    useEffect(() => {
        if (data && data?.length == 1) {
            // form.setValue("student", data.results[0].id)
        }
    }, [data])

    return (
        <form
            className="flex flex-col gap-2 pt-2"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <StudentSelector
                options={data ?? []}
                onSearchChange={setSearch}
                handleSelect={handleSelect}
                phoneKey="phone"
                selectedValues={wStudents}
            />

            <div className="flex flex-col gap-2 rounded-md border py-2 max-h-[500px] overflow-y-auto my-2">
                {fields.map((usr, i) => (
                    <div
                        className="flex w-full items-end bg-card px-4 rounded gap-2"
                        key={usr.key}
                    >
                        <div className="grid grid-cols-5 py-2 gap-2 items-start">
                            <p className="w-full h-full pt-6 text-sm">
                                {usr.full_name}
                                <FormNumberInput
                                    control={form.control}
                                    name={`students.${i}.id`}
                                    label="id"
                                    wrapperClassName="h-0 w-0 overflow-hidden"
                                />
                            </p>

                            <FormSelect
                                options={Object.entries(studentStatusKeys)?.map(
                                    ([id, name]) => ({ id, name }),
                                )}
                                control={form.control}
                                name={`students.${i}.status`}
                                labelKey="name"
                                valueKey="id"
                                className="bg-secondary h-10 border-none"
                                wrapperClassName="!max-w-auto"
                                label="Holati"
                                required
                            />

                            <FormDatePicker
                                control={form.control}
                                name={`students.${i}.start_date`}
                                label="Qo'shilish sanasi"
                                className="!max-w-auto !w-auto"
                                required
                            />

                            <FormNumberInput
                                control={form.control}
                                name={`students.${i}.discount.amount`}
                                label="Chegirma (ixtiyoriy)"
                                placeholder="Kurs narxi"
                                allowLeadingZeros
                            />

                            <FormInput
                                methods={form}
                                name={`students.${i}.discount.reason`}
                                label="Chegirma sababi"
                            />
                        </div>
                        <Trash
                            className="text-rose-500 size-4 cursor-pointer mb-5"
                            onClick={() => remove(i)}
                        />
                    </div>
                ))}
            </div>

            <Button className="w-full" loading={isPending} autoFocus>
                Yaratish
            </Button>
        </form>
    )
}
