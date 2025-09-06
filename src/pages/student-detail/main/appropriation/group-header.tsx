export default function StudentApproHeader({ data }: { data: Student }) {
    return (
        <div className="grid grid-cols-4  gap-12 w-full text-sm text-start">
            <p>{data?.group_data?.name || ""}</p>
            <p>{data?.assessments_count || 0}</p>
            <p>{`${data?.avg_exam_score || 0} / 100`}</p>
            <p>{data?.avg_score || 0} / 100</p>
        </div>
    )
}
