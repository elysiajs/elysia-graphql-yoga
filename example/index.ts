import { Elysia } from 'elysia'

import { yoga } from '../src/index'
import { YogaInitialContext } from 'graphql-yoga'

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
                    a: 'b'
                }
            },
            useContext(_) {},
            resolvers: {
                Query: {
                    hi: async (parent, args, context, info) => {
                        context.request
                        
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
