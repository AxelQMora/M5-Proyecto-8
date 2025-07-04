import axios from 'axios'
/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */
const BASE_URL_API = "http://localhost:3005/api";


export const getTodos = async () => {

    try {
        const todos = await axios.get(`${BASE_URL_API}/todos`)
        console.log("llamada axios", todos)
        return todos.data;
    } catch (err) {
        console.log("Error al obtener los TODOs:", err);
        return []
    }
}

/* export const todos = getTodos() */
//todos();
/* console.log(todos) */

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export async function addTodo(item) {
    //const todos = getTodos()

    /* todos.push({ ...item, done: false });
    persist(); */
    try {
        const response = await axios.post(`${BASE_URL_API}/todos`, { ...item, done: 0 })
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO :", err);
        return {}
    }
}

export async function toggleDone(id, done) {
    try {
        const response = await axios.put(`${BASE_URL_API}/todos/${id}`, { done });
        return response.data;
    } catch (err) {
        console.log("Error al actualizar estado de TODO:", err);
        return null;
    }
}


export async function removeTodo(id) {
    try {
        const response = await axios.delete(`${BASE_URL_API}/todos/${id}`);
        return response.data;
    } catch (err) {
        console.log("Error al eliminar TODO:", err);
        return null;
    }
}



/* function persist() {
    localStorage.setItem("todos", JSON.stringify(todos));
} */

//Agregar usuarios ---------------------------------------------------------------------------------------------
export const addUser = async (userData) => { 
    try {
        // Espera a que la promesa de axios se resuelva
        const response = await axios.post(`${BASE_URL_API}/user`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Registro de nuevo usuario exitoso", response.data);

        // Devuelve los datos de la respuesta
        return response.data;
    } catch (error) {
        // Es buena práctica registrar el error específico
        console.error("Error al registrar usuario:", error);

        // Lanza el error para que la función que llama a addUser sepa que algo salió mal
        throw error;
    }
};