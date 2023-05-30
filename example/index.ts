import { Elysia, SCHEMA } from 'elysia'

import { useGraphQlJit } from '@envelop/graphql-jit'

import { yoga } from '../src/index'

const app = new Elysia()
    .use(
        yoga({
            typeDefs: /* GraphQL */ `
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
    )
    .get('/', () => 'Hi')
    .listen(8080)
