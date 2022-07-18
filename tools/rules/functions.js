class CheckFunctions {

    constructor(text) {
        this.functionsText = text;
        // console.log(this.functionsText)
        this.rowsCout = this.getRowsCount(text);
    }

    run() {
        this.stringValidation();
    }

    stringValidation() {
        for (let i = 1; i < this.rowsCout; i++) {
            //общая проверка строки
            if (this.functionsText[i].search(/[a-z]{1,}(\w{1,}|.)\w{1,}#\w{1,}.*;/) !== 0) {
                this.syntaxError(this.functionsText[i]);
            }
            const typeParams = this.functionsText[i].split(/[a-z]{1,}\w{1,}#\w{1,} /)[1];

            //если есть свойства, идем внутрь и проверяим их
            if (typeParams.search(/= (bytes|string|int|long|double|Bool|true|True|False|#|[A-Z][A-Za-z0-9]{1,}|Vector<[a-zA-Z][a-zA-Z0-9]{1,}>){1,};/) === -1) {

                const typeProps = typeParams.split(/flags:#|=/)[0].split(' ');

                if (this.checkProps(typeProps)) {
                    this.syntaxError(this.functionsText[i], 'properties');
                }

                if (this.functionsText[i].search(/flags:#/) !== -1) {
                    const optionalProps = this.functionsText[i].split(/flags:#/)[1].split('=')[0].split(' ');
                    this.checkingOptionalProps(optionalProps);
                }
            }
        }
    };

    //проверка необязательных свойст
    checkingOptionalProps(optionalProps) {
        for (let prop of optionalProps) {

            if (prop === '') {
                continue;
            }
            if (prop.search(/[a-z]{1,}((_|[a-z0-9A-Z]){1,}):[a-zA-Z][a-zA-Z0-9]{1,}/)) {

                if (prop.search(/[a-z]{1,}((_|[a-z0-9A-Z]){1,}):flags.[0-9]{1,}\?[a-zA-Z][a-zA-Z0-9]{1,}/)) {
                    return true;
                }
            }
        }
    }

    //проверка свойств
    checkProps(typeProps) {
        for (let i = 0; i < typeProps.length - 1; i++) {
            if (typeProps[i].search(/[a-z]{1,}((_|[a-z0-9A-Z]){0,}):(bytes|string|int|long|double|Bool|true|#|[A-Z][A-Za-z0-9]{1,}|Vector<[a-zA-Z][a-zA-Z0-9]{1,}>)/)) {
                //если есть ошибка
                return true;
            }
        }
    }

    getRowsCount() {
        return this.functionsText.length;
    };

    syntaxError(text, location) {
        console.error(`Error[functions]${location ? '[' + location + ']' : ''}: Syntax error.`);
        console.error(text);
        process.exit(1);
    }

}

module.exports.CheckFunctions = CheckFunctions;