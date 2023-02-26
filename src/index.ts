import { type Elysia, mapPathnameAndQueryRegEx } from 'elysia'

import { type YogaServerInstance } from 'graphql-yoga'

/**
 * GraphQL Yoga supports for Elysia
 *
 * @example
 * ```typescript
 * import { Elysia } from 'elysia'
 * import { yoga } from '@elysiajs/graphql-yoga'
 *
 * import { createYoga, createSchema } from 'graphql-yoga'
 *
 * const app = new Elysia()
 *     .use(
 *         yoga({
 *             path: "/graphql",
 *             yoga: createYoga({
 *                 schema: createSchema({
 *                     typeDefs: `
 *                         type Query {
 *                             hi: String
 *                         }
 *                 `,
 *                 resolvers: {
 *                     Query: {
 *                         hi: () => 'Hi from Elysia'
 *                     }
 *                 }
 *             })
 *         })
 *     )
 *     .listen(8080)
 * ```
 */
export const yoga =
    <Prefix extends string = '/graphql'>({
        /**
         * @default /graphql
         *
         * path for GraphQL handler
         */
        path = '/graphql' as Prefix,
        /**
         * GraphQL Yoga instance
         *
         * @example
         * ```typescript
         * import { Elysia } from 'elysia'
         * import { yoga } from '@elysiajs/graphql-yoga'
         *
         * import { createYoga, createSchema } from 'graphql-yoga'
         *
         * const app = new Elysia()
         *     .use(
         *         yoga({
         *             path: "/graphql",
         *             yoga: createYoga({
         *                 schema: createSchema({
         *                     typeDefs: `
         *                         type Query {
         *                             hi: String
         *                         }
         *                 `,
         *                 resolvers: {
         *                     Query: {
         *                         hi: () => 'Hi from Elysia'
         *                     }
         *                 }
         *             })
         *         })
         *     )
         *     .listen(8080)
         */
        yoga
    }: {
        path?: Prefix
        yoga: YogaServerInstance<any, any>
    }) =>
    (app: Elysia) => {
        // TODO: Migrate to chain method when Elysia 0.3 released
        app.get(path, (context) => yoga.fetch(context.request))

        return app.onParse(({ request }, contentType) => {
            if (
                path === request.url.match(mapPathnameAndQueryRegEx)?.[1] &&
                contentType === 'application/json'
            )
                return request.text()
        }).post(path, (context) =>
            yoga.fetch(context.request.url, {
                method: 'POST',
                headers: context.request.headers,
                body: context.body
            })
        )
    }

export default yoga
