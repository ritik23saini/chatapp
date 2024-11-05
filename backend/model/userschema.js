import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String }
}, { timestamps: true });

/* userSchema.pre('save', function (next) {
    const [firstname, lastname] = this.username.split(" ");
    this.profilePhoto = lastname ? `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}` : `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`;
    next();
}); */

export const User = mongoose.model("User", userSchema)
