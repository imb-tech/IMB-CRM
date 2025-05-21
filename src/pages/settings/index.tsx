import ParamTabs from "@/components/as-params/tabs"
import ProductsStationsPages from "./products-stations"
import TransportContainerPages from "./transport-container"
import RegionsPages from "./regions"

const tab = [
    {
        value: "1",
        label: "Mahsulotlar va Stansiyalar",
        content: <ProductsStationsPages />,
    },
    {
        value: "2",
        label: "Transport va Konteyner",
        content: <TransportContainerPages />,
    },
    {
        value: "3",
        label: "Regionlar",
        content: <RegionsPages />,
    },
]

export const SettingsPages = () => {
    return (
        <div className="w-full">
            <div className="mb-5 flex justify-between items-center gap-4">
                <ParamTabs options={tab} />
            </div>
        </div>
    )
}
