import pool from "../database/index.js";
import { config } from "dotenv";
import { logger } from "../utils/logger.js";
import { generateToken, hashPassword } from "../utils/index.js";

config();

export const getAllUsersService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM users");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createUserService = async (user) => {
  try {
    const data = await pool.query("select * from users where email = $1", [
      user.email,
    ]);

    if (data.rows[0]) {
      return "Already has!";
    }
    const queryString = `
      INSERT INTO users (
        email,
        name,
        avatar,
        username,
        birth_of_date,
        password,
        phone_number
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      RETURNING *
    `;

    const hashedPassword = await hashPassword(user.password);
    const result = await pool.query(queryString, [
      user.email,
      user.name,
      user.avatar,
      user.username,
      user.birth_of_date,
      hashedPassword,
      user.phone_number,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const loginService = async (data) => {
  try {
    const accessToken = await generateToken("access", data);
    const refreshToken = await generateToken("refresh", data);

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    console.log(error);
    logger.error(error);
    return error;
  }
};

export const findByIdService = async (id) => {
  try {
    const user = await pool.query("select * from users where id = $1", [id]);

    return user.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateUserService = async (id, data) => {
  try {
    const oldUserData = await pool.query("select * from users where id = $1", [
      id,
    ]);

    const queryString = `
      UPDATE users
      SET username = $1,
        email = $2,
        password = $3,
        phone_number = $4
      WHERE id = $5

      RETURNING *
  `;

    const hashedPassword = 0; //await hashPassword(data?.password);
    const result = await pool.query(queryString, [
      data.username || oldUserData.rows[0].username,
      data.email || oldUserData.rows[0].email,
      hashedPassword || oldUserData.rows[0].password,
      data.phone_number || oldUserData.rows[0].phone_number,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log(error);
    logger.error(error);
    return error;
  }
};

export const deleteUserService = async (id) => {
  try {
    await pool.query("delete from users where id = $1", [id]);

    return "deleted";
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};
