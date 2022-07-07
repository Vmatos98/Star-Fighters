import db from "./../db.js";

async function insertNewPlayer(user:string){
    return db.query(`INSERT INTO fighters (username, wins, losses, draws) 
    VALUES ($1, 0, 0, 0)
`, [user]);
}

async function selectPlayer(user:string){
    return db.query(`SELECT id FROM fighters WHERE username = $1`, [user]);
}

async function updatePlayer(value:string, user:string){
    return db.query(`UPDATE fighters SET ${value} = ${value} + 1
    WHERE username = $1 `, 
[user]);
}

async function getRanking(){
    return await db.query(`SELECT username, wins, losses, draws 
    FROM fighters 
    ORDER BY draws, wins DESC
`);
}

const gameRepository = {
    insertNewPlayer,
    selectPlayer,
    updatePlayer,
    getRanking
}
export default gameRepository;