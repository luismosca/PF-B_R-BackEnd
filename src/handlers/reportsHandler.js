const { getReportsByName, getAllReports, getReportById, createReports } = require("../controllers/reportsController");


const getReportsHandler = async (req, res) => {
    const { name, page = 0, size = 5 } = req.query;
   
    
    try {
        if (name) {
            const reportByName = await getReportsByName(name, page, size);
            reportByName ? res.status(200).json(reportByName) : res.status(400).send({message: `No se encuentra el reporte de ${name}, si no ha sido registrado, puedes hacerlo en nuestro formulario de reportes de personas`});

        } else {
            const allReports = await getAllReports(page, size);
            allReports ? res.status(200).json(allReports) : res.status(400).send({message: `Error al encontrar los reportes`});
        }
    } catch (error) {

        return res.status(500).send({error: `Error al encontrar los reportes`})

    }

}

const getReportByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await getReportById(id);
        report ? res.status(200).json(report) : res.status(400).send({error: `No se encontró el reporte con id: ${id}`});

    } catch (error) {
        return res.status(500).send({error: `Error al encontrar el reporte con id: ${id}`});
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
        reportCreated ? res.status(200).json(reportCreated) : res.status(400).send({error: `Error al crear los reportes`});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({error: `Error al crear los reportes`});
    }
}

module.exports = {
    getReportsHandler,
    getReportByIdHandler,
    postReportHandler
}