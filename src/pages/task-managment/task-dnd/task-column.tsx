import { Draggable, Droppable } from "react-beautiful-dnd"
import TaskList from "./task-list"
import AddTaskButton from "./add-task-button"
import TaskColumnHeader from "./task-column-header"

type Props = {
    column: Column
    index: number
    handleAdd: (id: number) => void
    onDelete: (id: number) => void
}

const TaskColumn = ({ column, index, handleAdd, onDelete }: Props) => {
    return (
        <Draggable
            draggableId={`column-${column.id}`}
            index={index}
            isDragDisabled={!column.is_author}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="rounded-md"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="dark:bg-[#0c0d03] bg-zinc-200 p-2 rounded-lg min-w-64 max-w-64"
                    >
                        <TaskColumnHeader onDelete={onDelete} column={column} />

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
                                        onDelete={onDelete}
                                    />
                                    {dropProvided.placeholder}
                                    <div className="sticky bottom-0 bg-zinc-200 dark:bg-[#0c0d03]">
                                        <AddTaskButton
                                            onClick={() =>
                                                handleAdd(Number(column.id))
                                            }
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
