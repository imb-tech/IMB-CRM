import { ArrowLeft, RotateCcw } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormSelect } from "@/components/form/select"
import { Link, useParams, useSearch } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { FormProvider, useForm } from "react-hook-form"
import { LeadPhones } from "./lead-phones"
import useLeadStatuses from "../use-lead-statuses"
import { usePatch } from "@/hooks/usePatch"
import FormInput from "@/components/form/input"

export default function CreateLeadForm({ data }: { data?: Lead }) {
    const form = useForm<Lead>({
        defaultValues: {
            ...data,
            contacts_list: data?.contacts,
        },
    })
    const { data: statuses } = useLeadStatuses()
    const { id } = useParams({ strict: false })
    const { pipeline } = useSearch({ strict: false })

    const { mutate, isPending } = usePatch()

    const onSubmit = (data: Lead) => {
        if (data?.condition === "loosed" || data?.condition === "success") {
            return
        }
        mutate(
            `leads/crud/${data.id}`,
            {
                ...data,
                contacts: undefined,
            },
            {
                onSuccess() {
                    form.reset(data)
                },
            },
        )
    }
    const watchedData = form.watch()

    return (
        <FormProvider {...form}>
            <form
                className="w-full flex flex-col gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* Header */}
                <Card className="border-none">
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <Link
                                search={{ pipeline }}
                                to="/leads/varonka/$id"
                                className={cn(
                                    "text-sidebar-foreground",
                                    buttonVariants({
                                        variant: "default",
                                        size: "sm",
                                    }),
                                )}
                                type="button"
                                params={{
                                    id: id?.toString()!,
                                }}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <h1 className="text-lg font-medium text-sidebar-foreground flex-1">
                                {watchedData.name}
                            </h1>
                            <div className="text-muted-foreground text-sm">
                                #{watchedData.id}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 px-2 my-6">
                            <FormSelect
                                label={"Holati"}
                                options={
                                    statuses?.map((st) => ({
                                        ...st,
                                        name: st.name,
                                    })) ?? []
                                }
                                valueKey="id"
                                labelKey="name"
                                control={form.control}
                                name="status"
                            />

                            <FormInput
                                methods={form}
                                name="name"
                                label={"Ism"}
                                required
                                placeholder={"Lid ismi yoki nomi"}
                            />

                            <LeadPhones />

                            <div
                                className={cn(
                                    "mt-3 grid grid-cols-1",
                                    form.formState.isDirty ? "grid-cols-2" : "",
                                )}
                            >
                                {form.formState.isDirty && (
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        onClick={() => form.reset()}
                                        className="text-rose-500 hover:text-rose-500/80 hover:bg-rose-500/10"
                                    >
                                        <RotateCcw />
                                        {"Qaytarish"}
                                    </Button>
                                )}
                                <Button loading={isPending}>{"Saqlash"}</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </FormProvider>
    )
}
