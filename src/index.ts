import { type Elysia, getPath } from 'elysia'

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
    ({
        /**
         * @default /graphql
         *
         * path for GraphQL handler
         */
        path = '/graphql',
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
        path?: string
        yoga: YogaServerInstance<any, any>
    }) =>
    (app: Elysia) =>
        app
            .onParse((request, contentType) => {
                if (
                    path === getPath(request.url) &&
                    contentType === 'application/json'
                )
                    return request.text()
            })
            .get(path, (context) => yoga.fetch(context.request))
            .post(path, (context) =>
                yoga.fetch(context.request.url, {
                    method: 'POST',
                    headers: context.request.headers,
                    body: context.body
                })
            )

export default yoga
