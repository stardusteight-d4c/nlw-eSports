# NLW eSports | Prisma ORM & TypeScript

![banner](banner.png)

> Project made at `NLW (Next Level Week)`, an online event held by Rocketseat. In this project taught by Diego Schell Fernandes,
> the ORM Prisma was presented for the development of APIs in the backend, as well as the importance of `TypeScript` (a super set of the
> JavaScript to leave your code statically typed in both the backend and frontend of the application). From the base project made in this event
> added some new features to make the project more functional, like login with Google, admins can add, edit and delete
> games through the frontend of the application, pagination, and the main feature of creating ads and deleting them whenever you want on the ad page.

:arrow_right: Prisma ORM | Integration with MongoDB <br /> 
:arrow_right: Controller Class with Typescript <br /> 
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

### Configuring replica set locally

- Replication in MongoDB

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

### Starting Project with Prisma

1. <strong>Now, initialize a TypeScript project using npm:</strong>

 - `npm init -y`
 - `npm install typescript ts-node @types/node --save-dev`

 - `touch tsconfig.json`

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

This command creates the Prisma client that gives type-safe access to our database.


- `npx prisma studio`

*<i>prisma.io</i>  <br />
*<i>mongodb.com/docs/manual/tutorial/deploy-replica-set</i>  <br />
