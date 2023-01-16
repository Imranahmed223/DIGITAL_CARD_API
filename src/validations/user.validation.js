const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({}),
};

const getUsers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
      socialLinks: Joi.object().keys({
        facebook: Joi.string().uri().optional(),
        google: Joi.string().uri().optional(),
        instagram: Joi.string().uri().optional(),
        youtube: Joi.string().optional(),
        tiktok: Joi.string().uri().optional(),
        snapchat: Joi.string().uri().optional(),
      }),
      role: Joi.string().allow().optional(),
      photoPath: Joi.string().allow().optional(),
      active: Joi.boolean().allow().optional(),
      suspend: Joi.boolean().allow().optional(),
    })
    .min(0)
    .max(9),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const deviceToken = {
  body: Joi.object()
    .keys({
      deviceToken: Joi.string().required(),
    })
    .min(1)
    .max(1),
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deviceToken,
};
