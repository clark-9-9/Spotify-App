"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function ConnectDB(url) {
    mongoose_1.default.connect(url)
        .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        // console.log("Error connecting to MongoDB");
        console.log(err);
    });
}
exports.default = ConnectDB;
