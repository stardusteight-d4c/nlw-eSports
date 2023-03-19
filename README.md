<div align="center">
  <img src="logo.png" width="222" height="78" />
</div>

<h1 align="center">
 NLW eSports, Find Your Duo
</h1>

This application is aimed at the gamer universe and allows users to connect to find partners for online games. Users can log in and post ads to find a partner or search through game ads to find a suitable partner. The ads form collects information about the game, what time the user is available to play and also provides the user's Discord so that they can easily connect with people who are looking for game partners at the same time.

In the frontend, technologies such as React, TypeScript, Fetch API, Radix UI, Firebase and TailwindCSS were used, which allow users to interact with the application's interface in a pleasant and intuitive way. Vite was used to compile and run the application.

In the backend, technologies such as Node.js, TypeScript, Prisma and Express were used, which allow the application to process user requests and interact with the database efficiently. Prisma was used as the ORM for the database and Express to create the API routes.

With this application, players can easily find online gaming partners and enjoy their favorite games even more.

## :hammer_and_wrench: Tools

### Frontend

* React
* TypeScript
* Fetch API
* Radix UI
* Firebase
* TailwindCSS
* Vite

### Backend

* Node.js
* TypeScript
* Prisma
* Express

## :mailbox_with_mail: Utilities
 
### Fetch API

The Fetch API is a JavaScript interface that provides an easy and powerful way to fetch resources on the web. It is a modern alternative to the old XMLHttpRequest (XHR), which allows developers to send and receive data through HTTP and HTTPS requests.

The Fetch API has a cleaner syntax and is based on Promises, which makes it easier to use compared to XHR. It allows developers to work with JSON, XML, Blob, FormData and other data types.

To make a request using the Fetch API, the developer needs to create a request object with information about the resource he wants to fetch. It then passes this request object to the fetch() function, which returns a Promise containing the server's response.

The Fetch API is supported by all major modern browsers as well as Node.js. It's an essential technology for building web applications that need to interact with remote servers.

### Radix UI

Radix UI is a user interface (UI) component library that offers a practical and consistent approach to building web interfaces. Radix UI's goal is to provide simple, efficient and accessible components that can be easily styled and customized to adapt to different projects and needs. The library offers a wide variety of components such as buttons, checkboxes, progress bars, menus, forms and much more.

The tagline "Why waste time reinventing UI components?" emphasizes the idea that it is often unnecessary and inefficient to reinvent the wheel when building a user interface. With Radix UI, developers can use components already tested and approved by the community and thus save time and resources. Additionally, the library promotes user interface standardization, which can make the user experience more consistent and enjoyable.

## :speech_balloon: Explanations

### Prisma ORM: Integration with MongoDB

* <strong>Prerequisites</strong>:

In order to successfully complete this guide, you need:
* Node.js installed on your machine
* MongoDB Shell (mongosh) installed 
* Access to a MongoDB 4.2+ server with a <strong>replica set</strong> deployment. We recommend using MongoDB Atlas.
* The MongoDB database connector uses transactions to support nested writes. Transactions <strong>require a replica set</strong>  deployment. The easiest way to deploy a replica set is with Atlas. It's free to get started.

<i>Make sure you have your database connection URL at hand.</i> <br />

#### Configuring replica set locally

* <strong>Replication in MongoDB</strong>

A replica set in MongoDB is a group of mongod processes that maintain the same data set. Replica sets provide redundancy and high availability, and are the basis for all production deployments. 

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

Exit superuser mode and start the mongoDB server to connect with mongosh to one of the mongod instances.

 - `exit`
 - `sudo systemctl start mongod`
 - `mongosh`

#### Initiate the replica set

From mongosh, run `rs.initiate()` on replica set member 0.

 - `rs.initiate()`

#### Starting Project with Prisma

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

Don't forget to add your Connection URL to MongoDB in the `.env` file.

`DATABASE_URL="mongodb://localhost:27017/nlw-esports?replicaSet=rs0`

After reading some content, found that prisma migrate commands are for the SQL databases only since they have a rigid table structure. But MongoDB is a document database and those data are unstructured.

So rather than running prisma migrate command we can use following command

 - `npx prisma generate`

This command creates the Prisma client that gives type-safe access to our database, finally you can visualize the database with:

- `npx prisma studio`

<br />

### Redux Toolkit and Google Auth Provider

Redux Toolkit is a state management library, it is most commonly used with libraries like React or Angular to create user interfaces. In this application, Redux was used only to store the user's login state, that is, if the user is logged in or not, if so, we also obtain some data provided by the Google authentication provider to identify the user, such as the email for example .

#### Authentication with Firebase

> Firebase is an app development platform that helps you build and develop apps and games that users love. Backed by Google and trusted by millions of businesses around the world.

Most applications need to know a user's identity. Knowing a user's identity allows an app to securely save the user's data in the cloud and provide the same personalized experience across all of the user's devices.

Firebase Authentication offers easy-to-use backend services SDKs, and ready-made UI libraries to authenticate users in your application. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

1. <strong>Create a project in Firebase and go to SDK (Software Development Kit) settings.</strong>

 - If you are already using npm and a module bundler such as webpack or Rollup, run the following command to install the latest SDK:
 
 - `npm install firebase`
 
2. <strong>Then launch Firebase and start using product SDKs.</strong>

```ts
// web/src/firebase.ts

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

*<i>Remember to enable the sign-in method in Authentication in your app in firebase and later define a provider, in this case the chosen one was Google.</i> <br />

3. <strong>Configuring Redux Toolkit Store with TypeScript.</strong>

 - `npm i react-redux @reduxjs/toolkit`
 
The store is the gateway for managing the states of our application, each data in the store must have its own reducer (it is in charge of handling all actions and specifies the state of the application), you must assign a slice to your application's reducer (which is, as the name implies, a piece of your application's state), as we will create the user's authentication state and this data will contain some data to identify the user, we pass the reducer from `userSlice` to the store:
 
```ts
// web/src/store/index.ts

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
// web/src/store/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

- We create the state of the `user` which will start as `null` when calling the `login method` the state will become the value that comes in `action.payload`, and to log out a user we create the logout reducer, which will set the user state to `null` again:

```ts
// web/src/store/userSlice.ts

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
// wweb/src/main.tsx

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

4. <strong>Connecting user to application with Firebase and Redux.</strong>

Reinforcing that it is not necessary to use Redux to integrate authentication with Firebase, but it was the approach I chose for this application. Therefore, after performing all the necessary configurations, we can now use these libraries to authenticate the user and store this state in the application.

Firstly firebase has a very convenient function from its `auth SDK` which is `onAuthStateChanged`, `onAuthStateChanged` adds a watcher for changes in user input state:

```tsx
// web/src/App.tsx

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

<br />

### Radix UI | Why waste time reinventing UI components?

> Unstyled, accessible components for building high‑quality design systems and web apps in React

A component library provides a centralized and managed repository of components for reuse, one of the greatest purposes of component libraries is to bring more agility to the development of user interfaces, creating a component can be much more complex than it seems, for example the modal in this application, you would have to think about how you would manage the state of your modal, accessibility, what would be the rendering logic of this component, where would such logic be in your code and among other possibilities.

All web components basically have the same behavior, you don't need to think about how a modal, popover or a slider will behave, for example, there are already ready-made libraries made to make these implementations easy to implement, in addition to guaranteeing the better usability for the user.

Let's look at an example Radix UI component in the application:

```tsx
// web/src/components/modals/CreateAdModal.tsx

import * as Checkbox from '@radix-ui/react-checkbox'

<span className={style.checkContainer}>
  <Checkbox.Root
    onCheckedChange={() => setUseVoiceChannel(!useVoiceChannel)}
    className={style.checkBoxContainer}
  >
    <Checkbox.Indicator>
      <Check className={style.checkBox} />
    </Checkbox.Indicator>
  </Checkbox.Root>
  Costumo me conectar ao chat de voz
</span>
```

Note that we don't need to worry about rendering logic, just details of how to implement the component in our project and styling, component logic and accessibility are in charge of the library. Of course, a checkbox is a simple component, so let's see the example of a modal, in this case I separated the rendering responsibilities into different components:

```tsx
// web/src/pages/Main.tsx

{isUserAdmin() && (
  <DialogWrapper modal={<ManageGameModal />}>
    <PlusCircle size={24} />
    <span>Gerenciar game</span>
  </DialogWrapper>
)}

``` 

```tsx
// web/src/components/modals/integrate/DialogWrapper.tsx

import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  children: JSX.Element | JSX.Element[]
  modal: JSX.Element
}

export const DialogWrapper = ({ children, modal }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={style.triggerButton}>
        {children}
      </Dialog.Trigger>
      {modal}
    </Dialog.Root>
  )
}

const style = {
  triggerButton: `py-3 hover:bg-violet-600 justify-center w-full md:w-fit transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md`,
}

```

The `children` property that `DialogWrapper` receives is responsible for being the trigger that will open the modal, and the modal will open right after `Dialog.Trigger`, simple, no? But the modal also has predefined behaviors, and Radix UI provides these behaviors, which I built a separate component that will envelop the modal, assigning it the behaviors of a modal, all without having to build different global states or pass parent-to-child props and have all rendering responsibility built into the application:

```tsx
// web/src/components/modals/integrate/DialogPortal.tsx

import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  title?: string
  children: JSX.Element | JSX.Element[]
}

export const DialogPortal = ({ title, children }: Props) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={style.overlay} />
      <Dialog.Content className={style.content}>
        <Dialog.Title className={style.title}>{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

const style = {
  overlay: `bg-black/60 inset-0 fixed z-20`,
  content: `fixed z-50 w-[95vw] md:w-fit py-4 px-8 md:h-fit bg-[#2A2634] md:py-8 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md shadow-black/25`,
  title: `text-xl md:text-3xl font-black`,
}
``` 

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>



