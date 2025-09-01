import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarDays, KeyRound, PhoneCall, School } from "lucide-react"

type Props = {
    data: Student | undefined
}

function StudentProfile({ data }: Props) {
    return (
        <div className="bg-card border-divider border relative rounded-lg  p-4 flex lg:flex-row flex-col gap-5 lg:gap-0 lg:justify-between ">
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

            <div className="flex-col h-[170px]  border border-divider py-3 whitespace-nowrap px-6 rounded-lg flex items-start  gap-1">
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
        </div>
    )
}

export default StudentProfile
