type ListResp<T> = {
    total_pages: number
    count: number
    results: T[]
    total_debts: string
}

type Options = {
    id: number
    name: string
    full_name: string
}
