import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.16nCki_lmFTArVKtj1Gs_QHaHY?w=215&h=214&c=7&r=0&o=5&dpr=1.25&pid=1.7",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userModel);
export default Users;