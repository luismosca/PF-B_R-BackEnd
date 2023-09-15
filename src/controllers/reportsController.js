const { Report, User } = require("../db");
const { Op } = require("sequelize");

const getAllReports = async (page, size) => {

    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size)
    }
    try {

        //count = total de registros de la busqueda, rows = registros de dicha busqueda;

        const { count, rows } = await Report.findAndCountAll({
            order: [["createdAt", "DESC"]] // Ordenar por fecha de creación en orden descendente, (Para tener los reportes más recientes como principales en la Home)
        })
        return {
            total: count,
            reporst: rows,
        }

    } catch (error) {
        throw error;
    }

}

const getReportsByName = async (name) => {
    console.log(name);
    try {
        const report = await Report.findAll({
            include: [
                {
                    model: User,
                    attibutes: ["name"],
                    where: {
                        name: {
                            [Op.iLike]: `%${name}%`
                        }
                    },
                },
            ],
            limit: 15, // Limita la cantidad de reportes a 20
        })
        if (report) {
            return report;
            // } else {
            //     return null;
        }

    } catch (error) {
        throw error;
    }
};

const getReportById = async (id) => {
    console.log(id);
    try {
        const report = await Report.findByPk(id, {
            include: [
                {
                    model: User,
                    attibutes: ["name"],
                },
            ],
        })
        if (report) {
            return report;
        } else {
            return null;

        }
    } catch (error) {
        throw error;
    }

}

// const createReports = async (data) => {
//     const { name, description, height, }
// }



module.exports = {
    getAllReports,
    getReportsByName,
    getReportById,
}