import Event from '../models/eventsModel.js';
import Team from '../models/teamModel.js';

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

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Getting event by ID:', id);
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch event',
      error: error.message 
    });
  }
};

const joinEvent = async(req,res)=>{
  try{
    const { id } = req.params;
    const {teamId} = req.body;

    console.log('Joining event ID:', id, 'with team ID:', teamId);
    if(!id)return  res.status(400).json({success:false,message:'Event ID is required'});
    if(!teamId)return  res.status(400).json({success:false,message:'Team ID is required'});

    const event = await Event.findById(id);
    if(!event) return res.status(404).json({success:false,message:'Event not found'});
    if(event.isFull) return res.status(400).json({success:false,message:'Event is full'});
    if(!event.isRegistrationOpen) return res.status(400).json({success:false,message:'Registration is closed for this event'});
    if(event.isOngoing) return res.status(400).json({success:false,message:'Event is already started'});
    if(event.isFinished) return res.status(400).json({success:false,message:'Event is already finished'});

    //check if team is already joined
    const team = await Team.findById(teamId);
    if(!team) return res.status(404).json({success:false,message:'Team not found'});

    if(event.participants.includes(teamId)){
      return res.status(400).json({success:false,message:'Team already joined this event'});
    }
    event.participants.push(teamId);
    await event.save();

    res.json({success:true,message:'Team successfully joined the event',eventParticipents:event.participants});
  }catch(error){
    console.error('Error joining event:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}

export  {
    createEvent,
    getAllEvents,
    joinEvent
}