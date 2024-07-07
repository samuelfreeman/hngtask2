"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/routers/index"));
const errorHandle_1 = __importDefault(require("./src/middleware/errorHandle"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// app.use(cors())
app.get("/", ({ req, res, next }) => {
    res.status(200).json({
        messsage: "Hello"
    });
});
app.use(index_1.default);
app.use(errorHandle_1.default);
app.listen(3000, () => {
    console.log(`server listening  to port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map