<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

### Simple Blog API ( CRUD users, users CRUD posts, users upload files )

> [Prisma](https://docs.nestjs.com/recipes/prisma) [GraphQL schema-first](https://docs.nestjs.com/graphql/quick-start#schema-first) [Hybrid application](https://docs.nestjs.com/faq/hybrid-application)

This hybrid project uses GraphQL API query language for clean responses, TCP transport layer for microservice, `@nestjs/testing` which uses jest for unit testing and MySQL as the relational database and MongoDB as no-sql database for constantly changing or growing data such as posts. 

To connect other microservices uncomment examples in `main.ts`, replace jest with vitest and to use a different database, check the [Prisma docs](https://www.prisma.io/docs/getting-started) e.g.

*to use CockroachDB*

```
// schema.prisma
datasource db {
  provider = "cockroachdb"
  url      = env("DATABASE_URL")
}
```

```
// docker-compose.yml
  cockroachdb:
    image: cockroachdb/cockroach
    restart: always
    ports:
      - "26257:26257"
      - "8080:8080"
    command: start-single-node --cluster-name=node1 --logtostderr=WARNING --log-file-verbosity=WARNING --insecure
    environment:
      - COCKROACH_USER=${DATABASE_USER}
      - COCKROACH_PASSWORD=${DATABASE_PASSWORD}
```

### Installation

1. Run multi-container Docker applications 

```bash
# run mongodb, mongo express container
$ docker-compose -f docker-compose-mongo.yml up -d
# run mysql, phpmyadmincontainer
$ docker-compose up -d

```
2. Install dependencies: `npm install`
3. Generate TypeScript type definitions for the GraphQL schema: `npm run generate:typings`
4. Generate a type-safe client to interact with your database: `npm run prisma:gen`
5. Create mariadb/mysql database and create tables: `npm run prisma:push`
6. Start server: `npm run start:dev`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Graphql Playground

When the application is running, you can go to [http://localhost:3001/graphql](http://localhost:3001/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.


**Create a New User**

```
mutation {
  createUser(input: { name: "Godwin Kimani", email: "josephgodwink90@aol.com"}) {
    id
    name
    email
  }
}
```

**List all Existing Users**

```
query {
  users {
    id
    name
    email
  }
}
```

**Retrieve an Existing User**

```
query {
  user(id: "3f234751-1819-4d96-ad0b-29840796806d") {
    id
    name
    email
  }
}
```

**Update an Existing User**

```
mutation {
  updateUser(input: { id: "3f234751-1819-4d96-ad0b-29840796806d", name: "James Koome", email: "josephgodwink90@aol.com" }) {
    id
    name
    email
  }
}
```

**Create a New Post**

```
mutation {
  createPost(input: { title: "Example Title", text: "Example Content", authorId: "3f234751-1819-4d96-ad0b-29840796806d"}) {
    id
    title
    text
  }
}
```

**List all Existing Posts**

```
query {
  posts {
    id
    title
    text
    isPublished
    author { 
    	name
    }
    # Add other fields as needed
  }
}
```

**Retrieve a Single Post**

```
query {
  post(id: "6c248661-43a7-4b77-9e4d-11978418fc3e") {
    id
    title
    text
    author { 
    	name
    }
  }
}
```

**Update an Existing Post**

```
mutation {
  updatePost(input: { id: "265bb380-ebeb-41e3-8670-32eec5c5fa7c", title: "Post on A.I.", text: "Yes Other Example Content", isPublished: true }) {
    id
    title
    text
    isPublished
  }
}
```

**Delete an Existing Post**

```
mutation {
  deletePost(id: "265bb380-ebeb-41e3-8670-32eec5c5fa7c") {
    id
  }
}
```
