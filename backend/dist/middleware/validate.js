"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = validateInput;
function validateInput(result, c) {
    if (!result.success) {
        let message = "";
        result?.error.issues.forEach((input) => {
            message += `Input of ${input.path[0]} ${input.message.toLowerCase()}. `;
        });
        return c.json({ error: message }, 404);
    }
}
