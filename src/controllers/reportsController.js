const { Report, User } = require("../db");
const { Op } = require("sequelize");

const getAllReports = async (page, size) => {

    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size)
    }
    console.log(options);
    try {

        //count = total de registros de la busqueda, rows = registros de dicha busqueda;

        const { count, rows } = await Report.findAndCountAll(options, {
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
                },
            ],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            limit: 5, // Limita la cantidad de reportes a 5
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

const createReports = async (data) => {
    try {
        const reportCreated = await Report.create({
            name: data.name,
            description: data.description,
            image: data.image,
            age: data.age,
            gender: data.gender,
            birthday_date: data.birthday_date,
            nationality: data.nationality,
            ethnicity: data.ethnicity,
            hair_style: data.hair_style,
            hair_color: data.hair_color,
            eyes_color: data.eyes_color,
            height: data.height,
            weight: data.weight,
            clothes: data.clothes,
            particular_signs: data.particular_signs,
            court_order: data.court_order,
            status: data.status,
            date: data.date,
            location: data.location
        });
        return reportCreated;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getAllReports,
    getReportsByName,
    getReportById,
    createReports
}