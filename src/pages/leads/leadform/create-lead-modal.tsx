import { FormSelect } from "@/components/form/select"
import { FormProvider, useForm } from "react-hook-form"
import { LeadPhones } from "./lead-phones"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/hooks/useModal"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import GetSourceIcon from "../sources/get-source-icon"
import { usePatch } from "@/hooks/usePatch"
import { useParams, useSearch } from "@tanstack/react-router"
import FormInput from "@/components/form/input"

export default function CreateLeadModal() {
    const search = useSearch({ strict: false })
    const { closeModal } = useModal()
    const { store } = useStore<Lead>("lead-data")
    const { id } = useParams({ strict: false })

    const queryClient = useQueryClient()

    const queryKeyUsers = ["leads/crud", ...Object.values({...search, pipeline: id })]

    const queryKeyStatus = [
        "leads/pipeline/status",
        ...Object.values({ is_active: true, pipeline: id }),
    ]

    const { data: sources } = useGet<Source[]>("leads/common/sources", {
        params: { is_active: true },
    })

    const form = useForm<Lead>({
        defaultValues: store?.id
            ? store
            : {
                  contacts_list: [
                      {
                          phone: "",
                          full_name: "Asosiy raqam",
                          is_main: true,
                      },
                  ],
              },
    })

    function onSuccess() {
        closeModal()
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    const onSubmit = (data: LeadFields) => {
        const vls = {
            ...data,
            status: store?.status,
            contacts_list: data.contacts_list?.map((cnt) => ({
                ...cnt,
                obj_id: cnt.id,
                id: undefined,
            })),
        }
        const oldData = queryClient.getQueryData<Lead[]>(queryKeyUsers) ?? []

        if (data.id) {
            patch(`leads/crud/${data.id}`, vls, {
                onSuccess(item: Lead) {
                    const cfg = oldData?.map((usr) => {
                        if (usr.id == item.id) {
                            return {
                                ...usr,
                                ...item,
                                get_main_contact:
                                    item.contacts?.find((p) => p.is_main)
                                        ?.phone || usr.get_main_contact,
                            }
                        } else return usr
                    })

                    queryClient.setQueryData(queryKeyUsers, cfg)
                    queryClient.removeQueries({
                        queryKey: [`leads/crud/${data?.id}`],
                    })
                },
            })
        } else {
            mutate("leads/crud", vls, {
                onSuccess(item: Lead) {
                    const cfg = [item, ...oldData]
                    queryClient.setQueryData(queryKeyUsers, cfg)
                    queryClient.removeQueries({ queryKey: queryKeyStatus })
                },
            })
        }
    }

    return (
        <FormProvider {...form}>
            <form
                className="w-full flex flex-col gap-3 overflow-y-auto max-h-[500px] px-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormSelect
                    required
                    label={"Manba"}
                    options={sources ?? []}
                    valueKey="id"
                    labelKey="name"
                    control={form.control}
                    name="source"
                    renderOption={(op) => (
                        <div
                            className={cn(
                                "flex items-center gap-2 py-2 px-2",
                                op.id,
                            )}
                        >
                            <span>
                                <GetSourceIcon
                                    {...op}
                                    className="bg-transparent"
                                    size={18}
                                />
                            </span>
                            <span>{op.name}</span>
                        </div>
                    )}
                />

                <FormInput
                    methods={form}
                    name="name"
                    label={"FIO"}
                    required
                    placeholder={"Lid ismi yoki nomi"}
                    autoComplete="off"
                />

                <LeadPhones />

                <Button loading={isPending || isPatching} className="mt-3">
                    {"Saqlash"}
                </Button>
            </form>
        </FormProvider>
    )
}
