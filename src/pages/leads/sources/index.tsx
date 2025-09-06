import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { Pencil, Plus, Trash } from "lucide-react"
import GetSourceIcon from "./get-source-icon"
import DeleteModal from "@/components/custom/delete-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"
import CreateSource from "./create-source"
import { useStore } from "@/hooks/use-store"

const url = "leads/common/sources"

export default function Sources() {
    const { openModal } = useModal()
    const { openModal: openDelete } = useModal("delete")
    const { store, setStore } = useStore<Source>("source")

    const { data } = useGet<Source[]>(url, {
        params: { is_active: true },
    })

    return (
        <Card>
            <CardContent>
                <div className="flex mb-3  justify-between items-center gap-3 ">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl">Manbalar ro'yxati</h1>
                        <Badge className="text-sm">
                            {formatMoney(data?.length)}
                        </Badge>
                    </div>

                    <Button
                        onClick={() => {
                            setStore({
                                id: 0,
                                name: "",
                                icon: "website",
                                is_active: true
                            })
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
                                            setStore(src)
                                            openModal()
                                        }}
                                    />
                                    <Trash
                                        onClick={() => {
                                            setStore(src)
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
                    title={`Yangi manba ${!store?.id ? "qo'shish" : "tahrirlash"
                        }`}
                >
                    <CreateSource />
                </Modal>

                <DeleteModal id={store?.id} name={store?.name} path={url} />
            </CardContent>
        </Card>
    )
}
