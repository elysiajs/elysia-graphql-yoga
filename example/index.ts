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
                        # This "Book" type defines the queryable fields for every book in our data source.
                        type Book {
                            title: String
                            author: String
                        }

                        type Query {
                            hi: String
                            books: [Book]
                        }
                    `,
                    resolvers: {
                        Query: {
                            hi: () => 'Hi from Elysia',
                            books: () => [
                                {
                                    title: 'Elysia',
                                    author: 'saltyAom'
                                }
                            ]
                        }
                    }
                })
            })
        })
    )
    .get('/', () => 'Hi')
    .listen(8080)
