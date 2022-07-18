const { validate } = require("./validator.js");

(function main() {

    for (let i = 2; i < process.argv.length; i++) {
        validate(process.argv[i]);
    }

}()); 