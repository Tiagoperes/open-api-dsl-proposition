/**
 * This file represents an Application.
 * It tries to be as detailed as possible in order to generate a well documented API.
 * See Application.simple.ts for a simpler definition.
 */

import { Enum, Type, String  } from '@stack-spot/open-api-dsl'

const example = {
    id: 'app001',
    name: 'My App',
    description: 'My sample app',
    stackVersionId: 'stk001',
    studioId: 'std001',
    workspaceId: 'ws001',
    status: 'created',
}

export const ApplicationStatus = Enum('ApplicationStatus', {
    created: 'the app is not deployed',
    deployed: 'the app is deployed',
    deprecated: 'the app is deprecated', 
    deleted: 'the app has been deleted',
})

export const Application = Type('Application', {
    id: String
        .description('the identifier of the application'),
    name: String
        `the name of the application`, // short for .description(str)
    description: String.optional()
        `the description of the application`,
    stackVersionId: String
        `the stackVersion containing the application`,
    studioId: String
        `the studio containing the application`,
    workspaceId: String
        `the workspace containing the application`,
    status: ApplicationStatus
        `the status of the application`,
}).example(example)
    `An application`

