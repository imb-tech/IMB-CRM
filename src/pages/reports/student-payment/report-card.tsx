import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "@/lib/format-money"
import { Link } from "@tanstack/react-router"
import clsx from "clsx"
import { DollarSign, Users } from "lucide-react"

type Props = {
    data: {
        title: string
        value: string | number
        badgeBg: string
        textColor: string
        url: string
    }
}

const ReportCard = ({ data }: Props) => {
    const { title, value, badgeBg, textColor, url } = data
    return (
        <Link to={url}>
            <Card
                className={clsx(
                    "relative overflow-hidden border-none shadow-none hover:shadow-sm transition-all bg-card p-5 rounded-lg",
                )}
            >
                <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-2 justify-between">
                        <CardTitle className="text-2xl font-extralight opacity-70 p-0">
                            {title}
                        </CardTitle>
                        <div className="flex items-center gap-2 pl-3">
                            <Users className={textColor} />
                            <div className={`text-lg font-light`}>{value}</div>
                        </div>
                        {/* <div className={`rounded-full ${badgeBg} p-2`}>
                            {icon}
                        </div> */}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col-reverse gap-3 pt-4 px-0 items-start">
                    {/* <span className="text-muted-foreground">/</span> */}
                    <Badge
                        className={`${badgeBg} ${textColor}  border-0 text-2xl font-light hover:${badgeBg}`}
                    >
                        <div className="flex items-center gap-1">
                            <DollarSign className={textColor} />
                            {formatMoney(56_000_000, undefined, " so'm")}
                        </div>
                    </Badge>
                </CardContent>
                <div className="absolute right-4 bottom-2 opacity-20">
                    {/* {iconLarge} */}
                </div>
            </Card>
        </Link>
    )
}

export default ReportCard
