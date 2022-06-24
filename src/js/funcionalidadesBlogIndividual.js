const apiTlaloc = axios.create({
    baseURL: 'https://tlaloc-server.herokuapp.com',
})

const cargarBlogs = async () => {
    let blog = JSON.parse(localStorage.getItem('blog'))
    let cabeceraBlog = document.getElementById("cabecera")
    cabeceraBlog.innerHTML = ""
    let contenidoCabecera = document.createElement("div")
    let fecha = obtenerFecha(blog.createdAt)
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

document.addEventListener('DOMContentLoaded', cargarBlogs)