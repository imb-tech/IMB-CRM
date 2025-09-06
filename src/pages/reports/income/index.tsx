import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useIncomeCols } from "./columns"
import ParamDateRange from "@/components/as-params/date-picker-range"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

function IncomeMain() {
    const navigate = useNavigate()
    const columns = useIncomeCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() =>
                                    navigate({
                                        to: "/reports",
                                        search: { tabs: "finances_reports" },
                                    })
                                }
                                size={"sm"}
                                icon={<ArrowLeft size={20} />}
                            />
                            <h1 className="text-xl">Daromad tarixi </h1>
                            <Badge variant={"outline"} className="text-sm">
                                {data.length}
                            </Badge>
                        </div>
                        <ParamDateRange />
                    </div>
                    <DataTable columns={columns} data={data} numeration />
                </CardContent>
            </Card>
        </div>
    )
}

export default IncomeMain

const data: Income[] = [
    {
        id: 1,
        name: "Mahsulot sotuvi",
        price: 150000,
        created_at: "2025-05-01 08:30:00",
        reason: "Do‘kon orqali sotildi",
    },
    {
        id: 2,
        name: "Xizmat ko‘rsatish",
        price: 200000,
        created_at: "2025-05-02 08:40:00",
        reason: "Kompyuter ta’miri",
    },
    {
        id: 3,
        name: "Freelance",
        price: 300000,
        created_at: "2025-05-03 08:50:00",
        reason: "Veb sayt ishlab chiqish",
    },
    {
        id: 4,
        name: "Online savdo",
        price: 120000,
        created_at: "2025-05-04 09:00:00",
        reason: "Telegram orqali buyurtma",
    },
    {
        id: 5,
        name: "O‘quv kursi",
        price: 500000,
        created_at: "2025-05-05 09:10:00",
        reason: "Frontend kursdan daromad",
    },
    {
        id: 6,
        name: "Shaxsiy dars",
        price: 80000,
        created_at: "2025-05-06 09:20:00",
        reason: "Individual dars",
    },
    {
        id: 7,
        name: "Mahsulot eksporti",
        price: 1000000,
        created_at: "2025-05-07 09:30:00",
        reason: "Rossiyaga yuborildi",
    },
    {
        id: 8,
        name: "Grant mablag‘i",
        price: 700000,
        created_at: "2025-05-08 09:40:00",
        reason: "Startap uchun grant",
    },
    {
        id: 9,
        name: "Affiliate daromad",
        price: 90000,
        created_at: "2025-05-09 09:50:00",
        reason: "Reklamadan daromad",
    },
    {
        id: 10,
        name: "Reklama joylash",
        price: 110000,
        created_at: "2025-05-10 10:00:00",
        reason: "Saytda banner joylash",
    },
    {
        id: 11,
        name: "Investitsiya",
        price: 1500000,
        created_at: "2025-05-11 10:10:00",
        reason: "Investor sarmoyasi",
    },
    {
        id: 12,
        name: "Konsultatsiya",
        price: 95000,
        created_at: "2025-05-12 10:20:00",
        reason: "Texnik maslahat",
    },
    {
        id: 13,
        name: "Savdo sherigi",
        price: 130000,
        created_at: "2025-05-13 10:30:00",
        reason: "Hamkorlikdan foyda",
    },
    {
        id: 14,
        name: "To‘lov",
        price: 210000,
        created_at: "2025-05-14 10:40:00",
        reason: "Oldindan to‘lov",
    },
    {
        id: 15,
        name: "Savdo daromadi",
        price: 320000,
        created_at: "2025-05-15 10:50:00",
        reason: "Aksiya orqali sotuv",
    },
    {
        id: 16,
        name: "E'lon daromadi",
        price: 40000,
        created_at: "2025-05-16 11:00:00",
        reason: "Instagram e'loni",
    },
    {
        id: 17,
        name: "Video kurs",
        price: 270000,
        created_at: "2025-05-17 11:10:00",
        reason: "YouTube darsdan foyda",
    },
    {
        id: 18,
        name: "Servis to‘lovi",
        price: 50000,
        created_at: "2025-05-18 11:20:00",
        reason: "Dasturga obuna",
    },
    {
        id: 19,
        name: "Sotuv bo‘yicha bonus",
        price: 60000,
        created_at: "2025-05-19 11:30:00",
        reason: "Muvaffaqiyatli oy",
    },
    {
        id: 20,
        name: "Tashqi xizmat",
        price: 180000,
        created_at: "2025-05-20 11:40:00",
        reason: "Qurilish nazorati",
    },
    {
        id: 21,
        name: "Chegirma bilan sotuv",
        price: 220000,
        created_at: "2025-05-21 11:50:00",
        reason: "Promokod orqali",
    },
    {
        id: 22,
        name: "Xomashyo sotish",
        price: 130000,
        created_at: "2025-05-22 12:00:00",
        reason: "Ortiqcha xomashyodan",
    },
    {
        id: 23,
        name: "Talaba to‘lovi",
        price: 95000,
        created_at: "2025-05-23 12:10:00",
        reason: "Yangi dars uchun",
    },
    {
        id: 24,
        name: "Mobil ilova daromadi",
        price: 175000,
        created_at: "2025-05-24 12:20:00",
        reason: "App Store daromad",
    },
    {
        id: 25,
        name: "Reklama shartnomasi",
        price: 240000,
        created_at: "2025-05-25 12:30:00",
        reason: "Shartnoma orqali",
    },
]
