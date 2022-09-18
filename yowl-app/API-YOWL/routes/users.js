var express = require("express");
var router = express.Router();
const bcrypt =  require('bcrypt')
const db = require("../server/dbUsers");

function setHash (password) {
  const saltRounds = bcrypt.genSaltSync(12);
  const hashPass = bcrypt.hashSync(password, saltRounds)
  return hashPass
}

function compareHash(password, hashed){
  return bcrypt.compareSync(password, hashed)
}
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    let results = await db.allUsers();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  // res.status(200).send(usersJSON);
});

// // Récupérer 1 utilisateur
router.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let results = await db.user(id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res, next) => {


  // on ajouter l'id pabam au nouvelle utilisateur
  const newUserInfo = req.body;
  const hashPass = setHash(newUserInfo.password)
  
  newUserInfo.password = hashPass
  const newUserWithId = {
    ...newUserInfo,
    profile_image: ''
  };
  const saltRounds = 10;
  console.log(newUserWithId)
  const hash = setHash(newUserInfo.password)
  console.log(hash)

  
  // On va vérifier les infos pour ajouter un utilisateur seulement si on a tout
  if (
    newUserInfo.username &&
    newUserInfo.username !== "" &&
    newUserInfo.email &&
    newUserInfo.email !== "" &&
    newUserInfo.password &&
    newUserInfo.password !== ""
  ) {
    let results = await db.addUser( newUserWithId);
    console.log(results.data)
    res.json(results);
  } else {
    res.status(500).send("ça sent pas bon gars");
  }
});

router.post("/login", async (req, res) => {
  // on ajouter l'id pabam au nouvelle utilisateur
  const userInfo = req.body;
  console.log(userInfo)
  // On va vérifier les infos pour ajouter un utilisateur seulement si on a tout
  if (
    userInfo.username &&
    userInfo.username !== "" &&
    userInfo.password &&
    userInfo.password !== ""
  ) {
    let results = await db.allUsers();
    results.forEach(result => {
      if(compareHash(userInfo.password, result.password) && userInfo.username === result.username){
        console.log(result.password)
        res.status(200).json(result);
      }
    });
  } else {
    res.status(500).send("ça sent pas bon gars");
  }
});




router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  // on recupere le post
  const newUserInfo = req.body;
  const user = await db.user(id)

  // On va vérifier les infos pour ajouter un utilisateur seulement si on a tout
  if (newUserInfo.username && newUserInfo.username !== "")
  user.username = newUserInfo.username;
  if (newUserInfo.email && newUserInfo.email !== "")
  user.email = newUserInfo.email;
  if (newUserInfo.password && newUserInfo.password !== "")
  user.password = newUserInfo.password;
  if (newUserInfo.profile_image && newUserInfo.profile_image !== "")
  user.profile_image = newUserInfo.profile_image;
  
  res.send(user)
    try {
      const response = await db.updateUser(id, user);
      console.log(response)
      res.sendStatus(200).send('ta bien upload mon pti pote')
    } catch (e) {
      console.log(e);
      res.sendStatus(500).send("ça sent pas bon gars");
    }
  
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.deleteUser(id);
    res.sendStatus(200).send("y'a pu");
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send("ça sent pas bon gars");
  }
});

module.exports = router;
