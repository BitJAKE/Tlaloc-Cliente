const apiTlaloc = axios.create({
    baseURL: 'https://tlaloc-server.herokuapp.com',
})

const cargarBlogs = async () => {
    let blog = JSON.parse(localStorage.getItem('blog'))
    let cabeceraBlog = document.getElementById("cabecera")
    cabeceraBlog.innerHTML = ""
    let contenidoCabecera = document.createElement("div")
    let divContenido = document.getElementById("contenido")
    let fecha = obtenerFecha(blog.createdAt)
    let imagenBlog = await obtenerImagen(blog.imagenes[0])
    contenidoCabecera.className = "grid grid-cols-4"
    contenidoCabecera.innerHTML = `
        <div class="mx-6 md:mx-32 col-span-3">
            <p class="texto-verde-alterno mb-2">${fecha}</p>
            <h1 class="text-3xl text-center md:text-left md:text-5xl mb-6">
                ${blog.nombre}
            </h1>
            <div class="flex items-center mb-12">
                <p class="texto-verde-alterno texto-gris-blog mr-4"><strong>Escrito por: ${blog.usuario}</strong>
                </p>
                <img src="../img/autor-profile.svg">
            </div>
        </div>
        <div class="col-span-1"></div>`
    cabeceraBlog.appendChild(contenidoCabecera)
    document.getElementById("imagenPrincipal").src = imagenBlog
    let blogContenido = await obtenerContenido(blog.contenido)
    divContenido.appendChild(blogContenido)
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

const obtenerContenido = async (contenido) => {
    let divContenido = document.createElement("div")
    let indice = document.getElementById("indice")
    for (let i = 0; i < contenido.length; i++) {
        let contenidoAPI = await obtenerContenidoAPI(contenido[i])
        //console.log(contenidoAPI)
        if (contenidoAPI.titulo != undefined) {
            let subtitulo = document.createElement("h2")
            subtitulo.className = "text-xl text-center md:text-left md:text-3xl mt-8 mb-4"
            subtitulo.textContent = contenidoAPI.titulo
            subtitulo.id = contenidoAPI.titulo
            divContenido.appendChild(subtitulo)

            let tituloIndice = document.createElement("li")
            tituloIndice.className = "mb-4"
            let tituloLink = document.createElement("a")
            tituloLink.className = "side-bar-link-inactive ml-4"
            tituloLink.textContent = contenidoAPI.titulo
            tituloLink.href = "#" + contenidoAPI.titulo
            tituloIndice.appendChild(tituloLink)
            indice.appendChild(tituloIndice)
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
            imagen.className = "imagen-blog mb-2"
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
document.addEventListener('DOMContentLoaded', cargarBlogs)