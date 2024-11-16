import { logger } from "../utils/logger.js";
import pool from "../database/index.js";

export const getAllAddressesService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM addresses");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createAddressService = async (address) => {
  try {
    const address = await pool.query("select * from addresses where id = $1", [
      ,
    ]);

    if (address) {
      return "Already has!";
    }

    const queryString = `
      INSERT INTO addresses (
        user_id,
        title,
        address_line,
        country,
        city,
        phone_number
      )
        VALUES
        (
        $1,
        $2,
        $3,
        $4
        $5,
        $6,
        )
      RETURNING *
    `;

    const result = await pool.query(queryString, [
      address.user_id,
      address.title,
      address.address_line,
      address.country,
      address.city,
      address.phone_number,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getAddressByIdService = async (id) => {
  try {
    const address = await pool.query("select * from addresses where id = $1", [
      id,
    ]);

    return address.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateAddressService = async (id, data) => {
  try {
    const oldaddressData = await pool.query(
      "select * from addresses where id = $1",
      [id]
    );

    const queryString = `
      UPDATE addresses
      SET user_id = $1,
        title = $2,
        address_line = $3,
        country = $4,
        city = $5,
        phone_number = $6
      WHERE id = $7

      RETURNING *
    `;

    const result = await pool.query(queryString, [
      address.user_id || oldaddressData.rows[0].user_id,
      address.title || oldaddressData.rows[0].title,
      address.address_line || oldaddressData.rows[0].address_line,
      address.country || oldaddressData.rows[0].country,
      address.city || oldaddressData.rows[0].city,
      address.phone_number || oldaddressData.rows[0].phone_number,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteAddressService = async (id) => {
  try {
    await pool.query("delete from addresses where id = $1", [id]);

    return "deleted";
  } catch (error) {
    logger.error(error);
    return error;
  }
};
