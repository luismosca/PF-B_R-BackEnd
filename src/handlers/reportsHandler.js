const {
  getReportsByName,
  getAllReports,
  getReportById,
  createReports,
  getUserReports,
} = require('../controllers/reportsController');
const { User, Report } = require('../db');
const { Op } = require('sequelize');

const getReportsHandler = async (req, res) => {
  const { name, page = 1, size = 4, gender, age, location } = req.query;
  // generos, edad y ubicación, name

  let options = {
    limit: Number(size),
    offset: (page - 1) * Number(size),
    where: {
      status: 'approved',
    },
    include: [
      {
        model: User,
        // attributes: ["name"],
      },
    ],
    order: [], // Ordenamiento por defecto por fecha de creación descendente (Se mantiene en todos los filtros y ordenamientos adicionales)
  };
  if (name) {
    options.where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }
  if (gender) {
    options.where.gender = {
      [Op.iLike]: `${gender}`,
    };
  }
  if (age) {
    if (age === 'Youngest') {
      options.order.push(['age', 'ASC']);
    } else if (age === 'Oldest') {
      options.order.push(['age', 'DESC']);
    }
  }
  if (location) {
    options.where.location = {
      [Op.iLike]: `%${location}%`,
    };
  }
  try {
    const reports = await getAllReports(options); // por medio del objeto options enviamos todas las queries que queremos especificar en la busqueda (Filtros/Ordenamientos)

    if (!reports || reports.total === 0) {
      // el objeto options tiene la propiedad total que nos especifica la cantidad de resultados de la busqueda, entonces si la propiedad total viene vácia es porque no hubo ningún resultado en la consulta al controller, por lo tanto devolveriamos el mensaje que no se encontró el reporte con los datos especificados en la ru
      return res.status(404).json({ message: 'Report no encontrado' });
    }
    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).send({ error: `Error al encontrar los reportes` });
  }
};

const getReportByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await getReportById(id);
    report
      ? res.status(200).json(report)
      : res
          .status(400)
          .send({ error: `No se encontró el reporte con id: ${id}` });
  } catch (error) {
    return res
      .status(500)
      .send({ error: `Error al encontrar el reporte con id: ${id}` });
  }
};

const getUserReportsHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const userReports = await getUserReports(email);
    userReports
      ? res.status(200).json(userReports)
      : res
          .status(400)
          .json({ message: 'No hay reportes asociados al usuario' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const postReportHandler = async (req, res) => {
  const data = ({
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
    location,
  } = req.body);

  try {
    const reportCreated = await createReports(data);
    reportCreated
      ? res.status(200).json(reportCreated)
      : res.status(400).send({ error: `Error al crear los reportes` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: `Error al crear los reportes` });
  }
};

module.exports = {
  getReportsHandler,
  getReportByIdHandler,
  postReportHandler,
  getUserReportsHandler,
};
