import Farm from "../models/Farm.js";

export const createFarm = async (req, res) => {
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

export const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: farms.length,
      data: farms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    
    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found"
      });
    }
    
    res.json({
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

export const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found"
      });
    }
    
    res.json({
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

export const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    
    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found"
      });
    }
    
    res.json({
      success: true,
      message: "Farm deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};