"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controllers/hotelController");
const router = express_1.default.Router();
router
    .route('/')
    .get(hotelController_1.getHotels)
    .post(hotelController_1.addHotel);
router
    .route('/:id')
    .get(hotelController_1.getSingleHotel)
    .put(hotelController_1.updateHotel)
    .delete(hotelController_1.deleteHotel);
router
    .route('/:id/reviews')
    .post(hotelController_1.addReview)
    .get(hotelController_1.getSingleReviews);
exports.default = router;
