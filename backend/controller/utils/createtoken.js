import jwt from 'jsonwebtoken';

const createToken = (res, id) => {
    try {

        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY || 'afahsjkhfskjhfsdhkfdfsdf', { expiresIn: '1d' });
        console.log(token)
        // Set the cookie if token is created
        res.cookie("Jwt", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
        return res;
    } catch (error) {
        console.error("Error creating token:", error);
    }
};

export default createToken;
