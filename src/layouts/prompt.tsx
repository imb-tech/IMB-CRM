import { createContext, useState, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { FormDatePicker } from "@/components/form/date-picker"

interface PromptContextProps {
    prompt: (title?: string, defaultValue?: string) => Promise<string | null>
}

export const PromptContext = createContext<PromptContextProps | undefined>(
    undefined,
)

export const PromptProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [resolvePromise, setResolvePromise] = useState<
        (value: string | null) => void
    >(() => { })
    const [dialogTitle, setDialogTitle] = useState<string | undefined>("")
    const [defaultv, setDefV] = useState<string | undefined>("")

    const prompt = (title?: string, defaultValue?: string) => {
        setDialogTitle(title)
        if (defaultValue) {
            form.setValue('text', defaultValue)
            setDefV(defaultv)
        }
        setIsOpen(true)
        return new Promise<string | null>((resolve) => {
            setResolvePromise(() => resolve)
        })
    }

    const handleConfirm = (vals: { text: string }) => {
        if (vals.text) {
            setIsOpen(false)
            resolvePromise(vals.text)
            form.reset()
        } else {
            toast.error((dialogTitle || "Sabab") + " kiriting")
        }
    }

    const form = useForm<{
        text: string
    }>({
        defaultValues: {
            text: ""
        }
    })

    const handleCancel = () => {
        setIsOpen(false)
        resolvePromise("")
        form.reset()
    }

    return (
        <PromptContext.Provider value={{ prompt }}>
            {children}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{dialogTitle || "Sabab?"}</DialogTitle>
                        <VisuallyHidden>
                            <DialogDescription>
                                {dialogTitle || "Sabab?"}
                            </DialogDescription>
                        </VisuallyHidden>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(handleConfirm)} className="flex flex-col">
                        <FormDatePicker
                            fullWidth
                            required
                            placeholder={dialogTitle || "Sabab?"}
                            control={form.control}
                            className='min-w-full mb-3'
                            name="text"
                            calendarProps={{
                                fromDate: defaultv ? new Date(defaultv) : undefined
                            }}
                        />
                        <DialogFooter className="!flex !flex-row items-center gap-4">
                            <Button onClick={handleCancel} variant="destructive">
                                Bekor qilish
                            </Button>
                            <Button>Tasdiqlash</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </PromptContext.Provider>
    )
}
