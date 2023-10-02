const { postComments, getComments } = require("../controllers/CommentsController");

const postCommentsHandler = async (req, res) => {
    const data = req.body;
    console.log("COMENTARIOS:::::::::::::::::::::::::::::::::::", data);

    // Validación de datos
    if (!data.reportId || !data.userId || !data.comment) {
        return res.status(400).json({ error: "Los datos de entrada son incompletos." });
    }

    try {

        const comments = await postComments(data);
        if (comments) {
            return res.status(200).json(comments);
        }
        return res.status(400).send("Could'nt post comment");
    } catch (error) {
        return res.status(500).send("No comments found.");
    }

}

const getCommentsHandler = async (req, res) => {
    const { id } = req.query
    try {
        if (id) {
            const coment = getComments(id);
            if (coment) {
                return res.status(200).json(coment)
            }
            return res.status(400).json("No comments found.")
        }
        return res.status(404).send({ message: "No report asociated to the comment" })

    } catch (error) {
        return res.status(500).json("No comments found.", error)
    }
}

module.exports = {
    postCommentsHandler,
    getCommentsHandler
}