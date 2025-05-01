const User = require("../models/models");

async function handleGetAllUser(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "Success" });
}

async function handleCreateUserById(req, res) {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.gender ||
      !body.job_title ||
      !body.email
    ) {
      return res.status(400).json({ msg: "All fields are requried" });
    }
    const result=await User.create({
      firstName:body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle:body.job_title,
  
    });
    return res.status(201).json({msg:"success",id:result._id});
  }
module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
};
