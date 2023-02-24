## Description

Codica

## Installation

4 way to run the app

## Run with docker-compose

```bash
$ docker-compose -f docker-compose.prod.yml up -d --build
```

## Run in dev mode

```bash
$ docker-compose up -d
```

```bash
$ pnpm run start:dev
```

## Running unit tests

```bash
$ pnpm install
```

```bash
$ pnpm run test
```

## Test e2e

```bash
$ pnpm install
```

```bash
$ pnpm testdb:start
```

```bash
$ pnpm testdb:start
```

```bash
$ pnpm test:e2e
```
