import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, required: false, unique: true , sparse: true},
    profileImage: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
