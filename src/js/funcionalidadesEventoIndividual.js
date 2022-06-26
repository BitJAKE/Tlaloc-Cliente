const apiTlaloc = axios.create({
    baseURL: 'https://tlaloc-server.herokuapp.com',
})

const cargareventos = async () => {
    let evento = JSON.parse(localStorage.getItem('eventos'))
    let cabeceraevento = document.getElementById("cabecera")
    cabeceraevento.innerHTML = ""
    let contenidoCabecera = document.createElement("div")
    let divContenido = document.getElementById("contenido")
    let fecha = obtenerFecha(evento.fecha_hora)
    let hora = obtenerHora(evento.fecha_hora)
    let imagenevento = await obtenerImagen(evento.imagenes[0])
    contenidoCabecera.className = "grid col-span-1 md:grid-cols-4"
    contenidoCabecera.innerHTML = `
        <div class="mx-6 md:mx-32 md:col-span-3">
            <p class="texto-verde-alterno mb-2 text-center md:text-left">${fecha}</p>
            <h1 class="text-3xl text-center md:text-left md:text-4xl mb-6">
                ${evento.nombre}
            </h1>
        </div>
        <div class="col-span-1"></div>`
    cabeceraevento.appendChild(contenidoCabecera)
    let divFecha = document.getElementsByClassName("fecha")
    let divHora = document.getElementsByClassName("hora")
    let divUbicacion = document.getElementsByClassName("ubicacion")
    for (let i = 0; i < divFecha.length; i++) {
        divFecha[i].textContent = fecha
    }
    for (let i = 0; i < divHora.length; i++) {
        divHora[i].textContent = hora
    }
    for (let i = 0; i < divUbicacion.length; i++) {
        divUbicacion[i].textContent = evento.lugar
    }
    document.getElementById("imagenPrincipal").src = imagenevento
    let eventoContenido = await obtenerContenido(evento.contenido)
    divContenido.appendChild(eventoContenido)
}

const obtenerImagen = async (id) => {
    const { data, status } = await apiTlaloc.get("/api/image/" + id)
    if (status === 200) {
        return data.secure_url
    } else {
        return "no hay img"
    }
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

const obtenerContenido = async (contenido) => {
    let divContenido = document.createElement("div")
    let indice = document.getElementById("hora")
    for (let i = 0; i < contenido.length; i++) {
        let contenidoAPI = await obtenerContenidoAPI(contenido[i])
        if (contenidoAPI.titulo != undefined) {
            let subtitulo = document.createElement("h2")
            subtitulo.className = "text-xl text-center md:text-left md:text-2xl mt-8 mb-4"
            subtitulo.textContent = contenidoAPI.titulo
            subtitulo.id = contenidoAPI.titulo
            divContenido.appendChild(subtitulo)
        }
        if (contenidoAPI.descripcion != undefined) {
            let parrafo = document.createElement("p")
            parrafo.className = "text-base text-center md:text-xl md:text-left mb-4"
            parrafo.textContent = contenidoAPI.descripcion
            divContenido.appendChild(parrafo)
        }
        if (contenidoAPI.imagenes.length != 0) {
            let imagen = document.createElement("img")
            let imagenAPI = await obtenerImagen(contenidoAPI.imagenes[0])
            imagen.className = "imagen-evento mb-2 w-full md:w-4/5"
            imagen.src = imagenAPI
            divContenido.appendChild(imagen)
        }
    }
    return divContenido
}

const obtenerContenidoAPI = async (id) => {
    const { data, status } = await apiTlaloc.get("/api/contenido/" + id)
    if (status === 200) {
        return data
    } else {
        return "no hay img"
    }
}

const crearTemplateContenido = (contenido) => {

}
document.addEventListener('DOMContentLoaded', cargareventos)