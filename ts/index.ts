import { API, Server, bearer } from '@stack-spot/open-api-dsl'
import { ApplicationService } from './service/Application'

const production = Server('http://api.example.com/v1')
    .description('Optional server description, e.g. Main (production) server')

const staging = Server('http://staging-api.example.com')
    .d('Optional server description, e.g. Internal staging server for testing') // short for .description(str)

export default API()
    .title('Stack Spot')
    .version('0.0.1')
    .servers([production, staging])
    .security(bearer)
    /* The 2 next functions apply globally and can be changed locally when declaring an Operation.
    Although it might seem we can pass any string, this is not true, since these accept a TS Union Type, which
    is similar to enums, but easier to write. Invalid values would be detected by the IDE and compiler. */
    .accept('json')
    .content('json')
    .routes({
        applications: ApplicationService, // "/applications"
        // examples of potential other services:
        // workspaces: WorkspaceService, // "/workspaces"
        // stacks: StackService, // "/stacks"
        // users: UserService, // "/users"
        // teams: TeamService, // "/teams"
    })
