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
    const branch = localStorage.getItem("branch")
    return branch ? Number(branch) : null
}

export function setActiveBranch(branchId: number | string) {
    try {
        localStorage.setItem("branch", branchId.toString())
        return true
    } catch {
        return false
    }
}

export const imagePaths = [
    "/task/fon1.jpg",
    "/task/fon2.jpg",
    "/task/fon3.jpg",
    "/task/fon4.jpg",
    "/task/fon5.jpg",
    "/task/fon6.jpg",
    "/task/fon7.jpg",
    "/task/fon8.jpg",
    "/task/fon9.jpg",
    "/task/fon10.jpg",
    "/task/fon11.jpg",
    "/task/fon12.jpg",
    "/task/fon13.jpg",
    "/task/fon14.jpg",
    "/task/fon15.jpg",
    "/task/fon16.jpg",
    "/task/fon17.jpg",
    "/task/fon18.jpg",
    "/task/fon19.png",
    "/task/fon20.jpg",
    "/task/fon21.jpg",
    "/task/fon22.jpg",
    "/task/fon23.png",
    "/task/fon24.png",
]

export function getRandomImage() {
    return imagePaths[Math.floor(Math.random() * imagePaths.length)]
}

export const months = [
    { key: "01", name: "Yanvar" },
    { key: "02", name: "Fevral" },
    { key: "03", name: "Mart" },
    { key: "04", name: "Aprel" },
    { key: "05", name: "May" },
    { key: "06", name: "Iyun" },
    { key: "07", name: "Iyul" },
    { key: "08", name: "Avgust" },
    { key: "09", name: "Sentabr" },
    { key: "10", name: "Oktabr" },
    { key: "11", name: "Noyabr" },
    { key: "12", name: "Dekabr" },
]


export function generateUsername(fullName: string): string {
    const normalized = fullName.trim().toLowerCase()
    const parts = normalized.split(' ');

    return parts.join('_')
}

export type teacherSalary = 'course_amount' | 'by_payments' | 'by_debts'

export const teacherSalaryTypes: { name: string, value: teacherSalary }[] = [
    {
        name: 'Kurs narxidan',
        value: 'course_amount'
    }
    ,
    {
        name: "O'quvchilat to'lovidan",
        value: 'by_payments'
    }
    ,
    {
        name: "O'quvchilar qarzdorligidan",
        value: 'by_debts'
    }
]