var express = require("express");
var router = express.Router();
const db = require("../server/dbComments");

/* GET Comments listing. */
router.get("/", async (req, res) => {
  try {
    let results = await db.allComments();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
  // res.status(200).send(CommentsJSON);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let results = await db.comment(id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.post('/', async (req, res) => {
  // on recupere le post
  // const newCommentInfo = res.json(req.body);

  // let results = await db.allComments();
  // on récupere la liste des id de tout les utilisateur dans l'ordre
  // const listId = results.map((comment) => comment.id).sort((a, b) => a - b);
  // // Ici on chope du coup le dernier id de la liste
  // const dernierId = listId[listId.length - 1];
  // on ajouter l'id pabam au nouvelle utilisateur
  const newCommentInfo = req.body;
  
  const newCommentWithId = {
    // id: dernierId + 1,
    ...newCommentInfo,
    rate: '0',
  };
  
  // On va vérifier les infos pour ajouter un utilisateur seulement si on a tout
  if (
    newCommentInfo.content &&
    newCommentInfo.content !== "" 
  ) {
    let results = await db.addComment( newCommentWithId);
    res.json(results);
  } else {
    res.status(500).send("ça sent pas bon gars");
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // on recupere le post
  const newCommentInfo = req.body;
  const comment = await db.comment(id);
  console.log(comment)

  // On va vérifier les infos pour ajouter un utilisateur seulement si on a tout
  if (newCommentInfo.content && newCommentInfo.content !== "")
  comment.content = newCommentInfo.content;
  if (newCommentInfo.rate && newCommentInfo.rate !== "")
  comment.rate = newCommentInfo.rate;

    try {
      const response = await db.updateComment(id, comment);
      res.status(200).send(response)
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteComment(id);
    res.status(200).send("y'a pu");
  } catch (e) {
    console.log(e);
    res.status(500).send("ça sent pas bon gars");
  }
});

module.exports = router