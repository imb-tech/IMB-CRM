export default function StudentGroupHeader({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-4  gap-12 w-full text-[16px] text-start">
      <p className="font-medium">{data.name || "-"}</p>
      <p className="font-medium">O'rta</p>
      <p className="font-medium">{data.balans || 0}</p>
      <p className="font-medium">2025-08-21</p>
    </div>
  );
}
