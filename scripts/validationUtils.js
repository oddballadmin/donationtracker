window.validationUtils = {};
const minPasswordLength = 8;
const maxPasswordLength = 24;
// Define functions within the shared module
window.validationUtils.isString = function(value) {
    return typeof value === 'string';
};

window.validationUtils.isNumber = function(value) {
    return typeof value === 'number';
};

window.validationUtils.isBoolean = function(value) {
    return typeof value === 'boolean';
};

window.validationUtils.isArray = function(value) {
    return Array.isArray(value);
};

window.validationUtils.isObject = function(value) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

window.validationUtils.isEmail = function(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

window.validationUtils.isURL = function(value) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value);
};

window.validationUtils.isInRange = function(value, min, max) {
    return value >= min && value <= max;
};

window.validationUtils.hasMinLength = function(value, minLength) {
    return value.length >= minLength;
};

window.validationUtils.hasMaxLength = function(value, maxLength) {
    return value.length <= maxLength;
};

// Define the original isInputValid function
window.validationUtils.isInputValid = function(email, password) {
let isValid = false;
    console.log(email);
    console.log(password)
if(validationUtils.isEmail(email) && validationUtils.isInRange(password.length,minPasswordLength,maxPasswordLength)){
    console.log("is an email");
    isValid = true;
}
else{
    isValid=false;
}

return isValid;
};
window.validationUtils.sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        input = String(input); // Convert non-string input to a string
    }

    // Remove leading and trailing white spaces
    input = input.trim();

    // Replace multiple spaces with a single space
    input = input.replace(/\s+/g, ' ');

    // Remove any HTML tags
    input = input.replace(/<[^>]*>/g, '');

    // Escape special characters to prevent XSS attacks
    input = input.replace(/[&<>"'/]/g, (char) => {
        switch (char) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#x27;';
            case "/":
                return '&#x2F;';
            default:
                return char;
        }
    });
    return input;

};
