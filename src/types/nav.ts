type SubMenuItem = {
    title: string
    to: string
    params: { id: string }
    search?: Partial<SearchParams>
    icon?: React.ReactNode
}
