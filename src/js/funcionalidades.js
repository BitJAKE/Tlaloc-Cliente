const crearOpcionesNavegacion = () => {
    let elemento = document.getElementById("menu")
    let menuOpciones = document.getElementById("menu-opciones")
    let content = document.getElementById("content");
    menuOpciones.innerHTML = ""
    nombresOpciones = ["Blog", "Eventos", "Productos Eco", "Acerca de"]
    linkOpciones = ["./pages/Blog.html", "#", "#", "#"]
    if (elemento.textContent === "close") {
        elemento.textContent = "menu"
        content.className = ""
        content.className = "inline"
    } else {
        content.className = ""
        content.className = "hidden"
        for (let i = 0; i < nombresOpciones.length; i++) {
            elemento.textContent = "close"
            let link = document.createElement("a")
            let separador = document.createElement("hr")
            separador.className = "mt-1 separador"
            link.textContent = nombresOpciones[i]
            link.href = linkOpciones[i]
            link.className = "nav-item block"
            menuOpciones.appendChild(link)
            menuOpciones.appendChild(separador)
        }
    }
}
document.getElementById("menu").addEventListener("click", crearOpcionesNavegacion)