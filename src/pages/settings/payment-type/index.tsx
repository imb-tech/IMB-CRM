import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { usePaymentTypeCols } from "./columns"
import { Badge } from "@/components/ui/badge"

const PaymentTypeMain = () => {
    const columns = usePaymentTypeCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">To'lov turi</h1>
                            <Badge variant={"outline"} className="text-sm">
                                {data.length}
                            </Badge>
                        </div>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Qo'shish
                        </Button>
                    </div>
                    <DataTable
                        onDelete={() => {}}
                        onEdit={() => {}}
                        columns={columns}
                        data={data}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default PaymentTypeMain

const data: PaymentType[] = [
    { id: 1, name: "Cash" },
    { id: 2, name: "Credit Card" },
    { id: 3, name: "Debit Card" },
    { id: 4, name: "Bank Transfer" },
    { id: 5, name: "PayPal" },
    { id: 6, name: "Apple Pay" },
    { id: 7, name: "Google Pay" },
    { id: 8, name: "Cryptocurrency" },
    { id: 9, name: "Check" },
    { id: 10, name: "Mobile Payment" },
    { id: 11, name: "Wire Transfer" },
    { id: 12, name: "Voucher" },
    { id: 13, name: "POS" },
    { id: 14, name: "Online Banking" },
    { id: 15, name: "Installments" },
    { id: 16, name: "Gift Card" },
    { id: 17, name: "QR Code" },
    { id: 18, name: "Direct Debit" },
    { id: 19, name: "Stripe" },
    { id: 20, name: "WeChat Pay" },
    { id: 21, name: "AliPay" },
    { id: 22, name: "Samsung Pay" },
    { id: 23, name: "Afterpay" },
    { id: 24, name: "Zelle" },
    { id: 25, name: "Cash on Delivery" },
]
