import ParamInput from "@/components/as-params/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useGroupCols } from "./columns"
import { Badge } from "@/components/ui/badge"
import { ParamCombobox } from "@/components/as-params/combobox"

const GroupsMain = () => {
    const columns = useGroupCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4"> 
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Guruhlar</h1>
                            <Badge variant={"outline"} className="text-sm">{groups.length}</Badge>
                        </div>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Qo'shish
                        </Button>
                    </div>
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-2 ">
                        <ParamInput fullWidth />
                        <ParamCombobox
                            isSearch={false}
                            label="Holat"
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
                            label="O'qituvchi"
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
                            label="Kunlar"
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
                        data={groups}
                        selecteds_row
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default GroupsMain

const groups: Group[] = [
    {
        id: 1,
        groupName: "Frontend A",
        course: "Frontend",
        teacher: "Ali Valiyev",
        lessonDays: "Du, Chorshanba, Juma",
        lessonTime: "14:00 - 16:00",
        studentCount: 12,
        startDate: "2024-03-01",
        endDate: "2024-06-01",
        status: "active",
    },
    {
        id: 2,
        groupName: "Backend B",
        course: "Backend",
        teacher: "Dilshod Karimov",
        lessonDays: "Seshanba, Payshanba, Shanba",
        lessonTime: "10:00 - 12:00",
        studentCount: 9,
        startDate: "2024-02-15",
        endDate: "2024-05-15",
        status: "completed",
    },
    {
        id: 3,
        groupName: "Python 101",
        course: "Python",
        teacher: "Malika Rustamova",
        lessonDays: "Dushanba, Juma",
        lessonTime: "16:00 - 18:00",
        studentCount: 14,
        startDate: "2024-04-10",
        endDate: "2024-07-10",
        status: "active",
    },
    {
        id: 4,
        groupName: "Java Group 1",
        course: "Java",
        teacher: "Sardor Tursunov",
        lessonDays: "Chorshanba, Shanba",
        lessonTime: "12:00 - 14:00",
        studentCount: 11,
        startDate: "2024-01-20",
        endDate: "2024-04-20",
        status: "completed",
    },
    {
        id: 5,
        groupName: "React Pro",
        course: "React",
        teacher: "Ziyoda Akramova",
        lessonDays: "Du, Chorshanba",
        lessonTime: "09:00 - 11:00",
        studentCount: 10,
        startDate: "2024-05-01",
        endDate: "2024-08-01",
        status: "active",
    },
    {
        id: 6,
        groupName: "NodeJS Group",
        course: "NodeJS",
        teacher: "Bekzod Aliyev",
        lessonDays: "Payshanba, Shanba",
        lessonTime: "15:00 - 17:00",
        studentCount: 8,
        startDate: "2024-03-05",
        endDate: "2024-06-05",
        status: "active",
    },
    {
        id: 7,
        groupName: "UX/UI A",
        course: "UX/UI Design",
        teacher: "Nodira Usmonova",
        lessonDays: "Seshanba, Juma",
        lessonTime: "11:00 - 13:00",
        studentCount: 13,
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        status: "completed",
    },
    {
        id: 8,
        groupName: "Flutter Devs",
        course: "Flutter",
        teacher: "Javohir Islomov",
        lessonDays: "Dushanba, Payshanba",
        lessonTime: "13:00 - 15:00",
        studentCount: 7,
        startDate: "2024-06-10",
        endDate: "2024-09-10",
        status: "pending",
    },
    {
        id: 9,
        groupName: "Fullstack Bootcamp",
        course: "Fullstack",
        teacher: "Kamola Nurmatova",
        lessonDays: "Du, Chorshanba, Juma",
        lessonTime: "18:00 - 20:00",
        studentCount: 16,
        startDate: "2024-03-25",
        endDate: "2024-06-25",
        status: "active",
    },
    {
        id: 10,
        groupName: "Data Science Basic",
        course: "Data Science",
        teacher: "Alisher Qodirov",
        lessonDays: "Seshanba, Payshanba",
        lessonTime: "08:00 - 10:00",
        studentCount: 10,
        startDate: "2024-04-01",
        endDate: "2024-07-01",
        status: "active",
    },
    {
        id: 11,
        groupName: "DevOps Beginners",
        course: "DevOps",
        teacher: "Bobur Murodov",
        lessonDays: "Dushanba, Chorshanba",
        lessonTime: "17:00 - 19:00",
        studentCount: 12,
        startDate: "2024-04-05",
        endDate: "2024-07-05",
        status: "active",
    },
    {
        id: 12,
        groupName: "Angular Pro",
        course: "Angular",
        teacher: "Dilafruz Soliyeva",
        lessonDays: "Seshanba, Juma",
        lessonTime: "15:00 - 17:00",
        studentCount: 9,
        startDate: "2024-03-01",
        endDate: "2024-06-01",
        status: "completed",
    },
    {
        id: 13,
        groupName: "C++ Basics",
        course: "C++",
        teacher: "Olimjon Rashidov",
        lessonDays: "Chorshanba, Shanba",
        lessonTime: "10:00 - 12:00",
        studentCount: 6,
        startDate: "2024-02-10",
        endDate: "2024-05-10",
        status: "completed",
    },
    {
        id: 14,
        groupName: "HTML/CSS Zero",
        course: "HTML/CSS",
        teacher: "Maftuna Ganiyeva",
        lessonDays: "Du, Chorshanba, Juma",
        lessonTime: "09:00 - 11:00",
        studentCount: 18,
        startDate: "2024-01-15",
        endDate: "2024-04-15",
        status: "completed",
    },
    {
        id: 15,
        groupName: "Mobile Dev",
        course: "Mobile Development",
        teacher: "Sanjarbek Zokirov",
        lessonDays: "Payshanba, Shanba",
        lessonTime: "12:00 - 14:00",
        studentCount: 11,
        startDate: "2024-03-12",
        endDate: "2024-06-12",
        status: "active",
    },
    {
        id: 16,
        groupName: "Kotlin Starters",
        course: "Kotlin",
        teacher: "Diyor Tadjibayev",
        lessonDays: "Seshanba, Juma",
        lessonTime: "13:00 - 15:00",
        studentCount: 7,
        startDate: "2024-05-01",
        endDate: "2024-08-01",
        status: "pending",
    },
    {
        id: 17,
        groupName: "PHP Beginners",
        course: "PHP",
        teacher: "Lola Karimova",
        lessonDays: "Dushanba, Chorshanba",
        lessonTime: "10:00 - 12:00",
        studentCount: 10,
        startDate: "2024-02-05",
        endDate: "2024-05-05",
        status: "completed",
    },
    {
        id: 18,
        groupName: "Laravel Pro",
        course: "Laravel",
        teacher: "Sirojiddin Qahhorov",
        lessonDays: "Du, Chorshanba, Juma",
        lessonTime: "16:00 - 18:00",
        studentCount: 14,
        startDate: "2024-03-20",
        endDate: "2024-06-20",
        status: "active",
    },
    {
        id: 19,
        groupName: "AI Starters",
        course: "Artificial Intelligence",
        teacher: "Gulbahor Ubaydullaeva",
        lessonDays: "Seshanba, Payshanba",
        lessonTime: "14:00 - 16:00",
        studentCount: 12,
        startDate: "2024-04-01",
        endDate: "2024-07-01",
        status: "pending",
    },
    {
        id: 20,
        groupName: "Cybersecurity Basic",
        course: "Cybersecurity",
        teacher: "Anvar Komilov",
        lessonDays: "Chorshanba, Shanba",
        lessonTime: "11:00 - 13:00",
        studentCount: 8,
        startDate: "2024-03-01",
        endDate: "2024-06-01",
        status: "active",
    },
    {
        id: 21,
        groupName: "SQL Starters",
        course: "SQL",
        teacher: "Shahzoda Tursunova",
        lessonDays: "Payshanba, Shanba",
        lessonTime: "08:00 - 10:00",
        studentCount: 9,
        startDate: "2024-01-20",
        endDate: "2024-04-20",
        status: "completed",
    },
    {
        id: 22,
        groupName: "Docker Mastery",
        course: "Docker",
        teacher: "Azamat O‘ralov",
        lessonDays: "Dushanba, Juma",
        lessonTime: "17:00 - 19:00",
        studentCount: 10,
        startDate: "2024-05-10",
        endDate: "2024-08-10",
        status: "active",
    },
    {
        id: 23,
        groupName: "Firebase Intro",
        course: "Firebase",
        teacher: "Zilola Rajabova",
        lessonDays: "Du, Chorshanba",
        lessonTime: "09:00 - 11:00",
        studentCount: 11,
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        status: "completed",
    },
    {
        id: 24,
        groupName: "Machine Learning A",
        course: "Machine Learning",
        teacher: "Odilbek Mamatov",
        lessonDays: "Seshanba, Payshanba",
        lessonTime: "13:00 - 15:00",
        studentCount: 15,
        startDate: "2024-06-01",
        endDate: "2024-09-01",
        status: "pending",
    },
    {
        id: 25,
        groupName: "SASS Experts",
        course: "SASS",
        teacher: "Shoira Egamberdieva",
        lessonDays: "Chorshanba, Shanba",
        lessonTime: "10:00 - 12:00",
        studentCount: 7,
        startDate: "2024-04-15",
        endDate: "2024-07-15",
        status: "active",
    },
]
