import bcrypt from 'bcryptjs'
import { User } from '../model/userschema.js';
import createToken from './utils/createtoken.js';
import { Conversationmodel } from '../model/Conversation.js';
import { messagemodel } from '../model/Message.js';

const createUser = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    const username = lastname ? (firstname + ' ' + lastname) : firstname;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                message: "User already exists",
                status: false,
            });
            return;
        }
        else {
            const profilePhoto = lastname ? `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}` : `https://avatar.iran.liara.run/username?username=${firstname}`
            const hashedpassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedpassword,
                profilePhoto
            });

            await newUser.save();
            createToken(res, newUser._id);

            return res.status(201).json({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePhoto: newUser.profilePhoto
            });
        }

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "User could not be created.",
            status: false,
        });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate and set the token as a cookie
        createToken(res, existingUser._id);

        return res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            profilePhoto: existingUser.profilePhoto

        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};
const logoutUser = (req, res) => {
    if (res.cookie) {
        res.cookie("Jwt", -'', { httpOnly: true, maxAge: new Date(0) });
        return res.status(201).json({ message: 'Logout Success' })
    }


}

const getAllUser = async (req, res) => {
    const id = req.params.id;
    try {
        const users = await User.find({ _id: { $ne: id } }).select('username _id profilePhoto');
        return res.status(201).json(
            users
        )

    } catch (error) {
        return res.status(401).json({ message: error.message })
    }

}
const sendMesage = async (req, res) => {

    const { senderId, message, } = req.body;
    const receiverId = req.params.id;
    try {

        // Create and save the new message
        const newMessage = new messagemodel({ senderId, receiverId, message });
        await newMessage.save();

        // Check if a conversation between these participants already exists
        let conversation = await Conversationmodel.findOne({ Participants: { $all: [senderId, receiverId] } });

        if (!conversation) {
            // If no conversation exists, create a new one and since array is not created we can use {Participants: [senderId, receiverId]} to intialize array
            conversation = new Conversationmodel({ Participants: [senderId, receiverId], Messages: [newMessage._id] });
            await conversation.save();
            console.log("New conversation created:", conversation);
        } else {
            // If conversation exists, add the new message to the Messages array
            conversation.Messages.push(newMessage._id); c
            await conversation.save();
            console.log("Message added to existing conversation:", conversation);
        }

        return res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Failed to send message" });
    }
};



export { createUser, loginUser, logoutUser, sendMesage, getAllUser }