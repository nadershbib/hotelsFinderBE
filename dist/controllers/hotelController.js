"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleReviews = exports.addReview = exports.deleteHotel = exports.updateHotel = exports.getSingleHotel = exports.addHotel = exports.getHotels = void 0;
const index_1 = __importDefault(require("../db/index"));
// '/'
const getHotels = async (req, res) => {
    try {
        const results = await index_1.default.query(`select * from hotels left join (select hotel_id,count(*),trunc(AVG(rating),2)as avrg_rating from reviews group by hotel_id ) 
     reviews on hotels.id = reviews.hotel_id;`);
        res.status(200).json({
            message: 'success',
            data: {
                hotels: results.rows
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.getHotels = getHotels;
const addHotel = async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        const result = await index_1.default.query('INSERT INTO hotels(name,location,price_range)values($1,$2,$3) returning *', [name, location, price_range]);
        res.status(200).json({
            message: 'successfully added hotel',
            data: {
                hotels: result.rows[0]
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.addHotel = addHotel;
// '/:id'
const getSingleHotel = async (req, res) => {
    try {
        const result = await index_1.default.query(`select * from hotels left join (select hotel_id,count(*),trunc(AVG(rating),2)as avrg_rating from reviews group by hotel_id ) 
        reviews on hotels.id = reviews.hotel_id where id=$1;`, [req.params.id]);
        res.status(200).json({
            message: 'success',
            data: {
                hotel: result.rows[0]
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.getSingleHotel = getSingleHotel;
const updateHotel = async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        const result = await index_1.default.query('UPDATE hotels SET name=$1,location=$2,price_range=$3 WHERE id=$4 returning *', [name, location, price_range, req.params.id]);
        res.status(200).json({
            message: 'successfully updated hotel',
            data: {
                hotels: result.rows[0]
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.updateHotel = updateHotel;
const deleteHotel = async (req, res) => {
    try {
        const foreignDelete = await index_1.default.query('DELETE FROM reviews where hotel_id=$1 ', [req.params.id]);
        const result = await index_1.default.query('DELETE FROM hotels where id=$1', [req.params.id]);
        res.status(200).json({
            message: 'successfuly deleted hotel',
            data: {
                hotel: result.rows[0]
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.deleteHotel = deleteHotel;
// Reviews
const addReview = async (req, res) => {
    try {
        const { name, rating, review, hotel_id } = req.body;
        const result = await index_1.default.query('INSERT INTO reviews(hotel_id,name,review,rating) values($1,$2,$3,$4) returning *', [hotel_id, name, review, rating]);
        res.status(200).json({
            message: 'successfuly added a review',
            data: {
                review: result.rows[0]
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.addReview = addReview;
const getSingleReviews = async (req, res) => {
    try {
        const results = await index_1.default.query(`select * from reviews where hotel_id=$1`, [req.params.id]);
        res.status(200).json({
            message: 'success',
            data: {
                reviews: results.rows
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.getSingleReviews = getSingleReviews;
