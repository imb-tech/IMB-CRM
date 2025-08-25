import Modal from "@/components/custom/modal"
import AppendStudent from "./append-student"

export default function AppendStudentModal({ refetch }: { refetch: any }) {
    return (
        <Modal
            modalKey="append-student"
            title="O'quvchi qo'shish"
            size={"max-w-5xl"}
        >
            <AppendStudent onSuccess={refetch} />
        </Modal>
    )
}
