export const typeDefs = /* GraphQL */ `
    type Query {
        authors: [Author!]!
        author(id: ID, name: String): Author!
        books(page: Int, perPage: Int): [Book!]!
        book(name: String!): Book
    }

    type Mutation {
        addBook(name: String!, author: ID!): Book!
    }

    type Author {
        id: ID!
        name: String!
        books: [Book!]!
    }
    
    type Book {
        id: ID!
        name: String!
        author: Author!
    }
`

import { Elysia } from 'elysia'
import { yoga } from '../src'

const author = {
    id: 'A',
    name: 'SaltyAom',
    books: []
}

const book = {
    id: 'A',
    name: 'SaltyAom',
    author
}

const app = new Elysia()
    .use(
        yoga({
            typeDefs,
            context(a) {
                return {
                    a: 'b'
                }
            },
            useContext(_) {},
            resolvers: {
                Query: {
                    author: (_, __, ___) => author,
                    authors: () => [author],
                    book: () => book,
                    books: () => [book]
                },
                Mutation: {
                    addBook: () => book
                }
            }
        })
    )
    .get('/', () => 'Hi')
    .listen(8080)
