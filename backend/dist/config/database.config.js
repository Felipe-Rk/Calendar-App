"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const databaseConfig = () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    username: process.env.DATABASE_USERNAME || 'user',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'calendar_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map