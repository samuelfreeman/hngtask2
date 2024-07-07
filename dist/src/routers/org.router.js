"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orgRouter = (0, express_1.Router)();
const token_1 = require("../utils/token");
const org_controller_1 = require("../controllers/org.controller");
const secured = [token_1.verifyUserToken];
orgRouter.get("/api/organisations/:orgId", secured, org_controller_1.getOrg);
orgRouter.post("/api/organisations", secured, org_controller_1.createOrg);
orgRouter.post("/api/organisations/:orgId/users", secured, org_controller_1.addUserToOrg);
exports.default = orgRouter;
//# sourceMappingURL=org.router.js.map