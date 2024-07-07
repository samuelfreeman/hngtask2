import { Router } from "express";

const orgRouter = Router();
import { verifyUserToken } from "../utils/token";
import { getOrg, createOrg, addUserToOrg } from "../controllers/org.controller";
const secured = [verifyUserToken];

orgRouter.get("/api/organisations/:orgId", secured, getOrg);
orgRouter.post("/api/organisations", secured, createOrg);
orgRouter.post("/api/organisations/:orgId/users", secured, addUserToOrg);

export default orgRouter