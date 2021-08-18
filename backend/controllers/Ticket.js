const userTickets = require("../models/Ticket");
const expressAsyncHandler = require("express-async-handler");

exports.addTickets = expressAsyncHandler( async (req, res) => {

  const userID =  req.user._id ;
  const ticketName = req.body.ticketName;
  const ticketStatus = req.body.ticketNumber;
  const createdDate = req.body.ticketDate;
  const ticketDescription = req.body.ticketDescription;
  try {
    if(!userID && !ticketName && !ticketStatus && !createdDate && !ticketDescription){
      res.status(401).send({ message: "Please fill all the fields"});
    }else{
      const newTicket = new userTickets({
        ticketName: ticketName,
        isActive: ticketStatus,
        createdDate: createdDate,
        ticketDescription: ticketDescription,
        userID:userID
      });
      const createTicket = await newTicket.save();
      res.status(200).send({ message: "ticket created successfully", createTicket});
    }
   
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

exports.getTickets = async(req,res)=>{
    try {
        const allTickets = await userTickets.find({})
        res.status(200).json({ message: "ticket fetched successfully", allTickets});
      } catch (error) {
        res.status(401).send({ message: error.message });
      }
}