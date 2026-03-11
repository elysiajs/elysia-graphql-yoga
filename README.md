# @elysiajs/graphql-yoga
Plugin for [Elysia](https://github.com/elysiajs/elysia) for using graphql-yoga.

## Install

Install the plugin and `graphql` in the consuming app:

```bash
bun add @elysiajs/graphql-yoga graphql
```

```bash
npm install @elysiajs/graphql-yoga graphql
```

The application should own the `graphql` runtime. This avoids duplicate `graphql`
instances in real apps, which can otherwise lead to errors like
`Cannot use GraphQLSchema "...\" from another module or realm.`

Please refer to the [documentation](https://elysiajs.com/plugins/graphql-yoga.html)
for usage details.
