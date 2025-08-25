import Modal from "@/components/custom/modal"
import ExamForm from "./exam-form"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useEffect, useMemo, useState } from "react"
import TaskForm from "./task-form"
import ThemeForm from "./theme-form"
import Select from "@/components/ui/select"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { useGet } from "@/hooks/useGet"
import Spinner from "@/components/ui/spinner"
import { FormProvider, useForm } from "react-hook-form"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import { useParams } from "@tanstack/react-router"
import { GROUP, GROUP_STUDENTS } from "@/constants/api-endpoints"
import { studentStatusKeys } from "../students/student-status"
import { useQueryClient } from "@tanstack/react-query"

export default function GroupTabs({ refetch }: { refetch: () => void }) {
    const { store, remove } = useStore<string>("day")
    const { store: item, remove: clear } = useStore<GroupModule>("item")
    const [tab, setTab] = useState(
        item?.type ? item.type
        : store ? store
        : "topic",
    )
    const { id: group } = useParams({ from: "/_main/groups/$id/_main/tasks/" })

    const { data } = useGet<Group>(GROUP + "/" + group)
    const { data: students } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { group },
    })

    const { closeModal } = useModal("day")
    const isEdit = useMemo(() => typeof item?.id === "number", [item])

    const { data: detail, isSuccess } = useGet<GroupModule>(
        `platform/groups/modules/${item?.id}`,
        {
            options: {
                enabled: !!item?.id && isEdit,
            },
        },
    )

    const headers = {
        "Content-Type": "multipart/form-data",
    }
    const qc = useQueryClient()

    function onSuccess() {
        qc.removeQueries({ queryKey: [`platform/groups/modules/${item?.id}`] })
        remove()
        closeModal()
        refetch()
    }

    const { mutate, isPending } = usePost({ onSuccess }, { headers })
    const { mutate: patch, isPending: isPatching } = usePatch(
        { onSuccess },
        { headers },
    )

    const form = useForm<GroupModuleForm>({
        defaultValues: {
            controller: data?.teacher,
        },
    })

    function handleSubmit(vals: GroupModule) {
        const conf = {
            ...vals,
            type: tab,
            file_datas: vals.uploaded_files.filter(
                (f) => typeof f !== "string",
            ),
            uploaded_files: undefined,
            group,
            date: item?.date,
            students: vals.students.map((st) => st.id).join(","),
        }
        if (item?.id) {
            patch(`platform/groups/modules/${item?.id}`, conf)
        } else {
            mutate("platform/groups/modules", conf)
        }
    }

    useEffect(() => {
        if (store) {
            setTab(store)
        }
        if (data) {
            form.setValue("controller", data.teacher)
        }
    }, [store, data])

    useEffect(() => {
        if (detail && isEdit) {
            form.setValue("type", detail.type)
            form.setValue("title", detail.title)
            form.setValue("description", detail.description)
            form.setValue("deadline", detail.deadline)
            form.setValue("min_score", detail.min_score)
            form.setValue("max_score", detail.max_score)
            form.setValue("is_homework_required", detail.is_homework_required)
            form.setValue(
                "uploaded_files",
                detail.files.map((f) => f.file),
            )
        }
    }, [detail, isEdit])

    useEffect(() => {
        if (students?.length && !isEdit) {
            form.setValue(
                "students",
                students.map((st) => ({
                    id: st.id,
                    full_name: st.student_name,
                    is_selected: true,
                    status: studentStatusKeys[st.status],
                })),
            )
        }
    }, [students, isEdit])

    return (
        <Modal
            modalKey="day"
            size={
                isEdit ? "max-w-xl"
                : tab == "topic" ?
                    "max-w-2xl"
                :   "max-w-4xl"
            }
            onClose={() => {
                clear()
                form.reset({ type: tab as GroupModuleType })
            }}
        >
            {isSuccess || !item?.id ?
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Tabs value={tab} onValueChange={(v) => setTab(v)}>
                            {isEdit ?
                                ""
                            :   <Select
                                    className="w-40 h-8 sm:h-10"
                                    label=""
                                    options={[
                                        { value: "topic", label: "Mavzu" },
                                        { value: "task", label: "Vazifa" },
                                        { value: "exam", label: "Imtixon" },
                                    ]}
                                    value={tab}
                                    setValue={(value) => setTab(value)}
                                />
                            }
                            <input className="sr-only" autoFocus />

                            <TabsContent value="exam">
                                <ExamForm loading={isPatching || isPending} />
                            </TabsContent>

                            <TabsContent value="task">
                                <TaskForm loading={isPatching || isPending} />
                            </TabsContent>

                            <TabsContent value="topic">
                                <ThemeForm loading={isPatching || isPending} />
                            </TabsContent>
                        </Tabs>
                    </form>
                </FormProvider>
            :   <div className="w-full py-10 flex justify-center">
                    <Spinner />
                </div>
            }
        </Modal>
    )
}
