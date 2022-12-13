# NLW eSports | Prisma ORM & TypeScript

![banner](banner.png)

> Project made at `NLW (Next Level Week)`, an online event held by Rocketseat. In this project taught by Diego Schell Fernandes,
> the ORM Prisma was presented for the development of APIs in the backend, as well as the importance of `TypeScript` (a super set of the
> JavaScript to leave your code statically typed in both the backend and frontend of the application). From the base project made in this event
> added some new features to make the project more functional, like login with Google, admins can add, edit and delete
> games through the frontend of the application, pagination, and the main feature of creating ads and deleting them whenever you want on the ad page.

:arrow_right: Prisma ORM | Integration with MongoDB <br /> 
:arrow_right: Express Controller Class with Prisma Client <br /> 
:arrow_right: Redux Toolkit and Google Auth Provider <br /> 
:arrow_right: Radix UI Components <br /> 
:arrow_right: Pagination Component <br /> 

<br />

## Prisma ORM | Integration with MongoDB

Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion. Here are some prism powers:

- <strong>Prisma schema | Data model you can read</strong> - The Prisma schema is intuitive and lets you declare your database tables in a human-readable way — making your data modeling experience a delight. You define your models by hand or introspect them from an existing database.
 
- <strong>Prisma Client | Type-safe database client</strong> - Prisma Client is a query builder that’s tailored to your schema. We designed its API to be intuitive, both for SQL veterans and developers brand new to databases. The auto-completion helps you figure out your query without the need for documentation.

- <strong>Prisma Migrate | Hassle-free migrations</strong> - Prisma Migrate auto-generates SQL migrations from your Prisma schema. These migration files are fully customizable, giving you full control and ultimate flexibility — from local development to production environments.

- <strong>Prisma Studio | Visual database browser</strong> - Prisma Studio is the easiest way to explore and manipulate data in your Prisma projects. Understand your data by browsing across tables, filter, paginate, traverse relations and edit your data with safety.

### Integration with MongoDB

#### Prerequisites

In order to successfully complete this guide, you need:
 - Node.js installed on your machine
 - MongoDB Shell (mongosh) installed 
 - Access to a MongoDB 4.2+ server with a `replica set` deployment. We recommend using MongoDB Atlas.
 - The MongoDB database connector uses transactions to support nested writes. Transactions `require a replica set` deployment. The easiest way to deploy a replica set is with Atlas. It's free to get started.

<i>Make sure you have your database connection URL at hand.</i> <br />

<br />

### Configuring replica set locally

#### Replication in MongoDB

A replica set in MongoDB `is a group of mongod processes that maintain the same data set`. Replica sets `provide redundancy and high availability`, and are the basis for all production deployments. 

A replica set is a group of mongod instances that maintain the same data set. A replica set contains several data bearing nodes and optionally one arbiter node. Of the data bearing nodes, one and only one member is deemed the primary node, while the other nodes are deemed secondary nodes.

 - You can specify the replica set name and the ip addresses in a configuration file:
 
```yaml
replication:
   replSetName: "rs0"
net:
   bindIp: localhost,<hostname(s)|ip address(es)>
```

 - `sudo systemctl start mongod`
 - `sudo systemctl status mongod`

See the location of the configuration file:
 
```yaml
mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor prese>
     Active: active (running) since Tue 2022-12-13 11:01:32 -03; 8s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 18149 (mongod)
     Memory: 238.1M
     CGroup: /system.slice/mongod.service
             └─18149 /usr/bin/mongod --config /etc/mongod.conf
```

 - `sudo systemctl stop mongod`
 - `sudo su`
 - `cd`
 - `cat /etc/mongod.conf`
 
Notice that in the default file `mongod.conf`, `bindIp` is already set to `127.0.0.1 on port 27017`, that is, `localhost:27017`:
 
```yaml
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
#  engine:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

#security:

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
```

Enter `replSetName`:

```yaml
replication:
   replSetName: "rs0"
```

`Exit superuser mode` and `start the mongoDB server` to `connect with mongosh` to one of the mongod instances.

 - `exit`
 - `sudo systemctl start mongod`
 - `mongosh`

#### Initiate the replica set

From mongosh, run `rs.initiate()` on replica set member 0.

 - `rs.initiate()`

<br />

### Starting Project with Prisma

1. <strong>Now, initialize a TypeScript project using npm:</strong>

 - `npm init -y`
 - `npm install typescript ts-node @types/node --save-dev`

 - `touch tsconfig.json` or `npx tsc --init` to generate the tsconfig.json file:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

 - `npm install prisma --save-dev`
 - `npx prisma init`

2. <strong>Model your data in the Prisma schema</strong>

Don't forget to add your `Connection URL` to MongoDB in the `.env` file.

`DATABASE_URL="mongodb://localhost:27017/nlw-esports?replicaSet=rs0`

After reading some content, found that prisma migrate commands are for the SQL databases only since they have a rigid table structure. But `MongoDB is a document database and those data are unstructured`.

So rather than running prisma migrate command we can use following command

 - `npx prisma generate`

This command creates the Prisma client that gives type-safe access to our database, finally you can visualize the database with:

- `npx prisma studio`

*<i>prisma.io</i>  <br />
*<i>mongodb.com/docs/manual/tutorial/deploy-replica-set</i>  <br />

<br />

## Express Controller Class with Prisma Client

Express is a framework for Node.js used to build the `backend for web applications`. It is `unopinionated`, meaning that you can use it in a manner in which you see fit. In this tutorial, I present a way that works for me while working with the TypeScript Express.

After starting your project with the required dependencies, to run our project, we need to add a script in our `package.json`:

```json
"scripts": {
  "build": "tsc",
  "dev": "tsnd --exit-child src/server.ts"
},
```

As you can see, our app starts at the `server.ts` file in the `src` directory. Let’s start with the basics:

```ts
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'

dotenv.config()

const app = express()
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

app.use(cors())
app.use(express.json())
app.use('/api/game', router)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})
```

 - <strong>dotenv.config()</strong> - Loads environment variables from .env file.
 - <strong>express()</strong> - Creates the Express application that we are going to interact with.
 - <strong>app.use(cors())</strong> - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
 - <strong>express.json()</strong> - Is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
 - <strong>app.use('/api/game', router)</strong> - Mount the router as middleware at path /api/game.
 - <strong>app.listen()</strong> - Function that does the app listen for a connection on the specified port. 
 
*<i>Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".</i> <br />
 
*<i>Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.</i> <br />

### Middleware

Middleware functions have access to the `request and response objects`. `It can attach to any place in the request-response cycle`. A third argument that middleware receives is the `next function`. When called, `the next middleware in the chain is executed`. An example of a middleware is the get callback that handles the HTTP GET request that we’ve written above. It is a very specific middleware that executes on a particular case. They can also perform more generic tasks. Let’s create a very simple logger middleware that will `log to console what requests were made`.

```ts
import * as express from 'express';
 
function loggerMiddleware(request: express.Request, response: express.Response, next) {
  console.log(`${request.method} ${request.path}`);
  next();
}
 
const app = express();
 
app.use(loggerMiddleware);
 
app.get('/hello', (request, response) => {
  response.send('Hello world!');
});
 
app.listen(5000);
```

### Controllers

A common way to structure an Express application is called `Model-View-Controller`. Some of the main components of MVC are `controllers`. They contain the `application logic and handle handling client requests`. Since we're covering TypeScript with Express, we use classes.

```ts
// server/src/controllers/game.ts

export class GameController {
  async addGame(req: Request, res: Response) {
    const { title, bannerUrl } = req.body

    await prisma.game
      .create({
        data: {
          title: title,
          bannerUrl: bannerUrl,
        },
      })
      .then((game) => res.status(201).json(game))
      .catch((error) => {
        console.error(error)
        return res.status(500).json({
          status: false,
          msg: error,
        })
      })
  }
  // ...
}
```

As we are using Prisma and TypeScript, we obtain its auto complete which allows us to identify the schemas in the database and their tables, even if you try to add a non-existent property to the database you will already receive a compilation error.

To call your controller methods as a callback function in Express routing, we must first instantiate our controller by assigning it to a variable, and then we will have access to its methods:

```ts
// server/src/routes.ts
import { Router } from 'express'
import { GameController } from './controllers/game'

const router = Router()

const game = new GameController()

router.get('/games/:page', game.getGames)
// ...
```

In addition to taking advantage of the PrismaClient instance to read and write in our application's database, we could have created countless ways to keep our controller even more robust and easy to maintain, such as typing the body of requests.

*<i>wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware</i> <br />

<br />

## Redux Toolkit and Google Auth Provider

Redux Toolkit is a `state management` library, it is most commonly used with libraries like React or Angular to create `user interfaces`. In this application, Redux was used only to store the user's login state, that is, if the user is logged in or not, if so, we also obtain some data provided by the Google authentication provider to identify the user, such as the email for example .

### Authentication with Firebase

> Firebase is an `app development platform` that helps you build and develop apps and games that users love. Backed by Google and trusted by millions of businesses around the world.

Most applications need to know a user's identity. Knowing a user's identity allows an app to securely save the user's data in the cloud and provide the same personalized experience across all of the user's devices.

`Firebase Authentication` offers easy-to-use `backend services`, `Software Development Kit)` and ready-made UI libraries to authenticate users in your application. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

1. <strong>Create a project in Firebase and go to SDK settings.</strong>

 - If you are already using npm and a module bundler such as webpack or Rollup, run the following command to install the latest SDK:
 
 - `npm install firebase`
 
2. <strong>Then launch Firebase and start using product SDKs.</strong>

```ts
// src/firebase.ts

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB4mk2ac4qlgzNYYl-qHVnI2nKeTr3w1yw',
  authDomain: 'eminent-scanner-370818.firebaseapp.com',
  projectId: 'eminent-scanner-370818',
  storageBucket: 'eminent-scanner-370818.appspot.com',
  messagingSenderId: '415456423398',
  appId: '1:415456423398:web:4bad88cce168cd7e107a27',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
```

*<i>Remember to enable the sign-in method in `Authentication` in your app in firebase and later define a provider, in this case the chosen one was Google.</i> <br />

3. <strong>Configuring Redux Toolkit Store with TypeScript.</strong>

 - `npm i react-redux @reduxjs/toolkit`
 
The `store` is the gateway for managing the states of our application, `each data in the store must have its own reducer` (it is in charge of handling all actions and specifies the state of the application), you must assign a slice to your application's reducer (which is, as the name implies, a piece of your application's state), as we will create the user's authentication state and this data will contain some data to identify the user, we pass the `reducer from userSlice` to the `store`:
 
```ts
// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { userSlice: userSliceState }
export type AppDispatch = typeof store.dispatch
```

 - Define Typed Hooks

```ts
// src/store/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

- We create the state of the `user` which will start as `null` when calling the `login method` the state will become the value that comes in `action.payload`, and to log out a user we create the logout reducer, which will set the user state to `null` again:

```ts
// src/store/userSlice.ts

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.userSlice.user
```

- Don't forget to envelop your application with the store provider, so your entire application will have access to the store:

```tsx
// src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { store } from './store'
import './styles/main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
```

4. Connecting user to application with Firebase and Redux

Reinforcing that it is not necessary to use Redux to integrate authentication with Firebase, but it was the approach I chose for this application. Therefore, after performing all the necessary configurations, we can now use these libraries to authenticate the user and store this state in the application.

Firstly firebase has a very convenient function from its `auth SDK` which is `onAuthStateChanged`, `onAuthStateChanged` adds a watcher for changes in user input state:

```tsx
// src/App.tsx

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { auth } from './firebase'
import { Ads, Main } from './pages'
import { useAppDispatch } from './store/hooks'
import { login, logout } from './store/userSlice'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user
        ? dispatch(
            login({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              img: user.photoURL,
            }),
          )
        : dispatch(logout())
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/ads/:game" element={<Ads />} />
    </Routes>
  )
}
```

As you can see, the `useEffect` of `App.tsx` is not responsible for logging or logging out a user, but only for saving the authentication state. `auth` from our application defined in `firebase.ts`:

```tsx
// src/page/Main.tsx
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/userSlice'
// ...

const provider = new GoogleAuthProvider()

export const Main = (props: Props) => {
 const currentUser = useAppSelector<User | null>(selectUser)

 useEffect(() => {
   fetch('./admins.json')
     .then((res) => res.json())
     .then((data) => setAdmins(data.admins))
     .catch((error) => console.log(error))
 }, [currentUser])

 const isUserAdmin = () => {
  return currentUser && admins?.includes(currentUser.email)
 }

 const rendersDashboard = () => (
  <>
    {currentUser ? (
      <div className={style.buttonsWrapper}>
        <button
          type="button"
          onClick={() => auth.signOut()}
          className={style.buttonGoogleLogout}
        >
          <GoogleLogo />
          Sair
        </button>
        {isUserAdmin() && (
          <DialogWrapper modal={<ManageGameModal />}>
            <PlusCircle size={24} />
            <span>Gerenciar game</span>
          </DialogWrapper>
        )}
        <DialogWrapper modal={<CreateAdModal games={games} />}>
          <MagnifyingGlassPlus size={24} />
          <span>Publicar anúncio</span>
        </DialogWrapper>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => signInWithPopup(auth, provider)}
        className={style.buttonGoogleSignIn}
      >
        <GoogleLogo />
        Entre com o Google
      </button>
    )}
  </>
 )
	
// ...
```

