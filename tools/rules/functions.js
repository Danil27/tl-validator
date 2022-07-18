class CheckFunctions {

    constructor(text) {
        this.functionsText = text;
        this.rowsCout = this.getRowsCount(text);
    }

    run() {
        this.stringValidation();
    }

    stringValidation() {
        for (let i = 1; i < this.rowsCout; i++) {
            if (this.functionsText[i].search(/[a-z]{1,}.*#.*;/) !== 0) {
                console.error('Error: Syntax error.');
                console.error(this.functionsText[i]);
                process.exit(1);
            }


        }
    };

    getRowsCount() {
        return this.functionsText.length;
    };


}

module.exports.CheckFunctions = CheckFunctions;