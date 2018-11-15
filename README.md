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
        "_id": "5bec737689641dcdc5dea9f5",
        "id": 1,
        "symbol": "PHP",
        "name": "Cremin - Goyette",
        "price": 277.96,
        "date": "Thu Oct 25 2018 09:00:00 GMT-0700 (Pacific Daylight Time)",
        "__v": 0,
        "rating": 4,
        "owner": 506
    },
    ...
]
```
#### POST
req.body and res:
```
{
    "symbol": "PHP",
    "name": "Cremin - Goyette",
    "price": 277.96,
    "date": "Thu Oct 25 2018 09:00:00 GMT-0700 (Pacific Daylight Time)",
    "__v": 0,
    "rating": 4,
    "owner": 506
}
```
#### PUT
req.body and res:
```
{
    "symbol": "PHP",
    "name": "Cremin - Goyette",
    "price": 277.96,
    "date": "Thu Oct 25 2018 09:00:00 GMT-0700 (Pacific Daylight Time)",
    "__v": 0,
    "rating": 4,
    "owner": 506
}
```

#### DELETE
res:
```
{
    "n": 1,
    "ok": 1
}
```

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
