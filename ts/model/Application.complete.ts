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
        .d('the identifier of the application'),
    name: String
        .d('the name of the application'),
    description: String.optional()
        .d('the description of the application'),
    stackVersionId: String
        .d('the stackVersion containing the application'),
    studioId: String
        .d('the studio containing the application'),
    workspaceId: String
        .d('the workspace containing the application'),
    status: ApplicationStatus
        .d('the status of the application'),
}).example(example)
    .d('An application')

