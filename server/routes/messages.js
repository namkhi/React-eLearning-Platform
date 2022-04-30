const router = require("express").Router();
const { response } = require("express");
var db = require('../db');

//add
router.post("/", async (req, res) =>{
  
  try{
  const insert = await db.sendMessage(req.body)
    res.status(200).json(insert)
  }
  catch(err){
    res.status(500).json(err)
  }
})
// router.post("/", async (req, res) => {
//   const newMessage = new Message(req.body);

//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //get
router.get("/:conversationId", async (req, res) =>{
  const convoId = req.params.conversationId;

  try{
    const messages = await db.getMessages(convoId)
    
    res.status(200).json(messages);
  }
  catch(err){
    res.status(500).json(err)
  }
})
// router.get("/:conversationId", async (req, res) => {
//   try {
//     const messages = await Message.find({
//       conversationId: req.params.conversationId,
//     });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
