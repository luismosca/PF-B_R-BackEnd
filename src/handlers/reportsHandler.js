const { getReportsByName, getAllReports, getReportById } = require("../controllers/reportsController");


const getReportsHandler = async (req, res) => {
    const { name } = req.query;

    try {
        if (name) {
            const reportByName = await getReportsByName(name);
            reportByName ? res.status(200).json(reportByName) : res.status(400).send({message: `No se encuentra el reporte de ${name}, si no ha sido registrado, puedes hacerlo en nuestro formulario de reportes de personas`});

        } else {
            const allReports = await getAllReports();
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
        return res.status(500).send({error: `Error al encontrar el reporte con id: ${id}`})
    }


}

module.exports = {
    getReportsHandler,
    getReportByIdHandler,
}