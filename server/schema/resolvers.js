import AuthenticationError from "apollo-server-express";
import User from "../models/User";
import signToken from "../utils/auth";

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById({ 
            _id: context.user._id 
        })
          .select("-__v -password")
          .populate("books");
        return userData;
      }

      throw new AuthenticationError("Please log in to continue");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
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
    saveBook: async (parent, bookData, context) => {
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
    removeBook: async (parent, bookId, context) => {
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