const { getAllReportsAdmin, updateReportsAdmin } = require("../controllers/ReportsControllerAdmin")

const getAllReportsAdminHandler = async (req, res) => {
    try {
        const reports = await getAllReportsAdmin()
        if (reports) {
            return res.status(201).json(reports)
        }
        return res.status(404).send({message: "No pending reports found"})
    } catch (error) {
        return res.status(500).send({message: "Error to find reports"})
    }
};

const updateReportsAdminHandler = async (req, res) => {
    const id = req.params;
    const { status } = req.body;
    try {
        const report = await updateReportsAdmin(id, status);
        if (!report) {
            return res.status(404).json({message: "Report not found"});
        }
        return res.status(200).json(report);    
    } catch (error) {
        return res.status(500).json({message: "Error to find reports"});
    }
};

module.exports = {
    getAllReportsAdminHandler,
    updateReportsAdminHandler,
};