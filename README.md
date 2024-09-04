**Description**
-
Testing the replication feature of MongoDB. Run a three-node MongoDB instances using docker compose. One will be a primary node and the other two will be secondary nodes.

The three node replica set serves as a redundancy.

Writing to the database will fail if only one secondary node remains running. However, reading will still be available.

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