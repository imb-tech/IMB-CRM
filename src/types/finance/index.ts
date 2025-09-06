type Finance = {
    name: string
}

type Income = {
    id: number
    name: string
    price: number
    created_at: string
    reason: string
}

type Cost = {
    id: number
    name: string
    price: number
    created_at: string
    reason: string
}


type Advance = {
    id: number;
    date: string;
    body: string;
    amount: string;
    advance_owner: number;
    advance_owner_name: string;
    author_name: string;
    created_at:string
};
