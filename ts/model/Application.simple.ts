/**
 * This file represents an Application.
 * It tries to be as brief as possible in order to speed up development.
 * See Application.complex.ts for a more complex definition.
 * 
 * APIs could start like this and evolve to a more complex definition while it matures.
 */

import { Enum, Type, String  } from '@stack-spot/open-api-dsl'

export const ApplicationStatus = Enum('ApplicationStatus', ['created', 'deployed', 'deprecated', 'deleted'])

export const Application = Type('Application', {
    id: String,
    name: String,
    description: String.optional(),
    stackVersionId: String,
    studioId: String,
    workspaceId: String,
    status: ApplicationStatus,
})
