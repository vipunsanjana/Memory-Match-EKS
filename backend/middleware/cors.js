const cors = require('cors');

const corsOptions = {
  origin: '*', // Allow all origins
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
