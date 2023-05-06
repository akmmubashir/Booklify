const { Team } = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupteam = async(req, res) => {
    const {
        email,
        firmname,
        employeename,
        firmaddress,
        employeeaddress,
        phone,
        alterphone,
        description,
        position,
        password,
    } = req.body;

    //encrypting password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = await Team.findOne({ email: email });

    if (data) {
        res.json({
            message: "Already Exist",
            isError: true,
        });
    } else {
        const newUser = await Team.create({
            email,
            firmname,
            employeename,
            firmaddress,
            employeeaddress,
            phone,
            alterphone,
            description,
            position,
            password: hashedPassword,
        });
        res.json({
            Message: "Account Created",
            Details: newUser,
            token: generateToken(newUser.id),
        });
    }
};
//TOKEN START

const generateToken = (id) => {
    return jwt.sign({ id }, "secretcode", { expiresIn: "1d" });
};
//TOKEN END

const loginteam = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json("Enter login data");
    } else {
        const findUser = await Team.findOne({ email: email });

        if (findUser && (await bcrypt.compare(password, findUser.password))) {
            res.json({
                email: findUser.email,
                message: "Login Success",
                token: generateToken(findUser.id),
            });
            console.log("Succesfully Logged in");
        } else {
            res.json({ message: "Wrong Credentials", isError: true });
        }
    }
};

const teamslist = async(req, res) => {
    const admin = await Team.find();
    res.json(admin);
};

module.exports = { signupteam, loginteam, teamslist };