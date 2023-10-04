const {
  getAllComments,
  updateComments,
} = require('../controllers/CommentsAdmin');

const getAllCommentsHandler = async (req, res) => {
  try {
    const comments = await getAllComments();
    if (comments) {
      return res.status(201).json(comments);
    }
    return res.status(404).send({ message: 'No se encontraron comentarios' });
  } catch (error) {
    return res.status(500).send({ message: 'Error al encontrar comentarios' });
  }
};

const updateCommentsHandler = async (req, res) => {
  const id = req.params;
  const { state } = req.body;
  try {
    const comment = await updateComments(id, state);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllCommentsHandler,
  updateCommentsHandler,
};
