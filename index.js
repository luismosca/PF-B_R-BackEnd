const server = require('./src/app.js');
const { conn, Report } = require('./src/db.js');
const reports = require("./src/utils/Reports.js")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
})
.then(async ()=>{ 
  const reportDb = await Report.bulkCreate(reports, { ignoreDuplicates: true })
  // console.log(reportDb);
  console.log(`%s Test reports were added to the DB`);
}) // Para cargar los reportes de prueba al iniciar el servidor
