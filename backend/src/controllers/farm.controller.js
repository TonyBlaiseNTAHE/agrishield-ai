import Farm from '../models/farm.model.js';

const createFarm = async (req, res) => {
    try {
        const farm = await Farm.create(req.body);
        res.status(201).json({
            success: true,
            data: farm
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFarms = async (req, res) => {
    try {
        const farms = await Farm.find().populate('farmerId');

        res.json({
            success: true,
            data: farms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { createFarm, getFarms };