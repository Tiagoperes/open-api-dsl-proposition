import { Int, GenericType } from '@stack-spot/open-api-dsl'

export const Page = GenericType('Page', (T) => ({
    pageNumber: Int,
    pageCount: Int,
    items: T,
}))
