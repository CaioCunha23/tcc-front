import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

interface DateRangePickerProps {
    dateFrom: string
    dateTo: string
    setDateFrom: (value: string) => void
    setDateTo: (value: string) => void
}

export function DateRangePicker({
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
}: DateRangePickerProps) {
    const [internalRange, setInternalRange] = useState<DateRange | undefined>(() => {
        const fromDate = dateFrom ? new Date(dateFrom) : undefined
        const toDate = dateTo ? new Date(dateTo) : undefined
        return fromDate || toDate ? { from: fromDate, to: toDate } : undefined
    })

    useEffect(() => {
        const fromDate = dateFrom ? new Date(dateFrom) : undefined
        const toDate = dateTo ? new Date(dateTo) : undefined
        setInternalRange(fromDate || toDate ? { from: fromDate, to: toDate } : undefined)
    }, [dateFrom, dateTo])

    const onRangeChange = (range: DateRange | undefined) => {
        setInternalRange(range)

        if (range?.from) {
            setDateFrom(format(range.from, "yyyy-MM-dd"))
        } else {
            setDateFrom("")
        }

        if (range?.to) {
            setDateTo(format(range.to, "yyyy-MM-dd"))
        } else {
            setDateTo("")
        }
    }

    const displayText = () => {
        if (internalRange?.from && internalRange?.to) {
            return `${format(internalRange.from, "yyyy-MM-dd")} → ${format(
                internalRange.to,
                "yyyy-MM-dd"
            )}`
        }
        if (internalRange?.from && !internalRange?.to) {
            return `${format(internalRange.from, "yyyy-MM-dd")} →`
        }
        if (!internalRange?.from && internalRange?.to) {
            return `→ ${format(internalRange.to, "yyyy-MM-dd")}`
        }
        return "Selecione o intervalo"
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full lg:w-auto justify-start pl-3 pr-2 text-left cursor-pointer",
                        !internalRange?.from && !internalRange?.to ? "text-primary" : ""
                    )}
                >
                    {displayText()}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[300px] p-0">
                <Calendar
                    className="flex rounded-md border justify-center"
                    mode="range"
                    selected={internalRange}
                    onSelect={onRangeChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}