const apiTlaloc = axios.create({
    baseURL: 'https://tlaloc-server.herokuapp.com',
})

let contenidoBlogs
const cargarEventos = async () => {
    const { data, status } = await apiTlaloc.get('/api/actividad/blog')
    if (status === 200) {//resulto todo bien
        contenidoBlogs = data.blog
        await crearTemplate(contenidoBlogs)
    }
    localStorage.clear()
}

const crearTemplate = async (blogs) => {
    let BlogPrincipal = document.getElementById('Blog-principal')
    BlogPrincipal.innerHTML = ""
    let otrosBlogs = document.getElementById('Blogs')
    otrosBlogs.innerHTML = ""
    let contenidoBlogPrincipal = document.createElement('div')
    for (let i = 0; i < contenidoBlogs.length; i++) {
        let fecha = obtenerFecha(contenidoBlogs[i].createdAt)
        let imagenBlog = await obtenerImagen(contenidoBlogs[i].imagenes[0])
        if (i === 0) {
            contenidoBlogPrincipal.innerHTML = `
                    <div class="flex items-center">
                        <img src="../img/Rectangulo-degradado.png" class="h-16 mr-4">
                        <h1 class="text-3xl text-center md:text-left md:text-5xl">
                            Blog ambiental
                        </h1>
                    </div>
                    <div class="flex flex-col-reverse md:grid md:grid-cols-2 xl:grid-cols-12 gap-8 xl:gap-12 my-8">
                        <p class="ml-2 md:hidden -mt-4 text-end"><em>Por: <strong>${contenidoBlogs[i].usuario}</strong>, ${fecha}</em>
                        </p>
                        <img src="${imagenBlog}" class="rounded-md flex items-center justify-end xl:col-span-5 h-96">
                        <div class="xl:col-span-7">
                            <p class="ml-2 hidden md:inline"><em>Por: <strong>${contenidoBlogs[i].usuario}</strong>, ${fecha}</em></p>
                            <a href="../pages/Blog-individual.html" class="guardarBlog" id=${contenidoBlogs[i]._id}>
                                <h2 class="text-2xl text-center md:text-left md:text-4xl my-4 entrada-blog">${contenidoBlogs[i].nombre}</h2>
                            </a>
                            <hr class="mt-1 separador-blog mb-8">
                            <p>${contenidoBlogs[i].descripcion}</p>
                        </div>
                    </div>
                `
        } else {
            let blogs = document.createElement('div')
            blogs.innerHTML = `
                    <div class="flex flex-col-reverse md:inline md:pb-4">
                        <p class="ml-2 md:hidden text-end"><em>Por: <strong>${contenidoBlogs[i].usuario}</strong>, ${fecha}</em>
                        </p>
                        <img src="${imagenBlog}" class="rounded-md mb-4 img-blog w-full">
                        <a href="../pages/Blog-individual.html" class="guardarBlog" id=${contenidoBlogs[i]._id}>
                            <h3 class="text-xl text-center md:text-left md:text-2xl md:mt-8 entrada-blog hidden md:inline">
                                ${contenidoBlogs[i].nombre}
                            </h3>
                        </a>
                        <p class="mb-4 md:my-4 md:mb-2">
                            ${contenidoBlogs[i].descripcion}
                        </p>
                        <p class="hidden md:inline"><em>Por: <strong>${contenidoBlogs[i].usuario}</strong>, ${fecha}</em></p>
                        <a href="../pages/Blog-individual.html" class="guardarBlog" id=${contenidoBlogs[i]._id}>
                            <h3 class="text-xl text-center md:text-left md:text-2xl mt-8 mb-4 md:hidden">
                                ${contenidoBlogs[i].nombre}
                            </h3>
                        </a>
                    </div>                
                `
            otrosBlogs.appendChild(blogs)
        }
    }
    BlogPrincipal.appendChild(contenidoBlogPrincipal)
    let linkToBlogIndividual = document.getElementsByClassName('guardarBlog')
    for (let i = 0; i < linkToBlogIndividual.length; i++) {
        linkToBlogIndividual[i].addEventListener('click', guardarEnCacheBlog)
    }
}

const guardarEnCacheBlog = (e) => {
    localStorage.clear()
    let idAlmacenar = e.target.parentNode.id
    let blogAGuardar = contenidoBlogs[buscarID(contenidoBlogs, idAlmacenar)]
    const blogJSON = JSON.stringify(blogAGuardar)
    localStorage.setItem('blog', blogJSON)
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

const obtenerFecha = (fecha) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    fecha = fecha.replace(/T.+/g, "")
    let fechaDesglosada = fecha.split("-")
    fecha = fechaDesglosada[2] + " de " + meses[parseInt(fechaDesglosada[1]) - 1] + ", " + fechaDesglosada[0]
    return fecha
}

document.addEventListener('DOMContentLoaded', cargarEventos)