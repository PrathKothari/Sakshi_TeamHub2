import Event from '../models/eventsModel.js';

const createEvent =  async (req, res) => {
  try {
    const {
      title,
      description,
      dates,
      location,
      category,
      tags,
      participantRules,
      eventLogistics,
      prizesAndRewards,
      sponsorsAndPartners,
      payment,
    } = req.body;

    // Create new Event
    const event = new Event({
      title,
      description,
      dates,
      location,
      createdBy: req.user._id, // from authMiddleware
      category,
      tags,
      participantRules,
      eventLogistics,
      prizesAndRewards,
      sponsorsAndPartners,
      payment,
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'username email')   // show event creator
      .sort({ createdAt: -1 })
      .select(
        'title description dates location category tags createdBy participantsCount isRegistrationOpen isOngoing isFinished isFull'
      ) // only pick necessary fields
      .lean({ virtuals: true });

    res.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


export  {
    createEvent,
    getAllEvents
}