import user from "../models/user.js";

//Controller for user dashboard. For now, not much is available to each user type. Will expand later.
export const getDashboard = async (req, res) => {
  try {
    const user = req.user; 

    const baseDashboard = {
      message: `Welcome, ${user.firstName}!`,
      accountTypeId: user.accountTypeId,
      email: user.email,
    };

    // Admin dashboard stuff
    if (user.accountTypeId === 1) {
      return res.json({
        ...baseDashboard,
        role: "Admin"});
    }

    // Editor dashboard stuff
    if (user.accountTypeId === 2) {
      return res.json({
        ...baseDashboard,
        role: "Editor"});
    }

    // User dashboard
    return res.json({
      ...baseDashboard,
      role: "User"});

  } catch (err) {
    res.status(500).json({ error: "Dashboard error" });
  }
};

// Grab all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Add a new user
export const createUser = async (req, res) => {
  try {
    const { userId, accountTypeId, firstName, lastName, email, password } = req.body;

    //check to see if the userId is already in use.
    const userIdExists = await user.findOne({ userId });
    if (userIdExists) {
      return res.status(400).json({error: "UserId already in use"});
    }
    //check to see if the email is already in use.
    const userEmailExists = await user.findOne({ email });
    if (userEmailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = await user.create({
      userId,
      accountTypeId,
      firstName,
      lastName,
      email,
      password // (Consider hashing later!)
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// UPDATE a user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userId: Number(userId) },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// DELETE a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.findOneAndDelete({ userId: Number(userId) });

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};