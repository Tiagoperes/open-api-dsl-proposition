import { String, Int, Type } from '@stack-spot/open-api-dsl'

export const PageQuery = Type('PageQuery', {
    text: String.optional, 
    limit: Int.optional(10).min(0), // 10 is the default value 
    page: Int.optional(1).min(1),
})
