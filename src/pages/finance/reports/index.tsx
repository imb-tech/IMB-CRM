import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/datatable"
import { useCostAndIncomeCols } from "./columns"
import ParamDateRange from "@/components/as-params/date-picker-range"
import {  useSearch } from "@tanstack/react-router"

function CostAndIncomeMain() {
    const search = useSearch({ from: "/_main/finance/" })
    const columns = useCostAndIncomeCols()
    return (
        <DataTable
            columns={columns}
            data={data}
            numeration
            head={
                <div className="flex mb-3  justify-between items-center gap-3 ">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl">{`${
                            search?.tabs === "cost"
                                ? "Xarajatlar"
                                : "Daromadlar"
                        } tarixi`}</h1>
                        <Badge className="text-sm">{data.length}</Badge>
                    </div>
                    <ParamDateRange />
                </div>
            }
        />
    )
}

export default CostAndIncomeMain

const data: Cost[] = [
    {
        id: 1,
        name: "Ijaraga to‘lov",
        price: 800000,
        created_at: "2025-05-01 08:30:00",
        reason: "Ofis uchun ijara",
    },
    {
        id: 2,
        name: "Elektr energiyasi",
        price: 150000,
        created_at: "2025-05-02 08:40:00",
        reason: "Oylik hisob",
    },
    {
        id: 3,
        name: "Internet xarajatlari",
        price: 100000,
        created_at: "2025-05-03 08:50:00",
        reason: "Provider to‘lovi",
    },
    {
        id: 4,
        name: "Transport",
        price: 50000,
        created_at: "2025-05-04 09:00:00",
        reason: "Shaxsiy xizmat safari",
    },
    {
        id: 5,
        name: "Qurilmalar xaridi",
        price: 1200000,
        created_at: "2025-05-05 09:10:00",
        reason: "Yangi kompyuter",
    },
    {
        id: 6,
        name: "Ish haqi",
        price: 3000000,
        created_at: "2025-05-06 09:20:00",
        reason: "Xodimlarga oylik",
    },
    {
        id: 7,
        name: "Reklama",
        price: 250000,
        created_at: "2025-05-07 09:30:00",
        reason: "Facebook reklama",
    },
    {
        id: 8,
        name: "Kurs xarajatlari",
        price: 60000,
        created_at: "2025-05-08 09:40:00",
        reason: "Online platforma to‘lovi",
    },
    {
        id: 9,
        name: "Dizayn xizmatlari",
        price: 140000,
        created_at: "2025-05-09 09:50:00",
        reason: "Grafik dizayn",
    },
    {
        id: 10,
        name: "Ruxsatnoma to‘lovi",
        price: 80000,
        created_at: "2025-05-10 10:00:00",
        reason: "Litsenziya olish",
    },
    {
        id: 11,
        name: "Uskuna ta'miri",
        price: 90000,
        created_at: "2025-05-11 10:10:00",
        reason: "Printer ta’miri",
    },
    {
        id: 12,
        name: "Sayt hostingi",
        price: 40000,
        created_at: "2025-05-12 10:20:00",
        reason: "Yillik to‘lov",
    },
    {
        id: 13,
        name: "Xodim ovqatlanishi",
        price: 110000,
        created_at: "2025-05-13 10:30:00",
        reason: "Kafe uchun",
    },
    {
        id: 14,
        name: "Soliq to‘lovi",
        price: 500000,
        created_at: "2025-05-14 10:40:00",
        reason: "Kvartal uchun soliq",
    },
    {
        id: 15,
        name: "Ofis materiallari",
        price: 60000,
        created_at: "2025-05-15 10:50:00",
        reason: "Qog‘oz, ruchka va boshqalar",
    },
    {
        id: 16,
        name: "Mobil aloqa",
        price: 30000,
        created_at: "2025-05-16 11:00:00",
        reason: "Korxona telefoni",
    },
    {
        id: 17,
        name: "Kurs uchun litsenziya",
        price: 125000,
        created_at: "2025-05-17 11:10:00",
        reason: "Udemy to‘lovi",
    },
    {
        id: 18,
        name: "Suv ta’minoti",
        price: 20000,
        created_at: "2025-05-18 11:20:00",
        reason: "Ofis uchun suv",
    },
    {
        id: 19,
        name: "Kuryer xizmatlari",
        price: 75000,
        created_at: "2025-05-19 11:30:00",
        reason: "Mahsulot yuborish",
    },
    {
        id: 20,
        name: "Ofis bezagi",
        price: 95000,
        created_at: "2025-05-20 11:40:00",
        reason: "Yangi interyer",
    },
    {
        id: 21,
        name: "Domen narxi",
        price: 30000,
        created_at: "2025-05-21 11:50:00",
        reason: "Web domen sotib olish",
    },
    {
        id: 22,
        name: "Cloud xizmatlari",
        price: 87000,
        created_at: "2025-05-22 12:00:00",
        reason: "AWS, Firebase",
    },
    {
        id: 23,
        name: "Telegram reklama",
        price: 200000,
        created_at: "2025-05-23 12:10:00",
        reason: "Reklama joylash",
    },
    {
        id: 24,
        name: "Bozor xarid",
        price: 100000,
        created_at: "2025-05-24 12:20:00",
        reason: "Ofis uchun oziq-ovqat",
    },
    {
        id: 25,
        name: "Freelancer to‘lovi",
        price: 180000,
        created_at: "2025-05-25 12:30:00",
        reason: "Masofaviy ishchi",
    },
]
