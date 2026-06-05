import Farmer from "../models/Farmer.js";

const createFarmer = async (req, res) => {
    try {
        const farmer = new Farmer(req.body);

        res.status(201).json({
            success: true,
            data: await farmer.save()
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
    };

const getFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();

        res.status(200).json({
            success: true,
            data: farmers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export { createFarmer, getFarmers };