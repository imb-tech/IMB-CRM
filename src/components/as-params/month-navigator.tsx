import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Select from "@/components/ui/select"
import { cn } from "@/lib/utils";

interface MonthNavigatorProps {
    months: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
    className?: string
}

export default function MonthNavigator({ months, value, onChange, className }: MonthNavigatorProps) {
    const currentIndex = months.findIndex((m) => m.value === value)

    const handlePrev = () => {
        if (currentIndex > 0) {
            onChange(months[currentIndex - 1].value)
        }
    }

    const handleNext = () => {
        if (currentIndex < months.length - 1) {
            onChange(months[currentIndex + 1].value)
        }
    }

    if (!value) return null

    return (
        <div className="flex items-center gap-1">
            <Button
                variant={currentIndex <= 0 ? "secondary" : undefined}
                className="min-w-10 h-10 p-0 select-none"
                disabled={currentIndex <= 0}
                onClick={handlePrev}
            >
                <ChevronLeft size={24} />
            </Button>

            <Select
                label="Oy bo'yicha"
                options={months}
                value={value}
                setValue={(v) => onChange(v.toString())}
                className={cn("min-w-[130px] text-center", className)}
            />

            <Button
                variant={currentIndex === months.length - 1 ? "secondary" : undefined}
                className="min-w-10 h-10 p-0 select-none"
                disabled={currentIndex === months.length - 1}
                onClick={handleNext}
            >
                <ChevronRight size={24} />
            </Button>
        </div>
    )
}
