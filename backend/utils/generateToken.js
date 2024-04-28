import Jwt from "jsonwebtoken"; // Importing the JWT library.

// Function to generate JWT and set it as a cookie.
const generateTokenAndSetCookie = (userId, res) => {
    // Generating JWT with userId payload and JWT_SECRET from environment variables.
    const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d" // Token expiration set to 15 days.
    });

    // Setting JWT as a cookie in the response.
    res.cookie("jwt", token, {
        httpOnly: true, // Preventing XSS attacks (cross-site scripting attacks).
        maxAge: 15 * 24 * 60 * 60 * 1000, // Setting cookie expiration to 15 days in milliseconds.
        sameSite: "strict", // Ensuring cookie is sent only in first-party context.
        secure: process.env.NODE_ENV !== "development" // Setting secure flag based on environment.
    });
};

export default generateTokenAndSetCookie; // Exporting the function for use in other parts of the application.
