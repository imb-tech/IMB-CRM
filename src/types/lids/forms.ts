type LeadFieldType =
    | "input"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "phone"

type LeadFieldExData = {
    options?: string[]
    is_fixed?: boolean
    fixed_name?: string
}

type FormConfig = {
    id?: number
    fields: LeadFormField[]
    successMessage: string
    successMessage2: string
    pipeline?: number
    source?: number
    name: string
    desc: string
    extra_data: {
        submit_text: string
        borderRadius: string
        primary_color: string
    }
}

type LeadFormField = {
    id: string
    type: LeadFieldType
    label: string
    placeholder?: string
    required?: boolean
    value?: number | string | string[]
    extra_data: LeadFieldExData
}

type LeadForm = {
    id: number
    pipeline: number
    name: string
    pipeline_name: string
    leads_count: number
    uuid: string
    source_data: {
        id: number
        name: string
        icon: string
    }
}

type LeadSubmission = {
    id: number
    form_field: {
        id: number
        type: LeadFieldType
        label: string
        required: boolean
        extra_data: LeadFieldExData
        order: number
        placeholder: string
        is_active: boolean
    }
    answer: string
    file: string | null
}
