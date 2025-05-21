import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useCoursesCols } from "./columns"
import { Badge } from "@/components/ui/badge"

const CoursesMain = () => {
    const columns = useCoursesCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Kurslar</h1>
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

export default CoursesMain

const data: Course[] = [
    {
        id: 1,
        name: "Frontend Dasturlash",
        price: 1000000.0,
        month_duration: 12,
        description: "HTML, CSS, JS va React asoslari",
        color: "#f9c74f,#f9844a",
        lesson_count: 48,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
    {
        id: 2,
        name: "Backend Dasturlash",
        price: 1200000.0,
        month_duration: 10,
        description: "Node.js, Express va MongoDB",
        color: "#90be6d,#577590",
        lesson_count: 50,
        is_delete: false,
        branch: { id: 2, name: "Samarqand Filiali" },
    },
    {
        id: 3,
        name: "Mobil Ilova (Flutter)",
        price: 1500000.0,
        month_duration: 8,
        description: "Dart va Flutter orqali mobil ilovalar",
        color: "#f94144,#f3722c",
        lesson_count: 40,
        is_delete: false,
        branch: { id: 3, name: "Andijon Filiali" },
    },
    {
        id: 4,
        name: "Python Asoslari",
        price: 900000.0,
        month_duration: 6,
        description: "Python dasturlash tili asoslari",
        color: "#43aa8b,#577590",
        lesson_count: 36,
        is_delete: false,
        branch: { id: 4, name: "Farg‘ona Filiali" },
    },
    {
        id: 5,
        name: "Kiberxavfsizlik",
        price: 2000000.0,
        month_duration: 10,
        description: "Axborot xavfsizligi asoslari",
        color: "#277da1,#f94144",
        lesson_count: 42,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
    {
        id: 6,
        name: "UI/UX Dizayn",
        price: 1100000.0,
        month_duration: 7,
        description: "Figma va dizayn asoslari",
        color: "#f8961e,#f3722c",
        lesson_count: 38,
        is_delete: false,
        branch: { id: 2, name: "Samarqand Filiali" },
    },
    {
        id: 7,
        name: "Sun’iy intellekt",
        price: 2500000.0,
        month_duration: 12,
        description: "AI va ML asoslari, Python bilan",
        color: "#90be6d,#277da1",
        lesson_count: 60,
        is_delete: false,
        branch: { id: 3, name: "Andijon Filiali" },
    },
    {
        id: 8,
        name: "Kompyuter savodxonligi",
        price: 600000.0,
        month_duration: 4,
        description: "Office dasturlar, klaviatura",
        color: "#f94144,#f9844a",
        lesson_count: 20,
        is_delete: false,
        branch: { id: 4, name: "Farg‘ona Filiali" },
    },
    {
        id: 9,
        name: "C++ Dasturlash",
        price: 1300000.0,
        month_duration: 9,
        description: "C++ va algoritmlar",
        color: "#43aa8b,#90be6d",
        lesson_count: 44,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
    {
        id: 10,
        name: "Java Dasturlash",
        price: 1400000.0,
        month_duration: 9,
        description: "Java OOP, Spring Framework",
        color: "#577590,#f3722c",
        lesson_count: 46,
        is_delete: false,
        branch: { id: 2, name: "Samarqand Filiali" },
    },
    {
        id: 11,
        name: "SMM Asoslari",
        price: 800000.0,
        month_duration: 5,
        description: "Ijtimoiy tarmoqlar boshqaruvi",
        color: "#f9844a,#f9c74f",
        lesson_count: 24,
        is_delete: false,
        branch: { id: 3, name: "Andijon Filiali" },
    },
    {
        id: 12,
        name: "Kassa va 1C",
        price: 700000.0,
        month_duration: 4,
        description: "Savdo va 1C dasturi",
        color: "#f3722c,#90be6d",
        lesson_count: 22,
        is_delete: false,
        branch: { id: 4, name: "Farg‘ona Filiali" },
    },
    {
        id: 13,
        name: "PHP va Laravel",
        price: 1200000.0,
        month_duration: 8,
        description: "PHP, MySQL, Laravel Framework",
        color: "#f8961e,#f94144",
        lesson_count: 40,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
    {
        id: 14,
        name: "Robototexnika",
        price: 1600000.0,
        month_duration: 10,
        description: "Arduino, Sensorlar, Dasturlash",
        color: "#277da1,#43aa8b",
        lesson_count: 50,
        is_delete: false,
        branch: { id: 2, name: "Samarqand Filiali" },
    },
    {
        id: 15,
        name: "Photoshop Asoslari",
        price: 750000.0,
        month_duration: 3,
        description: "Grafik dizayn, Photoshop",
        color: "#f94144,#f3722c",
        lesson_count: 16,
        is_delete: false,
        branch: { id: 3, name: "Andijon Filiali" },
    },
    {
        id: 16,
        name: "Videomontaj",
        price: 900000.0,
        month_duration: 4,
        description: "Adobe Premiere, CapCut",
        color: "#90be6d,#f9c74f",
        lesson_count: 18,
        is_delete: false,
        branch: { id: 4, name: "Farg‘ona Filiali" },
    },
    {
        id: 17,
        name: "Scratch Bolalar uchun",
        price: 500000.0,
        month_duration: 3,
        description: "Scratch dasturi orqali o‘yinlar",
        color: "#f9844a,#f3722c",
        lesson_count: 12,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
    {
        id: 18,
        name: "MS Excel Professional",
        price: 850000.0,
        month_duration: 3,
        description: "Formulalar, grafiklar, VBA",
        color: "#f94144,#90be6d",
        lesson_count: 20,
        is_delete: false,
        branch: { id: 2, name: "Samarqand Filiali" },
    },
    {
        id: 19,
        name: "Power BI",
        price: 1000000.0,
        month_duration: 3,
        description: "Vizualizatsiya va tahlil",
        color: "#43aa8b,#577590",
        lesson_count: 18,
        is_delete: false,
        branch: { id: 3, name: "Andijon Filiali" },
    },
    {
        id: 20,
        name: "Tizim Administratorligi",
        price: 1300000.0,
        month_duration: 6,
        description: "Server, tarmoq, xavfsizlik",
        color: "#f9844a,#f3722c",
        lesson_count: 30,
        is_delete: false,
        branch: { id: 4, name: "Farg‘ona Filiali" },
    },
    {
        id: 21,
        name: "AutoCAD",
        price: 1100000.0,
        month_duration: 5,
        description: "Muhandislar uchun chizmachilik",
        color: "#f3722c,#f8961e",
        lesson_count: 26,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
    {
        id: 22,
        name: "Ingliz Tili (IELTS)",
        price: 1000000.0,
        month_duration: 6,
        description: "Grammar, Speaking, Listening",
        color: "#90be6d,#f3722c",
        lesson_count: 36,
        is_delete: false,
        branch: { id: 2, name: "Samarqand Filiali" },
    },
    {
        id: 23,
        name: "Rus Tili",
        price: 800000.0,
        month_duration: 4,
        description: "Ona tili bo‘lmaganlar uchun",
        color: "#f94144,#577590",
        lesson_count: 24,
        is_delete: false,
        branch: { id: 3, name: "Andijon Filiali" },
    },
    {
        id: 24,
        name: "Arab Tili",
        price: 850000.0,
        month_duration: 4,
        description: "Boshlang‘ich va o‘rta daraja",
        color: "#f9844a,#f9c74f",
        lesson_count: 22,
        is_delete: false,
        branch: { id: 4, name: "Farg‘ona Filiali" },
    },
    {
        id: 25,
        name: "Grafik Dizayn (To‘liq kurs)",
        price: 1800000.0,
        month_duration: 9,
        description: "Photoshop, Illustrator, CorelDraw",
        color: "#f3722c,#f94144",
        lesson_count: 45,
        is_delete: false,
        branch: { id: 1, name: "Toshkent Filiali" },
    },
]
