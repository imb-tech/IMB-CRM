import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEmployeeCols } from "./columns"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const EmployeesMain = () => {
    const columns = useEmployeeCols()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Hodimlar</h1>
                            <Badge className="text-sm" variant={"outline"}>
                                {data.length}
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

export default EmployeesMain

const data:Employee[] = [
    {
        id: 1,
        img_name: "img1.jpg",
        full_name: "Azizbek Qodirov",
        phone: "+998901112233",
        salary: 2500000,
        percent: 10,
        lesson_fee: 50000,
        birth_date: "1990-05-15",
        hired_date: "2022-01-10",
    },
    {
        id: 2,
        img_name: "img2.jpg",
        full_name: "Dilnoza Ismoilova",
        phone: "+998901223344",
        salary: 2000000,
        percent: 7.5,
        lesson_fee: 40000,
        birth_date: "1995-08-23",
        hired_date: "2023-03-12",
    },
    {
        id: 3,
        img_name: "img3.jpg",
        full_name: "Sherzod Beknazarov",
        phone: "+998903334455",
        salary: 1800000,
        percent: 8.0,
        lesson_fee: 45000,
        birth_date: "1992-12-01",
        hired_date: "2021-09-01",
    },
    {
        id: 4,
        img_name: "img4.jpg",
        full_name: "Laylo Raximova",
        phone: "+998907778899",
        salary: 2300000,
        percent: 6.5,
        lesson_fee: 47000,
        birth_date: "1994-02-20",
        hired_date: "2022-11-20",
    },
    {
        id: 5,
        img_name: "img5.jpg",
        full_name: "Komil Jumayev",
        phone: "+998908889900",
        salary: 2200000,
        percent: 9.0,
        lesson_fee: 48000,
        birth_date: "1989-06-30",
        hired_date: "2020-05-15",
    },
    {
        id: 6,
        img_name: "img6.jpg",
        full_name: "Maftuna Eshonova",
        phone: "+998901112244",
        salary: 2400000,
        percent: 10.5,
        lesson_fee: 49000,
        birth_date: "1993-03-10",
        hired_date: "2021-07-01",
    },
    {
        id: 7,
        img_name: "img7.jpg",
        full_name: "Oybek Ermatov",
        phone: "+998909901122",
        salary: 2100000,
        percent: 7.0,
        lesson_fee: 46000,
        birth_date: "1991-11-11",
        hired_date: "2023-01-25",
    },
    {
        id: 8,
        img_name: "img8.jpg",
        full_name: "Nargiza Karimova",
        phone: "+998903210987",
        salary: 2600000,
        percent: 12.0,
        lesson_fee: 52000,
        birth_date: "1996-04-18",
        hired_date: "2022-04-04",
    },
    {
        id: 9,
        img_name: "img9.jpg",
        full_name: "Botir Saidov",
        phone: "+998901998877",
        salary: 1700000,
        percent: 5.5,
        lesson_fee: 39000,
        birth_date: "1987-09-09",
        hired_date: "2021-10-15",
    },
    {
        id: 10,
        img_name: "img10.jpg",
        full_name: "Shaxnoza Murodova",
        phone: "+998905556677",
        salary: 2500000,
        percent: 9.5,
        lesson_fee: 51000,
        birth_date: "1990-01-01",
        hired_date: "2020-12-01",
    },
    {
        id: 11,
        img_name: "img11.jpg",
        full_name: "Anvar Zokirov",
        phone: "+998901002244",
        salary: 1950000,
        percent: 6.0,
        lesson_fee: 43000,
        birth_date: "1992-06-05",
        hired_date: "2021-03-01",
    },
    {
        id: 12,
        img_name: "img12.jpg",
        full_name: "Madina Qahhorova",
        phone: "+998909977665",
        salary: 2200000,
        percent: 8.2,
        lesson_fee: 46000,
        birth_date: "1994-12-30",
        hired_date: "2023-02-20",
    },
    {
        id: 13,
        img_name: "img13.jpg",
        full_name: "Sardor Alimov",
        phone: "+998903300440",
        salary: 2100000,
        percent: 7.7,
        lesson_fee: 45000,
        birth_date: "1993-07-13",
        hired_date: "2022-09-10",
    },
    {
        id: 14,
        img_name: "img14.jpg",
        full_name: "Zilola Ro‘ziboyeva",
        phone: "+998901010203",
        salary: 2400000,
        percent: 9.9,
        lesson_fee: 50000,
        birth_date: "1996-08-08",
        hired_date: "2021-08-30",
    },
    {
        id: 15,
        img_name: "img15.jpg",
        full_name: "Islomjon Xoliqov",
        phone: "+998907070707",
        salary: 1800000,
        percent: 6.3,
        lesson_fee: 42000,
        birth_date: "1990-10-10",
        hired_date: "2020-03-15",
    },
    {
        id: 16,
        img_name: "img16.jpg",
        full_name: "Nodira Rasulova",
        phone: "+998903939393",
        salary: 2700000,
        percent: 11.0,
        lesson_fee: 53000,
        birth_date: "1995-11-22",
        hired_date: "2022-12-01",
    },
    {
        id: 17,
        img_name: "img17.jpg",
        full_name: "Jamshid O‘ralov",
        phone: "+998909988776",
        salary: 1600000,
        percent: 4.5,
        lesson_fee: 38000,
        birth_date: "1986-02-02",
        hired_date: "2019-11-01",
    },
    {
        id: 18,
        img_name: "img18.jpg",
        full_name: "Muxlisa Nazarova",
        phone: "+998901122334",
        salary: 2500000,
        percent: 10.8,
        lesson_fee: 50000,
        birth_date: "1997-07-27",
        hired_date: "2023-04-01",
    },
    {
        id: 19,
        img_name: "img19.jpg",
        full_name: "Eldor Abdug‘afforov",
        phone: "+998905443322",
        salary: 2000000,
        percent: 7.2,
        lesson_fee: 44000,
        birth_date: "1991-01-19",
        hired_date: "2021-06-15",
    },
    {
        id: 20,
        img_name: "img20.jpg",
        full_name: "Rayhona Jo‘rayeva",
        phone: "+998903322110",
        salary: 2400000,
        percent: 9.4,
        lesson_fee: 49000,
        birth_date: "1993-09-29",
        hired_date: "2022-07-22",
    },
    {
        id: 21,
        img_name: "img21.jpg",
        full_name: "Farrux Qilichev",
        phone: "+998901999111",
        salary: 1950000,
        percent: 6.7,
        lesson_fee: 43000,
        birth_date: "1988-04-04",
        hired_date: "2020-01-01",
    },
    {
        id: 22,
        img_name: "img22.jpg",
        full_name: "Zarnigor Mirzayeva",
        phone: "+998907777999",
        salary: 2100000,
        percent: 8.0,
        lesson_fee: 46000,
        birth_date: "1992-05-25",
        hired_date: "2021-04-10",
    },
    {
        id: 23,
        img_name: "img23.jpg",
        full_name: "Sanjar Yusupov",
        phone: "+998903344556",
        salary: 2300000,
        percent: 9.1,
        lesson_fee: 47000,
        birth_date: "1990-03-03",
        hired_date: "2023-03-20",
    },
    {
        id: 24,
        img_name: "img24.jpg",
        full_name: "Gulbahor Shamsiyeva",
        phone: "+998905000600",
        salary: 2200000,
        percent: 8.3,
        lesson_fee: 46000,
        birth_date: "1994-10-10",
        hired_date: "2022-08-05",
    },
    {
        id: 25,
        img_name: "img25.jpg",
        full_name: "Miraziz G‘ulomov",
        phone: "+998907712345",
        salary: 2050000,
        percent: 7.9,
        lesson_fee: 44500,
        birth_date: "1991-12-12",
        hired_date: "2021-10-01",
    },
]
