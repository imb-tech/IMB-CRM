import FormInput from "@/components/form/input"
import { LOGIN } from "@/constants/api-endpoints"
import { setAccessToken, setRefreshToken } from "@/lib/set-token"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { usePost } from "@/hooks/usePost"
import Spinner from "@/components/ui/spinner"
import { encryptMessage } from "@/lib/data-encrypt"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { handleFormError } from "@/lib/show-form-errors"

type Form = {
    username: string
    password: string
}

export default function LoginForm() {
    const navigate = useNavigate()
    const search = useSearch({ strict: false })

    const { mutate, isPending } = usePost({
        onSuccess: (data: LoginResp) => {
            const access = data?.token?.access_token
            const refresh = data?.token?.refresh_token

            if (access) {
                setAccessToken(access)
                toast.success("Muvaffaqiyatli tizimga kirdingiz!")
            }
            if (refresh) {
                setRefreshToken(refresh)
            }
            if (search?.task && search?.project) {
                window.location.replace(
                    `${window.location.origin}/project/${search?.project}?task=${search?.task}`,
                )
            } else {
                navigate({ to: "/" })
            }
        },
    })
    const methods = useForm<Form>({
        disabled: isPending,
        defaultValues: {
            username: "admin",
            password: "admin",
        },
    })

    const onSubmit = methods.handleSubmit((vals) => {
        const newVals = `{username:${vals.username}},{password:${vals.password}}`

        const encryptData = {
            encrypted_data: encryptMessage(newVals),
            ...vals,
        }

        mutate(LOGIN, encryptData, {
            onError: (err) => handleFormError(err, methods),
        })
    })

    return (
        <form
            onSubmit={onSubmit}
            className="max-w-md m-auto h-full p-4 rounded-sm flex flex-col gap-4"
        >
            <h1 className="text-3xl">Kirish</h1>
            <FormInput
                className="!h-12 rounded-xl"
                methods={methods}
                name="username"
                label="Login"
                required
                autoComplete="on"
            />
            <FormInput
                className="!h-12 rounded-xl"
                methods={methods}
                name="password"
                type="password"
                label="Parol"
                required
                autoComplete="on"
            />
            <button
                type="submit"
                disabled={isPending}
                className="!h-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/70 text-white mt-1 flex items-center justify-center gap-2"
            >
                {isPending && <Spinner color="primary-foreground" size="sm" />}
                Kirish
            </button>
        </form>
    )
}
