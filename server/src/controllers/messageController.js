const Message = require("../models/messageSchema");

// Get messages API Endpoint
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.id },
        { sender: req.params.id, receiver: req.user._id },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error.message);
  }
};

// Create message API Endpoint
const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: req.params.id,
      message,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getMessages,
  createMessage,
};
