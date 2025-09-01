import { ParamCombobox } from "@/components/as-params/combobox"
import { useGet } from "@/hooks/useGet"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"

type Props = {}

function LeadsDepartmentFilter({}: Props) {
    const { data: dataLeadDepartment } = useGet<Pipeline[]>(pipelineUrl, {
        params: { is_active: true },
    })

    return (
        <ParamCombobox
            dontAllowClear
            defaultOpt={dataLeadDepartment?.[0]}
            paramName="pipeline"
            options={dataLeadDepartment ?? []}
            labelKey="name"
            valueKey="id"
            isSearch={false}
            label="Varonkalar"
            addButtonProps={{
                className:"min-w-[150px] justify-between !bg-background dark:!bg-secondary"
            }}
        />
    )
}

export default LeadsDepartmentFilter
