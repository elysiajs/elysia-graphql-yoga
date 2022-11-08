import { KingWorld, getPath } from 'kingworld'

import { type YogaServerInstance } from 'graphql-yoga'

/**
 * GraphQL Yoga supports for KingWorld
 *
 * @example
 * ```typescript
 * import KingWorld from 'kingworld'
 * import yoga from '@kingworldjs/graphql-yoga'
 *
 * import { createYoga, createSchema } from 'graphql-yoga'
 *
 * const app = new KingWorld()
 *     .use(yoga, {
 *         path: "/graphql",
 *         yoga: createYoga({
 *             schema: createSchema({
 *                 typeDefs: `
 *                     type Query {
 *                         hi: String
 *                     }
 *             `,
 *             resolvers: {
 *                 Query: {
 *                     hi: () => 'Hi from KingWorld'
 *                 }
 *             }
 *         })
 *     })
 * })
 * .listen(8080)
 * ```
 */
const yoga = (
    app: KingWorld,
    {
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
         * import KingWorld from 'kingworld'
         * import yoga from '@kingworldjs/graphql-yoga'
         *
         * import { createYoga, createSchema } from 'graphql-yoga'
         *
         * const app = new KingWorld()
         *     .use(yoga, {
         *         path: "/graphql",
         *         yoga: createYoga({
         *             schema: createSchema({
         *                 typeDefs: `
         *                     type Query {
         *                         hi: String
         *                     }
         *             `,
         *             resolvers: {
         *                 Query: {
         *                     hi: () => 'Hi from KingWorld'
         *                 }
         *             }
         *         })
         *     })
         * })
         * .listen(8080)
         */
        yoga
    }: {
        path?: string
        yoga: YogaServerInstance<any, any>
    }
) =>
    app
        .onParse((request, contentType) => {
            if (
                getPath(request.url) === '/graphql' &&
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
