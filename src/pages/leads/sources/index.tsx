import Modal from "@/components/custom/modal"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { Pencil, Plus, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import GetSourceIcon, { leadSources } from "./get-source-icon"
import { cn } from "@/lib/utils"
import { usePost } from "@/hooks/usePost"
import DeleteModal from "@/components/custom/delete-modal"
import { useState } from "react"
import { usePatch } from "@/hooks/usePatch"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"

const url = "leads/common/sources"

export default function Sources() {
    const form = useForm<Source>({
        defaultValues: {
            icon: "website",
        },
    })

    const { openModal, closeModal } = useModal()
    const { openModal: openDelete } = useModal("delete")
    const [item, setItem] = useState<Source | null>(null)

    const watchIcon = form.watch("icon")

    const { data, refetch } = useGet<Source[]>(url, {
        params: { is_active: true },
    })

    function onSuccess() {
        closeModal()
        refetch()
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    function handleSubmit(vals: Source) {
        if (vals.id) {
            patch(`${url}/${vals.id}`, vals)
        } else mutate(url, vals)
    }

    return (
        <Card>
            <CardContent>
                <div className="flex mb-3  justify-between items-center gap-3 ">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl">Manbalar ro'yxati</h1>
                        <Badge className="text-sm">{formatMoney(data?.length)}</Badge>
                    </div>

                    <Button
                        onClick={() => {
                            form.setValue("id", 0)
                            form.setValue("name", "")
                            form.setValue("icon", "website")
                            openModal()
                        }}
                        className="sm:w-max w-full"
                    >
                        <Plus size={16} />
                        {"Yangi yaratish"}
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {Number(data?.length) > 0 ? (
                        data?.map((src, index) => (
                            <div
                                className="bg-secondary p-4 rounded-md flex items-center gap-2"
                                key={index}
                            >
                                <span className="p-1 rounded-md">
                                    <GetSourceIcon
                                        {...src}
                                        className="bg-transparent"
                                    />
                                </span>
                                <p className="flex-1">{src.name}</p>
                                <div className="flex gap-5 py-2 justify-end">
                                    <Pencil
                                        size={16}
                                        className="text-primary cursor-pointer"
                                        onClick={() => {
                                            form.reset(src)
                                            openModal()
                                        }}
                                    />
                                    <Trash
                                        onClick={() => {
                                            setItem(src)
                                            openDelete()
                                        }}
                                        size={16}
                                        className="text-rose-500 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-10 flex justify-center">
                            <p className="text-muted-foreground">
                                {"Lid manbalari mavjud emas"}
                            </p>
                        </div>
                    )}
                </div>

                <Modal
                    title={`Yangi manba ${
                        !item?.id ? "qo'shish" : "tahrirlash"
                    }`}
                >
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="pt-2"
                    >
                        <FormInput
                            methods={form}
                            name="name"
                            required
                            label={"Nomi"}
                        />

                        <p className="mt-5">{"Belgi tanlang"}</p>
                        <div className="flex gap-3 flex-wrap pb-3 pt-1">
                            {leadSources?.map((Ic) => {
                                return (
                                    <button
                                        className={cn(
                                            "bg-secondary cursor-pointer rounded-sm p-2 border border-secondary",
                                            watchIcon === Ic.key
                                                ? "border-primary"
                                                : "",
                                        )}
                                        type="button"
                                        onClick={() =>
                                            form.setValue("icon", Ic.key)
                                        }
                                    >
                                        <Ic.icon style={{ color: Ic.color }} />
                                    </button>
                                )
                            })}
                        </div>

                        <Button
                            className="mt-4 w-full"
                            loading={isPending || isPatching}
                        >
                            {"Saqlash"}
                        </Button>
                    </form>
                </Modal>

                <DeleteModal id={item?.id} name={item?.name} path={url} />
            </CardContent>
        </Card>
    )
}
