const { Op } = require("sequelize");
const { Comment, Report, User } = require("../db")

const postComments = async (data) => {
    const {reportId, userId, comment } = data
    const commentario = {
        comment: comment
    }
    try {
        const nuevoComentario = await Comment.create(data);
        // const report = await Report.findByPk(data.userId);
        // if (report) {
        //     await report.setComment(commentarios)
        // }
        // const report = await Report.findByPk(reportId);
        // await report.
        await nuevoComentario.setUser(userId)
        await nuevoComentario.setReport(reportId)

        return nuevoComentario;
    
    } catch (error) {
        console.log(error.message);
        throw error;
    }
   
}

const getComments = async (reportId) => {
    try {
        const { total, comments} = await Comment.findAndCountAll({
            where: {
                reportId: {
                    [Op.iLike]: reportId
                }
            }
        })
        if (total > 0) {
            return {total, comments};
        }
        return null    

    } catch (error) {
        throw error;
    }
}
module.exports = {postComments, getComments};