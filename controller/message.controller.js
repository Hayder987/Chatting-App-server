import Conversation from "../models/converSation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    
    const newMessage = new Message({
     senderId,
     receiverId,
     message
    })

    if(newMessage){
     conversation.messages.push(newMessage._id)
    }

//     socket.io will added here

//     await conversation.save();
//     await newMessage.save();
    
// this will run parallel
    await Promise.all([conversation.save(), newMessage.save()])

    res.status(201).json(newMessage);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res)=>{
   try{
     const userToChatId = req.params.id;
     const senderId = req.user._id;

     const conversation = await Conversation.findOne({
          participants: { $all: [senderId, userToChatId] },   
     }).populate('messages');

     res.status(200).json(conversation.messages)
    
   }
   catch(err){
     console.log(err.message);
     res.status(500).json({ error: "internal server error" })
   }
}
