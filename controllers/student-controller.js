import User from "../models/User.js";
import Slot from "../models/Slots.js";

export const getSlots = async (request, response) => {
  try {
    const slots = await Slot.find({ bookedBy: null }).select("-bookedBy").populate("deanId", "-password -role -__v");
    if (slots) {
      return response.status(200).json(slots);
    } else {
      return response.json("No free slots available");
    }
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const bookSlot = async (request, response) => {
    try {
      const user = response.locals.user;
      const id = request.params.id;
  
      const existingSlot = await Slot.findById(id);
  
      if (!existingSlot) {
        return response.status(400).json("Slot not found");
      }
      if (existingSlot.bookedBy !== null) {
        return response.status(400).json("Slot is already booked");
      }
      const booking = await Slot.findByIdAndUpdate(id, { bookedBy: user._id }, { new: true });
  
      return response.status(200).json(booking);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };
