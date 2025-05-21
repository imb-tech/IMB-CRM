type WarehouseType = {
    id: number;
    load: {
        id: number;
        customer: {
            id: number;
            username: string;
            full_name: string;
            phone_code: string;
            phone_number: string;
        };
        product: {
            id: number;
            name: string;
            code: string;
        };
        product_volume: number;
        product_quantity: number;
        product_weight: number;
        loading_location_longitude: number | null;
        loading_location_latitude: number | null;
        loading_address: string;
        comment: string | null;
    };
    stock_quantity: number;
    stock_weight: number;
};


type WarehouseTypeResults = {
    next: string
    previous: string
    results: WarehouseType[]
}