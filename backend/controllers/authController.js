const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../security/passportConfig');
const connection = require('../db/connection');
require('dotenv').config();

// 🔹 Funzione per generare il token
function generateAccessToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

// 🔹 Funzione per generare il refresh token
function generateRefreshToken(user) {
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
    return refreshToken;
}

// 🔹 Login con Passport + JWT
function login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return res.status(500).json({ message: 'Errore nel login', err });
        if (!user) return res.status(401).json({ message: 'Credenziali non valide' });

        // Genera il token JWT per l'accesso
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ accessToken, refreshToken });
    })(req, res, next);
}

// 🔹 Registrazione utente
function register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e password obbligatori' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Errore nella hash della password' });

        const query = 'INSERT INTO users (email, password) VALUES (?,?)';
        connection.query(query, [email, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: 'Errore nella registrazione', err });

            res.status(201).json({ message: 'Registrazione completata!' });
        });
    });
}

// 🔹 Funzione per proteggere le rotte (verifica token JWT)
function isAuth(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) return res.status(401).json({ message: 'Token non valido' });

        req.user = user; // Aggiungi l'utente alla richiesta
        next();
    })(req, res, next);
}

// 🔹 Logout (revoca il refresh token)
function logout(req, res) {
    // Qui potresti revocare il refresh token salvato
    res.json({ message: 'Logout effettuato con successo' });
}

// 🔹 Endpoint per ottenere un nuovo access token (usando il refresh token)
function refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'Token mancante' });

    // Verifica il refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Refresh token non valido' });

        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    });
}

// 🔹 Funzione di esempio per la dashboard
function dashboard(req, res) {
    res.json({ message: `Benvenuto ${req.user.email}, questa è la tua dashboard!` });
}

module.exports = { login, register, isAuth, dashboard, refreshToken, logout };
