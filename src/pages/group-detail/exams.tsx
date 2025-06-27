import { DataTable } from "@/components/ui/datatable"
import { useGroupExamsCols } from "./cols"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ActionDropdown from "@/components/elements/action-dropdown"
import SectionHeader from "@/components/elements/section-header"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, TrendingDown, TrendingUp } from "lucide-react"

export default function GroupExams() {
    const isMobile = useIsMobile()
    const columns = useGroupExamsCols()

    return (
        <div>
            <SectionHeader
                title="Imtixonlar"
                rightComponent={
                    <Button variant="secondary">
                        <Plus />
                        Yangi
                    </Button>
                }
            />
            {isMobile ?
                <div className="flex flex-col gap-2">
                    {data.map((exam) => (
                        <Card
                            key={exam.id}
                            className="border-0 shadow-sm bg-secondary"
                        >
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-primary">
                                        {exam.name}
                                    </h3>
                                    <ActionDropdown />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Imtixon sanasi
                                            </p>
                                            <p className="font-medium">
                                                {exam.take_date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                                <TrendingDown className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    O'tish ball
                                                </p>
                                                <p className="font-medium">
                                                    {exam.min_score}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Yuqori ball
                                                </p>
                                                <p className="font-medium">
                                                    {exam.max_score}
                                                </p>
                                            </div>
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

const data: GroupExam[] = [
    {
        id: 1,
        name: "Beginner bitiruv",
        take_date: "12.07.2025",
        max_score: 100,
        min_score: 40,
    },
]
