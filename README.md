# elbdogs

## How to start the project for development

### 1. Start mongo db inside docker container

When executing for the first time run

```
docker run -d -p 27017:27017 --name "elbdogs_db" mongo
```

After this has been done once you will get an error saying the container is already in use.
Then you have to run

```
ON WINDOwS:   docker start (docker ps -aqf "name=elbdogs_db")
ON LINUX:     docker start `docker ps -aqf "name=elbdogs_db"`
```

### 2. Start the backend

If the dependencies have changed or on first usage you have to run

```
npm install
```

From the backend directory run

```
npm run startDEV
```

### 3. Start the frontend

If the dependencies have changed or on first usage you have to run

```
npm install
```

From the frontend directory run

```
npm run serve
```

## Further commands

### Frontend

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Lints and fixes files

```
npm run lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Backend
