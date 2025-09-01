import { REFRESH_TOKEN } from "@/constants/api-endpoints"
import {
    USER_ACCESS_KEY,
    USER_REFRESH_KEY,
} from "@/constants/localstorage-keys"
import { getAccessToken, getRefreshToken } from "@/lib/get-token"
import { setAccessToken } from "@/lib/set-token"
import { setActiveBranch } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"

const devURL = import.meta.env.VITE_DEFAULT_URL
const urlPART = import.meta.env.VITE_PART_URL
const tenant = window.location.hostname.match(/^([a-z0-9-]+)\.reactgo\.uz/i)?.[1]

// export const baseURL = import.meta.env.DEV ? devURL : 'https://' + tenant + urlPART
export const baseURL = import.meta.env.DEV ? devURL : 'https://demo.xamidovcoder.uz/api/v1/'

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})

export function setupAxiosInterceptors() {
    axiosInstance.interceptors.request.use(
        function (config) {
            const token = getAccessToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        function (error) {
            return Promise.reject(error)
        },
    )

    axiosInstance.interceptors.response.use(
        function (response) {
            if (response.config.url === "/auth/profile/") {
                const branches = response.data.branches
                if (!branches?.length) {
                    localStorage.removeItem('token')
                    toast.error("Sizda filial mavjud emas")
                    setTimeout(() => {
                        window.location.replace("/login")
                    }, 1000);
                } else {
                    setActiveBranch(branches[0].id)
                }
            }
            return response
        },
        async function (error) {
            const originalRequest = error.config
            const status = error.response?.status
            const isLoginPage = window.location.pathname === '/login';
            const currentSearch = window.location.search || '';

            // Agar request yo'q bo'lsa yoki status yo'q bo'lsa, reject
            if (!originalRequest || !status) {
                return Promise.reject(error)
            }

            // 🔁 Refresh token orqali qayta urinish
            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                try {
                    const refresh = getRefreshToken()
                    if (refresh) {
                        const refreshResponse = await axios.post(
                            `${baseURL}${REFRESH_TOKEN}/`,
                            { refresh },
                        )
                        const access: string = refreshResponse?.data?.access
                        if (access) {
                            setAccessToken(access)
                            originalRequest.headers.Authorization = `Bearer ${access}`
                            return axiosInstance(originalRequest) // 🔁 retry
                        }
                    }
                    if (!isLoginPage) {
                        location.href = "/login" + currentSearch
                    }
                } catch (refreshError) {
                    localStorage.removeItem(USER_ACCESS_KEY)
                    localStorage.removeItem(USER_REFRESH_KEY)
                    if (!isLoginPage) {
                        location.href = "/login" + currentSearch
                    }
                    return Promise.reject(refreshError)
                }
            }

            //  403 bo‘lsa GET_ME ni yangilab qayta urinish
            if (status === 403 && !originalRequest._403retry) {
                originalRequest._403retry = true
                localStorage.removeItem('token')
                location.href = "/login" + currentSearch
                // await queryClient.invalidateQueries({ queryKey: [GET_ME] });
                await new Promise((resolve) => setTimeout(resolve, 100))
                // return axiosInstance(originalRequest)
            }

            if (status === 500 || status === 502) {
                error.response.status = 400;
                error.response.data = {
                    detail: "Serverga ulanishda muammo",
                };

            }

            return Promise.reject(error)
        },
    )
}

export default axiosInstance
