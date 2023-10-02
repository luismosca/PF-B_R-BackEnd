const server = require('./src/app.js');
const { conn, Report, User } = require('./src/db.js');
const reports = require("./src/utils/Reports.js")

// Syncing all the models at once.
conn.sync({ force: true}).then( async() => {

  const reportDb = await Report.bulkCreate(reports, { ignoreDuplicates: true })
  // console.log(reportDb);
  const user = {
    id : "a2210d45-a5c0-4204-8ef0-10889db8c19c",
    name_surName: "Example User",
    email: "exampleemail@gmail.com",
    password: "Example123",
    image: "https://this-person-does-not-exist.com/img/avatar-gen35841888b862593f28a0cc941ba6b563.jpg",
    role: 'admin',
  }
  const createdUser = User.create(user)
  for (const report of reportDb) {
    await report.addUser(user.id);
  }
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });

  console.log(`%s Test reports were added to the DB`);
}) // Para cargar los reportes de prueba al iniciar el servidor
