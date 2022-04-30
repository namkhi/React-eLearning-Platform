const router = require("express").Router();
var db = require('../db');

//new conv

router.post("/newConvo", async (req, res) => {

  const{ senderId, receiverId} = req.body;
  console.log(senderId);
  console.log(receiverId);
  const members = [senderId,receiverId];
  console.log(members);
  try{
    await db.newConvo(members);
    res.status(200).json({response: "A new conversation has been added"});
  }
  catch(err){
    res.status(500).json(err);
  }
  
});

//get conv of a user
  router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
      const convos = await db.getConvo(userId);
      res.status(200).json(convos);
    }
    catch(err){
      res.status(500).json(err);
    }
  })
// router.get("/:userId", async (req, res) => {
//   try {
//     const conversation = await Conversation.find({
//       members: { $in: [req.params.userId] },
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async(req, res) => {
  const firstUser = req.params.firstUserId;
  const secondUser = req.params.secondUserId;
  try{
    const convo = await db.getSpecificConvo(firstUser, secondUser);
    res.status(200).json(convo);
  }
  catch(err){
    res.status(500).json(err);
  }
})

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
