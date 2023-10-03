const { Comment } = require("../../db")

const getAllComments = async () => {
    try {
        const { count, rows } = await Comment.findAndCountAll({
            where: {
                state: "pending"
            }
        });
        console.log(count);
        if (count > 0) {

            return {
                total: count,
                comments: rows
            }
        }
    } catch (error) {

        throw error;
    }
}


const updateComments = async (id, state) => {
    console.log(id, state);
    const commentId = id.id // ya que el id se recibe en un objeto que tiene la propiedad id
    try {
        const comment = await Comment.findByPk(commentId)
        
        if (comment) {
            comment.state = state;
            await comment.save();
            return comment;
        }
    } catch (error) {
        console.error('Error al actualizar el comentario:', error);
        throw error;
    }
}
  // Otra manera de hacerlo   
// sequelize.transaction(async (t) => {
//     try {
//       const [updatedRows] = await Comment.update(
//         { status: nuevoEstado },
//         {
//           where: { id: commentId },
//           transaction: t,
//         }
//       );
  
//       if (updatedRows > 0) {
//         console.log(`Se actualizó el estado del comentario con ID ${commentId} a "${nuevoEstado}"`);
//       } else {
//         console.log(`No se encontró el comentario con ID ${commentId}`);
//       }
  
//       // Realiza el commit de la transacción
//       await t.commit();
//     } catch (error) {
//       console.error('Error al actualizar el estado del comentario:', error);
  
//       // Realiza un rollback de la transacción en caso de error
//       await t.rollback();
//     }
//   });
//   En este ejemplo, hemos utilizado una transacción Sequelize para asegurarnos de que la actualización se realice de manera segura y, en caso de un error, se realice un rollback para deshacer los cambios.
  
//   Asegúrate de reemplazar Comment con el modelo Sequelize adecuado y ajustar la variable commentId y nuevoEstado según tus necesidades.
  
  
  
  
  
  



module.exports = {
    getAllComments,
    updateComments,
}