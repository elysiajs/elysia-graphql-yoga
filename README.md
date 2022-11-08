# @kingworldjs/graphql-yoga
A plugin for [kingworld](https://github.com/saltyaom/kingworld) that add support for returning html.

## Installation
```bash
bun add graphql graphql-yoga@three @kingworldjs/graphql-yoga
```

## Example
```typescript
import KingWorld from 'kingworld'
import yoga from '@kingworldjs/graphql-yoga'

import { createYoga, createSchema } from 'graphql-yoga'

const app = new KingWorld()
    .use(yoga, {
        path: "/graphql",
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
    .listen(8080)
```
### path
@default "/graphql"

Path to expose as GraphQL handler

### yoga
GraphQL Yoga instance
