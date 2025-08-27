import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { useParams } from "@tanstack/react-router"
import { format } from "date-fns"
import { CalendarDays, Edit, KeyRound, PhoneCall, School } from "lucide-react"

type Props = {}

function StudentProfile({}: Props) {
    const { id } = useParams({ from: "/_main/students/$id" })
    const { data } = useGet<Student>(`students/${id}`, {
        options: { enabled: !!id },
    })

    return (
        <div className="bg-card border-divider border relative rounded-lg  p-4 flex lg:flex-row flex-col gap-5 lg:gap-0 lg:justify-between lg:items-end">
            <div className="flex flex-col sm:flex-row items-start gap-6 h-full">
                <div className="border border-divider   sm:h-full sm:w-[170px] rounded-lg">
                    <img
                        alt="blah blah"
                        className="w-full object-cover rounded-lg h-[170px] object-center"
                        src={data?.photo || "/images/studnet.jpeg"}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <ul className="h-full flex flex-col items-stretch gap-2">
                        <li className="flex items-center gap-3">
                            <h1 className="font-bold sm:text-xl text-lg">
                                {" "}
                                {data?.full_name}
                            </h1>
                            <Badge
                                className={cn(
                                    "bg-green-600/10 text-green-600 w-fit whitespace-nowrap",
                                    !data?.is_active &&
                                        "bg-red-600/10 text-red-600",
                                )}
                            >
                                {data?.is_active ? "Aktiv" : "O'chirilgan"}
                            </Badge>
                        </li>
                        {data?.deleted_at && (
                            <li className="flex flex-wrap sm:flex-nowrap  text-red-500 sm:flex-row gap-2 sm:items-center">
                                <div className="flex gap-2 items-center md:min-w-52 text-foreground-500">
                                    <CalendarDays size={16} />{" "}
                                    <span>{"O'chirilgan sanasi"}:</span>
                                </div>
                                <span>
                                    {format(data?.deleted_at, "yyyy-MM-dd")}
                                </span>
                            </li>
                        )}

                        <li className="flex flex-wrap sm:flex-nowrap  sm:flex-row gap-2 sm:items-center">
                            <div className="flex gap-2 items-center md:min-w-52 text-foreground-500">
                                <PhoneCall size={16} />{" "}
                                <span>{"Telefon raqami"}:</span>
                            </div>
                            <span>
                                {formatPhoneNumber(String(data?.phone))}
                            </span>
                        </li>
                        <li className="flex flex-wrap sm:flex-nowrap  sm:flex-row gap-2 sm:items-center">
                            <div className="flex gap-2 items-center md:min-w-52 text-foreground-500">
                                <School size={16} />{" "}
                                <span>{"Filliallari"}:</span>
                            </div>
                            <span>
                                {data?.branches_data?.map(
                                    (item) => `${item.name}, `,
                                )}
                            </span>
                        </li>
                        <li className="flex flex-wrap sm:flex-nowrap  sm:flex-row gap-2 sm:items-center">
                            <div className="flex gap-2 items-center md:min-w-52 text-foreground-500">
                                <CalendarDays size={16} />{" "}
                                <span>{"Tug'ilgan sana"}:</span>
                            </div>
                            <span>{data?.birth_date}</span>
                        </li>
                        <li className="flex flex-wrap sm:flex-nowrap  sm:flex-row gap-2 sm:items-center">
                            <div className="flex gap-2 items-center md:min-w-52 text-foreground-500">
                                <KeyRound size={16} /> <span>{"Login"}:</span>
                            </div>
                            <span>{data?.username}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex-col border border-divider py-3 whitespace-nowrap px-6 rounded-lg flex items-start justify-center gap-1">
                <div className="flex items-center w-full border-b pb-2 dark:border-b-zinc-700">
                    <span className=" min-w-28 font-medium ">{"Baho"}:</span>
                    <span className={cn("w-full font-medium")}>
                        {data?.avg_score}
                    </span>
                </div>
                <div className="flex items-center w-full border-b pb-2 dark:border-b-zinc-700">
                    <span className=" min-w-28 font-medium ">{"Imtihon"}:</span>
                    <span className={cn(" font-medium")}>
                        {data?.avg_exam_score}
                    </span>
                </div>

                <div
                    className={cn(
                        "flex items-center",
                        Number(data?.balance) < 0 && "text-red-500",
                    )}
                >
                    <strong className="min-w-28 text-xl">{"Balans"}:</strong>
                    <span className="text-xl">
                        {formatMoney(data?.balance)}
                    </span>
                </div>
            </div>

            <Button className="absolute top-2 right-2">
                <Edit size={16} />
            </Button>
        </div>
    )
}

export default StudentProfile

const student = {
    id: "123",
    fullName: "Alice Johnson",
    phone: "+998 88 102 30 42",
    status: "Aktiv holatda",
    group: "Group A",
    enrollmentDate: "2023-09-01",
    photoUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    overviewData: {
        enrollmentDate: "September 1, 2023",
        currentGroup: "Group A (Advanced Math)",
        lastPaymentDate: "July 25, 2024",
        nextPaymentDue: "August 25, 2024",
    },
    groupsData: [
        {
            id: 1,
            name: "Group A (Advanced Math)",
            startDate: "2023-09-01",
            endDate: "2024-08-31",
            performance: "Excellent",
            paymentStatus: "Paid",
            balance: "$0.00",
            status: "Active",
            paymentHistory: [
                {
                    date: "2023-09-01",
                    amount: "$500.00",
                    type: "Tuition",
                    status: "Paid",
                },
                {
                    date: "2023-10-01",
                    amount: "$500.00",
                    type: "Tuition",
                    status: "Paid",
                },
                {
                    date: "2023-11-01",
                    amount: "$500.00",
                    type: "Tuition",
                    status: "Paid",
                },
                {
                    date: "2024-07-25",
                    amount: "$500.00",
                    type: "Tuition",
                    status: "Paid",
                }, // Latest payment
            ],
        },
        {
            id: 2,
            name: "Group B (Physics Basics)",
            startDate: "2024-01-15",
            endDate: "2024-06-30",
            performance: "Good",
            paymentStatus: "Paid",
            balance: "$0.00",
            status: "Active",
            paymentHistory: [
                {
                    date: "2024-01-15",
                    amount: "$450.00",
                    type: "Tuition",
                    status: "Paid",
                },
                {
                    date: "2024-02-15",
                    amount: "$450.00",
                    type: "Tuition",
                    status: "Paid",
                },
            ],
        },
        {
            id: 3,
            name: "Group C (Archived History)",
            startDate: "2022-03-01",
            endDate: "2022-12-31",
            performance: "Average",
            paymentStatus: "Paid",
            balance: "$0.00",
            status: "Archived",
            paymentHistory: [
                {
                    date: "2022-03-01",
                    amount: "$300.00",
                    type: "Tuition",
                    status: "Paid",
                },
                {
                    date: "2022-04-01",
                    amount: "$300.00",
                    type: "Tuition",
                    status: "Paid",
                },
            ],
        },
        {
            id: 4,
            name: "Group D (Pending Payment)",
            startDate: "2024-07-01",
            endDate: "2024-12-31",
            performance: "N/A",
            paymentStatus: "Pending",
            balance: "$250.00",
            status: "Active",
            paymentHistory: [
                {
                    date: "2024-07-01",
                    amount: "$250.00",
                    type: "Tuition",
                    status: "Pending",
                },
            ],
        },
    ],
    notesData: [
        {
            id: 1,
            date: "2024-07-20",
            author: "Mr. Smith",
            content:
                "Alice is a very diligent student, always completes homework on time.",
        },
        {
            id: 2,
            date: "2024-08-02", // Latest note
            author: "Admin",
            content: "Discussed upcoming exam schedule with Alice.",
        },
        {
            id: 3,
            date: "2024-07-15",
            author: "Admin",
            content: "Called parents to confirm new group enrollment.",
        },
    ],
    activityLogData: [
        {
            id: 1,
            timestamp: "2024-08-01 10:30 AM",
            type: "SMS Sent",
            description: "Sent payment reminder to parent.",
        },
        {
            id: 2,
            timestamp: "2024-07-28 09:00 AM",
            type: "Profile Edit",
            description: "Updated phone number by Admin.",
        },
        {
            id: 3,
            timestamp: "2024-07-25 02:15 PM",
            type: "Login",
            description: "Parent logged in to portal.",
        },
    ],

    discountsData: [
        {
            id: 1,
            amount: "10%",
            reason: "Early Bird Enrollment",
            status: "Active",
        },
        {
            id: 2,
            amount: "$50",
            reason: "Sibling Discount",
            status: "Active",
        },
    ],
}
