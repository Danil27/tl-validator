class CheckType {

    constructor(text) {
        this.typesText = text;
        this.rowsCout = this.getRowsCount(text);
    }

    run() {
        this.stringValidation();
    }

    stringValidation() {
        for (let i = 1; i < this.rowsCout; i++) {
            if (this.typesText[i].search(/[a-z]{1,}.*\D#.*;/) !== 0) {
                console.error('Error: Syntax error.');
                console.error(this.typesText[i]);
                process.exit(1);
            }


        }
    };

    getRowsCount() {
        return this.typesText.length;
    };


}

module.exports.CheckType = CheckType;