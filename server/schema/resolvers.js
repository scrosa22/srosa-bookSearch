const User = require("../models/User");
const signToken = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }

      throw new AuthenticationError("Please log in to continue");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with that email.");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, {bookData}, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError(
        "You must be logged in to update your profile"
      );
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        "You must be logged in to update your profile"
      );
    },
  },
};

module.exports = resolvers;
