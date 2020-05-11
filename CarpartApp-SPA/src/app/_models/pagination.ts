export interface Pagination {
    currPage: number;
    itemsOnPage: number;
    totItems: number;
    totPages: number;
}


export class PagedRes<T> {
    res: T;
    pagination: Pagination;
}