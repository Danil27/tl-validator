class CheckGeneralRules {

    constructor(text) {
        this.schemeText = text;
        this.rowsCout = this.getRowsCount(text);
    }

    run() {
        this.checkSchemaStructure();
    }

    checkSchemaStructure() {
        //checking for an empty schema
        if (!this.schemeText.length) {
            console.error('Error: Empty scheme');
            process.exit(1);
        }

        if (this.schemeText.indexOf('---types---') === -1) {
            console.error('Error: Missing delimiter "---types---"');
            process.exit(1);
        }

        if (this.schemeText.indexOf('---functions---') === -1) {
            console.error('Error: Missing delimiter "---functions---"');
            process.exit(1);
        }
    }

    getRowsCount() {
        return this.schemeText.length;
    };
}

module.exports.CheckGeneralRules = CheckGeneralRules;

