import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SALARIES } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { teacherSalaryTypes } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AttachSalary = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${SALARIES}-add`)
    const { store, remove } = useStore<EmployeeSalary>(`${SALARIES}-data`)
    const [tab, setTab] = useState<"percentage" | "student">("percentage")

    const form = useForm<EmployeeSalary>({
        defaultValues: store ? store : undefined,
    })

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        remove()
        form.reset()
        closeModal()
        queryClient.invalidateQueries({ queryKey: [SALARIES] })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    const disabled = isPending || isPatching

    const onSubmit = (salary_types: EmployeeSalary) => {
        const isStudent = tab === "student"

        const formFields = {
            ...salary_types,
            percentage_salary: isStudent ? 0 : salary_types?.percentage_salary,
            salary_type:
                isStudent ? "by_student_amount" : salary_types?.salary_type,
            per_student_salary:
                isStudent ? salary_types?.per_student_salary : 0,
        }

        if (formFields?.id) {
            patch(`${SALARIES}/${formFields?.id}`, formFields)
        } else {
            mutate(SALARIES, formFields)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
        >
            <FormInput
                required
                methods={form}
                name="full_name"
                autoComplete="off"
                label="Hodim"
                disabled
            />
            <FormNumberInput
                required
                control={form.control}
                thousandSeparator=" "
                name="static_salary"
                label="Fixed maosh"
                placeholder="0"
            />

            {store?.role_name === "teacher" && (
                <Tabs
                    value={tab}
                    className="flex flex-col gap-2"
                    onValueChange={(v) => setTab(v as typeof tab)}
                >
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="percentage">
                            {"Foiz ulush (%)"}
                        </TabsTrigger>
                        <TabsTrigger value="student">
                            Bitta o'quvchi uchun
                        </TabsTrigger>
                    </TabsList>
                    <div className="flex-col gap-2 py-4 p-6 bg-secondary dark:bg-card rounded-md">
                        <TabsContent
                            value="percentage"
                            className="grid grid-cols-1 items-start gap-2"
                        >
                            <FormSelect
                                control={form.control}
                                options={teacherSalaryTypes ?? []}
                                valueKey="value"
                                label="Maosh turi"
                                name="salary_type"
                                className="h-10 bg-background"
                                labelKey="name"
                                required
                            />
                            <FormNumberInput
                                required
                                control={form.control}
                                maxLength={2}
                                name="percentage_salary"
                                placeholder="0"
                                label="Foiz ulush (%)"
                            />
                        </TabsContent>
                        <TabsContent value="student">
                            <FormNumberInput
                                required
                                control={form.control}
                                name="per_student_salary"
                                placeholder="0"
                                label="Bitta o'quvchi uchun"
                                minLength={4}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            )}

            <div className="md:col-span-2 flex  justify-end">
                <Button
                    className="md:w-max w-full"
                    type="submit"
                    disabled={disabled}
                    loading={disabled}
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default AttachSalary
