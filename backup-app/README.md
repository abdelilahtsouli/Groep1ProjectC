## Installation
```console
npm install
```

## Building
```console
npm start
```

## Before starting
Whitelist your IP address in MongoDB-Atlas before running the app. If you fail todo so, then the app won't be able to connect to the MongoDB database on the Azure cloud.

## What does it do?
Creates a snapshot of the page table of Project C.
Once you start the app with `npm start` a snapshot will be taken. After the inital snapshot, a snapshot will be taken every 15 minutes | 90000 milliseconds.