import User from "../models/user.models.js";

export const getUsersForSideBar = async (req, res) => {
  try {
   
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

    res.status(200).json(filteredUsers);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
