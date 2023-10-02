const {Report} = require("../../db")

const getAllReportsAdmin = async () => {
    try {
        const { count, rows } = await Report.findAndCountAll({
            where: {
                status: "pending",
            }
        });
    
        return {
            total: count,
            reports: rows,
        }
    } catch (error) {
        throw error;
    }
    
}

const updateReportsAdmin = async (id, status) => {
    console.log(id, status);
    // status: "pending" y "approved"
    const reportId = id.id // ya que el id se recibe en un objeto que tiene la propiedad id
    try {
        
        if (status === "approved" || status === "refused") {
            const report = await Report.findByPk(reportId)
            
            if (report) {
                report.status = status;
                await report.save();
                return report;
            }
            return null;
        }
        
    } catch (error) {
        
        console.error('Error al actualizar el comentario:', error);
        throw error;
    }
}

module.exports = {
    getAllReportsAdmin,
    updateReportsAdmin,
}