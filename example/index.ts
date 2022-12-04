import { Elysia } from 'elysia'

import { createYoga, createSchema } from 'graphql-yoga'

import yoga from '../src/index'

new Elysia()
    .use(
        yoga({
            yoga: createYoga({
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
