export default function StatusBadge({ status }: { status: number }) {
    return (
        <div>
            {status > 4.4 ?
                <span className="text-xs bg-green-500/50 py-1 px-2 rounded-lg">
                    Aktiv
                </span>
            :   <span className="text-xs bg-gray-500/50 py-1 px-2 rounded-lg">
                    Muzlatilgan
                </span>
            }
        </div>
    )
}
