## Installation
```console
cd frontend
npm install -g yarn
npm install -g @vue/cli
npm install


cd backend
nuget install npgsql
dotnet add package GoogleAuthenticator --version 2.2.0
```

## Building

```console
cd frontend
yarn build:watch


cd backend
dotnet run
```

## Testing

```console
npm run test:unit
```