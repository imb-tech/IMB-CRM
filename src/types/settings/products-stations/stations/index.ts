type StationsType = {
    id: number
    name: string
}

type StationsResults = {
    next: string
    previous: string
    results: StationsType[]
}

type SearchParamsStation = {
  station_search?: string
  station_page_size?: number
  station_page?: number
}