import logger from '../utils/logger.js';

const log = (req, res, next) =>
{
    const start = new Date();

    next()

    const durationMs = ( new Date() - start);
    logger.info(`${req.method} ${req.originalUrl}. Status: ${req.statusCode}. Duration: ${durationMs} ms`);
};

export default log;