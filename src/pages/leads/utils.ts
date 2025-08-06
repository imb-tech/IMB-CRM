import { format } from "date-fns"

export function generateIndexedData<T extends LeadFields | LeadStatus>(
    array: T[],
    key1: string,
) {
    return array.map((usr, i) => ({
        [key1]: usr.id,
        order: i,
    }))
}

export function moveBetweenArrays<T>(
    source: T[],
    destination: T[],
    fromIndex: number,
    toIndex: number,
): { newSource: T[]; newDestination: T[] } {
    const sourceClone = [...source]
    const destinationClone = [...destination]
    const [movedItem] = sourceClone.splice(fromIndex, 1)
    destinationClone.splice(toIndex, 0, movedItem)
    return {
        newSource: sourceClone,
        newDestination: destinationClone,
    }
}

export function groupMessagesByDate(messages: LeadNote[]) {
    const grouped: { [key: string]: LeadNote[] } = {}

    messages.forEach((message) => {
        // created_at dan faqat sanani ajratamiz (YYYY-MM-DD)
        const date = message.created_at?.split("T")[0]

        if (!grouped[date]) {
            grouped[date] = []
        }
        grouped[date].push(message)
    })

    return grouped
}

export function moveItem<T>(
    array: T[],
    fromIndex: number,
    toIndex: number,
): T[] {
    const newArray = [...array]
    const [movedItem] = newArray.splice(fromIndex, 1)
    newArray.splice(toIndex, 0, movedItem)
    return newArray
}

export function formatDateChat(dateString: string): string {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
        return "Bugun"
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Kecha"
    } else {
        return format(String(date), "yyyy-MM-dd")
    }
}
