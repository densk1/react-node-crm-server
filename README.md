# node-ballers
A nodeJS server for Ballers

### de-coupling route function from route handler
names should follow URLS, with dashes imstead of slashes in the funtions
e.g.
    app.get('/team/n/leaguetable', team-n-leagueTable)
    
    // filename
    // team.n.leaguetable.jsx



## routes

### 1. CRM
**a) /crm/list** (post)

Returns a list of (20) names from the database in order of:
- Alphabetical
- Date edited


**b) /crm/client/:documentID** (post)

Review a specific clients details.


**c) /crm/client/:documentID/edit** (post)



**d) /crm/search** (post)

Currently searches the name field for partials, I want to expand this to other fields:
- [ ] name
- [ ] emailaddress
- [ ] company
- [ ] role

**=> request**
- must include `body:{ query: 'name' }`


**=> response**
- Returns JSON object 
- Schema type Client 
- with a status of 200


**d) /crm/create** (post)

A post route to create a new entry in the client database


**e) /crm/delete/:documentID** (post)

A post route to delete a record.