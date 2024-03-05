export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
    image: string;
}

export interface IGetCategories {
    content: ICategoryItem[],
    totalPages: number,
    totalElements: number,
    number: number
}

export interface ICategorySearch{
    name: string,
    description: string,
    page: number,
    size: number,
    sortBy: string
}
