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
    .accept('json') // applies globally, can be changed locally
    .content('json') // applies globally, can be changed locally
    .routes({
        applications: ApplicationService, // "/applications"
        // examples of potential other services:
        // workspaces: WorkspaceService, // "/workspaces"
        // stacks: StackService, // "/stacks"
        // users: UserService, // "/users"
        // teams: TeamService, // "/teams"
    })
