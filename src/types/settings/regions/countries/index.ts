type CountriesType = {
    id: number
    name: string
}

type CountriesResults = {
    next: string
    previous: string
    results: CountriesType[]
}

type SearchParamsCountries = {
  countries_search?: string
  countries_page_size?: number
  countries_page?: number
}