export default function StudentGroupHeader({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-2  gap-14 w-full text-[16px] text-start">
      <p className="font-medium">{data.name || "-"}</p>
      <p className="font-medium">{data.balans || 0}</p>
    </div>
  );
}
