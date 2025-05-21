import Modal from "@/components/custom/modal"
import Header from "@/components/header"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import CustomerCreate from "@/pages/customers/customer-create"
import LogisticsCreate from "@/pages/logistics/logis-create"
import ProductsCreate from "@/pages/settings/products-stations/products/products-create"
import StationsCreate from "@/pages/settings/products-stations/stations/stations-create"
import CitiesCreate from "@/pages/settings/regions/cities/cities-create"
import CountriesCreate from "@/pages/settings/regions/countries/countries-create"
import ContainerCreate from "@/pages/settings/transport-container/container/container-create"
import TransportCreate from "@/pages/settings/transport-container/transport/transport-create"
import WareHouseCreate from "@/pages/warehouse/warehouse-create"
import { ReactNode } from "@tanstack/react-router"

type Props = {
    children: ReactNode
    title?: string
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
}

const PageLayout = ({
    title,
    children,
    leftChildren,
    rigthChildren,
}: Props) => {
    const { open } = useSidebar()
    return (
        <div className="w-full">
            <div
                className={cn(
                    "fixed top-0 right-0  z-10 transition-[width,height,padding] ",
                    open
                        ? "lg:w-[calc(100%-238px)] duration-300 w-full"
                        : "lg:w-[calc(100%-47px)] duration-200 w-full",
                )}
            >
                <Header
                    title={title}
                    leftChildren={leftChildren}
                    rigthChildren={rigthChildren}
                />
            </div>
            <main className="flex xl:gap-2 px-4 md:px-6 pt-24  relative ">
                {children}
            </main>
            <Modal
                size="max-w-2xl"
                title="Yangi mijoz qo'shish"
                modalKey="customer-modal"
            >
                <CustomerCreate />
            </Modal>
             <Modal
                size="max-w-2xl"
                title="Yangi Avto qo'shish"
                modalKey="warehouse-modal"
            >
                <WareHouseCreate />
            </Modal>
            <Modal
                size="max-w-2xl"
                title="Yangi logist qo'shish"
                modalKey="logis-modal"
            >
                <LogisticsCreate />
            </Modal>
            <Modal title="Mahsulot qo'shish" modalKey="product-modal">
                <ProductsCreate />
            </Modal>
            <Modal title="Stansiya qo'shish" modalKey="stations-modal">
                <StationsCreate />
            </Modal>
            <Modal title="Konteyner turini qo'shish" modalKey="container-modal">
                <ContainerCreate />
            </Modal>
            <Modal title="Transport qo'shish" modalKey="transport-modal">
                <TransportCreate />
            </Modal>
            <Modal title="Davlat qo'shish" modalKey="countries-modal">
                <CountriesCreate />
            </Modal>{" "}
            <Modal title="Shahar qo'shish" modalKey="cities-modal">
                <CitiesCreate />
            </Modal>
        </div>
    )
}

export default PageLayout
