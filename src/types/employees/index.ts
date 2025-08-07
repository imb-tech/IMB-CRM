type Employee = {
    id: number
    photo: null | string
    username: string
    full_name: string
    phone: string
    branches: Branch[]
    role_name: string
    image: string
    password: string
    role: number
    branches_field: number[]
}

type EmployeeSalary = {
    id: number
    full_name: string
    photo: string
    employee: number
    salary_type: string
    percentage_salary: number
    static_salary: string
    per_student_salary: string
    is_active: boolean
    role_name: string
}
