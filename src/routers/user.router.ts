import { Router } from "express";

const userRouter = Router();

import { validateEmail } from "../middleware/student.checkEmail";
import { register, login, singleUser ,usersOrgs} from "../controllers/user.controller";

import { user, userLogin } from "../utils/zod.schema";
import validateRequest from "../utils/zod.validationError";
import { verifyUserToken } from "../utils/token";
const secured = [verifyUserToken];


userRouter.post("/auth/register", validateRequest(user), register);
userRouter.post("/auth/login", validateRequest(userLogin), validateEmail, login)
userRouter.get("/api/users/:id", secured, singleUser)
userRouter.get("/api/organisations",secured,usersOrgs)

export default userRouter