const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(
    () => { logger.info(`Connected to ${config.MONGODB_URI}`); },
    (error) => { logger.error(error); },
  ).catch((error) => { logger.error(error); });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

module.exports = app;