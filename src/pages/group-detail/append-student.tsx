import { FormCombobox } from "@/components/form/combobox"
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
import {
    newStudentStatusKeys,
    studentStatusKeys,
} from "../students/student-status"
import StudentSelector from "@/components/form/student-selector"
import { Trash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormNumberInput } from "@/components/form/number-input"
import FormInput from "@/components/form/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type MultiStudent = Student & {
    discount: {
        amount: number
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
    setSize,
}: {
    onSuccess: () => void
    setSize: (s: "max-w-md" | "max-w-5xl") => void
}) {
    const { id } = useParams({ strict: false })
    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("append-student")
    const [tab, setTab] = useState<string>("single")

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
            if (typeof v === "string") {
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
        amount?: number
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

    function buildPayload(v: Fields, tab: string): { group_students: any[] } {
        if (tab === "single") {
            return {
                group_students: [
                    {
                        group: v.group,
                        student: v.student,
                        start_date: v.start_date,
                        status: v.status,
                        discount: normalizeDiscount(v.discount),
                    },
                ],
            }
        }

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
        if (!v.student && tab === "single") {
            return form.setError("student", {
                type: "required",
                message: "O'quvchini tanlang",
            })
        }

        const payload = buildPayload(v, tab)

        mutate(GROUP_STUDENTS, payload, {
            onError(err) {
                const errors = err.response.data as ErrorType
                errors.group_students.forEach((element, i) =>
                    showError(
                        element,
                        tab === "single" ? "" : `students.${i}.`,
                    ),
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
                    amount: 0,
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
        <Tabs
            value={tab}
            onValueChange={(t) => {
                setTab(t)
                if (t == "single") {
                    setSize("max-w-md")
                } else setSize("max-w-5xl")
                form.clearErrors()
            }}
        >
            <TabsList>
                <TabsTrigger value="single">Bitta</TabsTrigger>
                <TabsTrigger value="multiple">Bir nechta</TabsTrigger>
            </TabsList>

            <TabsContent value="single">
                <form
                    className="flex flex-col gap-2 pt-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormCombobox
                        key={form.formState.errors.student?.message}
                        control={form.control}
                        name="student"
                        options={data}
                        labelKey="full_name"
                        onSearchChange={(v) => setSearch(v)}
                        valueKey="id"
                        placeholder="O'quvchini tanlang"
                        required
                        renderOption={(item) => (
                            <div className="p-2 flex items-center justify-between w-full">
                                <p>{item.full_name}</p>
                                <p>{item.phone}</p>
                            </div>
                        )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <FormSelect
                            options={Object.entries(newStudentStatusKeys)?.map(
                                ([id, name]) => ({ id, name }),
                            )}
                            control={form.control}
                            name="status"
                            labelKey="name"
                            valueKey="id"
                            className="bg-secondary h-10"
                            label="Holati"
                            required
                        />

                        <FormDatePicker
                            control={form.control}
                            name="start_date"
                            label="Qo'shilish sanasi"
                            className="!w-full"
                            required
                            fullWidth
                        />
                    </div>

                    <Accordion
                        type="single"
                        collapsible
                        className="my-2 bg-secondary rounded-md"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="px-4 py-3 bg-transparent">
                                Chegirma belgilash
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance px-3 border rounded-md bg-card">
                                <div className="flex flex-col gap-2 py-3">
                                    <FormNumberInput
                                        control={form.control}
                                        name="discount.amount"
                                        label="Chegirma (ixtiyoriy)"
                                        required
                                        placeholder="O'quvchi to'laydigan summa"
                                    />

                                    <FormInput
                                        methods={form}
                                        name={"discount.reason"}
                                        label="Chegirma sababi"
                                        required
                                        placeholder="Misol: Yaxshi natijasi uchun"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Button className="w-full" loading={isPending} autoFocus>
                        Yaratish
                    </Button>
                </form>
            </TabsContent>

            <TabsContent value="multiple">
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
                                <div className="grid grid-cols-5 py-2 gap-2 items-center">
                                    <p className="text-sm w-full">
                                        {usr.full_name}
                                    </p>

                                    <FormSelect
                                        options={Object.entries(
                                            studentStatusKeys,
                                        )?.map(([id, name]) => ({ id, name }))}
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
                                        label="Chegirma"
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
            </TabsContent>
        </Tabs>
    )
}
