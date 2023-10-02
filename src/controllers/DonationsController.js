const { Donation } = require("../db");
const { Op } = require("sequelize");

const getAllDonation = async () => {    
    try {
        const allDonations = await Donation.findAll()
        return allDonations
    } catch (error) {
        throw error;
    }

}



const getDonationByIdUser = async (idUser) => {
    // console.log(idUser);
    try {
        const donation = await Donation.findAll({
            where: {
                idUser: idUser
            }
        })
        return donation ;
        
    } catch (error) {
        throw error;
    }
}

const createDonation = async (data) => {
    // console.log(data);
    try {
        const donationCreated = await Donation.create({
            idUser: data.idUser,
            email: data.email,
            value: data.value,            
            
        });
        return donationCreated;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getAllDonation,    
    getDonationByIdUser,
    createDonation
}