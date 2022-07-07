import router from "express";

import gameController from "../controllers/gameController.js";

const gameRoutes = router();

gameRoutes.post("/battle", gameController.postBattle);
gameRoutes.get("/ranking", gameController.getRanking);

export default gameRoutes;