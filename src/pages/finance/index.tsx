import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import CostAndIncomeMain from "./reports"
import ParamTabList, { ParamTabProvider } from "@/components/as-params/tab"
import { cn } from "@/lib/utils"
import { formatMoney } from "@/lib/format-money"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const tabsData = [
    {
        id: "income",
        name: "Kirim",
    },
    {
        id: "cost",
        name: "Chiqim",
    },
]

const FinanceMain = () => {
    const { openModal } = useModal("create-category")
    const onAddTabs = () => {
        console.log("text-primary")
    }
    return (
        <div className="w-full space-y-3">
            <ParamTabProvider paramName="tabs">
                <Card>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <ParamTabList
                                options={tabsData}
                                paramName="tabs"
                                wrapperClassName="w-auto"
                                listClassName="h-auto gap-1 bg-transparent"
                                renderOption={(item, actv) => (
                                    <div
                                        className={cn(
                                            "px-2 py-2 min-w-32 border rounded-md",
                                            actv ? "text-primary" : "",
                                        )}
                                    >
                                        <p>{item.name}</p>
                                        <p
                                            className={cn(
                                                "text-muted-foreground",
                                            )}
                                        >
                                            {formatMoney(40050000)}
                                        </p>
                                    </div>
                                )}
                            />
                            <div
                                className={cn(
                                    "px-2 py-[16px] min-w-20 border rounded-md text-sm flex items-center justify-center cursor-pointer hover:bg-secondary",
                                )}
                                onClick={openModal}
                            >
                                <Plus className="text-primary" />
                            </div>
                        </div>
                        <CostAndIncomeMain />
                    </CardContent>
                </Card>
            </ParamTabProvider>

            <Modal
                modalKey="create-category"
                title="Kategoriya yaratish"
                size="max-w-md"
            >
                <form className="flex flex-col gap-2">
                    <Input placeholder={"Misol: Boshqa xarajatlar"} fullWidth />
                    <Button className="w-full">Yaratish</Button>
                </form>
            </Modal>
            {/* <div className="grid gap-4 lg:grid-cols-2">
                <ChartColumn />
                <FinanceStatus />

                <Card className="lg:col-span-3">
                    <CardContent>
                        <h3 className="text-lg mb-4 font-semibold">
                            Bo'limlar Daromadi
                        </h3>
                        <BarChartLabel />
                    </CardContent>
                </Card>
            </div> */}
        </div>
    )
}

export default FinanceMain
