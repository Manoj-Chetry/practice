var express = require('express');
var router = express.Router();

const userModel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.bane = true;
  res.cookie("age", 25)
  res.render('index', { title: 'Express' });
});
router.get('/unban', function(req, res, next) {
  req.session.destroy(function(err){
    if(err) throw err;
    res.send("Unbanned check");
  })
});

router.get('/readcookie', function(req, res){
  console.log(req.cookies);
  res.send("Cookie")
});
router.get('/dcookie', function(req, res){
  res.clearCookie("age");
  res.send("Cookie deleted")
});

router.get("/check", function(req,res){
  console.log(req.session.bane);
  if(req.session.bane===true){
    res.send("banned");
  }else{
    res.send("not banned");
  }
});

router.get('/create', async function(req, res, next) {
  const created = await userModel.create({
    username: "Manoj",
    name: "Manoj Chetry",
    age: 25
  });
  res.send(created);
});

router.get('/allusers', async function(req, res){
  let showusers = await userModel.find();
  res.send(showusers);
});
router.get('/oneusers', async function(req, res){
  let xyz = await userModel.findOne({username: "Manoj"});
  res.send(xyz);
});


router.get("/delete", async function(req,res){
  const del = await userModel.findOneAndDelete({
    name: "Manoj Chetry"
  })
  res.send(del);
})


module.exports = router;
