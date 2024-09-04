**Description**
-
Testing the replication feature of MongoDB. Run a three-node MongoDB instances using docker compose. One will be a primary node and the other two will be secondary nodes.

The three node replica set serves as a redundancy.

Reading from the database and writing to the database should work just fine even if both secondary nodes are down or just one secondary node is down.

However, if only one secondary node is available, only reading from the database will work and writing will fail. By default, reading would also fail, but this is prevented by the `readPreference: 'secondaryPreferred'` configuration when calling `mongoose.connect()` (refer app.js file line 19).

**Requirements**
-
- Docker compose
- Nodejs
- Postman (optional for testing reading from and writing to database)

**How to run**
-
-  Run docker compose on the compose.yaml that is located inside the three-node-mongodb folder. At the root of the directory, just run:
    - `docker compose -f three-node-mongodb/compose.yaml up -d`
-  Install all node modules required for the nodejs app. At the root of the directory, just run:
   -  `npm install`
-  Now you can test executing GET and POST request on the NodeJS app. Use this Postman workspace to quickly test the API endpoint. https://www.postman.com/the92ari/workspace/simple-mongodb-app