import { create } from "zustand"

type NavigationStore = {
    paths: Record<string, string | undefined>
    add: (pathKey: string) => void
    remove: (pathKey: string) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
    paths: {},
    add: (pathKey) => {
        set((state) => ({
            paths: { ...state.paths, [pathKey]: window.location.pathname },
        }))
    },
    remove: (pathKey) =>
        set((state) => {
            const newPaths = { ...state.paths }
            delete newPaths[pathKey]
            return { paths: newPaths }
        })

}))
