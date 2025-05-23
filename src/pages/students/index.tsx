import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useStudentsCols } from "./columns"
import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"

const StudentsMain = () => {
    const columns = useStudentsCols()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">O'quvchilar</h1>
                            <Badge className="text-sm" variant={"outline"}>
                                {data.length}
                            </Badge>
                            <Badge
                                className="text-sm text-destructive  border-[0.7px] border-destructive font-normal"
                                variant={"outline"}
                            >
                                Qazdorlik : -3 923 077.35 so'm
                            </Badge>
                            <div className="flex items-center space-x-2">
                                <Switch id="archive" />
                                <Label htmlFor="archive">Arxiv</Label>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant={"secondary"}>
                                <Plus className="h-4 w-4" />
                                SMS YUBORISH
                            </Button>
                            <Button>
                                <Plus className="h-4 w-4" />
                                Qo'shish
                            </Button>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-7 md:grid-cols-2 gap-2 ">
                        <ParamInput fullWidth />
                        <ParamCombobox
                            isSearch={false}
                            label="Kurslar"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="Maktab"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="Guruhdagi holati"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="To'lov holati"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="Guruh"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="Ustoz"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                    </div>
                    <DataTable
                        // actionMenuMode
                        onDelete={() => {}}
                        onEdit={() => {}}
                        // onView={() => {}}
                        columns={columns}
                        data={data}
                        selecteds_row
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default StudentsMain

const data:Student[] = [
    {
        id: 1,
        img: "img1.jpg",
        name: "Azizbek Qodirov",
        rating: 4.8,
        phone: "+998901112233",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 150000,
    },
    {
        id: 2,
        img: "img2.jpg",
        name: "Dilnoza Ismoilova",
        rating: 4.5,
        phone: "+998901223344",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 90000,
    },
    {
        id: 3,
        img: "img3.jpg",
        name: "Sherzod Beknazarov",
        rating: 4.7,
        phone: "+998903334455",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 120000,
    },
    {
        id: 4,
        img: "img4.jpg",
        name: "Laylo Raximova",
        rating: 4.2,
        phone: "+998907778899",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 30000,
    },
    {
        id: 5,
        img: "img5.jpg",
        name: "Komil Jumayev",
        rating: 4.6,
        phone: "+998908889900",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 75000,
    },
    {
        id: 6,
        img: "img6.jpg",
        name: "Maftuna Eshonova",
        rating: 4.9,
        phone: "+998901112244",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 180000,
    },
    {
        id: 7,
        img: "img7.jpg",
        name: "Oybek Ermatov",
        rating: 4.3,
        phone: "+998909901122",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 60000,
    },
    {
        id: 8,
        img: "img8.jpg",
        name: "Nargiza Karimova",
        rating: 5.0,
        phone: "+998903210987",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 210000,
    },
    {
        id: 9,
        img: "img9.jpg",
        name: "Botir Saidov",
        rating: 4.1,
        phone: "+998901998877",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 25000,
    },
    {
        id: 10,
        img: "img10.jpg",
        name: "Shaxnoza Murodova",
        rating: 4.8,
        phone: "+998905556677",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 135000,
    },
    {
        id: 11,
        img: "img11.jpg",
        name: "Anvar Zokirov",
        rating: 4.4,
        phone: "+998901002244",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 78000,
    },
    {
        id: 12,
        img: "img12.jpg",
        name: "Madina Qahhorova",
        rating: 4.6,
        phone: "+998909977665",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 88000,
    },
    {
        id: 13,
        img: "img13.jpg",
        name: "Sardor Alimov",
        rating: 4.7,
        phone: "+998903300440",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 67000,
    },
    {
        id: 14,
        img: "img14.jpg",
        name: "Zilola Ro‘ziboyeva",
        rating: 4.5,
        phone: "+998901010203",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 93000,
    },
    {
        id: 15,
        img: "img15.jpg",
        name: "Islomjon Xoliqov",
        rating: 4.2,
        phone: "+998907070707",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 40000,
    },
    {
        id: 16,
        img: "img16.jpg",
        name: "Nodira Rasulova",
        rating: 4.9,
        phone: "+998903939393",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 200000,
    },
    {
        id: 17,
        img: "img17.jpg",
        name: "Jamshid O‘ralov",
        rating: 3.9,
        phone: "+998909988776",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 10000,
    },
    {
        id: 18,
        img: "img18.jpg",
        name: "Muxlisa Nazarova",
        rating: 5.0,
        phone: "+998901122334",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 250000,
    },
    {
        id: 19,
        img: "img19.jpg",
        name: "Eldor Abdug‘afforov",
        rating: 4.4,
        phone: "+998905443322",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 65000,
    },
    {
        id: 20,
        img: "img20.jpg",
        name: "Rayhona Jo‘rayeva",
        rating: 4.8,
        phone: "+998903322110",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 110000,
    },
    {
        id: 21,
        img: "img21.jpg",
        name: "Farrux Qilichev",
        rating: 4.3,
        phone: "+998901999111",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 56000,
    },
    {
        id: 22,
        img: "img22.jpg",
        name: "Zarnigor Mirzayeva",
        rating: 4.5,
        phone: "+998907777999",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 87000,
    },
    {
        id: 23,
        img: "img23.jpg",
        name: "Sanjar Yusupov",
        rating: 4.6,
        phone: "+998903344556",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 90000,
    },
    {
        id: 24,
        img: "img24.jpg",
        name: "Gulbahor Shamsiyeva",
        rating: 4.7,
        phone: "+998905000600",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 95000,
    },
    {
        id: 25,
        img: "img25.jpg",
        name: "Miraziz G‘ulomov",
        rating: 4.4,
        phone: "+998907712345",
        groups: "08:00-08:30 - GURUH 1 - Shohjahon Hamidov",
        balance: 67000,
    },
]
