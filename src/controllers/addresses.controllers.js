import { logger } from "../utils/index.js";
import {
  getAllAddressesService,
  getAddressByIdService,
  createAddressService,
  updateAddressService,
  deleteAddressService,
} from "../services/index.js";

export async function getAllAddressesCon(req, res, next) {
  try {
    const allAddresses = await getAllAddressesService();

    console.log(allAddresses);
    res.send(allAddresses);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function getOneAddressByIdCon(req, res, next) {
  try {
    const id = req.params.id;

    const address = await getAddressByIdService(id);

    res.send(address);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function createAddressCon(req, res, next) {
  try {
    const address = req.body;

    const data = await createAddressService({
      user_id: address.user_id,
      title: address.title,
      address_line: address.address_line,
      country: address.country,
      city: address.city,
      postal_code: address.postal_code,
      phone_number: address.phone_number,
    });

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function updateAddressCon(req, res, next) {
  try {
    const address = req.body;

    const data = await updateAddressService(req.params?.id, {
      user_id: address?.user_id,
      title: address?.title,
      address_line: address?.address_line,
      country: address?.country,
      city: address?.city,
      postal_code: address?.postal_code,
      phone_number: address?.phone_number,
    });

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function deleteAddressCon(req, res, next) {
  try {
    const data = await deleteAddressService(req.params?.id);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
