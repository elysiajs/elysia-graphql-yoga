import { Elysia, SCHEMA } from 'elysia'

import { createYoga, createSchema } from 'graphql-yoga'
import { useGraphQlJit } from '@envelop/graphql-jit'

import { yoga } from '../src/index'

const app = new Elysia()
    .use(
        yoga({
            yoga: createYoga({
                // plugins: [useGraphQlJit()],
                schema: createSchema({
                    typeDefs: /* GraphQL */ `
                        type Query {
                            hi: String
                        }
                    `,
                    resolvers: {
                        Query: {
                            hi: () => 'Hi from Elysia'
                        }
                    }
                })
            })
        })
    )
    .get('/', () => 'Hi')
    .listen(8080)
