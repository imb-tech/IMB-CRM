import { DataTable } from "@/components/ui/datatable"
import { useGroupStudentCols } from "./cols"
import StatusBadge from "@/components/elements/status-badge"
import Money from "@/components/elements/money"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import ActionDropdown from "@/components/elements/action-dropdown"
import { useIsMobile } from "@/hooks/use-mobile"
import SectionHeader from "@/components/elements/section-header"
import { Button } from "@/components/ui/button"
import { Phone, Plus, Wallet } from "lucide-react"

export default function GroupStudents() {
    const isMobile = useIsMobile()
    const columns = useGroupStudentCols()

    return (
        <div>
            <SectionHeader
                title="Guruhdagi o'quvchilar"
                rightComponent={
                    <Button variant="secondary">
                        <Plus />
                        Qo'shish
                    </Button>
                }
            />
            {isMobile ?
                <div className="flex flex-col gap-2">
                    {data.map((student) => (
                        <Card
                            key={student.id}
                            className="border-0 shadow-sm bg-secondary"
                        >
                            <CardHeader className="pb-0">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-medium text-primary flex-1">
                                        {student.name}
                                    </h3>
                                    <p className="font-medium">
                                        <StatusBadge status={1} />
                                    </p>
                                    <ActionDropdown />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Telefon
                                            </p>
                                            <p className="font-medium">
                                                {formatPhoneNumber(
                                                    student.phone,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                            <Wallet className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Balans
                                            </p>
                                            <p className="font-medium">
                                                <Money
                                                    value={student.balance}
                                                    suffix
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            :   <DataTable columns={columns} data={data} viewAll />}
        </div>
    )
}

const data: Student[] = [
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
        balance: -180000,
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
        balance: -210000,
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
        balance: -135000,
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
        balance: -93000,
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
]
