import {validatePost} from "../schemas/gameSchemas.js"
import gameServices from "../services/gameServices.js"
async function postBattle(req, res){
    try {
    const { firstUser, secondUser } = req.body;
    const validate = validatePost.validate(req.body)
    if(validate.error){
        return res.sendStatus(422);
    }
    const result = await gameServices.postBattle(firstUser, secondUser);

    res.send(result).status(200);
        }
    catch (err) {
        if(err.type==="error_axios"){
        return res.status(400).send({ message: err.message });
        }
        return res.sendStatus(500);
    }
}

async function getRanking(req, res) {
    try{
        const result = await gameServices.getRanking();
        res.send(result).status(200)
    }catch(err){
        res.sendStatus(500);
    }
}

const gameController={
    postBattle,
    getRanking
};

export default gameController;