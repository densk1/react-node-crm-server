
const leagueTable = `

SELECT 
    squad.SquadID 
    AS SquadID,

    squad.SquadPlayerName 
    AS SquadPlayerName,

    squad.Squad_Number 
    AS Squad_Number,

    IFNULL(COUNT(games.GameID), 0)
    AS GamesPlayed,

    IFNULL((SUM(games.Winner=selections.Team )), 0)
    AS Wins,

    IFNULL((SUM(games.Winner='')), 0)
    AS Draws,

    IFNULL((SUM((games.Winner!=selections.Team ) AND (games.Winner!='' )) ), 0)
    AS Losses,

    IFNULL(((SUM(games.Winner=selections.Team)*3)+SUM(games.Winner='')), 0)
    As Points,

    IFNULL((((SUM(games.Winner=selections.Team)*3)+SUM(games.Winner='')) )/(COUNT(games.GameID)  ), 0)
    AS PointsPerGame

FROM
    squad
LEFT JOIN
    selections
ON
    squad.TeamID=selections.TeamID
AND 
    squad.SquadID=selections.SquadID

LEFT JOIN
    games
ON
    games.GameID=selections.GameID
AND
    (games.Season = ? OR games.Season = NULL)
WHERE
    squad.TeamID=?
AND
    LiveSquad=1
GROUP BY
    SquadID,
    SquadPlayerName,
    Squad_Number
ORDER BY 
    Points DESC, 
    GamesPlayed, 
    PointsPerGame DESC,
    SquadPlayerName
    
`;

module.exports = leagueTable;