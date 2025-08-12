import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
    DollarSign,
    Edit,
    Mail,
    MessageSquare,
    Phone,
    User,
    Users,
} from "lucide-react"

type Props = {}

function StudentProfile({}: Props) {
    return (
        <Card className=" shadow-sm ">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 relative">
                <Avatar className="h-20 w-20">
                    <AvatarImage
                        alt={student.fullName}
                        src={
                            student.photoUrl ||
                            "/placeholder.svg?height=100&width=100&query=student photo"
                        }
                    />
                    <AvatarFallback>
                        {student.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="grid gap-1 flex-grow">
                    <CardTitle className="text-xl font-bold">
                        {student.fullName}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{student.phone}</span>
                    </div>
                    <Badge className={"bg-green-600/10 text-green-600 w-fit"}>
                        {student.status}
                    </Badge>
                </div>

                <Button
                    variant={"secondary"}
                    className="absolute top-2 right-4"
                >
                    <Edit size={18} />
                </Button>
            </CardHeader>

            <CardFooter className="flex flex-wrap gap-3 pt-4 border-t">
                <Button className="bg-blue-600/10 hover:bg-blue-700/10 text-blue-500">
                    <Users className="mr-2 h-4 w-4" /> Guruhga qo'shish
                </Button>
                <Button variant={"secondary"}>
                    <DollarSign className="mr-2 h-4 w-4" /> To'lovni amalga
                    oshirish
                </Button>
                <Button className="bg-orange-600/10 hover:bg-orange-700/10 text-orange-500">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    SMS yuboring
                </Button>
            </CardFooter>
        </Card>
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
    parentsData: [
        {
            id: 1,
            name: "John Johnson (Father)",
            phone: "+1 (555) 999-8888",
            email: "john.johnson@example.com",
            loginAccess: true,
        },
        {
            id: 2,
            name: "Jane Johnson (Mother)",
            phone: "+1 (555) 777-6666",
            email: "jane.johnson@example.com",
            loginAccess: true,
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
