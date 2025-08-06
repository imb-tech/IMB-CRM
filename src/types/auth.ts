type LoginResp = {
    id: number,
    token: {
        refresh_token: string
        access_token: string
    }
}

type Profile = {
    id: number,
    username: string,
    full_name: string,
    phone: string,
    pipeline: number
    branches: {
        id: number,
        name: string
    }[]
}