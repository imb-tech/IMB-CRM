import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"

export default function StudentsFilter() {
    return (
        <div className="grid lg:grid-cols-6 md:grid-cols-2 gap-2 ">
            <ParamInput fullWidth />
            <ParamCombobox
                isSearch={false}
                label="Kurslar"
                className="w-full"
                options={[
                    {
                        label: "Barchasi",
                        value: "all",
                    },
                    {
                        label: "Faol",
                        value: "active",
                    },
                ]}
                paramName="status"
            />
            <ParamCombobox
                isSearch={false}
                label="Guruhdagi holati"
                className="w-full"
                options={[
                    {
                        label: "Barchasi",
                        value: "all",
                    },
                    {
                        label: "Faol",
                        value: "active",
                    },
                ]}
                paramName="status"
            />
            <ParamCombobox
                isSearch={false}
                label="To'lov holati"
                className="w-full"
                options={[
                    {
                        label: "Barchasi",
                        value: "all",
                    },
                    {
                        label: "Faol",
                        value: "active",
                    },
                ]}
                paramName="status"
            />
            <ParamCombobox
                isSearch={false}
                label="Guruh"
                className="w-full"
                options={[
                    {
                        label: "Barchasi",
                        value: "all",
                    },
                    {
                        label: "Faol",
                        value: "active",
                    },
                ]}
                paramName="status"
            />
            <ParamCombobox
                isSearch={false}
                label="Ustoz"
                className="w-full"
                options={[
                    {
                        label: "Barchasi",
                        value: "all",
                    },
                    {
                        label: "Faol",
                        value: "active",
                    },
                ]}
                paramName="status"
            />
        </div>
    )
}
