const isValidPassword = (password) => {
    const minLength = 12;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!?@#$%^&*/:;,.*€$¨<>²~"[\](){}|\\-`_°+=]/.test(
        password
    );

    return {
        passwordLength: password.length >= minLength,
        toLowercase: hasLowercase,
        toUppercase: hasUppercase,
        toDigit: hasDigit,
        toSpecialChar: hasSpecialChar,
    };
};

const passwordSecurityMiddleware = (password) => {
    const passwordValidation = isValidPassword(password);

    // check if password is valid
    const isValid = Object.values(passwordValidation).every(
        (value) => value === true
    );

    if (!isValid) {
        const errorMessages = [];

        if (!passwordValidation.passwordLength)
            errorMessages.push("characters");
        if (!passwordValidation.toLowercase) errorMessages.push("lowercase");
        if (!passwordValidation.toUppercase) errorMessages.push("uppercase");
        if (!passwordValidation.toDigit) errorMessages.push("digit");
        if (!passwordValidation.toSpecialChar)
            errorMessages.push("special character");

        return errorMessages;
    }
};

export default passwordSecurityMiddleware;
