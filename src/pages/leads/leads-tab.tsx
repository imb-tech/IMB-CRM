import { buttonVariants } from "@/components/ui/button"
import { Link, useLocation, useParams, useSearch } from "@tanstack/react-router"

export default function LeadsTab() {
    const search = useSearch({ strict: false })
    const { pathname } = useLocation()

    const { id } = useParams({ strict: false })
 
    return (
        <div className="flex flex-col items-start w-full overflow-x-auto no-scrollbar-x">
            <div className="flex items-center bg-card rounded-md">
                <Link
                    search={search}
                    params={{
                        id: search.pipeline
                            ? String(search.pipeline)
                            : undefined,
                    }}
                    className={buttonVariants({
                        variant: pathname.includes(`/leads/${id}`)
                            ? "default"
                            : "ghost",
                    })}
                    to={search.pipeline ? "/leads/$id" : "/leads"}
                >
                    {"Varonka"}
                </Link>

                <Link
                    search={search}
                    className={buttonVariants({
                        variant: pathname.includes("/leads/stats")
                            ? "default"
                            : "ghost",
                    })}
                    to="/leads/stats"
                >
                    {"Statistika"}
                </Link>

                <Link
                    search={search}
                    className={buttonVariants({
                        variant: pathname.includes("/leads/forms")
                            ? "default"
                            : "ghost",
                    })}
                    to="/leads/forms"
                >
                    {"Formalar"}
                </Link>
                <Link
                    search={search}
                    className={buttonVariants({
                        variant: pathname.includes("/leads/sources")
                            ? "default"
                            : "ghost",
                    })}
                    to="/leads/sources"
                >
                    {"Manbalar"}
                </Link>

                <Link
                    search={search}
                    className={buttonVariants({
                        variant: pathname.includes("/leads/archive")
                            ? "default"
                            : "ghost",
                    })}
                    to="/leads/archive"
                >
                    {"Arxiv"}
                </Link>
            </div>
        </div>
    )
}
