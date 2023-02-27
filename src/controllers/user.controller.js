const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const config = require("../config/config");
const { Profile } = require("../models");
const { default: mongoose } = require("mongoose");
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
  const link = config.qrLink + user.id;
  res.json({ link });
});

const readQRCode = catchAsync(async (req, res) => {
  const { id } = req.body;
  const profile = await Profile.findOne({ user: mongoose.Types.ObjectId(id) });
  profile.photoPath = profile.photoPath.toString();
  profile.photoPath = config.rootPath + profile.photoPath;
  profile.coverImage = config.rootPath + profile.coverImage;
  for (var i = 0; i < profile.links.length; i++) {
    profile.links[i].photoPath = config.rootPath + profile.links[i].photoPath;
  }
  for (var i = 0; i < profile.events.length; i++) {
    profile.events[i].images = profile.events[i].images.map(
      (file) => (file = config.rootPath + file)
    );
  }
  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, "No profile found!");
  res.send(profile);
  res.send({ profile });
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
