const { Router } = require("express");
const { emailHandler } = require("../handlers/emailHandler");
const { getDonationsHandler, getDonationByIdUserHandler } = require("../handlers/DonationsHandler");
const { postDonationHandler} = require("../handlers/DonationsHandler");

const donationsRouter = Router();

donationsRouter.post("/sendEmail", emailHandler );
donationsRouter.post("/", postDonationHandler );
donationsRouter.get("/", getDonationsHandler );
donationsRouter.get("/:idUser", getDonationByIdUserHandler );

module.exports = donationsRouter;