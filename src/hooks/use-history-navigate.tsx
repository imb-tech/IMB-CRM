import { useNavigationStore } from "@/store/navigation-store"
import { useNavigate } from "@tanstack/react-router"

export default function useHistoryNavigate() {
    const { add, paths, remove } = useNavigationStore()
    const navigate = useNavigate()

    function push(path: string) {
        add(path)
        navigate({ to: path })
    }

    function back() {
        navigate({ to: paths[window.location.pathname] })
        remove(window.location.pathname)
    }

    return { push, back }
}
