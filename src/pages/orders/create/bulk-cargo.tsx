import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import { FormNumberInput } from "@/components/form/number-input"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    CONTAINER_TYPE,
    CONTAINERS_BULK_CARGO,
    PRODUCT,
    REGION,
    TRANSPORT,
    USERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { Copy, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { options } from "./whole-load"
import { usePost } from "@/hooks/usePost"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { usePatch } from "@/hooks/usePatch"

type ClientType = {
    customer: number | null
    loading_address: string
    location_url: string
    product: number | null
    product_volume: string | null
    product_weight: string | null
}

type FormType = {
    container_type: number | null
    quality: number | null
    transport: number | null
    load_date: string | null
    destination_region: number | null
    destination_address: string
    comment: string
    agents: number[]
    loads: ClientType[]
}

function BulkCargo() {
    const id: { id: number } = useParams({ strict: false })
    const [search, setSearch] = useState({
        container: "",
        transport: "",
        customer: "",
        agents: "",
        cities: "",
        product: "",
    })
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { openModal: openModalProductAdd } = useModal("product-modal")
    const { openModal: openModalCitiesAdd } = useModal("cities-modal")
    const { openModal: openModalContainerAdd } = useModal("container-modal")
    const { openModal: openModalTransportAdd } = useModal("transport-modal")

    const { data: dataCargo } = useGet<ApiCargoResponse>(
        `${CONTAINERS_BULK_CARGO}/${id?.id}`,
        {
            options: { enabled: !!id.id },
        },
    )

    const { data: dataContainer, isLoading: isLoadingContainer } =
        useGet<ContainerResults>(CONTAINER_TYPE, {
            params: { page_size: 50, search: search.container },
        })
    const { data: dataTransport, isLoading: isLoadingTransport } =
        useGet<TransportResults>(TRANSPORT, {
            params: { page_size: 50, search: search.transport },
        })
    const { data: dataUsers, isLoading: isLoadingUsers } =
        useGet<CustomersTypeResults>(USERS, {
            params: { page_size: 50, role: 3, search: search.customer },
        })
    const { data: dataLogist, isLoading: isLoadingLogist } =
        useGet<CustomersTypeResults>(USERS, {
            params: { page_size: 50, role: 2, search: search.agents },
        })
    const { data: dataCities, isLoading: isLoadingCities } =
        useGet<CitiesResults>(REGION, {
            params: { page_size: 50 },
        })
    const { data: dataProducts, isLoading: isLoadingProducts } =
        useGet<ProductResults>(PRODUCT, {
            params: { page_size: 50, search: search.product },
        })

    const form = useForm<FormType>({
        defaultValues: {
            agents: [],
            comment: "",
            container_type: null,
            destination_address: "",
            destination_region: null,
            load_date: null,
            quality: null,
            transport: null,
            loads: [
                {
                    customer: null,
                    loading_address: "",
                    location_url: "",
                    product: null,
                    product_volume: null,
                    product_weight: null,
                },
            ],
        },
    })

    const { fields, append, remove, insert } = useFieldArray({
        control: form.control,
        name: "loads",
    })

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyat yaratildi")
            form.reset()
            navigate({ to: "/" })
        },
    })

    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CONTAINERS_BULK_CARGO],
            })
            toast.success("Muvaffaqiyat yangilandi")
        },
    })

    const copyClient = (index: number) => {
        const containerToCopy = form.getValues(`loads.${index}`)
        insert(index + 1, containerToCopy)
    }

    const addNewClient = () => {
        append({
            customer: null,
            loading_address: "",
            location_url: "",
            product: null,
            product_weight: null,
            product_volume: null,
        })
    }

    const onSubmit = (data: FormType) => {
        const formattedData = {
            container: {
                container_type: data.container_type,
                comment: data.comment,
                quality: data.quality,
                transport: data.transport,
                load_date: data.load_date,
                destination_region: data.destination_region,
                destination_address: data.destination_address,
                loads: data.loads.map((client) => client),
            },
            agents: data.agents,
        }
        if (!!id?.id) {
            mutateUpdate(`${CONTAINERS_BULK_CARGO}/${id?.id}`, formattedData)
        } else {
            mutateCreate(CONTAINERS_BULK_CARGO, formattedData)
        }
    }

    const handleChange = (key: string, value: string) => {
        setSearch((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    useEffect(() => {
        if (dataCargo?.id) {
            const transformedData: FormType = {
                container_type: dataCargo.container_type ?? null,
                quality: dataCargo.quality ?? null,
                transport: dataCargo.transport ?? null,
                load_date: dataCargo.load_date ?? null,
                destination_region: dataCargo.destination_region?.id ?? null,
                destination_address: dataCargo.destination_address ?? "",
                comment: dataCargo.comment ?? "",
                agents: dataCargo.agent ? [dataCargo.agent.id] : [],
                loads: dataCargo.loads.map((load: any) => ({
                    customer: load.customer?.id ?? null,
                    loading_address: load.loading_address ?? "",
                    location_url: load.location_url ?? "",
                    product: load.product?.id ?? null,
                    product_volume: load.product_volume ?? null,
                    product_weight: load.product_weight ?? null,
                })),
            }

            form.reset(transformedData)
        }
    }, [dataCargo])

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
        >
            <Card>
                <CardContent className="space-y-2 pt-6">
                    <h1 className="text-lg font-semibold">
                        Konteyner ma'lumotlari
                    </h1>
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 border border-input rounded-lg px-3 py-4">
                        <FormCombobox
                            isLoading={isLoadingContainer}
                            options={dataContainer?.results}
                            valueKey="id"
                            labelKey="name"
                            control={form.control}
                            name="container_type"
                            label="Konteyner turi"
                            required
                            placeholder="40 HQ"
                            onAdd={openModalContainerAdd}
                            onSearchChange={(val) =>
                                handleChange("container", val)
                            }
                        />
                        <FormSelect
                            options={options}
                            control={form.control}
                            name="quality"
                            label="Holati"
                            required
                        />
                        <FormCombobox
                            options={dataTransport?.results}
                            isLoading={isLoadingTransport}
                            valueKey="id"
                            labelKey="name"
                            control={form.control}
                            name="transport"
                            label="Transport turi"
                            required
                            placeholder="Temir yo'l"
                            onAdd={openModalTransportAdd}
                            onSearchChange={(val) =>
                                handleChange("transport", val)
                            }
                        />
                        <FormDatePicker
                            control={form.control}
                            name="load_date"
                            label="Yuklash sanasi"
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                            <h1 className="text-lg font-semibold">
                                Mijoz #{index + 1}
                            </h1>
                            <div className="relative  rounded-lg p-3  dark:bg-card dark:border bg-slate-100">
                                <div className="flex space-x-2 absolute right-3 bottom-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => copyClient(index)}
                                        className={
                                            fields.length > 1 ? "" : "px-12"
                                        }
                                    >
                                        <Copy className="h-4 min-w-4" />
                                    </Button>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="text-red-500"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <FormCombobox
                                        isLoading={isLoadingUsers}
                                        options={dataUsers?.results}
                                        valueKey="id"
                                        labelKey="full_name"
                                        control={form.control}
                                        name={`loads.${index}.customer`}
                                        label="Mijoz ismi"
                                        required
                                        onSearchChange={(val) =>
                                            handleChange("customer", val)
                                        }
                                    />
                                </div>
                                <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 xl:pr-28 sm:pb-0 pb-16">
                                    <FormInput
                                        methods={form}
                                        name={`loads.${index}.loading_address`}
                                        label="Yuklash manzili"
                                        required
                                        placeholder="Joy nomi"
                                    />
                                    <FormInput
                                        methods={form}
                                        name={`loads.${index}.location_url`}
                                        type="url"
                                        label="Yuklash manzili (URL)"
                                        required
                                        placeholder="Joylashuv (URL from map)"
                                    />
                                    <FormCombobox
                                        isLoading={isLoadingProducts}
                                        options={dataProducts?.results}
                                        valueKey="id"
                                        labelKey="name"
                                        control={form.control}
                                        name={`loads.${index}.product`}
                                        label="Mahsulot nomi"
                                        required
                                        onAdd={openModalProductAdd}
                                        onSearchChange={(val) =>
                                            handleChange("product", val)
                                        }
                                    />

                                    <FormNumberInput
                                        control={form.control}
                                        name={`loads.${index}.product_weight`}
                                        label="Mahsulot vazni"
                                        required
                                        placeholder="26 tonna"
                                    />
                                    <FormNumberInput
                                        control={form.control}
                                        name={`loads.${index}.product_volume`}
                                        label="Mahsulot hajmi"
                                        required
                                        placeholder="68 Kb"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-full md:min-h-20 md:min-w-20 h-14 w-14  bg-slate-100 dark:bg-background "
                            onClick={addNewClient}
                        >
                            <Plus className="md:h-11 md:w-11 min-w-8 min-h-8 p-1 dark:text-white rounded-full hover:bg-muted" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2 pt-6">
                    <h1 className="text-lg font-semibold">
                        Yetkazib berish ma'lumotlari
                    </h1>
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <FormCombobox
                            control={form.control}
                            isLoading={isLoadingCities}
                            name="destination_region"
                            label="Yetkazib berish shahri"
                            placeholder="Shahar"
                            required
                            onAdd={openModalCitiesAdd}
                            options={dataCities?.results}
                            valueKey="id"
                            labelKey="name"
                            onSearchChange={(val) =>
                                handleChange("cities", val)
                            }
                        />
                        <FormInput
                            methods={form}
                            name="destination_address"
                            label="Yetkazib berish manzili"
                            required
                        />
                        <FormTextarea
                            methods={form}
                            name="comment"
                            label="Izoh"
                            required
                            placeholder="Izoh..."
                            wrapperClassName="lg:col-span-4 sm:col-span-2"
                            rows={5}
                        />
                        <div className="lg:col-span-4 sm:col-span-2">
                            <FormMultiCombobox
                                isLoading={isLoadingLogist}
                                options={dataLogist?.results}
                                valueKey="id"
                                labelKey="full_name"
                                control={form.control}
                                name="agents"
                                label="Logistni tanlang"
                                returnVal="id"
                                required
                                onSearchChange={(val) =>
                                    handleChange("agents", val)
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button
                disabled={isPendingCreate || isPendingUpdate}
                loading={isPendingCreate || isPendingUpdate}
                type="submit"
                className="sm:w-max w-full px-12 float-end"
            >
                Saqlash
            </Button>
        </form>
    )
}

export default BulkCargo
