import { Draggable } from "react-beautiful-dnd"
import TaskCard from "./task-card"

type Props = {
    tasks: QuoteCard[]
}

const TaskList = ({ tasks }: Props) => {
    return tasks?.map((item, index) => (
        <Draggable
            key={item.id.toString()}
            draggableId={`task-${item.id}`}
            index={index}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        marginBottom: 8,
                        ...provided.draggableProps.style,
                    }}
                >
                    <TaskCard item={item} />
                </div>
            )}
        </Draggable>
    ))
}

export default TaskList
