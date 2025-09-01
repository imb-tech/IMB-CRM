import { FormDatePicker } from "@/components/form/date-picker"
import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS, OPTION_STUDENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useParams, useSearch } from "@tanstack/react-router"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { newStudentStatusKeys, studentStatusKeys } from "../students/student-status"
import StudentSelector from "@/components/form/student-selector"
import { Trash } from "lucide-react"
import { FormNumberInput } from "@/components/form/number-input"
import FormInput from "@/components/form/input"
import { cn } from "@/lib/utils"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { useQueryClient } from "@tanstack/react-query"

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
        amount: number | string
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
    const { date } = useSearch({ strict: false })
    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("append-student")

    const qc = useQueryClient()

    const { data } = useGet<Student[]>(OPTION_STUDENT, {
        params: { search },
    })

    const { data: defaultStudents } = useGet<number[]>(
        `option/active-group-students/${id}`,
    )

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

    const stds = form.watch("students")
    const wStudents = stds?.map((f) => f.id)

    function showError(state: Record<string, any>, prefix: string) {
        for (const [k, v] of Object.entries(state)) {
            if (typeof v === "string" || v.length) {
                form.setError(`${prefix}${k}` as any, {
                    type: "manual",
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
        const nst = v.students.filter((st) => !defaultStudents?.includes(st.id))
        const payload = buildPayload({ ...v, students: nst })


        mutate(GROUP_STUDENTS, payload, {
            onError(err) {
                const errors = err.response.data as ErrorType
                if (errors.group_students) {
                    for (const _ of defaultStudents!) {
                        errors.group_students.unshift({} as MultiStudent)
                    }
                }
                errors.group_students.forEach((element, i) =>
                    showError(element, `students.${i}.`),
                )
            },
        })
    }

    const errors = form.formState.errors

    function handleSelect(id: string) {
        if (fields.every((u) => u.id !== Number(id))) {
            const s = data?.find((st) => st.id.toString() == id)!
            append({
                ...s,
                discount: {
                    amount: "",
                    reason: "Guruhga qo'shishda chegirma berildi"
                },
                status: "1",
                start_date: format(new Date().toISOString(), "yyyy-MM-dd"),
            })
        }
    }

    useEffect(() => {
        if (defaultStudents && data) {
            const md = defaultStudents.map((s) => data.find((c) => c.id == s))
            for (const el of md) {
                if (!wStudents?.includes(el?.id!)) {
                    append({
                        ...el,
                        discount: {
                            amount: "",
                        },
                        status: "1",
                        start_date: format(
                            new Date().toISOString(),
                            "yyyy-MM-dd",
                        ),
                    } as MultiStudent)
                }
            }
        }
    }, [defaultStudents, data])

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

            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto my-2">
                {fields.map(
                    (usr, i) =>
                        !defaultStudents?.includes(usr.id) && (
                            <div
                                className={cn(
                                    "flex flex-col w-full items-center bg-card px-4 rounded-md border py-2",
                                    (errors.students?.[i] as any)?.student &&
                                    "border border-rose-500/50",
                                )}
                                key={usr.key}
                            >
                                <div
                                    className={cn(
                                        "flex w-full items-end gap-2",
                                    )}
                                >
                                    <div className="grid grid-cols-4 py-2 gap-2 items-start w-full">
                                        <div className="w-full h-full flex flex-col pt-4">
                                            <p className="text-sm">
                                                <span>{usr.full_name}</span>
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatPhoneNumber(usr.phone)}
                                            </p>
                                            <FormNumberInput
                                                control={form.control}
                                                name={`students.${i}.id`}
                                                label="id"
                                                wrapperClassName="h-0 w-0 overflow-hidden"
                                            />
                                        </div>

                                        <FormSelect
                                            options={Object.entries(
                                                newStudentStatusKeys,
                                            )?.map(([id, name]) => ({
                                                id,
                                                name,
                                            }))}
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
                                            label={stds[i].status === "0" ? "Qo'shilish sanasi" : "Aktivlashtirish sanasi"}
                                            className="!max-w-auto !w-auto"
                                            required
                                        />

                                        <FormNumberInput
                                            control={form.control}
                                            name={`students.${i}.discount.amount`}
                                            label="Individual narx"
                                            placeholder="Ixtiyoriy"
                                            allowLeadingZeros
                                        />
                                    </div>
                                    <Trash
                                        className="text-rose-500 size-4 cursor-pointer mb-5"
                                        onClick={() => {
                                            remove(i)
                                            form.clearErrors(`students.${i}`)
                                        }}
                                    />
                                </div>
                                {(errors.students?.[i] as any)?.student && (
                                    <span className="text-xs pb-1 text-rose-500">
                                        {
                                            (errors.students?.[i] as any)
                                                ?.student?.message
                                        }
                                    </span>
                                )}
                            </div>
                        ),
                )}
            </div>

            <Button className="w-full" loading={isPending} autoFocus>
                Yaratish
            </Button>
        </form>
    )
}
