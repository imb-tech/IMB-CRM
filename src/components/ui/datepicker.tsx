import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ClassNameValue } from "tailwind-merge"

export function DatePicker({
    date,
    setDate,
    placeholder,
    fullWidth,
    disabled,
    calendarProps,
    defaultValue,
    isError,
    size = "lg",
    className,
}: {
    date: Date | any
    setDate: any
    placeholder?: string
    fullWidth?: boolean
    disabled?: boolean
    calendarProps?: CalendarProps | undefined
    defaultValue?: Date
    isError?: boolean
    size?: "default" | "lg" | "sm" | "icon"
    className?: ClassNameValue
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size={size}
                    variant={"outline"}
                    className={cn(
                        "w-12 md:w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        fullWidth && "w-full",
                        isError && "border-destructive",
                        className,
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-1 text-gray-400 h-4 w-4" />
                    <span className="hidden md:block">
                        {date ?
                            format(date, "dd/MM/yyyy")
                        :   <span className="text-gray-400">
                                {placeholder || "Kunni tanlang"}
                            </span>
                        }
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...calendarProps}
                    mode="single"
                    selected={new Date(date || (defaultValue as Date))}
                    onSelect={(newDate) =>
                        setDate(format(new Date(newDate as Date), "yyyy-MM-dd"))
                    }
                />
            </PopoverContent>
        </Popover>
    )
}
