import { Draggable } from "react-beautiful-dnd"
import LeadCard from "./lead-card"

type Props = {
    users?: Lead[]
}

const LeadsList = ({ users }: Props) => {

    return users?.map((item, index) => (
        <Draggable
            key={`user-${item.id}`}
            draggableId={`user-${item.id}`}
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
                    <LeadCard {...item} index={index} />
                </div>
            )}
        </Draggable>
    ))
}

export default LeadsList
