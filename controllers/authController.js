const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(params = {}) {
	return jwt.sign(params, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
}

const createSendToken = (user, statusCode, res) => {
	const token = generateToken(user._id);

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		secure: true,
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);
	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user: user,
		},
	});
};

exports.register = async (req, res) => {
	const { name, email, password, passwordConfirm } = req.body

	if (password !== passwordConfirm) {
		return res.status(400).send({ error: "Confirmação de senha inválida" });
	}

	if (password.length < 6) {
		return res.status(400).send({ error: "Senha deve conter no mínimo de 6 digitos" });
	}

	const userEmail = await User.findOne({ email: req.body.email });
	if (userEmail) {
		return res.status(400).send({ error: `Email ${email} já cadastrado` });
	}

	let user;
	user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	user.password = undefined;

	res.status(201).json({
		status: "success",
		data: user,
		token: generateToken({ id: user.id }),
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send({ error: "Informe seu email e senha" });
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).send({ error: "Seu email ou senha estão incorretos" });
	}

	user.password = undefined;

	res.status(200).json({
		status: "success",
		data: user,
		token: generateToken({ id: user.id }),
	});
};

exports.protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) return res.status(401).send({ error: "Token não informado" });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).send({ error: "Token inválido" });
		req.userId = decoded.id;
	});

	next();
};