import { X, Calendar } from "lucide-react"
import {
    format,
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    subDays,
    isEqual,
} from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useState, useEffect, useCallback } from "react"
import type { DateRange } from "react-day-picker"
import { useSearch, useRouter } from "@tanstack/react-router"

interface ParamDateRangePickerProps {
    className?: string
    dateFormat?: string
    fromParamName?: keyof SearchParams
    toParamName?: keyof SearchParams
    presetParamName?: string
    placeholder?: string
    disabled?: boolean
    showToday?: boolean
    showYesterday?: boolean
    showLastWeek?: boolean
    showLastMonth?: boolean
}

export default function ParamDateRangePicker({
    className,
    dateFormat = "yyyy-MM-dd",
    fromParamName = "start",
    toParamName = "end",
    presetParamName = "preset",
    placeholder = "Boshqa",
    disabled = false,
    showToday = false,
    showYesterday = false,
    showLastWeek = false,
    showLastMonth = false,
}: ParamDateRangePickerProps) {
    const router = useRouter()
    const search = useSearch({ from: "__root__" })

    const fromDateString = search[fromParamName]
    const toDateString = search[toParamName]
    const presetParam = search[presetParamName as keyof SearchParams] as
        | "today"
        | "yesterday"
        | "week"
        | "month"
        | undefined

    const fromDate = fromDateString ? new Date(fromDateString) : undefined
    const toDate = toDateString ? new Date(toDateString) : undefined

    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
        fromDate && toDate && !presetParam ?
            { from: fromDate, to: toDate }
        :   undefined,
    )
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (fromDate && toDate && !presetParam) {
            setSelectedRange({ from: fromDate, to: toDate })
        } else {
            setSelectedRange(undefined)
        }
    }, [fromDateString, toDateString, presetParam])

    const updateSearchParams = useCallback(
        (newFromDate?: Date, newToDate?: Date, preset?: string) => {
            if (disabled) return
            const newSearch = {
                ...search,
                [fromParamName]:
                    newFromDate ? format(newFromDate, dateFormat) : undefined,
                [toParamName]:
                    newToDate ? format(newToDate, dateFormat) : undefined,
                [presetParamName]: preset || undefined,
            }
            router.navigate({
                to: router.state.location.pathname,
                search: newSearch,
            })
        },
        [
            search,
            fromParamName,
            toParamName,
            presetParamName,
            dateFormat,
            disabled,
            router,
        ],
    )

    const keys = {
        today: showToday,
        yesterday: showYesterday,
        week: showLastWeek,
        month: showLastMonth,
    }

    const rr = Object.entries(keys)?.filter(([_, v]) => v)
    const list = rr?.map(([k, _]) => k)

    const reset = () => {
        setSelectedRange(undefined)
        updateSearchParams(undefined, undefined, undefined)
    }

    const formatDateRange = () => {
        if (!selectedRange?.from || !selectedRange?.to) return placeholder
        const fromFormatted = format(selectedRange.from, "dd.MM.yyyy")
        const toFormatted = format(selectedRange.to, "dd.MM.yyyy")
        return `${fromFormatted} - ${toFormatted}`
    }

    const todayRange = {
        from: startOfDay(new Date()),
        to: endOfDay(new Date()),
    }
    const yesterdayRange = {
        from: startOfDay(subDays(new Date(), 1)),
        to: endOfDay(subDays(new Date(), 1)),
    }
    const weekRange = {
        from: startOfWeek(new Date(), { weekStartsOn: 1 }),
        to: endOfWeek(new Date(), { weekStartsOn: 1 }),
    }
    const monthRange = {
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    }

    const isActivePreset = (key: string) => presetParam === key

    const handlePresetClick = (preset: string) => {
        if (disabled) return

        const range =
            preset === "today" ? todayRange
            : preset === "yesterday" ? yesterdayRange
            : preset === "week" ? weekRange
            : monthRange

        updateSearchParams(range.from, range.to, preset)
    }

    return (
        <div
            className={cn(
                "relative flex items-center gap-1 bg-card rounded-md py-1.5 px-1",
                className,
            )}
        >
            <div className="flex gap-2">
                {list.map((preset) => (
                    <span
                        key={preset}
                        className={cn(
                            "px-3 py-1 rounded-sm text-sm cursor-pointer transition-colors",
                            isActivePreset(preset) ?
                                "bg-primary/20 text-primary"
                            :   "hover:bg-primary/30",
                        )}
                        onClick={() => handlePresetClick(preset)}
                    >
                        {
                            {
                                today: "Bugun",
                                yesterday: "Kecha",
                                week: "Hafta",
                                month: "Oy",
                            }[preset]
                        }
                    </span>
                ))}
            </div>

            <div className="text-right flex items-center gap-2">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div className="text-white hover:bg-primary/20 flex items-center gap-2 cursor-pointer px-2 py-0.5 rounded-sm">
                            <span className="font-light">
                                {selectedRange?.from && selectedRange?.to ?
                                    formatDateRange()
                                :   placeholder}
                            </span>
                            <Calendar className="h-4 w-4" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 space-y-3">
                            <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={selectedRange?.from}
                                selected={selectedRange}
                                onSelect={(range) => setSelectedRange(range)}
                                numberOfMonths={2}
                                className="rounded-md border"
                            />
                            <div className="flex justify-between items-center pt-3 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        reset()
                                        setIsOpen(false)
                                    }}
                                >
                                    Tozalash
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        if (
                                            selectedRange?.from &&
                                            selectedRange?.to
                                        ) {
                                            updateSearchParams(
                                                selectedRange.from,
                                                selectedRange.to,
                                                undefined,
                                            )
                                        }
                                        setIsOpen(false)
                                    }}
                                    disabled={
                                        !selectedRange?.from ||
                                        !selectedRange?.to
                                    }
                                >
                                    Davom etish
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {selectedRange?.from && selectedRange?.to && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-rose-500 cursor-pointer mx-2"
                />
            )}
        </div>
    )
}
