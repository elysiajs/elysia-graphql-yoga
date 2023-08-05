import { Elysia } from 'elysia'

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
                    hi(hi: String!): Book
                    books: [Book]
                }
            `,
            context() {
                return {
                    a: 'B'
                }
            },
            useContext(a) {},
            resolvers: {
                Query: {
                    hi: (parent, args, context, info) => {
                        return {
                            title: 'Elysia',
                            author: 'saltyAom'
                        }
                    },
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
