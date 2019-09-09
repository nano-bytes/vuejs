const app = new Vue({
    el: "#app",
    data: {
        titulo: 'CRUD de productos con Vue.js',
        columnas: ['No.','Descripción','Cantidad','Estado', 'Acciones'],
        productos: [],
        nombreNuevoProducto: '',
        cantidadNuevoProducto: 0
    },
    methods: {
        agregarProducto(){
            if(this.nombreNuevoProducto != ''){
                this.productos.push({
                    nombre: this.nombreNuevoProducto,
                    cantidad: this.cantidadNuevoProducto,
                    editar: false
                });
                localStorage.setItem('productos-local', JSON.stringify(this.productos));
                this.nombreNuevoProducto = '';
                this.cantidadNuevoProducto = '';
            }
        },
        aumentarCantidad(index){
            this.productos[index].cantidad++;
            localStorage.setItem('productos-local', JSON.stringify(this.productos));
        },
        disminuirCantidad(index){
            if(this.productos[index].cantidad > 0){
                this.productos[index].cantidad--;
                localStorage.setItem('productos-local', JSON.stringify(this.productos));
            }
        },
        habilitarEditar(index){
            this.productos[index].editar = true;
        },
        eliminarProducto(index){
            this.productos.splice(index, 1);
            localStorage.setItem('productos-local', JSON.stringify(this.productos));
        },
        editarProducto(index){
            localStorage.setItem('productos-local', JSON.stringify(this.productos));
            this.productos[index].editar = false;
        }
    },
    created: function(){
        let dbData = JSON.parse(localStorage.getItem('productos-local'));
        if(dbData === null){
            this.productos = [];
        }else{
            this.productos = dbData;
        }
    }
});