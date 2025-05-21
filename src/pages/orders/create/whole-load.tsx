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
    CONTAINERS,
    CONTAINERS_FULL_CARGO,
    PRODUCT,
    REGION,
    TRANSPORT,
    USERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Copy, Plus, Trash2 } from "lucide-react"
import { FC, useEffect, useState } from "react"
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

export const options = [
    {
        value: "1",
        label: "Yangi",
    },
    {
        value: "2",
        label: "Eski",
    },
]

interface Load {
    loading_address: string
    loading_address_url: string
    product: number | null
    product_quantity: number | null
    product_volume: number | null
    product_weight: number | null
}

interface Container {
    container_type: number | null
    quality: number | null
    transport: number | null
    load_date: string
    loads: Load[]
    destination_address: string
    destination_region: number | null
    comment: string | null
}

interface FormValues {
    customer: number | null
    agents: number[]
    containers: Container[]
}
function WholeLoad() {
    const id: { id: number } = useParams({ strict: false })
    const [searchProducts, setSearchProducts] = useState("")
    const [search, setSearch] = useState({
        container: "",
        transport: "",
        customer: "",
        agents: "",
        cities: "",
    })
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { openModal: openModalProductAdd } = useModal("product-modal")
    const { openModal: openModalCitiesAdd } = useModal("cities-modal")
    const { openModal: openModalCustomerAdd } = useModal("customer-modal")
    const { openModal: openModalContainerAdd } = useModal("container-modal")
    const { openModal: openModalTransportAdd } = useModal("transport-modal")

    const { data: dataCargo } = useGet<ApiCargoResponse>(
        `${CONTAINERS_FULL_CARGO}/${id?.id}`,
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
            params: { page_size: 50, search: search.cities },
        })
    const { data: dataProducts, isLoading: isLoadingProducts } =
        useGet<ProductResults>(PRODUCT, {
            params: { page_size: 50, search: searchProducts },
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
            toast.success("Muvaffaqiyat yangilandi")
            queryClient.invalidateQueries({ queryKey: [CONTAINERS_FULL_CARGO] })
        },
    })

    const form = useForm<FormValues>({
        defaultValues: {
            customer: null,
            agents: [],
            containers: [
                {
                    container_type: null,
                    quality: null,
                    transport: null,
                    load_date: "",
                    loads: [
                        {
                            loading_address: "",
                            loading_address_url: "",
                            product: null,
                            product_quantity: null,
                            product_volume: null,
                            product_weight: null,
                        },
                    ],
                    destination_address: "",
                    destination_region: null,
                    comment: null,
                },
            ],
        },
    })

    const {
        fields: fieldsContainer,
        append: appendContainer,
        remove: removeContainer,
        insert: insertContainer,
    } = useFieldArray({
        control: form.control,
        name: "containers",
    })

    const handleAddContainer = () => {
        appendContainer({
            container_type: null,
            quality: null,
            transport: null,
            load_date: "",
            loads: [
                {
                    loading_address: "",
                    loading_address_url: "",
                    product: null,
                    product_quantity: null,
                    product_volume: null,
                    product_weight: null,
                },
            ],
            destination_address: "",
            destination_region: 0,
            comment: null,
        })
    }
    const copyContainer = (index: number) => {
        const containerToCopy = form.getValues(`containers.${index}`)
        insertContainer(index + 1, containerToCopy)
    }
    const handleRemoveContainer = (index: number) => {
        removeContainer(index)
    }

    const onSubmit = (data: FormValues) => {
        if (!!id?.id) {
            mutateUpdate(`${CONTAINERS}/${id?.id}`, data)
        } else {
            mutateCreate(CONTAINERS_FULL_CARGO, data)
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
            const transformedData: FormValues = {
                customer: dataCargo.loads[0]?.customer?.id || null,
                agents: dataCargo.agent ? [dataCargo.agent.id] : [],
                containers: [
                    {
                        container_type: dataCargo.container_type,
                        quality: dataCargo.quality,
                        transport: dataCargo.transport,
                        load_date: dataCargo.load_date,
                        loads: dataCargo.loads.map((load) => ({
                            loading_address: load.loading_address || "",
                            loading_address_url: "",
                            product: load.product?.id || null,
                            product_quantity: load.product_quantity || null,
                            product_volume: load.product_volume || null,
                            product_weight: load.product_weight || null,
                        })),
                        destination_address:
                            dataCargo.destination_address || "",
                        destination_region:
                            dataCargo.destination_region?.id || null,
                        comment: dataCargo.comment || null,
                    },
                ],
            }

            form.reset(transformedData)
        }
    }, [dataCargo]);
    

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
        >
            <Card>
                <CardContent className="space-y-2">
                    <h1 className="text-lg font-semibold">
                        Mijoz ma'lumotlari
                    </h1>
                    <div className="w-full border border-input rounded-lg p-3">
                        <FormCombobox
                            options={dataUsers?.results}
                            valueKey="id"
                            labelKey="full_name"
                            control={form.control}
                            name="customer"
                            label="Mijozni ismi"
                            required
                            placeholder="Mijozni tanlang"
                            onAdd={openModalCustomerAdd}
                            isLoading={isLoadingUsers}
                            onSearchChange={(val) =>
                                handleChange("container", val)
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4">
                    {fieldsContainer.map((container, index) => (
                        <div className="space-y-2" key={container.id}>
                            <h1 className="text-lg font-semibold">
                                Konteyner #{index + 1}
                            </h1>
                            <div className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1  gap-4 rounded-lg p-3 dark:bg-card dark:border bg-slate-100">
                                <FormCombobox
                                    options={dataContainer?.results}
                                    valueKey="id"
                                    labelKey="name"
                                    control={form.control}
                                    name={`containers.${index}.container_type`}
                                    label="Konteyner turi"
                                    required
                                    placeholder="40 HQ"
                                    onAdd={openModalContainerAdd}
                                    isLoading={isLoadingContainer}
                                    onSearchChange={(val) =>
                                        handleChange("container", val)
                                    }
                                />
                                <FormSelect
                                    options={options}
                                    control={form.control}
                                    name={`containers.${index}.quality`}
                                    label="Holati"
                                    required
                                />
                                <FormCombobox
                                    options={dataTransport?.results}
                                    isLoading={isLoadingTransport}
                                    valueKey="id"
                                    labelKey="name"
                                    control={form.control}
                                    name={`containers.${index}.transport`}
                                    label="Transport turi"
                                    required
                                    placeholder="Temir yo'l"
                                    onAdd={openModalTransportAdd}
                                    onSearchChange={(val) =>
                                        handleChange("transport", val)
                                    }
                                />
                                <div className="w-full">
                                    <FormDatePicker
                                        control={form.control}
                                        name={`containers.${index}.load_date`}
                                        label="Yuklash sanasi"
                                        required
                                    />
                                </div>

                                <ContainerFields
                                    nestIndex={index}
                                    form={form}
                                    dataProducts={dataProducts}
                                    openModalProductAdd={openModalProductAdd}
                                    isLoadingProducts={isLoadingProducts}
                                    setSearchProducts={setSearchProducts}
                                />

                                <FormCombobox
                                    label="Yetkazib berish shahri"
                                    control={form.control}
                                    name={`containers.${index}.destination_region`}
                                    placeholder="Shahar"
                                    required
                                    onAdd={openModalCitiesAdd}
                                    options={dataCities?.results}
                                    isLoading={isLoadingCities}
                                    valueKey="id"
                                    labelKey="name"
                                    onSearchChange={(val) =>
                                        handleChange("cities", val)
                                    }
                                />
                                <FormInput
                                    methods={form}
                                    name={`containers.${index}.destination_address`}
                                    label="Yetkazib berish manzili"
                                    required
                                />
                                <FormTextarea
                                    methods={form}
                                    name={`containers.${index}.comment`}
                                    label="Izoh"
                                    required
                                    placeholder="Izoh..."
                                    wrapperClassName="lg:col-span-4 sm:col-span-2"
                                    rows={4}
                                />
                                <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-4">
                                    <Button
                                        onClick={() => copyContainer(index)}
                                        type="button"
                                        className="w-full md:w-1/6 bg-emerald-500"
                                        icon={<Copy size={18} />}
                                    >
                                        Nusxalash
                                    </Button>
                                    {fieldsContainer.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            icon={<Trash2 size={18} />}
                                            className="text-red-500 w-full md:w-1/4 "
                                            onClick={() =>
                                                handleRemoveContainer(index)
                                            }
                                        >
                                            O'chirish
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-5">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-full md:min-h-20 md:min-w-20 h-14 w-14  bg-slate-100 dark:bg-background "
                            onClick={handleAddContainer}
                        >
                            <Plus className="md:h-11 md:w-11 min-w-8 min-h-8 p-1 dark:text-white rounded-full hover:bg-muted" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2">
                    <h1 className="text-lg font-semibold">
                        Logist ma'lumotlari
                    </h1>
                    <div className="border border-input p-3 rounded-lg">
                        <FormMultiCombobox
                            isLoading={isLoadingLogist}
                            options={dataLogist?.results}
                            valueKey="id"
                            labelKey="full_name"
                            control={form.control}
                            name="agents"
                            label="Logistni tanlang"
                            required
                            onSearchChange={(val) =>
                                handleChange("agents", val)
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            <Button
                disabled={isPendingCreate || isPendingUpdate}
                loading={isPendingCreate || isPendingUpdate}
                type="submit"
                className="sm:w-max w-full px-20 float-end"
            >
                Saqlash
            </Button>
        </form>
    )
}

export default WholeLoad

interface Props {
    nestIndex: number
    form: UseFormReturn<FormValues>
    dataProducts: ProductResults | undefined
    openModalProductAdd: () => void
    setSearchProducts: (val: string) => void
    isLoadingProducts: boolean
}

const ContainerFields: FC<Props> = ({
    nestIndex,
    form,
    dataProducts,
    openModalProductAdd,
    isLoadingProducts,
    setSearchProducts,
}) => {
    const { control } = form
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: `containers.${nestIndex}.loads` as const,
    })

    const handleAddLoad = () => {
        append({
            loading_address: "",
            loading_address_url: "",
            product: null,
            product_quantity: null,
            product_volume: null,
            product_weight: null,
        })
    }

    const copyLoad = (index: number) => {
        const loadToCopy = form.getValues(
            `containers.${nestIndex}.loads.${index}`,
        )
        insert(index + 1, loadToCopy)
    }

    const handleRemoveLoad = (index: number) => {
        remove(index)
    }

    return (
        <>
            {fields.map((field, loadIndex) => (
                <div
                    key={field.id}
                    className="relative  rounded-lg p-3 dark:bg-card dark:border bg-slate-200 lg:col-span-4 sm:col-span-2  "
                >
                    <div className=" grid xl:grid-cols-6 lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-4 ">
                        <FormInput
                            methods={form}
                            name={`containers.${nestIndex}.loads.${loadIndex}.loading_address`}
                            label="Yuklash manzili"
                            required
                        />
                        <FormInput
                            methods={form}
                            name={`containers.${nestIndex}.loads.${loadIndex}.loading_address_url`}
                            label="Yuklash manzili (URL)"
                            type="url"
                            required
                        />
                        <FormCombobox
                            options={dataProducts?.results}
                            valueKey="id"
                            labelKey="name"
                            control={form.control}
                            name={`containers.${nestIndex}.loads.${loadIndex}.product`}
                            label="Mahsulot nomi"
                            required
                            onAdd={openModalProductAdd}
                            isLoading={isLoadingProducts}
                            onSearchChange={setSearchProducts}
                        />
                        <FormNumberInput
                            control={form.control}
                            name={`containers.${nestIndex}.loads.${loadIndex}.product_weight`}
                            label="Mahsulot vazni"
                            required
                        />
                        <FormNumberInput
                            control={form.control}
                            name={`containers.${nestIndex}.loads.${loadIndex}.product_volume`}
                            label="Mahsulot hajmi"
                            required
                        />
                        <div className="flex gap-3 items-end  w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => copyLoad(loadIndex)}
                                className={"w-full"}
                            >
                                <Copy className="h-4 min-w-4" />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleAddLoad}
                                className={"w-full"}
                            >
                                <Plus className="h-4 min-w-4" />
                            </Button>

                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="text-red-500 w-full "
                                    onClick={() => handleRemoveLoad(loadIndex)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
