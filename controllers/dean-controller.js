import Slot from "../models/Slots.js";

export const addSlot = async (request, response) => {
  try {
    const slotData = request.body;
    const newSlot = new Slot(slotData);
    await newSlot.save();
    return response.status(200).json(newSlot);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const pendingSession = async (request, response) => {
  try {
    const dean = response.locals.user;
    const id = dean._id;
    const slots = await Slot.find({ deanId: id, bookedBy: { $ne: null } }).populate("bookedBy");
    const today = new Date();
    const pendingSlots = [];

    slots.map((slot) => {
      var date = slot.date;
      var time = slot.time;
      var slotdate = new Date(date +" "+ time);
      if (today < slotdate) {
        pendingSlots.push({
          day: slot.day,
          date: slot.date,
          time: slot.time,
          bookedBy: slot.bookedBy.name,
        });
      }
    });
    
    return response.status(200).json(pendingSlots);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
