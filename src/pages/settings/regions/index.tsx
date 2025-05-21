import { CitiesPages } from "./cities"
import { CountriesPages } from "./countries"

const RegionsPages = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            <CountriesPages />
            <CitiesPages />
        </div>
    )
}

export default RegionsPages
