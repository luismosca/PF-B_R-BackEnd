const { Report, User, Comment } = require("../db");
const { Op } = require("sequelize");

const getAllReports = async (options) => {

    console.log(options);
    try {

        //count = total de registros de la busqueda, rows = registros de dicha busqueda;

        const { count, rows } = await Report.findAndCountAll(options)
        if (rows.length > 0) {
            
            return {
                total: count,
                reports: rows,
            }
        } // Traer el modelo comments junto con el reporte, para renderizarlo en el front.

    } catch (error) {
        throw error;
    }

}



const getReportById = async (id) => {
    try {
        const report = await Report.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ["name_surName"],
                },
                {
                    model: Comment,
                    attributes: ["comment"],
                    where: {
                        state: "approved",
                    },
                    required: false,
                }
            ],
        })
        console.log(report);
        if (report) {
            return report;
        } else {
            return null;

        }
    } catch (error) {
        throw error;
    }

};

const getUserReports = async (email) => {
    try {
        const userInstance = await User.findOne({
            where: {
                email: email,
            }
        });
        
        if (!userInstance) {
            return null;
        }
        
        const reports = await userInstance.getReports();
        const count = await userInstance.countReports();

        return {
            total: count,
            reports: reports
        };
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

        await reportCreated.addUser(data.user);

        return reportCreated;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getAllReports,
    getUserReports,
    getReportById,
    createReports
}