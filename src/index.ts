import { t, type Elysia } from 'elysia'

import { createYoga, createSchema, type YogaServerOptions } from 'graphql-yoga'
import type { IExecutableSchemaDefinition } from '@graphql-tools/schema'

interface ElysiaYogaConfig<
    ServerContext extends Record<string, any> = {},
    UserContext extends Record<string, any> = {}
> extends Omit<YogaServerOptions<ServerContext, UserContext>, 'schema'>,
        IExecutableSchemaDefinition<UserContext> {
    /**
     * @default /graphql
     *
     * path for GraphQL handler
     */
    path?: string
}

/**
 * GraphQL Yoga supports for Elysia
 *
 * @example
 * ```typescript
 * import { Elysia } from 'elysia'
 * import { yoga } from '@elysiajs/graphql-yoga'
 *
 * const app = new Elysia()
 *     .use(
 *         yoga({
 *             typeDefs: `
 *                 type Query {
 *                     hi: String
 *                 }
 *             `,
 *             resolvers: {
 *                 Query: {
 *                     hi: () => 'Hi from Elysia'
 *                 }
 *             }
 *         })
 *     )
 *     .listen(8080)
 * ```
 */
export const yoga =
    <Prefix extends string = '/graphql'>({
        path = '/graphql' as Prefix,
        typeDefs,
        resolvers,
        resolverValidationOptions,
        inheritResolversFromInterfaces,
        updateResolversInPlace,
        schemaExtensions,
        ...config
    }: ElysiaYogaConfig) =>
    (app: Elysia) => {
        const yoga = createYoga({
            ...config,
            schema: createSchema({
                typeDefs,
                resolvers,
                resolverValidationOptions,
                inheritResolversFromInterfaces,
                updateResolversInPlace,
                schemaExtensions
            })
        })

        return app
            .get(path, async ({ request }) => yoga.fetch(request))
            .post(path, async ({ request }) => yoga.fetch(request), {
                type: 'none'
            })
    }

export default yoga
