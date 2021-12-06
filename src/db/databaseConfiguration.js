// database configuration
const dbOptions = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Password123!!",
  database: process.env.DB_NAME || "company_db",
};

module.exports = {
  dbOptions,
};
