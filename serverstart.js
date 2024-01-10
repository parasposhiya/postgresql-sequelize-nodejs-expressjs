import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import MODELS, { PGDB } from './server/config/db.config.js';
import routes from './server/routes/index.route.js'

import dotenv from 'dotenv';
dotenv.config();

const { PORT, NODE_ENV, PQSQLDATABASE } = process.env;

const app = express();
const _dirname = path.resolve();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Cache-Control', `max-age=86400, no-cache, no-store`);
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(compression());
app.use(bodyParser.json({ limit: '11mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '11mb' }));
app.use(cors());

app.use('/api/', routes);

PGDB.sync({ force: true }).then(() => {
    console.log(`'${PQSQLDATABASE}' Database Connection has been established successfully.`);
    app.listen(PORT, () => {
        console.info(`Server listening on port ${PORT} - (${NODE_ENV})`);
    });
}).catch((error) => {
    console.log('Unable to connect to the database: ', error);
})

