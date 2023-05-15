import { t, type Elysia } from 'elysia'

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
        return app
            .get(path, async (context) => yoga.fetch(context.request))
            .post(
                path,
                async ({ body, headers, request: { url } }) =>
                    yoga.fetch(url, {
                        method: 'POST',
                        headers,
                        body
                    }),
                {
                    type: 'text'
                }
            )
    }

export default yoga
