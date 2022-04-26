## Description Superhero API

API Contract for the [Superhero Onboarding Project](https://adkgroup.atlassian.net/wiki/spaces/SUP/pages/1172734300/Superhero+Project+-+Functional+Specifications+and+Technical+Requirements+Documentation)

[Nest](https://github.com/nestjs/nest) framework TypeScript documentation

[TypeORM](https://typeorm.io/#/) ORM documentation

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
```

## Migrations

```bash
# create migration
$ npm run typeorm migration:run

# migration run (load initial data)
$ npm run typeorm migration:run

```

# Authentication

You need add this api key value in the header of every http request

```bash
apiKey: API_KEY_VALUE
```
* Ask your manager or mentor how to get an api key *

# Usage

You can see public API contract in [http://localhost:3000/api](http://localhost:3000/api)

_Note: remmenber include the apiKey, (click on green authorize button, and add the value in the authorization modal)_

# Enviroment variables

```bash
# nodejs service port (default prod env = 80 | dev env = 3000)
PORT=
# database username
DB_USER=
# database password
DB_PASS=
# database name
DB_NAME=
# database hostname (default:localhost)
DB_HOST=
# database port (default:5432)
DB_PORT=
```

## Support

Enrique Casanova - [enrique.casanova@projekt202.com](mailto:enrique.casanova@projekt202.com)
