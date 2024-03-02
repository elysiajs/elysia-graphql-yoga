import { type Elysia } from 'elysia'
import type { CreateMobius, Resolver } from 'graphql-mobius'

import {
    createYoga,
    createSchema,
    type YogaServerOptions,
    type YogaInitialContext
} from 'graphql-yoga'
import type { IExecutableSchemaDefinition } from '@graphql-tools/schema'
import type { TypeSource } from '@graphql-tools/utils'

type MaybePromise<T> = T | Promise<T>

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

interface ElysiaYogaConfig<
    TypeDefs extends TypeSource,
    Context extends
        | undefined
        | MaybePromise<Record<string, unknown>>
        | ((initialContext: YogaInitialContext) => MaybePromise<unknown>)
> extends Omit<
            YogaServerOptions<{}, {}>,
            'schema' | 'typeDefs' | 'context' | 'cors'
        >,
        Omit<IExecutableSchemaDefinition<{}>, 'resolvers'> {
    /**
     * @default /graphql
     *
     * path for GraphQL handler
     */
    path?: string
    /**
     * TypeDefs
     */
    typeDefs: TypeDefs
    context?: Context
    /**
     * If this field isn't presented, context type is null
     * It must also contains params when used
     * I don't know why please help
     */
    useContext?: (_: this['context']) => void
    resolvers: Resolver<
        TypeDefs extends string
            ? CreateMobius<TypeDefs>
            : {
                  Query: Record<string, unknown>
                  Mutation: Record<string, unknown>
                  Subscription: Record<string, unknown>
              },
        Context extends undefined
            ? { request: Request }
            : Context extends (a: YogaInitialContext) => infer A
            ? Prettify<NonNullable<Awaited<A>> & { request: Request }>
            : Prettify<NonNullable<Awaited<Context>> & { request: Request }>
    >
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
 * 
 *  * @example
 * ```typescript
 * import { Elysia } from 'elysia'
 * import { yoga, createSchema } from '@elysiajs/graphql-yoga'
 * const { loadFiles } = require('@graphql-tools/load-files')
 * 
 * const schema = createSchema({
 *  typeDefs: await loadFiles('src/typeDefs/*.graphql')
 *  resolvers: await loadFiles('src/resolvers/*.{js,ts}')
 * })
 *
 * const app = new Elysia()
 *     .use(
 *         yoga({
 *             schema
 *         })
 *     )
 *     .listen(8080)
 * ```
 */
export const yoga =
    <
        const TypeDefs extends string,
        Context extends
            | undefined
            | MaybePromise<Record<string, unknown>>
            | ((initialContext: YogaInitialContext) => MaybePromise<unknown>),
        const Prefix extends string = '/graphql'
    >({
        path = '/graphql' as Prefix,
        typeDefs,
        resolvers,
        resolverValidationOptions,
        inheritResolversFromInterfaces,
        updateResolversInPlace,
        schemaExtensions,
        schema,
        ...config
    }: ElysiaYogaConfig<TypeDefs, Context>) =>
    (app: Elysia) => {
        const yoga = createYoga({
            cors: false,
            ...config,
            schema: schema || createSchema({
                typeDefs,
                resolvers: resolvers as any,
                resolverValidationOptions,
                inheritResolversFromInterfaces,
                updateResolversInPlace,
                schemaExtensions
            })
        })

        const result = app
            .get(path, async ({ request }) => yoga.fetch(request))
            .post(path, async ({ request }) => yoga.fetch(request), {
                type: 'none'
            })

        return result
    }

export default yoga
