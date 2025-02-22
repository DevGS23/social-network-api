const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Get single thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            // Add the thought to the user's thoughts array
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;
