function isAdmin(req, res, next) {
    // Verificar que el usuario exista (viene del middleware authenticateToken)
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { roles } = req.user;

    // Validar existencia del campo roles
    if (!roles) {
        return res.status(403).json({ message: 'Acceso denegado. Rol no especificado.' });
    }

    // Si roles es string → convertir a array
    const rolesArray = Array.isArray(roles) ? roles : [roles];

    // Validar rol admin
    if (!rolesArray.includes('admin')) {
        return res.status(403).json({ message: 'Acceso denegado. Rol de administrador requerido.' });
    }

    next();
}

module.exports = isAdmin;
