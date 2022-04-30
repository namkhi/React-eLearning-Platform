const { application } = require('express');
var express = require('express');
const { restart } = require('nodemon');
var router = express.Router();
var db = require('../db');



/* GET index page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Scholar Village' });
// });

// /* GET register page. */
// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'Scholar Village' });
// });

router.get('/getAll', async (req, res) => {
  try{
    const users = await db.getAllUsers()
    res.status(200).json(users)
  }
  catch(err){
    res.status(500).json(err);
  }
})

router.get('/id/:id', async (req, res) =>{
  const id = req.params.id;
  
  try{
    const user = await db.getOneWithId(id);
    res.status(200).json(user);
  }
  catch(err){
    res.status(500).json(err);
  }
})

router.get('/:username', async (req, res)=>{
  const username = req.params.username; 
  try{
    const users = await db.getOne(username)
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).json(err);
  }
})

router.post('/register', async function(req, res) {
  var { firstName, lastName, email, username, password, register } = req.body;

  if (register) {
    var code = Math.floor(Math.random() * 999999);  // Generate a random code from 000000 to 999999
    await db.register(firstName, lastName, email, username, password, "False", code);
    await db.sendEmail(email, code);
    res.json({response: "ok"});
  }
});

router.post('/verify', async function(req, res) {
  var { email, code, verify, resend } = req.body;
  if (verify) {
    await db.verifyAccount(email, code);
    res.redirect('/verifySuccess');
  }

  if (resend) {
    db.resendCode(email);
    res.redirect('/verify');
  }
});

router.post('/profileMod', async function(req,res) {
  var { oldPassword, newPassword, confirmPassword, modify } = req.body;
  var username = req.session.username;
  if (modify) {
    await db.modify(username, oldPassword, newPassword, confirmPassword);
    res.json({response: "ok"})
  }
});

// /* GET registerSuccess page. */
// router.get('/registerSuccess', function(req, res, next) {
//   res.render('registerSuccess', { title: 'Scholar Village' });
// });

/* GET login page. */
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Scholar Village' });
// });

router.post('/', async function(req, res) {
  var { username, password, login} = req.body;
  if (login) {

    const user = await db.login(username, password);
    req.session.username = username;
    // res.redirect('/home');
    res.json(user);
  }
});

function ensureLoggedIn(req, res, next) {
  if (!req.session.username) {
    res.redirect('/');
  } else {
    next();
  }
}

router.use(ensureLoggedIn);

// router.get('/findAllSessions', function(req, res, next) {
//   if (req.session.)
// })

/* GET home page. */
// router.get('/home', function(req, res, next) {
//   var { username } = req.session;
//   res.render('home', { title: 'Scholar Village', username });
// });

/*
router.post('/home', async function(req, res) {
  var { logout } = req.body;
  if (logout) {
    req.session.username = '';
    res.redirect('/');
  }
});
*/

router.post('/logout', async function(req,res) {
  req.session.username = '';
  res.redirect('/');
})

module.exports = router;