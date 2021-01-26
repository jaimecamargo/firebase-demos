import db from './firebase/config';
import { showDocuments } from "./helpers/show-documents";

const user = {
    name: 'Eugenia',
    active: true,
    birthOfDate: 0
}

const users = db.collection('users')

// adicionar un registro
// users.add(user);

// actualiza la(s) propiedad(es) de un registro
// users
//     .doc('2ZNbwO6WMMBox5azqIeg')
//     .update({
//         active: false
//     });

// cambiar todo el json por el nuevo json enviado
// users
//     .doc('2ZNbwO6WMMBox5azqIeg')
//     .set({
//         active: true,
//         name: 'Jaime',
//         birthOfDate: 0
//     });

// elimina un registro
// users
//     .doc('2ZNbwO6WMMBox5azqIeg')
//     .set({
//         active: true,
//         name: 'Jaime',
//         birthOfDate: 0
//     });

// users // 'onSnapshot' crea un 'socket' entre la base de datos
//       // y el cliente que hace este llamado, de esta manera
//       // el cliente se entera de cualquier cambio que le pase
//       // a la collección
//     .onSnapshot(snap => {
//         showDocuments(snap);
//     });

// el código que está arriba es igual al siguiente,
// esto es así porque tanto 'onSnapshot' y 'showDocuments'
// reciben un sólo argumento, entonces Javascript toma el
// argumento de 'onSnapshot' y se lo pasa a 'showDocuments'
// users.onSnapshot(showDocuments);

// users // 'get' no crea un 'socket'
//     .get()
//     .then(showDocuments);

// obtener usuarios activos
// users
//     .where('active', '==', true)
//     .get()
//     .then(showDocuments);

// obtener usuarios con salario mayor a 1800 y menor a 2300
// users
//     .where('salary', '>', 1800)
//     .where('salary', '<', 2300)
//     .get()
//     .then(showDocuments);

// obtener usuarios activos con salario mayor a 1800,
// esta búsqueda obliga a crear un índice
// users
//     .where('salary', '>', 1800)
//     .where('active', '==', true)
//     .get()
//     .then(showDocuments);

// obtener usuarios ordenados por salario
// users
//     .orderBy('name')
//     .orderBy('salary', 'desc')
//     .get()
//     .then(showDocuments);

// código para simular paginación de registros
const previousButton = document.createElement('button');
previousButton.innerText = "Previous Page";
document.body.append(previousButton);

const nextButton = document.createElement('button');
nextButton.innerText = "Next Page";
document.body.append(nextButton);

let firstDoc : any = null;
let lastDoc : any = null;

nextButton.addEventListener('click', () => {
    //
    // parte de la consulta que no varía
    const query = users
                      // definir un orden
                      .orderBy('name')
                      //
                      // indicar a partir de cuál registro
                      // se desea comenzar a consultar
                      .startAfter(lastDoc);

    query
        .limit(2)
        .get()
        .then(snap => {
            //
            firstDoc = snap.docs[0] || null;
            //
            // obtener referencia al último registro, en caso que
            // 'snap.docs[snap.docs.length - 1]' retorne 'undefined'
            // generaría que el método 'startAfter' genere error
            // cuando reciba la variable 'lastDoc', por esto se pone
            // un OR (||) al final con 'null'
            lastDoc = snap.docs[snap.docs.length - 1] || null;
            //
            // mostrar los registros
            showDocuments(snap);

        });
});

nextButton.click();

previousButton.addEventListener('click', () => {
    //
    // parte de la consulta que no varía
    const query = users
                      // definir un orden
                      .orderBy('name')
                      //
                      // indicar a partir hasta cuál registro
                      // se desea consultar
                      .endBefore(firstDoc);

    query
        .limit(2)
        .get()
        .then(snap => {
            //
            firstDoc = snap.docs[0] || null;
            //
            // obtener referencia al último registro, en caso que
            // 'snap.docs[snap.docs.length - 1]' retorne 'undefined'
            // generaría que el método 'startAfter' genere error
            // cuando reciba la variable 'lastDoc', por esto se pone
            // un OR (||) al final con 'null'
            lastDoc = snap.docs[snap.docs.length - 1] || null;
            //
            // mostrar los registros
            showDocuments(snap);

        });
});