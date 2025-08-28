import { Button } from "@/components/ui/button"

interface Props {
    onClick: () => void
    visible: boolean
}

export const ScrollToBottomButton = ({ onClick, visible }: Props) => {
    if (!visible) return null

    return (
        <Button
            onClick={onClick}
            className="sticky top-[93%] left-[95%] border hover:bg-[#18222C] bg-[#18222C] border-[#8392A1]  !text-[#8392A1] w-10  z-50 shadow-lg rounded-full p-2 h-10 "
            variant="ghost"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                    stroke="#8392A1"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </Button>
    )
}
