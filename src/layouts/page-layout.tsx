import Modal from "@/components/custom/modal"
import Header from "@/components/header"
import MobileHeaderLinks from "@/components/header/mobile-header-links"
import {
    BRANCH,
    COURSE,
    HOLIDAY,
    PAYMENT_TYPE,
    ROLE,
    ROOM,
    STUDENT,
} from "@/constants/api-endpoints"
import { menuItems } from "@/constants/menu"
import { findChildPaths } from "@/constants/util.menu"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import BranchesCreate from "@/pages/settings/branches/create"
import CoursesCreate from "@/pages/settings/courses/create"
import HolidayCreate from "@/pages/settings/holidays/create"
import PaymentTypeCreate from "@/pages/settings/payment-type/create"
import RoleCreate from "@/pages/settings/roles/create"
import RoomCreate from "@/pages/settings/rooms/create"
import StudentCreate from "@/pages/students/create"
import { ReactNode, useLocation } from "@tanstack/react-router"
import { CSSProperties, useMemo } from "react"
import { ClassNameValue } from "tailwind-merge"

type Props = {
    children: ReactNode
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
    items?: SubMenuItem[]
    className?: ClassNameValue
    style?: CSSProperties
    navOnHeader?: boolean
    classNameLink?: ClassNameValue
}

const PageLayout = ({
    children,
    rigthChildren,
    leftChildren,
    items,
    style,
    className,
    navOnHeader = false,
    classNameLink,
}: Props) => {
    const { pathname } = useLocation()
    const defaultLinks = items ? items : findChildPaths(menuItems, pathname)
    const len = useMemo(() => defaultLinks.length, [defaultLinks])

    // create stores
    const { store: branch } = useStore<Branch | null>("branch")
    const { store: course } = useStore<Course | null>("courses")
    const { store: holiday } = useStore<Holiday | null>("holiday")
    const { store: paymentType } = useStore<PaymentType | null>("payment-type")
    const { store: roles } = useStore<Role | null>("roles")
    const { store: room } = useStore<Room | null>("rooms")
    const { store: student } = useStore<Student | null>("student")
 
    return (
        <div className="w-full h-full overflow-y-auto">
            <div
                className={cn(
                    "fixed top-0 right-0 z-50 transition-[width,height,padding] w-full",
                )}
            >
                <Header
                    rigthChildren={rigthChildren}
                    leftChildren={leftChildren}
                    navOnHeader={navOnHeader}
                />
            </div>

            {!len ? (
                <MobileHeaderLinks
                    defaultLinks={items}
                    navOnHeader={navOnHeader}
                    classNameLink={classNameLink}
                />
            ) : null}

            <main
                style={style}
                className={cn(
                    "mx-auto px-4 h-full overflow-y-auto  pt-20",

                    className,
                )}
            >
                {children}
            </main>

            {/* Create Modals */}
            <>
                {/* Branch create modal */}
                <Modal
                    modalKey={`${BRANCH}-add`}
                    title={`Filial ${branch?.id ? "tahrirlash" : "yaratish"}`}
                >
                    <BranchesCreate />
                </Modal>

                {/* Course create modal */}
                <Modal
                    modalKey={`${COURSE}-add`}
                    title={`Kurs ${course?.id ? "tahrirlash" : "yaratish"}`}
                >
                    <CoursesCreate />
                </Modal>

                {/* Holiday create modal */}
                <Modal
                    modalKey={`${HOLIDAY}-add`}
                    title={`Ta'til kunini ${
                        holiday?.id ? "tahrirlash" : "yaratish"
                    }`}
                >
                    <HolidayCreate />
                </Modal>

                {/* Payment Type create modal */}
                <Modal
                    modalKey={`${PAYMENT_TYPE}-add`}
                    title={`To'lov turi ${
                        paymentType?.id ? "tahrirlash" : "yaratish"
                    }`}
                >
                    <PaymentTypeCreate />
                </Modal>

                {/* Roles create modal */}
                <Modal
                    modalKey={`${ROLE}-add`}
                    title={`Role ${roles?.id ? "tahrirlash" : "yaratish"}`}
                >
                    <RoleCreate />
                </Modal>

                {/* Rooms create modal */}
                <Modal
                    modalKey={`${ROOM}-add`}
                    title={`Xona ${room?.id ? "tahrirlash" : "yaratish"}`}
                >
                    <RoomCreate />
                </Modal>



                {/* Students create modal */}
                <Modal
                    size="max-w-xl"
                    modalKey={`${STUDENT}-add`}
                    title={`O'quvchi ${
                        student?.id ? "tahrirlash" : "yaratish"
                    }`}
                >
                    <div className="max-h-[75vh] overflow-y-auto no-scrollbar-x">
                        <StudentCreate />
                    </div>
                </Modal>
            </>
        </div>
    )
}

export default PageLayout
