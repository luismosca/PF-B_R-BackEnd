const { getReportsByName, getAllReports, getReportById, createReports } = require("../controllers/reportsController");
const { User, Report } = require("../db");
const { Op } = require("sequelize")

const getReportsHandler = async (req, res) => {
    const { name, page = 0, size = 5, gender, age, location, } = req.query; 
    // generos, edad y ubicación, name
    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size),
        where: {},
        include: [
            {
                model: User,
                // attributes: ["name"],
            },
        ],
        order: [["createdAt", "DESC"], ],  // Ordenamiento por defecto por fecha de creación descendente (Se mantiene en todos los filtros y ordenamientos adicionales)
    };
    if (name) {

        options.where.name = {

            [Op.iLike]: `%${name}%`

        }
    }
    if (gender) {
        options.where.gender = {
            [Op.iLike]: `${gender}`,
        }
    }
    if (age) {
        if (age === "Youngest") {
            options.order.push(["age", "ASC"]) 
        } else if (age === "Oldest") {
            options.order.push(["age", "DESC"]) 
        }   
    }  
    if (location) {
        options.where.location = {
            [Op.iLike]: `%${location}%`,
        }
    }
    try {

        const allReports = await getAllReports(options); // por medio del objeto options enviamos todas las queries que queremos especificar en la busqueda (Filtros/Ordenamientos)
        if (!allReports || allReports.total === 0) { // el objeto options tiene la propiedad total que nos especifica la cantidad de resultados de la busqueda, entonces si la propiedad total viene vácia es porque no hubo ningún resultado en la consulta al controller, por lo tanto devolveriamos el mensaje que no se encontró el reporte con los datos especificados en la ru
            return res.status(404).json({ message: "Report not found" });
        }

        return res.status(200).json(allReports);
    } catch (error) {

        return res.status(500).send({ error: `Error al encontrar los reportes` })

    }

}

const getReportByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await getReportById(id);
        report ? res.status(200).json(report) : res.status(400).send({ error: `No se encontró el reporte con id: ${id}` });

    } catch (error) {
        return res.status(500).send({ error: `Error al encontrar el reporte con id: ${id}` });
    }


}

const postReportHandler = async (req, res) => {
    const data = {
        name,
        description,
        image,
        age,
        gender,
        birthday_date,
        nationality,
        ethnicity,
        hair_style,
        hair_color,
        eyes_color,
        height,
        weight,
        clothes,
        particular_signs,
        court_order,
        status,
        date,
        location
    } = req.body

    try {
        const reportCreated = await createReports(data);
        reportCreated ? res.status(200).json(reportCreated) : res.status(400).send({ error: `Error al crear los reportes` });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: `Error al crear los reportes` });
    }
}

module.exports = {
    getReportsHandler,
    getReportByIdHandler,
    postReportHandler
}