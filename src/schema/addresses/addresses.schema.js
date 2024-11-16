import { logger } from "../../utils/logger.js";
import pool from "../../database/index.js";

export const createAddressTable = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS addresses(
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                title VARCHAR,
                created_at TIMESTAMPTZ,
                address_line VARCHAR,
                country VARCHAR,
                city VARCHAR,
                postal_code VARCHAR,
                phone_number VARCHAR
            )
        `);
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};
