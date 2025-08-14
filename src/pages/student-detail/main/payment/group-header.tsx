export default function StudentGroupHeader({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-4  gap-12 w-full text-sm text-start">
            <p>{data.name || "-"}</p>
            <p>O'rta</p>
            <p>{data.balans || 0}</p>
            <p>2025-08-21</p>
        </div>
    )
}
