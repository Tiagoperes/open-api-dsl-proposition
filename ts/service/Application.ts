import { Void, Operation, Service, RouteParam, Response } from '@stack-spot/open-api-dsl'
import { Application } from '../model/Application.complete'
import { PageQuery } from '../request/PageQuery'
import { Page } from '../response/Page'
import { ApplicationVersionService } from './ApplicationVersion'

const getById = Operation('getById')
    .responses({
        200: Application // simple response config, a type and a description
            `The operation succeeded`,
        404: Response() // complex response config
            .content('html') // replaces the root level content (json)
            .header('error-header') // default type is String
            .example('<p style="color: red">This app doesn\'t exist</p>')
            `The id passed in the route doesn't correspond to an id in the database`,
    })
    `Gets an application by its id`

const list = Operation('list')
    .query(PageQuery)
    .responses({
        200: Page.of(Application),
    })
    `Lists all applications corresponding to the query`

const create = Operation('create')
    .requestBody(Application)
    .responses({
        400: Void,
        404: Void,
        422: Void,
        201: Application,
    })
    .cache(({ manager }) => manager.invalidate(ApplicationService.all))

const update = Operation('update')
    .requestBody(Application)
    .responses({
        400: Void,
        404: Void,
        422: Void,
        201: Application,
    })
    .cache(({ manager, response }) => manager.invalidate(ApplicationService.getById, { id: response.body.id }))

const remove = Operation('remove')
    .responses({
        200: Void,
        404: Void,
    })
    .cache(({ manager, response }) => manager
        .invalidate(ApplicationService.all)
        .invalidate(ApplicationService.getById, { id: response.body.id })
    )

// A Service has every http verb as a method + "route". "route" creates a sub-route with a new Service.
// A Service creates tags, paths and operations in the OpenAPI contract
export const ApplicationService = Service('application')
    .get(list)
    .patch(update)
    .post(create)
    .route(
        /* for a dynamic route composed of a single parameter, use a RouteParam object: RouteParam(name, type?), the default type is String
         * for a static route, use a string: '/path1/path2/path3'
         * for a dynamic route composed of multiple parameters (/{param1}/{param2}), use an array: [RouteParam('param1'), RouteParam('param2')]
         * for a dynamic route composed of parameters and static parts (/test/{param1}), use an array: ['test', RouteParam('param1')]
         */
        RouteParam('applicationId'), // "/{applicationId}", where applicationId is a String.
        Service()
            .get(getById)
            .delete(remove)
            .route('versions', ApplicationVersionService) // "/versions", in the end, via route composition: /applications/{applicationId}/versions
    )
    `Service to manipulate applications`

/**
 * Something cool here is that many services will follow the same general contract, so instead of rewriting everything every time, we could create
 * generic functions. See the examples below:
 * 
 * ```
 * function GenericUpdate(name: string, type: Type) {
 *   return Operation(name)
 *       .requestBody(type)
 *       .responses({
 *           400: Void,
 *           404: Void,
 *           422: Void,
 *           201: type,
 *       })
 * }
 * ```
 * 
 * And then, in our services, we could import it and use it:
 * `const update = GenericUpdate('updateApplication', Application)`
 * 
 * We could go as far as declaring a general CRUD:
 * 
 * ```
 * function CRUD(name: string, type: Type) {
 *   const list = Operation('list')
 *      .query(PageQuery)
 *      .responses({
 *          200: List.of(Type),
 *      })
 *      `Lists all ${name}s corresponding to the query`
 * 
 *   // other operations: getById, create, update, remove
 * 
 *   return Service()
 *      .get(list)
 *      .patch(update)
 *      .post(create)
 *      .route(
 *          RouteParam(`${name}Id`),
 *          Service().get(getById)
*       )
 * }
 * ```
 * 
 * And then, just use it to create every CRUD Service:
 * const ApplicationService = CRUD('application', Application)
 */
