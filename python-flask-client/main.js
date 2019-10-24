Vue.component('cabecera',{
    template: //html
    `
    <div>
        <h2 class="h2 text-center text-white">{{titulo}}</h2>
        <h5 class="h5 text-center text-light">{{subtitulo}}</h5>
    </div>
    `,
    computed: {
        ...Vuex.mapState(['titulo','subtitulo'])
    }
});


Vue.component('nuevo', {
    template: //html
    `
    <div class="container mt-5">
        <h5 class="h5 text-light text-center">CREAR NUEVO TODO</h5>
        <form class="mt-5">
            <div class="form-group">
                <label for="title" class="text-light">Título</label>
                <input type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="Ingrese el título del ToDo" required  v-model="titulo">
                <small id="titleHelp" class="form-text text-danger" style="display: none">Rellene este campo</small>
            </div>
            <div class="form-group">
                <label for="description" class="text-light">Descripción</label>
                <input type="text" class="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Ingrese la descripción del ToDo" required v-model="descripcion">
                <small id="descriptionHelp" class="form-text text-danger" style="display: none">Rellene este campo</small>
            </div>
            <div class="text-center mt-5">
                <a class="btn btn-primary" @click="createToDo">Guardar</a>
                <a class="btn btn-info" href="index.html">Volver</a>
            </div>
        </form>
    </div>
    `,
    computed: {
        titulo: {
            get() {
                return this.$store.state.nuevoTitulo;
              },
              set(value) {
                this.$store.commit('updateNewTitle', value);
              }
        },
        descripcion: {
            get() {
                return this.$store.state.nuevaDescripcion;
            },
            set(value) {
                this.$store.commit('updateNewDescription', value);
            }
        }
    },
    methods: {
        ...Vuex.mapActions(['createToDo'])
    }
});


Vue.component('editar', {
    template: //html
    `
    <div id="editPopUp" class="container mt-5" style="display: none;">
        <h5 class="h5 text-light text-center">EDITAR TODO</h5>
        <form class="mt-5" novalidate>
            <div class="form-group">
                <label for="title" class="text-light">Id</label>
                <input type="text" class="form-control" id="idtodo" disabled :value="editedId">
            </div>
            <div class="form-group">
                <label for="title" class="text-light">Título</label>
                <input type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="Ingrese el título del ToDo" required  v-model="editedTitulo">
                <small id="titleHelp" class="form-text text-danger" style="display: none">Rellene este campo</small>
            </div>
            <div class="form-group">
                <label for="description" class="text-light">Descripción</label>
                <input type="text" class="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Ingrese la descripción del ToDo" required v-model="editedDescripcion">
                <small id="descriptionHelp" class="form-text text-danger" style="display: none">Rellene este campo</small>
            </div>
            <div class="text-center mt-5">
                <a class="btn btn-primary" @click="updateToDo">Actualizar</a>
                <button class="btn btn-info" @click="closeEditForm">Volver</button>
            </div>
        </form>
    </div>
    `,
    computed: {
        ...Vuex.mapState(['editedId', 'editedTitulo', 'editedDescripcion']),
        editedTitulo: {
            get() {
                return this.$store.state.editedTitulo;
              },
              set(value) {
                this.$store.commit('updateEditTitle', value);
              }
        },
        editedDescripcion: {
            get() {
                return this.$store.state.editedDescripcion;
            },
            set(value) {
                this.$store.commit('updateEditDescription', value);
            }
        }
    },
    methods: {
        ...Vuex.mapActions(['createToDo', 'updateToDo']),
        ...Vuex.mapMutations(['closeEditForm'])
    }
});


Vue.component('tablatodos',{
    template: //html
    `
    <div id="list" class="container mt-5">
        <table class="table table-dark mt-5">
            <thead>
                <tr>
                    <th scope="col" v-for="columna of columnas">{{columna}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todo, index) of todos">
                    <td>{{todo.id}}</td>
                    <td>{{todo.title}}</td>
                    <td>{{todo.description}}</td>
                    <td>
                        <button class="btn btn-info" @click="getToDoForUpdate(todo.id)">EDITAR</button>
                        <button class="btn btn-danger" @click="eliminarTodo(todo.id)">ELIMINAR</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-center mt-5">
            <a class="btn btn-primary" href="nuevo.html">NUEVO TODO</a>
        </div>
    </div>
    `,
    computed: {
        ...Vuex.mapState(['columnas', 'todos'])
    },
    methods: {
        ...Vuex.mapActions(['getToDos', 'deleteToDo', 'getToDoForUpdate']),
        eliminarTodo(id){
            Swal.fire({
                title: 'Estas seguro?',
                text: "Deseas Eliminar el ToDo: " + id,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!'
            }).then((result) => {
                if (result.value) {
                    this.$store.dispatch('deleteToDo', id);
                }
            });
        }
    }, 
    created(){
        this.$store.dispatch('getToDos');
    }
});



const store = new Vuex.Store({
    state: {
        titulo: 'CRUD de ToDo\'s',
        subtitulo: '(Python + Flask + Vue.js)',
        columnas: ['Id', 'Título', 'Descripción', 'Acciones'],
        todos: [],
        nuevoTitulo: '',
        nuevaDescripcion: '',
        editedId: '',
        editedTitulo: '',
        editedDescripcion: '' 
    },
    mutations: {
        fillToDos(state, todos){
            state.todos = todos.sort((a, b) => (a.id > b.id)? 1 : -1);
        },
        successCreatedToDo(state, createdTodo){
            state.nuevoTitulo = '';
            state.nuevaDescripcion = '';
            document.getElementById("titleHelp").style.display = "none";
            document.getElementById("descriptionHelp").style.display = "none";
            Swal.fire(
                '¡TODO CREADO EXITOSAMENTE!',
                'ToDo: ' + createdTodo,
                'success'
            ).then((result) => {
                window.location.href = "index.html";
            });
        },
        fillEditToDoForm(state, todo){
            state.editedId = todo.id;
            state.editedTitulo = todo.title;
            state.editedDescripcion = todo.description;
            document.getElementById("editPopUp").style.display = "block";
            document.getElementById("list").style.display = "none";
        },
        successDeletedToDo(state, deletedTodo){
            Swal.fire(
                '¡TODO ELIMINADO EXITOSAMENTE!',
                'ToDo: ' + deletedTodo,
                'success'
            );
        },
        updateNewTitle(state, title){
            state.nuevoTitulo = title;
        },
        updateNewDescription(state, description){
            state.nuevaDescripcion = description;
        },
        updateEditTitle(state, title){
            state.editedTitulo = title;
        },
        updateEditDescription(state, description){
            state.editedDescripcion = description;
        },
        successUpdatedToDo(state, updatedTitle){
            Swal.fire(
                '¡TODO ACTUALIZADO EXITOSAMENTE!',
                'ToDo: ' + updatedTitle,
                'success'
            ).then((result) => {
                if (result.value) {
                    state.editedId = '';
                    state.editedTitulo = '';
                    state.editedDescripcion = '';
                    closeForm();
                }
            });
        },
        closeEditForm(state){
            state.editedId = '';
            state.editedTitulo = '';
            state.editedDescripcion = '';
            closeForm();
        }
    },
    actions: {
        getToDos: async function({ commit }){
            try {
                const data = await fetch(server_protocol+'://'+server_ip + ':' + server_port);
                const todos = await data.json();  
                commit('fillToDos', todos);
            } catch(e) {
                Swal.fire(
                    '¡ERROR!',
                    'Web Services no encontrado',
                    'error'
                );
            }
        },
        createToDo: async function({commit, state}){
            if(state.nuevoTitulo === "" || state.nuevaDescripcion === ""){
                if(!document.getElementById("title").checkValidity()){
                    document.getElementById("titleHelp").style.display = "inline";
                }
                if(!document.getElementById("description").checkValidity()){
                    document.getElementById("descriptionHelp").style.display = "inline";
                }
            }else{
                var text = '{"title": "' + state.nuevoTitulo + '", "description": "' + state.nuevaDescripcion +'"}';
                const settings = {
                    method: 'POST',
                    body: text,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                };
                try {
                    const fetchResponse = await fetch(server_protocol+'://'+server_ip + ':' + server_port, settings);
                    commit('successCreatedToDo', state.nuevoTitulo);
                } catch(e) {
                    Swal.fire(
                        '¡ERROR!',
                        'Web Services no encontrado',
                        'error'
                    );
                }
            }
        },
        deleteToDo: async function({commit, dispatch}, id){
            const settings = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            try {
                const fetchResponse = await fetch(server_protocol+'://'+server_ip + ':' + server_port + '/' + id, settings);
                dispatch('getToDos');
                commit('successDeletedToDo', id);
            } catch(e) {
                Swal.fire(
                    '¡ERROR!',
                    'Web Services no encontrado',
                    'error'
                );
           }
        },
        getToDoForUpdate: async function({commit}, id){
            const settings = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            try {
                const data = await fetch(server_protocol+'://'+server_ip + ':' + server_port + '/' + id, settings);
                const todo = await data.json();
                commit('fillEditToDoForm', todo);
            } catch(e) {
                Swal.fire(
                    '¡ERROR!',
                    'Web Services no encontrado',
                    'error'
                );
           }
        },

        updateToDo: async function({commit, state, dispatch}){
            if(state.editedTitulo === "" || state.editedDescripcion === ""){
                if(!document.getElementById("title").checkValidity()){
                    document.getElementById("titleHelp").style.display = "inline";
                }
                if(!document.getElementById("description").checkValidity()){
                    document.getElementById("descriptionHelp").style.display = "inline";
                }
            }else{
                var text = '{"title": "' + state.editedTitulo + '", "description": "' + state.editedDescripcion +'"}';
                const settings = {
                    method: 'PUT',
                    body: text,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                };
                try {
                    const fetchResponse = await fetch(server_protocol+'://'+server_ip + ':' + server_port + '/' + state.editedId, settings);
                    dispatch('getToDos');
                    commit('successUpdatedToDo', state.editedTitulo);
                } catch(e) {
                    Swal.fire(
                        '¡ERROR!',
                        'Web Services no encontrado',
                        'error'
                    );
                }
            }
        }
    }
});




const app = new Vue({
    el: "#app",
    store: store
});