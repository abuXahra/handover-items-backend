const HandOver = require("../model/handover.model");
const asyncHandler = require("express-async-handler");
const controllerError = require("../util/error.utils");
const HandoverCache = require("../cache/handoverCache");

// ======================================================
// CREATE HANDOVERS
// ======================================================

exports.createHandover = asyncHandler(async (req, res) => {
  // Collect data from request body
  const {
    handoverTo,
    handoverTitle,
    handoverItems,
    handoverSite,
    handoverDate,
  } = req.body;
  const user = req.user.userId;

  // Validate handoverItems
  if (!Array.isArray(handoverItems) || handoverItems.length === 0)
    controllerError("Error while creating handover", 500);

  // Calculate amount for each handover item
  const calculatedItems = handoverItems.map((item) => {
    const { title, price, quantity } = item;

    return {
      ...item,
      title,
      price,
      quantity,
      amount: price * quantity,
    };
  });

  //calculate total amount
  const totalAmount = calculatedItems.reduce(
    (total, item) => total + item.amount,
    0,
  );

  // Create handover
  const handOver = await HandOver.create({
    handoverTo,
    handoverTitle,
    handoverItems: calculatedItems,
    handoverSite,
    handoverDate,
    totalAmount,
    user,
  });

  // Check if handover was created successfully
  if (!handOver) controllerError("Error while creating handover", 500);

  // ====Cache: Invalidate user's cache because data has changed
  if (user) await HandoverCache.invalidateUserHandovers(user);

  // Send response
  res.status(201).json({
    message: "Handed over items added successfully",
    data: handOver,
  });
});

// ======================================================
// GET HANDOVERS
//  ======================================================
exports.getHandovers = asyncHandler(async (req, res) => {
  // Use authenticated user ID if available
  const userId = req.user?.userId;

  if (!userId) controllerError("User ID is required", 400);

  // 1. Check Redis cache first
  const cachedHandovers = await HandoverCache.fetchUserHandovers(userId);
  if (cachedHandovers) {
    return res.status(200).json({
      message: "Handovers retrieved successfully",
      source: "cache",
      data: cachedHandovers.data,
    });
  }

  // 2. Cache miss - get data from MongoDB
  const handovers = await HandOver.find({}).sort({
    createdAt: -1,
  });

  await HandoverCache.saveUserHandovers(userId, handovers);
  res.status(200).json({
    message: "Handovers retrieved successfully",
    source: "database",
    data: handovers,
  });
});

// ======================================================
// GET A HANDOVER
//  ======================================================
exports.getHandover = asyncHandler(async (req, res) => {
  // Use authenticated user ID if available
  const userId = req.user?.userId;
  if (!userId) controllerError("User ID is required", 400);

  const handover = await HandOver.findById(req.params.handoverId);

  if (!handover) controllerError("Handover not found", 401);

  res.status(200).json({
    message: "Handed over items retrieved successfully",
    data: handover,
  });
});

// ======================================================
// UPDATE HANDOVERS
//  ======================================================
exports.updateHandover = asyncHandler(async (req, res) => {
  const userId = req.user?.userId; //for redis cache

  const handoverId = await HandOver.findById(req.params.handoverId);

  if (!handoverId) controllerError("Handover not found", 401);

  const updatedHandover = await HandOver.findByIdAndUpdate(
    handoverId,
    { $set: req.body },
    { new: true },
  );

  if (!updatedHandover)
    controllerError("Error occur while updating handover", 500);

  // ====Cache: Invalidate user's cache because data has changed
  await HandoverCache.invalidateUserHandovers(userId);

  res
    .status(200)
    .json({ message: "Handover upated successfully", updatedHandover });
});

// ======================================================
// DELETE HANDOVERS
//  ======================================================
exports.deleteHandover = asyncHandler(async (req, res) => {
  const userId = req.user?.userId; //for redis cache

  const handoverId = await HandOver.findById(req.params.handoverId);
  if (!handoverId) controllerError("Handed over not found", 401);

  await HandOver.findByIdAndDelete(handoverId);
  // ====Cache: Invalidate user's cache because data has changed
  await HandoverCache.invalidateUserHandovers(userId);

  res.status(200).json({ message: "Handover Item deleted successfully" });
});
