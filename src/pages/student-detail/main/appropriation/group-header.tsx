export default function StudentApproHeader({ data }: { data: Student }) {
    return (
        <div className="grid grid-cols-3  gap-12 w-full text-sm text-start">
            <p>{data?.group_data?.name || "Frontend"}</p>
            <p>{`${data?.avg_exam_score || 0} / 100`}</p>
            <p>{data?.avg_score || 0} / 100</p>
        </div>
    )
}
