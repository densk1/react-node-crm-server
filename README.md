# node-ballers
A nodeJS server for Ballers

### de-coupling route function from route handler
names should follow URLS, with dashes imstead of slashes in the funtions
e.g.
    app.get('/team/n/leaguetable', team-n-leagueTable)
    
    // filename
    // team.n.leaguetable.jsx



### routes

1. CRM
    **a) /crm/list** (post)
    Returns a list from the database in order of:
        - Alphabetical
        - Date edited

    **b) /crm/client/__:documentID__** (post)
    Review a specific clients details.
    
    
    **c) /crm/client/__:documentID__/edit** (post)
    **d) /crm/search** (post)
    Searches the name field for partials.
    I Want to expand this to other fields:
        - [ ] name
        - [ ] emailaddress
        - [ ] company
        - [ ] role
    **=> request**
    - must include `body:{ name: 'name' }`
    
    
    **=> response**
    - Returns JSON object 
    - Schema type Client 
    - with a status of 200


