const { Report, User } = require("../db");
const { Op } = require("sequelize");

const getAllReports = async () => {
    try {
        const reports = await Report.findAll({
            order: [["createdAt", "DESC"]] // Ordenar por fecha de creación en orden descendente, (Para tener los reportes más recientes como principales en la Home)
        })
        if (!reports.length) {
            return null;
        } else {
            return reports;
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