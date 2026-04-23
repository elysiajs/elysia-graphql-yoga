# @elysia/graphql-yoga
[Elysia](https://github.com/elysiajs/elysia) plugin to integrate GraphQL Yoga.

## Installation
```bash
bun add @elysiajs/graphql-yoga
```

## Example
```typescript
import { Elysia } from 'elysia'
import { yoga } from '@elysiajs/graphql-yoga'

const app = new Elysia()
	.use(
		yoga({
			typeDefs: /* GraphQL */ `
				type Query {
					hi: String
				}
			`,
			resolvers: {
				Query: {
					hi: () => 'Hello from Elysia'
				}
			}
		})
	)
	.listen(3000)
```

Accessing `/graphql` in the browser (GET request) would show you a GraphiQL instance for the GraphQL-enabled Elysia server.

Optionally, you can install a custom version of optional peer dependencies as well:

```bash
bun add graphql graphql-yoga
```
