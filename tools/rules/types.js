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
            //общая проверка строки
            if (this.typesText[i].search(/[a-z]{1,}(\w{1,}|.)\w{1,}#\w{1,}.*;/) !== 0) {
                this.syntaxError(this.typesText[i]);
            }
            const typeParams = this.typesText[i].split(/[a-z]{1,}\w{1,}#\w{1,} /)[1];

            //если есть свойства, идем внутрь и проверяим их
            if (typeParams.search(/= (Vector<[a-zA-Z][a-zA-Z0-9]{1,}>|bytes|string|int|long|double|Bool|true|True|False|#|[A-Z][A-Za-z0-9]{1,}|[a-z][A-Za-z0-9]{1,}.[A-Z][a-zA-Z0-9]{1,}){1,};/) === -1) {

                const typeProps = typeParams.split(/flags:#|=/)[0].split(' ');

                if (this.checkProps(typeProps)) {
                    this.syntaxError(this.typesText[i], 'properties');
                }

                if (this.typesText[i].search(/flags:#/) !== -1) {
                    const optionalProps = this.typesText[i].split(/flags:#/)[1].split('=')[0].split(' ');
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
            if (typeProps[i].search(/[a-z]{1,}((_|[a-z0-9A-Z]){0,}):(Vector<[a-zA-Z][a-zA-Z0-9]{1,}>|bytes|string|int|long|double|Bool|true|#|[A-Z][A-Za-z0-9]{1,}|[a-z][A-Za-z0-9]{1,}.[A-Z][a-zA-Z0-9]{1,})/)) {
                //если есть ошибка
                return true;
            }
        }
    }

    getRowsCount() {
        return this.typesText.length;
    };

    syntaxError(text, location) {
        console.error(`Error[type]${location ? '[' + location + ']' : ''}: Syntax error.`);
        console.error(text);
        process.exit(1);
    }

}

module.exports.CheckType = CheckType;