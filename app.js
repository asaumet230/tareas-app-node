const Tareas = require('./models/tareas');
const { inquirerMenu, pausa, leerInput, listadoBorrarTarea, confirmar, mostrarListadCheckList } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

require('colors');



console.clear();

const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  //Leemos los datos de nuestro rchivo JSON:
  const tareasDB = leerDB();

  if (tareasDB) {
    //Hay que restablecer el objeto de la clase Tareas:
    tareas.cargarTareas(tareasDB);
  }

  do {

    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;

      case '2':
        // console.log(tareas._listado)
        console.log(`\n`);
        tareas.listarTareas();
        break;

      case '3':
        console.log(`\n`);
        tareas.listarPendientesCompletadas(true);
        break;

      case '4':
        console.log(`\n`);
        tareas.listarPendientesCompletadas(null);
        break;

      case '5':
        console.log(`\n`);
        const ids = await mostrarListadCheckList(tareas.listadoArray);
        tareas.toggleCompletadas(ids);
        break;

      case '6':
        console.log(`\n`);
        const id = await listadoBorrarTarea(tareas.listadoArray);

        if (id !== '0') {

          const ok = await confirmar('Esta seguro que desea eliminar esta tarea?');

          if (ok) {
            tareas.borrarTarea(id);
            console.log(`\nTarea borrada exitosamente`.red);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArray);
    await pausa();

  } while (opt !== '0');

}

main();