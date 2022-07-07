import axios from "axios";

import gameRepository from "../repositories/gameRepository.js";

async function postBattle(firstUser:string, secondUser:string ){
    let firstUserStars = 0;
    let secondUserStars = 0;
    try{ 
    const firstUserData = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
    const secondUserData = await axios.get(`https://api.github.com/users/${secondUser}/repos`);
    await firstUserData.data.forEach((obj: { stargazers_count: number; }) => firstUserStars += obj.stargazers_count);
    await secondUserData.data.forEach((obj: { stargazers_count: number; }) => secondUserStars += obj.stargazers_count);
    }
    catch(error){
        throw { type: "error_axios", message: error.message };
    }
    try{
    const { rows: user1 } = await gameRepository.selectPlayer(firstUser);
    const { rows: user2 } = await gameRepository.selectPlayer(secondUser);
    if(!user1.length){
        await gameRepository.insertNewPlayer(firstUser);
    }
    if(!user2.length){
        await gameRepository.insertNewPlayer(secondUser);
    }
    if(firstUserStars === secondUserStars){
        await gameRepository.updatePlayer("draws", firstUser);
        await gameRepository.updatePlayer("draws", secondUser);
        return {
            "winner": null, 
            "loser": null, 
            "draw": true 
        };
    }
    else if(firstUserStars < secondUserStars){
        await gameRepository.updatePlayer("wins", secondUser);
        return {
            "winner": secondUser, 
            "loser": firstUser, 
            "draw": false 
        }
    }else{
        await gameRepository.updatePlayer("wins", firstUser);
        return {
            "winner": firstUser, 
            "loser": secondUser, 
            "draw": false 
        }
    }

}
    catch(error){
        throw { type: "error_database", message: error.message };
    
    }
}

async function getRanking(){
    try {
        const { rows: ranking} = await gameRepository.getRanking();
        return ranking;
    } catch (error) {
        throw { type: "error_database", message: error.message };
    }
}

const gameServices={
    postBattle,
    getRanking
}

export default gameServices;