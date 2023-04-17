import { String, Void, List, Operation, Service } from '@stack-spot/open-api-dsl'
import { ApplicationVersion } from '../model/ApplicationVersion'
import { PageQuery } from '../request/PageQuery'

const getById = Operation('getById')
    .responses({
        200: ApplicationVersion,
        404: Void,
    })

const all = Operation('all')
    .query(PageQuery)
    .responses({
        200: List.of(ApplicationVersion),
    })

const create = Operation('create')
    .requestBody(ApplicationVersion)
    .responses({
        400: Void,
        404: Void,
        422: Void,
        201: ApplicationVersion,
    })

export const ApplicationVersionService = Service('applicationVersion')
    .get(all)
    .post(create)
    .route(
        String.name('applicationVersionId'),
        Service()
            .get(getById),
    )
    .d('Service to manipulate application versions')
