import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useRolesCols } from "./columns"
import { Badge } from "@/components/ui/badge"

const RolesMain = () => {
    const columns = useRolesCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Rollar</h1>
                            <Badge variant={"outline"} className="text-sm">
                                {data.length}
                            </Badge>
                        </div>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Qo'shish
                        </Button>
                    </div>
                    <DataTable
                        onDelete={() => {}}
                        onEdit={() => {}}
                        columns={columns}
                        data={data}
                    />
                </CardContent>
            </Card>
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
        permissions: ["read", "upload_materials", "assign_courses"],
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
