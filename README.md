# react-node-crm-server
A node server for [react-boostrap-crm](https://github.com/densk1/react-bootstrap-crm).

```
.
├── .gitignore
├── README.md
├── config
│   ├── JWTconfig.js
│   └── cors.js
├── index.js
├── model
│   ├── checkPass.js
│   ├── mongoose.js
│   ├── mysqlCon.js
│   ├── schema.client.js
│   ├── schema.comment.js
│   ├── schema.contact.js
│   └── schema.user.js
├── package-lock.json
├── package.json
├── passport
│   ├── index.js
│   └── strategy.jwt.js
└── routes
    ├── account
    │   ├── index.js
    │   └── routes.js
    ├── auth
    │   ├── example.mysql.route.js
    │   ├── index.js
    │   └── routes.js
    ├── crm
    │   ├── draw.IO.diagram.xml
    │   ├── index.js
    │   └── routes.js
    └── team
        ├── index.js
        ├── middleware
        │   └── teamIndexer.js
        ├── queries
        │   └── tablequery.sql
        ├── route.leagueTable.js
        ├── route.previousSeason.js
        └── route.teamIndex.js
```

### Setup
1. add in your own .env variables.
2. git clone & npm install
3. npm start

#### .env variables required in root folder

```
#server
PORT=4000

#JWT
JWTSECRET= #Cookie secret for JWT keys.

#Mongo
MONGOURI=mongodb://user:password@ds100000.mlab.com:00000/collection-name

# MySQL DB
SQLHOST=localhost
SQLUSER=root
SQLPASSWORD=
SQLDB=Ballers

```
