import {
  createAddressService,
  deleteAddressService,
  getAllAddressesService,
  updateAddressService,
} from "../services/address.service.js";
import { logger } from "../utils/logger.js";

export async function getAllAddresss(req, res, next) {
  try {
    const allAddresses = await getAllAddressesService();

    console.log(allAddresses);
    res.send(allAddresses);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function getOneAddressById(req, res, next) {
  try {
    const id = req.params.id;

    const Address = await getOneAddressById(id);

    res.send(Address);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function createAddress(req, res, next) {
  try {
    const Address = req.body;

    const data = await createAddressService({
      Addressname: Address.Addressname,
      email: Address.email,
      password: Address.password,
      phone_number: Address.phone_number,
    });

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function updateAddress(req, res, next) {
  try {
    const addressData = {
      user_id: req.body.user_id,
      title: req.body.title,
      address_line: req.body.addfress_line,
      country: req.body.country,
      city: req.body.city,
      phone_number: req.body.phone_number,
    };

    const data = await updateAddressService(req.params?.id, addressData);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function deleteAddress(req, res, next) {
  try {
    const data = await deleteAddressService(req.params?.id);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
