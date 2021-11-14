const fs = require('fs');

//Path del archivo:
const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    //Forma de leer el archivo:
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' })
    const data = JSON.parse(info);

    return data;
}


module.exports = {
    guardarDB,
    leerDB
}