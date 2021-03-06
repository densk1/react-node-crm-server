// teamIndexer.js
const db = require('../../../model/mysqlCon.js');
module.exports = (req, res, next) => {
    let PlayerID = req.user.id;
    let teamIndex = parseInt(req.params.teamIndex);
    const requestedSeason = parseInt(req.params.season);
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
        LIMIT 1 OFFSET ?
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
                req.params.Season = requestedSeason || result.Season;
                next();
            } else {
                res.status(401).json({});
            }
        }
    );
    
}