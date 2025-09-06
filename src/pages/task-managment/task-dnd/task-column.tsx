import { Draggable, Droppable } from "react-beautiful-dnd"
import TaskList from "./task-list"
import AddTaskButton from "./add-task-button"
import TaskColumnHeader from "./task-column-header"
import { useStore } from "@/hooks/use-store"

type Props = {
    column: Column
    index: number
    handleAdd: () => void
}

const TaskColumn = ({ column, index, handleAdd }: Props) => {
    const { setStore } = useStore<number | undefined>("task-create")
    return (
        <Draggable draggableId={`column-${column.id}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="rounded-md"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="dark:bg-[#0c0d03] bg-zinc-100 p-2 rounded-lg min-w-64 max-w-64 "
                    >
                        <TaskColumnHeader column={column} />

                        <Droppable
                            droppableId={`column-${column.id}`}
                            type="card"
                        >
                            {(dropProvided) => (
                                <div
                                    ref={dropProvided.innerRef}
                                    {...dropProvided.droppableProps}
                                    className="no-scrollbar-x max-h-[68vh] 2xl:max-h-[75vh] overflow-y-auto"
                                >
                                    <TaskList
                                        tasks={column.tasks}
                                    />
                                    {dropProvided.placeholder}
                                    <div className="sticky bottom-0 rounded-md bg-zinc-200 dark:bg-[#0c0d03]">
                                        <AddTaskButton
                                            onClick={() => {
                                                handleAdd()
                                                setStore(Number(column.id))
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default TaskColumn
