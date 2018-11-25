# Service - stockPriceChart

> Stock Price Chart for the robinhood.com clone.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### /api/symbol/:id/day
#### GET
res:
```
[
    {
        "id": 11,
        "symbol": "B",
        "name": "Smith and Sons",
        "owner": 587,
        "rating": 85,
        "stock_id": 1,
        "price": 542,
        "time": 0
    },
    ...
]
```
#### POST
req.body:
```
{
    "price": 130
}
```
res: 201, OK
#### PUT
req.body:
```
{
    "price": 130,
    "time": 14
}
```
res: 200, OK
#### DELETE
req.body:
```
{
    "time": 14
}
```
res: 202, OK

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

- [ ] Run `npm install` inside the directory to install dependencies.
- [ ] Ensure that the MongoDB process is running on your computer (`mongod`).
- [ ] Create the database by running `npm run seed`
