type ProductsType = {
    id: number
    name: string
    code: string | number
}

type ProductResults = {
    next: string
    previous: string
    results: ProductsType[]
}

type SearchParamsProduct = {
  product_search?: string
  product_page_size?: number
  product_page?: number
}