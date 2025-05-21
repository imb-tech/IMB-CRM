import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { INVENTORY, INVENTORY_CAR } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { DataTable } from "@/components/ui/datatable"
import { useWarehouseCreateColumns } from "./columns-create"
import { useTypedStoreData } from "@/hooks/useStoreData"

const WareHouseCreate = () => {
    const { closeModal } = useModal("warehouse-modal")
    const { storeData } = useTypedStoreData<WarehouseType[]>()

    const form = useForm<{ car_number: string }>()

    const queryClient = useQueryClient()
    const { mutate: createMutate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli qo'shildi")
            queryClient.invalidateQueries({ queryKey: [INVENTORY] })
            form.reset()
            closeModal()
        },
    })

    const onSubmit = (data: { car_number: string }) => {
        if (!storeData) return toast.info("Ma'lumot topilmadi")

        createMutate(INVENTORY_CAR, {
            ...data,
            inventory_orders: storeData.map((item) => ({
                inventory: item.id,
                product_quantity: item.load.product_quantity,
                product_weight: item.load.product_weight,
            })),
        })
    }

    const columns = useWarehouseCreateColumns()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
                required
                methods={form}
                name="car_number"
                label="Mashina raqami"
            />
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="!border-none">
                    <AccordionTrigger className="!bg-transparent p-0 py-2  hover:no-underline !text-normal text-sm ">
                        Tanlangan yuklar: {storeData?.length}
                    </AccordionTrigger>
                    <AccordionContent>
                        <DataTable
                            columns={columns}
                            data={storeData || []}
                            viewAll={true}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex justify-end ">
                <Button
                    disabled={isPendingCreate}
                    loading={isPendingCreate}
                    type="submit"
                >
                    Tasdiqlash
                </Button>
            </div>
        </form>
    )
}

export default WareHouseCreate
