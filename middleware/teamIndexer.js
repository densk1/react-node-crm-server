// teamIndexer.js
const db = require('../model/mysqlCon.js');
module.exports = (req, res, next) => {
    let r = req.params;
    let PlayerID = 5;//r.PlayerID;
    let teamIndex = parseInt(r.teamIndex);
    let query = `
        SELECT 
            p.TeamID AS TeamID,
            Season
        FROM 
            playerteams p 
        LEFT JOIN
            teams t 
        ON
            p.TeamID = t.TeamID

        WHERE 
            PlayerID = ?
        LIMIT 1 
        OFFSET ?
    `;
    let query_params = [PlayerID, teamIndex];
    db.query(
        query, 
        query_params, 
        function(error, result, fields) {
            if(error) {
                console.log(error.message);
                return res.status(500).json({result: "Server Error "});
            }
            if ( result.length == 1 ) {
                result = result[0];
                req.params.TeamID = result.TeamID;
                req.params.Season = result.Season;
                    
                next();
            } else {
                res.status(401).json({});
            }
        }
    );
    
}