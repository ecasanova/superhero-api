## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[TypeORM](https://typeorm.io/#/) ORM
[Docker](https://www.docker.com)

## Installation

```bash
$ npm install

#env files
cp .env.sample .env

#Docker composer
$ docker-compose up -d

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# create migration
$ npm run typeorm migration:run

# migration run (load initial data)
$ npm run typeorm migration:run

```

# Usage

You can see public API contract in http://localhost:3000/api

# Authentication

You need add this api key value in the header of every http request

```bash
apiKey: 6b9a7f25-8ce5-4781-b1e1-98c40b1b3884
```

# Enviroment variables

```bash
# nodejs service port (default: 80)
PORT=
# database username
DB_USER=
# database password
DB_PASS=
# database name
DB_NAME=
# database username host (default:localhost)
DB_HOST=
# postgre sql port default (default:5431)
DB_PORT=
```

## Support

Enrique Casanova - [enrique.casanova@projekt202.com](mailto:enrique.casanova@projekt202.com)
