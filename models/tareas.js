const colors = require('colors');
const Tarea = require('./tarea');


class Tareas {

    _listado = {};

    get listadoArray() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {

            const tarea = this._listado[key];
            listado.push(tarea);

        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    cargarTareas(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });
    }

    listarTareas() {

        let listadoTareas = '';

        this.listadoArray.forEach((tarea, index) => {

            const { desc, completadoEn } = tarea;
            listadoTareas += `${colors.green(index + 1)}. ${desc} :: ${completadoEn ? colors.green('Completada') : colors.red('Pendiente')}\n`;

        });

        return console.log(listadoTareas);
    }

    listarPendientesCompletadas(completadas = true) {

        let tareas = '';

        if (completadas) {

            const listadoCompletadas = this.listadoArray.filter(tarea => tarea.completadoEn !== null);

            listadoCompletadas.forEach((tarea, index) => {

                const { desc, completadoEn } = tarea;
                tareas += `${colors.green(index + 1, '.')} ${desc} :: ${completadoEn ? `${'Completada'.green} en ${completadoEn.blue}` : colors.red('Pendiente')}\n`;

            });

            return console.log(tareas);

        } else {

            const listadoPendientes = this.listadoArray.filter(tarea => tarea.completadoEn === null);

            listadoPendientes.forEach((tarea, index) => {

                const { desc, completadoEn } = tarea;
                tareas += `${colors.green(index + 1, '.')} ${desc} :: ${completadoEn ? colors.green('Completada') : colors.red('Pendiente')}\n`;

            });

            return console.log(tareas);
        }

    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        //Para colocar las tareas nuevamente en no completadas:

        this.listadoArray.forEach(tarea => {

            if (!ids.includes(tarea.id)) {

                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
