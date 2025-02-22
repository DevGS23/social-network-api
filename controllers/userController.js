const { User, Thought } = require('../models');

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
                .populate({
                    path: 'thoughts',
                    select: '-__v',
                })
                .populate({
                    path: 'friends',
                    select: '-__v',
                })
                .select('-__v');

            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Get one user by id
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate({
                    path: 'thoughts',
                    select: '-__v',
                })
                .populate({
                    path: 'friends',
                    select: '-__v',
                })
                .select('-__v');

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Delete a user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.userId);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this id!' });
            }

            // BONUS: Remove user's thoughts
            await Thought.deleteMany({ username: user.username });

            await User.findByIdAndDelete(req.params.userId);

            res.json({
                message: 'User and associated thoughts deleted successfully!',
            });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
