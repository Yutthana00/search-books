const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //finds user that is logged in
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne(
          { _id: context.user._id } || { username: context.user.username }
        ).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  
};

module.exports = resolvers;
