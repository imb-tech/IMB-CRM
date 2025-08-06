import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useRolesCols } from "./columns"
import Modal from "@/components/custom/modal"
import RoleCreate from "./create"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { ROLE } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import SettingsHeader from "../settings-header"

const RolesMain = () => {
    const { openModal: openModalRole } = useModal(`${ROLE}-add`)
    const { openModal: openModalDelete } = useModal(`${ROLE}-delete`)
    const [current, setCurrent] = useState<Role | null>(null)

    const params = useSearch({ from: "/_main/settings/_main/roles" })
    const { data, isFetching } = useGet<ListResp<Role>>(ROLE, {
        params,
    })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalRole()
    }
    const handleItemEdit = (item: Role) => {
        if (item.id) {
            setCurrent(item)
            openModalRole()
        }
    }
    const handleItemDelete = (item: Role) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }

    const columns = useRolesCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <SettingsHeader
                        dataCount={data?.count}
                        handleAdd={handleItemAdd}
                    />
                    <DataTable
                        onDelete={(row) => handleItemDelete(row.original)}
                        onEdit={(row) => handleItemEdit(row.original)}
                        columns={columns}
                        data={data?.results}
                        loading={isFetching}
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${ROLE}-add`}
                title={`Role ${current?.id ? "tahrirlash" : "qo'shish"}`}
            >
                <RoleCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${ROLE}-delete`}
                id={current?.id}
                path={ROLE}
            />
        </div>
    )
}

export default RolesMain

const data: Role[] = [
    {
        id: 1,
        name: "Admin",
        permissions: ["read", "write", "delete", "manage_users", "settings"],
    },
    { id: 2, name: "Manager", permissions: ["read", "write", "manage_team"] },
    { id: 3, name: "Editor", permissions: ["read", "write", "update_content"] },
    { id: 4, name: "Viewer", permissions: ["read"] },
    {
        id: 5,
        name: "HR",
        permissions: ["read", "manage_employees", "edit_profiles"],
    },
    {
        id: 6,
        name: "Finance",
        permissions: ["read", "access_billing", "generate_reports"],
    },
    {
        id: 7,
        name: "Support",
        permissions: ["read", "reply_tickets", "close_tickets"],
    },
    {
        id: 8,
        name: "Sales",
        permissions: ["read", "access_leads", "create_deals"],
    },
    { id: 9, name: "Developer", permissions: ["read", "write", "deploy_code"] },
    {
        id: 10,
        name: "Tester",
        permissions: ["read", "run_tests", "report_bugs"],
    },
    {
        id: 11,
        name: "Designer",
        permissions: ["read", "create_designs", "edit_designs"],
    },
    {
        id: 12,
        name: "Marketing",
        permissions: ["read", "run_campaigns", "edit_content"],
    },
    {
        id: 13,
        name: "Project Lead",
        permissions: ["read", "assign_tasks", "track_progress"],
    },
    { id: 14, name: "Intern", permissions: ["read", "limited_access"] },
    {
        id: 15,
        name: "Super Admin",
        permissions: ["read", "write", "delete", "manage_all"],
    },
    {
        id: 16,
        name: "Moderator",
        permissions: ["read", "ban_users", "approve_content"],
    },
    {
        id: 17,
        name: "Trainer",
        permissions: ["read", "upload_materials", "assign_Roles"],
    },
    {
        id: 18,
        name: "Recruiter",
        permissions: ["read", "manage_applicants", "schedule_interviews"],
    },
    {
        id: 19,
        name: "Auditor",
        permissions: ["read", "view_logs", "export_data"],
    },
    { id: 20, name: "Guest", permissions: ["read"] },
    {
        id: 21,
        name: "Analytics",
        permissions: ["read", "view_reports", "export_charts"],
    },
    {
        id: 22,
        name: "Coordinator",
        permissions: ["read", "schedule_meetings", "notify_users"],
    },
    {
        id: 23,
        name: "Supplier",
        permissions: ["read", "upload_inventory", "track_orders"],
    },
    {
        id: 24,
        name: "Warehouse",
        permissions: ["read", "manage_stock", "update_inventory"],
    },
]
