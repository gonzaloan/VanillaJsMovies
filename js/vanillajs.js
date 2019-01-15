
/*
Promesas sirven para manejar nuestro código asíncrono.
Representa la terminación o fracaso de una operación
*/
const getUser = new Promise(function(todoOk, nok) {
    //Acá podría ir una llamada a una API
    setTimeout(() => {
        //luego de 3 segundos
        todoOk('Timeout!!!!');
    }, 3000);
});

//Then es cuando todo está OK
/*
getUser
    .then(function() {
        console.log('Todo se ejecutó OK');
    })
    .catch(function(mensajeError) {
        console.log(mensajeError);
    })
*/

//Se pueden consumir muchas promesas a la vez

const getUserAll = new Promise(function(todoOk, nok) {
    setTimeout(() => {
        //luego de 3 segundos
        todoOk('Ok!!!!');
    }, 5000);
});

/*
Promise.all([
    getUser,
    getUserAll
])
.then(function(message){
    console.log(message);
})
.catch(function(message){
    console.log(message);
});
*/


//Sólo entrará al then de la promesa que se resuelva primero.
/*
Promise.race([
    getUser,
    getUserAll
])
.then(function(message){
    console.log(message);
})
.catch(function(message){
    console.log(message);
});
*/
//Llamadas Ajax
/*
fetch('https://randomuser.me/api/asd')
    .then(function(respuesta){
       return respuesta.json();
    })
    .then(function(user){
        console.log('user', user.results[0].name.first);
    })
    .catch(function(respuestaError){
        console.error('error VanillaJs', respuestaError);
    });

*/
//Funciones Asíncronas

(async function load(){
    //Constante response espera a que termine el fetch
    async function getData(url){
        const response =  await fetch(url);
        const data = await response.json();1
        return data;
    }
    
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
    console.log('actionList', actionList);
    const terrorList = await getData('https://yts.am/api/v2/list_movies.json?genre=terror');
    
    console.log('terrorList', terrorList);
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation');

    //Este console log no se mandará hasta que todo lo anterior acabe.
    console.log('animationList', animationList);
})()



//Template Literals
//Se puede inyectar código html de manera fácil
function videoItemTemplate(src, title) {
    return (
        `<div class="primaryPlaylistItem">
            <div class="primaryPlaylistItem-image">
                <img src="${src}">
            </div>
            <h4 class="primaryPlaylistItem-title">
                ${title}
            </h4>
        </div>
    `)
}
console.log(videoItemTemplate);



//Destructuracion de objetos

/**
 * Podemos obtener un nombre y meternos dentro de sus subobjetos, por ejemplo en esta query
 * tenemos el objeto data, dentro de data movies, y con los : le damos un nombre a nuestra variable
 * para ser usada fuera de esto.
 * Por esta razón luego podemos usar searchedMovie más abajo, así nos evitamos usar nombres feos de variables
 * como data.movies[0] 
 */
const {
    //podemos ver dentro de los datos retornados
    data:{
        //Con esto podemos destructurar y dar el nombre pelis a la variable
        movies: searchedMovie 
    }
} = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
let HTMLString;
if (searchedMovie == undefined) {
    HTMLString = `
        <div>
            <h3> No hay resultados </h3>
        </div>
    `;
} else {
    HTMLString = searchedMovieTemplate(searchedMovie[0]);
}