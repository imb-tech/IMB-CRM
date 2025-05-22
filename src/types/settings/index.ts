type Settings = {
    name: string
}

type SettingsParams = {
    branchs: string
    rooms: string
    courses: string
    payment_type: string
    holidays: string
    roles: string
}


type Room = {
    id: number,
    name: string,
    branch: string,

}



type Course = {
    id: number;
    name: string;
    price: number;
    month_duration: number;
    description: string;
    color: string;
    lesson_count: number;
    is_delete: boolean;
    branch: {
        id: number,
        name: string,
    };
};

type Holiday = {
    id: number,
    date: string,
    reason: string
}

type Branch = {
    id: number,
    name: string,
    work_start_date: string
    work_end_date: string
}

type Role = {
    id: number,
    name: string,
    permissions: string[]
}

type PaymentType = {
    id: number,
    name: string,
}