const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
let myLeads = []

//Array myLeads almacenara los datos para siempre, apesar de cerrar la app los datos quedan
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

//Delete Button, para eliminar los datos permanentes
const deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("dblclick" , function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

//SAVE TAB, button para guardar el link de pagina actual
const saveTabBtn = document.getElementById("tab-btn")
saveTabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true , currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
})

//SAVE INPUT cada vez que se unde el boton
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
 
    //Data Storage: Chequear en click derecho inspeccionar + aplication + storage + local storage
    //asi puedo guardar valores en memoria y luego usarlos 
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))

    renderLeads(myLeads)
})

function renderLeads(leads){
    let listItems = ""
    for (let index = 0; index < leads.length; index++) {
        // con "innerHTML" se puede convierte "<li>" en elemento HTML y no se muestra como string
        // "target='_blank'" abre una nueva pestana
        // Template Strings con simbolo ` permite encadenar todo en un string y poder dar saltos de linea
        listItems += `
        <li>
            <a target='_blank' href='${leads[index]}'>
                ${leads[index]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}