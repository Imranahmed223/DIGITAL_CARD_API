const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const config = require("../config/config");
const QRCode = require("qrcode");
const { User } = require("../models");
const Jimp = require("jimp");
const fs = require("fs");
const qrCodeReader = require("qrcode-reader");
const createUser = catchAsync(async (req, res) => {
  let body = req.body;
  if (req.file) createBody.photoPath = req.file.filename;
  const user = await userService.createUser(body);
  user.photoPath = `${config.rootPath}${user.photoPath}`;
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["firstName", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options, req.user.id);
  for (let i = 0; i < result.results.length; i++) {
    result.results[
      i
    ].photoPath = `${config.rootPath}${result.results[i].photoPath}`;
  }
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  user.photoPath = `${config.rootPath}${user.photoPath}`;
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  let updateUserBody = req.body;
  if (req.file) updateUserBody.photoPath = req.file.filename;
  const user = await userService.updateUserById(updateUserBody, req.user.id);
  user.photoPath = config.rootPath + user.photoPath;
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  const response = await userService.deleteUserById(
    req.params.userId,
    req.user.id
  );
  res.status(httpStatus.OK).send(response);
});

const addUserDeviceToken = catchAsync(async (req, res) => {
  console.log(String(req.user.id));
  const user = await userService.getUserById(String(req.user.id));
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  user.deviceToken.push(req.body.deviceToken);
  user.deviceToken = [...new Set([...user.deviceToken])];
  await user.save();
  return res.status(httpStatus.NO_CONTENT).send();
});

const removeUserDeviceToken = catchAsync(async (req, res) => {
  console.log(req.user);
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  const index = user.deviceToken.indexOf(req.body.deviceToken);
  if (index == -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No device token found");
  }
  user.deviceToken.splice(index, 1);
  await user.save();
  return res.status(httpStatus.NO_CONTENT).send();
});

const generateQRCode = catchAsync(async (req, res) => {
  const { user } = req;
  const timestamp = Date();
  QRCode.toFile(
    `public/uploads/qr-${timestamp}.png`,
    user.id,
    {
      errorCorrectionLevel: "H",
      type: "png",
    },
    function (err) {
      if (err)
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Something went wrong, please try again!"
        );
      res.send({ qrPath: config.rootPath + `qr-${timestamp}.png` });
    }
  );
});

const readQRCode = catchAsync(async (req, res) => {
  const { qrPath } = req.body;
  let path = qrPath.split("/");
  const buffer = fs.readFileSync(`public/uploads/${path[path.length - 1]}`);
  Jimp.read(buffer, function (err, image) {
    if (err) {
      console.error(err);
    }
    const qrCodeInstance = new qrCodeReader();
    qrCodeInstance.callback = function (err, value) {
      if (err) {
        console.error(err);
      }
      console.log(value.result);
      res.send(value.result);
    };
    qrCodeInstance.decode(image.bitmap);
  });
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUserDeviceToken,
  removeUserDeviceToken,
  generateQRCode,
  readQRCode,
};
