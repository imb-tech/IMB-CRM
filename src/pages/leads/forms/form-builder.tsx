import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Settings } from "lucide-react"
import useLeadPipeline from "../use-lead-pipeline"
import { useFormContext } from "react-hook-form"
import { FormSelect } from "@/components/form/select"
import FormInput from "@/components/form/input"
import { FormBuilderFields } from "./form-builder-fields"
import { FormBuilderStyling } from "./form-builder-styling"
import { useGet } from "@/hooks/useGet"

export function FormBuilder() {
    const [activeTab, setActiveTab] = useState("general")
    const { data } = useLeadPipeline({})
    const { data: sources } = useGet<Source[]>("leads/common/sources", {
        params: { is_active: true },
    })

    const form = useFormContext<FormConfig>()

    return (
        <div className="h-full relative">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col items-start"
            >
                <TabsList className="grid w-full grid-cols-2 p-1 rounded-md mb-6">
                    <TabsTrigger
                        value="general"
                        className="rounded-sm  data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
                    >
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">Umumiy</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="styling"
                        className="rounded-sm  data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
                    >
                        <Palette className="w-4 h-4" />
                        <span className="hidden sm:inline">Dizayn</span>
                    </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden w-full">
                    <TabsContent
                        value="general"
                        className="h-full overflow-y-auto space-y-6 mt-0 px-1 no-scrollbar"
                    >
                        <div className="w-full">
                            <div className="space-y-6 mb-4 w-full">
                                <div className="flex items-center gap-4">
                                    <FormSelect
                                        control={form.control}
                                        name="pipeline"
                                        valueKey="id"
                                        required
                                        label="Bo'lim"
                                        placeholder="Qaysi bo'limga ulash kerak"
                                        labelKey="name"
                                        options={data ?? []}
                                    />
                                    <FormSelect
                                        control={form.control}
                                        name="source"
                                        valueKey="id"
                                        required
                                        label="Manba"
                                        placeholder="Lidlar kelish manbasi"
                                        labelKey="name"
                                        options={sources ?? []}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <FormInput
                                        methods={form}
                                        name="name"
                                        label="Form nomi"
                                        placeholder="Foydalanuvchilarga ko'rinadi"
                                        required
                                    />
                                    <FormInput
                                        methods={form}
                                        name="desc"
                                        label="Form tavsifi"
                                        placeholder="Form haqida qo'shimcha ma'lumot"
                                    />
                                </div>
                            </div>

                            <FormBuilderFields />
                        </div>
                    </TabsContent>

                    {/* Styling */}
                    <TabsContent value="styling" className="h-full">
                        <FormBuilderStyling />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
