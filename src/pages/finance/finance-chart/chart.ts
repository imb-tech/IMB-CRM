export interface ChartData {
    name: string
    value: number
    color: string
}

export interface ChartProps {
    data?: ChartData[]
    title?: string
    className?: string
}

export interface ChartItemProps {
    item: ChartData
    isActive: boolean
    onHover: (index: number) => void
    onClick: (index: number) => void
    index: number
}

