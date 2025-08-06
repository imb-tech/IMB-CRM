import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface MetricCardProps {
    title: string
    value: string | number
    icon: ReactNode
    description?: string
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
    return (
        <Card className="hover:shadow-md border-none relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
