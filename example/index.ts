import KingWorld from 'kingworld'

import { createYoga, createSchema } from 'graphql-yoga'

import yoga from '../src/index'

const app = new KingWorld()
    .use(yoga, {
        yoga: createYoga({
            schema: createSchema({
                typeDefs: /* GraphQL */ `
                    type Query {
                        hi: String
                    }
                `,
                resolvers: {
                    Query: {
                        hi: () => 'Hi from KingWorld'
                    }
                }
            })
        })
    })
    .get('/', () => 'Hi')
    .listen(8080)
