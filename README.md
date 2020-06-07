# solar-system-api

This api is responsible for providing end points for planet information in a solar system.

## Getting Started

Please see below to get up and running..

### Prerequisites

The following are prerequsites as the project in dependent on these.

```
brew install docker docker-machine
```

```
brew install node@12
```

```
brew install yarn
```

```
yarn global add typescript
```

### Running locally

Build the dockerfile image

```
docker build -t solar-system .
```

run the docker-compose.yml file which connects mongodb to the express app.

```
docker-compose up
```

From here the API should be exposed on localhost:3000

## Running the tests

Simply run the following at execute the tests.

```
yarn run test
```

## Authors

- **Jack Burke**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
