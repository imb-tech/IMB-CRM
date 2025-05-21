import { ContainerPages } from "./container"
import { TransportPages } from "./transport"

const TransportContainerPages = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            <TransportPages />
            <ContainerPages />
        </div>
    )
}

export default TransportContainerPages
