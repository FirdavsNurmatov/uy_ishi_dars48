import { logger } from "../utils/logger.js";
import {
  createUserService,
  deleteUserService,
  findByIdService,
  getAllUsersService,
  loginService,
  updateUserService,
} from "../services/user.service.js";

export async function getAllUsers(req, res, next) {
  try {
    const allUsers = await getAllUsersService();

    res.send(allUsers);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function getOneUserById(req, res, next) {
  try {
    const id = req.params.id;

    const user = await findByIdService(id);

    res.send(user);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function createUser(req, res, next) {
  try {
    const user = req.body;

    const data = await createUserService({
      username: user.username,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
    });

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function loginUserController(req, res, next) {
  try {
    const userData = {
      email: req.body?.email,
      username: req.body?.username,
    };

    const result = await loginService(userData);

    res.send(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = {
      email: req.body?.email,
      username: req.body?.username,
      password: req.body?.password,
      phone_number: req.body?.phone_number,
    };

    const data = await updateUserService(req.params?.id, user);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function deleteUser(req, res, next) {
  try {
    const data = await deleteUserService(req.params?.id);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
