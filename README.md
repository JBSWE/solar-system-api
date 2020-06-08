# solar-system-api

This api is responsible for providing end points for planet information in a solar system.

## Getting Started

Please see below to get up and running. Once running please refer to the swagger documentation located at http://localhost:3000/api-docs/

### Prerequisites

The following are prerequsites as the project is dependent on these. Please ensure they are installed(and running for docker) before attempting to run locally. This is assuming you're running it locally on a Mac.

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

Run the docker-compose.yml file which connects mongodb to the express app.

```
docker-compose up
```

From here the API should be exposed on localhost:3000

## Running the tests


Run yarn to get dependencies
```
yarn
```

Simply run the following at execute the tests.

```
yarn run test
```

## Authors

- **Jack Burke**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
