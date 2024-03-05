export interface IProductItem {
    id: number;
    name: string;
    image: string;
}

export interface IGetProduct {
    content: IProductItem[],
    totalPages: number,
    totalElements: number,
    number: number
}