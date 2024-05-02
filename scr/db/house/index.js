"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseModel = void 0;
var mongoose_1 = require("mongoose");
var __1 = require("..");
var COLLECTION_NAME = "House";
var HouseSchema = new mongoose_1.Schema({
    adId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    buildingType: {
        type: String,
        default: "",
    },
    yearBuilt: {
        type: Number,
        default: 0,
    },
    area: {
        type: Number,
        default: 0,
    },
    bathroom: {
        type: String,
        default: "",
    },
    floor: {
        type: Number,
        default: 0,
    },
    totalFloors: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
HouseSchema.index({ title: 1 });
exports.HouseModel = __1.MongoDataBase.mainDataBaseConnection.model(COLLECTION_NAME, HouseSchema, COLLECTION_NAME);
