const { getAllDonation, getDonationByIdUser, createDonation,} = require("../controllers/DonationsController");
const { Donation } = require("../db");
const { Op } = require("sequelize")

const getDonationsHandler = async (req, res) => {
        
    try {

        const donations = await getAllDonation();
        
        donations ? res.status(200).json(donations) : res.status(400).send({ error: `No se encontró las donaciones` });

    } catch (error) {
        return res.status(500).send({ error: `Error al encontrar las donaciones` })
    }

}

const getDonationByIdUserHandler = async (req, res) => {
    const { idUser } = req.params;

    try {
        const donations = await getDonationByIdUser(idUser);
        donations ? res.status(200).json(donations) : res.status(400).send({ error: `No se encontró la donacion con idUser: ${idUser}` });

    } catch (error) {
        return res.status(500).send({ error: `Error al encontrar la donacion con id: ${idUser}` });
    }


}

const postDonationHandler = async (req, res) => {
    const data = {
        idUser,
        email,
        value,        
    } = req.body

    try {
        const dontaionCreated = await createDonation(data);
        dontaionCreated ? res.status(200).json(dontaionCreated) : res.status(400).send({ error: `Error al crear la Donacion` });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: `Error al crear las donaciones` });
    }
}

module.exports = {
    getDonationsHandler,
    getDonationByIdUserHandler,
    postDonationHandler
}