const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../../domain/errors');

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        // Buscar usuario por email
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Invalid credentials');
        }

        // Validar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid credentials');
        }

        // Extraer nombres de roles (evita mostrar IDs)
        const roles = user.roles.map(role => {
            if (typeof role === 'string') return role; // si ya es nombre
            return role.name; // si es objeto Role
        });

        // Payload para JWT
        const payload = { 
            id: user.id, 
            roles: roles
        };
        
        // Firmar JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Devolver token y datos del usuario
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: roles
            }
        };
    }
}

module.exports = AuthService;
