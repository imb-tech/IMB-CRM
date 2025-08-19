import Modal from "@/components/custom/modal"
import { useState } from "react"
import AppendStudent from "./append-student"

export default function AppendStudentModal({ refetch }: { refetch: any }) {
    const [size, setSize] = useState<"max-w-md" | "max-w-5xl">("max-w-md")
    return (
        <Modal modalKey="append-student" title="O'quvchi qo'shish" size={size}>
            <AppendStudent
                onSuccess={refetch}
                setSize={(s: "max-w-md" | "max-w-5xl") => setSize(s)}
            />
        </Modal>
    )
}
