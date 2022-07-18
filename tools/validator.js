const { CheckGeneralRules } = require("./rules/general");
const { CheckType } = require('./rules/types');
const { CheckFunctions } = require('./rules/functions');


const fs = require("fs");

module.exports.validate = function (fileName) {
    const schemaText = fs.readFileSync(fileName, "utf8");
    const textWithoutComments = getTextWithoutComments(schemaText);
    const cleanScheme = getTextWithoutBlankLines(textWithoutComments);
    const { types, functions } = exec(cleanScheme);

    console.log('file: ', fileName);
    new CheckGeneralRules(cleanScheme).run();
    new CheckType(types).run();
    new CheckFunctions(functions).run();
}

const exec = (schemaText) => {
    const start = schemaText.indexOf('---types---');
    const end = schemaText.indexOf('---functions---');

    return {
        types: schemaText.slice(start, end),
        functions: schemaText.slice(end)
    }
}

const getTextWithoutComments = (schemaText) => {
    let textWithoutComments = schemaText;
    while (textWithoutComments.search(/\/\*[\s\S]*?\*\/|\/\/.*/) !== -1) {
        textWithoutComments = textWithoutComments.replace(/\/\*[\s\S]*?\*\/|\/\/.*/, '');
    }
    return textWithoutComments;
}

const getTextWithoutBlankLines = (schemaText) => {
    return schemaText.split('\n').filter(n => n);
}
