type LeadContact = {
    id?: number
    full_name: string
    phone: string
    is_main: boolean
}

type LeadCondition = "new" | "connected" | "loosed" | "deleted" | "success"

type Lid = {
    name: string
}
type PhoneNumber = {
    id: string
    number: string
    is_primary: boolean
}

type Lead = {
    id: number
    name: string
    contacts_list: LeadContact[]
    contacts?: LeadContact[]
    author: number
    worker: number
    source: number
    status: number
    source_icon: string
    source_name: string
    worker_name: string
    get_main_contact: string
    condition: LeadCondition
    pipeline_id: number
}

type Task = {
    id: string
    title: string
    description?: string
    dueDate?: string
    completed: boolean
    createdAt: string
}

type Stage = {
    id: string
    name: string
    color: string
}

type Pipeline = {
    id: string
    name: string
    stages: Stage[]
    order: number
    is_active: boolean
    background: string
}

type Source = {
    id: number
    name: string
    icon: string
    is_active: boolean
}

type LeadStatus = {
    id: number
    name: string
    order: number
    is_active: boolean
    pipeline: number
    editable?: boolean
}

type LeadFields = {
    id: number
    name: string
    contacts_list: LeadContact[]
    author: number
    worker: number
    source: number
    source_icon: string
    source_name: string
    worker_name: string
    status: number
}

type LeadNote = {
    id: number
    note: string
    lead: number
    created_at: string
    type: "note" | "task"
    author_name: string
    users: number[]
    body: string
    old_status: null | string
    new_status: null | string
    project: number
    title: string
    full_name: string
    status__name: string
    deadline: string
}

type LeadLog = {
    id: number
    body: string
    author: number
    lead: number
    created_at: string
    old_status: null | string
    new_status: null | string
}

type NoteOrLog = LeadNote & LeadLog

type LeadSource = {
    name: string
    value: number
    color: string
}

type UserPerformance = {
    name: string
    leads: number
    converted: number
    rate: number
    calls: number
    meetings: number
}

type LeadUserStatus = {
    name: string
    value: number
    color: string
}

type MonthlyTrend = {
    month: string
    leads: number
    converted: number
}

type WorkPerformance = {
    day: string
    calls: number
    meetings: number
    emails: number
    tasks: number
}

type LeadStatSource = {
    id: number
    name: string
    leads_count: number
    icon: string
}

type LeadStatEmploye = {
    worker: number
    full_name: string
    count: number
}

type LeadMainStat = {
    total: number
    loosed_count: number
    success_count: number
    success_percentage: number
    processing: number
}

type MainLeadStats = {
    main_card: LeadMainStat
    source: LeadStatSource[]
    employees: LeadStatEmploye[]
}

type LeadMonthly = {
    month: string
    count: number
}
