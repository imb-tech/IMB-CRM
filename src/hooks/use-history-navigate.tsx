import { useNavigationStore } from "@/store/navigation-store"
import { useNavigate } from "@tanstack/react-router"

export default function useHistoryNavigate() {
    const { add, paths, remove } = useNavigationStore()
    const navigate = useNavigate()

    function push(path: string) {
        add(path)
        console.log(window.location.pathname, path);
        navigate({ to: path })
    }

    function back({
        from,
        fallBack
    }: {
        from?: string,
        fallBack?: string
    }) {
        const pth = paths[from ?? window.location.pathname]
        remove(window.location.pathname)
        if (from) {
            remove(from)
        }
        if (pth) {
            navigate({ to: paths[from ?? window.location.pathname] })
        } else navigate({ to: fallBack })
    }

    return { push, back }
}
