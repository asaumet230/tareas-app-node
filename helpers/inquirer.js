const inquirer = require('inquirer');
const colors = require('colors');


const inquirerMenu = async () => {

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Qué desea hacer?',
            choices: [
                { value: '1', name: `${colors.green('1.')} Crear Tarea` },
                { value: '2', name: `${colors.green('2.')} Listar Tareas` },
                { value: '3', name: `${colors.green('3.')} Listar tareas completadas` },
                { value: '4', name: `${colors.green('4.')} Listar tareas pendientes` },
                { value: '5', name: `${colors.green('5.')} Completar tarea(s)` },
                { value: '6', name: `${colors.green('6.')} Borrar tarea` },
                { value: '0', name: `${colors.green('0.')} Salir` },
            ]
        }

    ];

    console.clear();
    console.log(colors.green('================================='));
    console.log(colors.rainbow('   Seleccione Opción del Menú  '));
    console.log(colors.green(`=================================\n`));

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion

}

const pausa = async () => {

    const accion = [
        {
            type: 'input',
            name: 'accion',
            message: `Presione ${colors.green("ENTER")} para continuar`
        }
    ]

    console.log(`\n`);
    await inquirer.prompt(accion);
}

const leerInput = async (message) => {

    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {

                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(pregunta);
    return desc;
}

const listadoBorrarTarea = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            pageSize: 20,
            message: 'Borrar Tarea',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id
}

const mostrarListadCheckList = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false
        }

    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            pageSize: 20,
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids
}

const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm', //El inquirer tipo confirm sempre regresa un booleano
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta);

    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTarea,
    confirmar,
    mostrarListadCheckList
}