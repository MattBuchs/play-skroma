import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    if (token || token !== undefined) {
        try {
            const decoded = jwtDecode(token);
            const userData = {
                userId: decoded.userId,
                username: decoded.username,
                isAdmin: decoded.isAdmin,
            };
            return userData;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
};

export const isTokenValid = (token) => {
    try {
        if (!token) return false;

        const decoded = jwtDecode(token);
        if (!decoded || !decoded.exp) return false;

        const currentTime = Math.floor(Date.now() / 1000); // Conversion en secondes
        return decoded.exp > currentTime; // Comparaison avec l'heure actuelle
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return false;
    }
};
