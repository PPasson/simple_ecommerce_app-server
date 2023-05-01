export default () => ({

    /**
     * config general
     */
    isProduction: process.env.NODE_ENV && process.env.NODE_ENV.toLocaleUpperCase() === 'PRODUCTION' || false,
    port: parseInt(process.env.PORT) || 3000,
    prefixApi: process.env.PREFIX_API || 'api',
    nodeEnv: process.env.NODE_ENV || 'dev',

    /**
     * config basic auth
     */
    basicUsername: process.env.BASIC_USER || 'admin',
    basicPassword: process.env.BASIC_PASS || 'secretP@ss',

    /* Auth */
    saltRound: parseInt(process.env.SALT_ROUND) || 10,
    secretKey: process.env.SECRET_KEY || 'SecretKey',

})