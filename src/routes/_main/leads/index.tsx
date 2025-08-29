import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import PageLayout from "@/layouts/page-layout"
import LeadsMain from "@/pages/leads"
import CreateDepartment from "@/pages/leads/create-department"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FolderPlus, Plus } from "lucide-react"
import { useEffect, useRef } from "react"

export const Route = createFileRoute("/_main/leads/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { openModal } = useModal("create-pip")
    const navigate = useNavigate()
    const { data, isSuccess } =
        useGet<{ id: number; name: string }[]>(pipelineUrl)

    const hasLeads = isSuccess && data?.[0]?.id

    const hasNavigated = useRef(false)

    useEffect(() => {
        if (hasLeads && !hasNavigated.current) {
            hasNavigated.current = true
            navigate({
                to: "/leads/$id",
                params: { id: data?.[0]?.id?.toString() },
                search: { pipeline: data?.[0]?.id },
            })
        }
    }, [hasLeads, navigate, data])

    return (
        <PageLayout
            className={
                "bg-cover bg-center overflow-x-auto !overflow-y-hidden px-1 sm:px-4 "
            }
        >
            {hasLeads && <LeadsMain />}

            {!hasLeads && (
                <div className="h-full bg-gradient-to-br from-card to-background rounded-lg p-8">
                    <div className="flex flex-col items-center justify-center h-[80%] text-center">
                        <div className="w-32 h-32 mb-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <FolderPlus className="w-16 h-16 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Lidlar boshqaruvini boshlang!
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-md text-balance">
                            Lidlaringizni tartibli boshqarish uchun ularni alohida
                            bo'limlarga ajrating.
                        </p>
                        <Button
                            onClick={openModal}
                            className="py-3 h-12 text-[16px] px-8"
                        >
                            <Plus className="w-6 h-6 mr-2" />
                            Birinchi bo'limni yaratish
                        </Button>
                    </div>
                </div>
            )}
            <Modal modalKey="create-pip" title={`${"Yangi bo'lim qo'shish"}`}>
                <CreateDepartment item={null} />
            </Modal>
        </PageLayout>
    )
}
