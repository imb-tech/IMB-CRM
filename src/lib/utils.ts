import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function formatDate(date?: string, onlyDate = false) {
    if (!date) {
        return ""
    }

    const frmt = onlyDate ? "dd.MM.yyyy" : "HH:mm dd.MM.yyyy"

    return format(date, frmt)
}

export function formatTime(time?: string) {
    if (!time) {
        return ""
    }

    return time?.slice(0, 5)
}

export function getActiveBranch(): number | null {
    const branch = localStorage.getItem('branch')
    return branch ? Number(branch) : null
}

export function setActiveBranch(branchId: number | string) {
    try {
        localStorage.setItem('branch', branchId.toString())
        return true
    } catch {
        return false
    }
}