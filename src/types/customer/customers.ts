type CustomersType = {
  id: string;
  role: number
  full_name: string;
  username: string
  phone_code?: string
  phone_number: number | string;
  address: string;
  completed_orders?: number
  in_completed_orders: number
}

type CustomersTypeResults = {
  next: string
  previous: string
  results: CustomersType[]
}