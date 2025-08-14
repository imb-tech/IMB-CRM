export default function StudentApproHeader({ data }: { data: any }) {
    return (
        <div className="grid grid-cols-3  gap-12 w-full text-sm text-start">
            <p>{data.name || "Frontend"}</p>
            <p>{"95.3 / 100"}</p>
            <p>85.5 / 100</p>
        </div>
    )
}
