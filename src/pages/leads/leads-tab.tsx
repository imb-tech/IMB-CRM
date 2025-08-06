import { buttonVariants } from "@/components/ui/button"
import { Link, useLocation, useParams } from "@tanstack/react-router"
import LeadDealSelector from "./lead-deal-selector"

export default function LeadsTab() {
    const { pathname } = useLocation()

    const { id } = useParams({ strict: false })

    return (
        <div className="flex flex-col items-start">
            <div className="flex items-center bg-card rounded-md">
                {id ?
                    <LeadDealSelector />
                :   <Link
                        className={buttonVariants({
                            variant: "ghost",
                            className: "pl-5 pr-9 hover:bg-primary/20",
                        })}
                        to="/leads"
                    >
                        Lidlar
                    </Link>
                }

                <Link
                    className={buttonVariants({
                        variant:
                            pathname.includes("/leads/sources") ? "default" : (
                                "ghost"
                            ),
                        className: "hover:bg-primary/20",
                    })}
                    to="/leads/sources"
                >
                    Manbalar
                </Link>

                <Link
                    className={buttonVariants({
                        variant:
                            pathname.includes("/leads/forms") ? "default" : (
                                "ghost"
                            ),
                        className: "hover:bg-primary/20",
                    })}
                    to="/leads/forms"
                >
                    Formalar
                </Link>

                <Link
                    className={buttonVariants({
                        variant:
                            pathname.includes("/leads/stats") ? "default" : (
                                "ghost"
                            ),
                        className: "hover:bg-primary/20",
                    })}
                    to="/leads/stats"
                >
                    Statistika
                </Link>

                <Link
                    className={buttonVariants({
                        variant:
                            pathname.includes("/leads/archive") ? "default" : (
                                "ghost"
                            ),
                        className: "hover:bg-primary/20",
                    })}
                    to="/leads/archive"
                >
                    Arxiv
                </Link>
            </div>
        </div>
    )
}
