import { Type, String, Int, Date  } from '@stack-spot/open-api-dsl'

export const ApplicationVersion = Type('ApplicationVersion', {
    id: String,
    version: Int.optional(1).min(0), // the default is 1
    published: Date,
    applicationId: String, 
})
