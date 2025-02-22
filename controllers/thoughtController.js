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
};

module.exports = thoughtController;
