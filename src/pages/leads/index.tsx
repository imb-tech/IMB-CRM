import Modal from "@/components/custom/modal"
import LeadsHeader from "./leads-header"
import CreateLeadModal from "./leadform/create-lead-modal"
import LeadsDnd from "./leads-dnd/leads-dnd"
import { useStore } from "@/hooks/use-store"

const LeadsMain = () => {
    const { store } = useStore<Lead>("lead-data")
    return (
        <div className="relative">
            <LeadsHeader />
            <div className="max-w-full h-[82vh] 2xl:h-[87vh]  overflow-x-scroll no-scrollbar-x overflow-y-hidden">
                <LeadsDnd />
            </div>

            <Modal
                title={store?.id ? "Lidni tahrirlash" : "Yangi Lid qo'shish"}
            >
                <CreateLeadModal />
            </Modal>
        </div>
    )
}

export default LeadsMain
