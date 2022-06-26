const apiTlaloc = axios.create({
    baseURL: 'https://tlaloc-server.herokuapp.com',
})

let contenidoEventos
const cargarEventos = async () => {
    const { data, status } = await apiTlaloc.get('/api/actividad')
    if (status === 200) {//resulto todo bien
        contenidoEventos = data.evento
        await crearTemplate(contenidoEventos)
    }
    localStorage.clear()
}

const crearTemplate = async (eventos) => {
    let EventoPrincipal = document.getElementById('Evento-principal')
    EventoPrincipal.innerHTML = ""
    let otrosEventos = document.getElementById('eventos')
    otrosEventos.innerHTML = ""
    let contenidoEventoPrincipal = document.createElement('div')
    for (let i = 0; i < contenidoEventos.length; i++) {
        let fecha = obtenerFechaWithoutYear(contenidoEventos[i].fecha_hora)
        let imagenEvento = await obtenerImagen(contenidoEventos[i].imagenes[0])
        //let divFecha = 
        if (i === 0) {
            let hora = obtenerHora(contenidoEventos[i].fecha_hora)
            contenidoEventoPrincipal.innerHTML = `  
                    <div class="flex items-center">
                        <img src="../img/Rectangulo-degradado.png" class="h-16 mr-4">
                        <h1 class="text-2xl text-center md:text-left md:text-5xl">
                            Productos Ecologicos
                        </h1>
                    </div>
                    <div class="flex flex-col-reverse md:grid md:grid-cols-2 xl:grid-cols-12 gap-8 xl:gap-12">
                        <div class="grid grid-cols-3 flex-row md:hidden items-center">
                            <div class="grid grid-cols-12 items-center">
                                <div class="col-span-2 flex justify-center">
                                    <img src="../img/fecha.svg">
                                </div>
                                <div class="col-span-10">
                                    <p id="fecha" class="ml-2">${fecha}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-12 items-center ">
                                <div class="col-span-2 flex justify-center">
                                    <img src="../img/hora.svg">
                                </div>
                                <div class="col-span-10">
                                    <p id="hora" class="ml-2">${hora}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-12 items-center">
                                <div class="col-span-2 flex justify-center">
                                    <img src="../img/Ubicacion.svg">
                                </div>
                                <div class="col-span-10">
                                    <p id="ubicacion" class="ml-2">${contenidoEventos[i].lugar}</p>
                                </div>
                            </div>
                        </div>
                        <img src="${imagenEvento}" class="rounded-md flex items-center justify-end xl:col-span-5 h-96">
                        <div class="xl:col-span-7">
                            <a href="../pages/Eventos-individuales.html" class="guardarBlog" id=${contenidoEventos[i]._id}>
                                <h2 class="text-2xl text-center md:text-left md:text-4xl my-4 entrada-blog">${contenidoEventos[i].nombre}</h2>
                            </a>
                            <hr class="mt-1 separador-blog mb-8">
                            <p>${contenidoEventos[i].descripcion}</p>
                            <div class="grid grid-cols-3 flex-row mt-4 hidden md:inline-flex">
                                <div class="grid grid-cols-12 items-center mb-8">
                                    <div class="col-span-2 flex justify-center">
                                        <img src="../img/fecha.svg">
                                    </div>
                                    <div class="col-span-10">
                                        <p id="fecha" class="ml-2">${fecha}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 items-center mb-8">
                                    <div class="col-span-2 flex justify-center">
                                        <img src="../img/hora.svg">
                                    </div>
                                    <div class="col-span-10">
                                        <p id="hora" class="ml-2">${hora}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 items-center mb-8">
                                    <div class="col-span-2 flex justify-center">
                                        <img src="../img/Ubicacion.svg">
                                    </div>
                                    <div class="col-span-10">
                                        <p id="ubicacion" class="ml-2">${contenidoEventos[i].lugar}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        } else {
            let eventos = document.createElement('div')
            let claseStatus = obtenerClaseStatus(contenidoEventos[i].estado)
            eventos.innerHTML = `
                    <div class="flex flex-col-reverse md:inline md:pb-4">
                        <div class="flex flex-row items-center mt-4 md:hidden justify-center">
                            <img src=${obtenerStatusImagen(contenidoEventos[i].estado)} class="mr-2"> 
	                        <p class="ml-2 text-end ${claseStatus}">
                                ${obtenerStatusEvento(contenidoEventos[i], fecha)}
	                        </p>
                        </div>
                        <img src="${imagenEvento}" class="rounded-md mb-4 img-blog w-full">
                        <a href="../pages/Eventos-individuales.html" class="guardarBlog" id=${contenidoEventos[i]._id}>
                            <h3 class="text-xl text-center md:text-left md:text-2xl md:mt-8 entrada-blog hidden md:inline">
                                ${contenidoEventos[i].nombre}
                            </h3>
                        </a>
                        <p class="mb-4 md:my-4 md:mb-2">
                            ${contenidoEventos[i].descripcion}
                        </p>
                        <div class="flex flex-row items-center mt-4">
                            <img src=${obtenerStatusImagen(contenidoEventos[i].estado)} class="mr-2"> 
                            <p class="hidden md:inline ${claseStatus}">
                                ${obtenerStatusEvento(contenidoEventos[i], fecha)}
                            </p>
                        <div>
                        <a href="../pages/Eventos-individuales.html" class="guardarBlog" id=${contenidoEventos[i]._id}>
                            <h3 class="text-xl text-center md:text-left md:text-2xl mt-8 mb-4 md:hidden">
                                ${contenidoEventos[i].nombre}
                            </h3>
                        </a>
                    </div>                
                `
            otrosEventos.appendChild(eventos)
        }
    }
    EventoPrincipal.appendChild(contenidoEventoPrincipal)
    let linkToEventoIndividual = document.getElementsByClassName('guardarBlog')
    for (let i = 0; i < linkToEventoIndividual.length; i++) {
        linkToEventoIndividual[i].addEventListener('click', guardarEnCacheBlog)
    }
}

const guardarEnCacheBlog = (e) => {
    localStorage.clear()
    let idAlmacenar = e.target.parentNode.id
    let eventoGuardar = contenidoEventos[buscarID(contenidoEventos, idAlmacenar)]
    const blogJSON = JSON.stringify(eventoGuardar)
    localStorage.setItem('eventos', blogJSON)
}

const buscarID = (array, id) => {
    const index = array.findIndex((element, index) => {
        return element._id === id
    })
    return index
}

const obtenerImagen = async (id) => {
    const { data, status } = await apiTlaloc.get("/api/image/" + id)
    if (status === 200) {
        return data.secure_url
    } else {
        return "no hay img"
    }
}

const obtenerFechaWithoutYear = (fecha) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    fecha = fecha.replace(/T.+/g, "")
    let fechaDesglosada = fecha.split("-")
    fecha = fechaDesglosada[2] + " de " + meses[parseInt(fechaDesglosada[1]) - 1]
    return fecha
}

const obtenerFecha = (fecha) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    fecha = fecha.replace(/T.+/g, "")
    let fechaDesglosada = fecha.split("-")
    fecha = fechaDesglosada[2] + " de " + meses[parseInt(fechaDesglosada[1]) - 1] + ", " + fechaDesglosada[0]
    return fecha
}

const obtenerHora = (hora) => {
    hora = hora.replace(/.+T/g, "")
    hora = hora.replace(/\u002e.+/g, "")
    let horaDesglosada = hora.split(":")
    horaDesglosada[0] = parseInt(horaDesglosada[0])
    if (horaDesglosada[0] >= 12) {
        if (horaDesglosada[0] != 12) {
            horaDesglosada[0] = horaDesglosada[0] - 12
            horaDesglosada[0] = horaDesglosada[0].toString()
        }
        hora = horaDesglosada[0] + ":" + horaDesglosada[1] + " P.M."
    } else {
        hora = hora + " A.M"
        hora = horaDesglosada[0] + ":" + horaDesglosada[1] + " A.M."
    }
    return hora
}

const obtenerStatusEvento = (evento, fecha) => {
    if (evento.estado === "En curso") {
        return fecha
    } else {
        return "Evento " + evento.estado.toLowerCase()
    }
}

const obtenerStatusImagen = (estado) => {
    if (estado === "En curso") {
        return "../img/fecha.svg"
    } else if (estado === "Terminado") {
        return "../img/Terminado.svg"
    } else if (estado === "Cancelado") {
        return "../img/Cancelado.svg"
    }
}

const obtenerClaseStatus = (estado) => {
    if (estado === "En curso") {
        return ""
    } else if (estado === "Terminado") {
        return "evento-estado"
    } else if (estado === "Cancelado") {
        return "evento-estado"
    }
}

document.addEventListener('DOMContentLoaded', cargarEventos)