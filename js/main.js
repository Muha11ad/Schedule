//UserName
const nameInput = document.querySelector("#name")
let username = localStorage.getItem("username") || '';
nameInput.value = username;
nameInput.addEventListener("change", e =>{
    localStorage.setItem("username",e.target.value )
})

//Add toDo
const Form  = document.querySelector("#nt-form")
Form.addEventListener("submit", e =>{
    e.preventDefault();

    const todo = {
        content: e.target.elements.content.value,
        done:false,
        date: new Date().getTime()
    }
    Plans.push(todo);
    localStorage.setItem("task", JSON.stringify(Plans))
    Form.reset();

    DisplayTodos()
})
DisplayTodos()


//to UI
function DisplayTodos() {
    const Tasklist = document.querySelector(".task-list")
    Tasklist.innerHTML = '';
    Plans.forEach(plan => {
           //Created elements
   const list = document.createElement("ul")
   const item = document.createElement("li")
   const content = document.createElement("div")
   const input = document.createElement("input")
   const actions = document.createElement("div")
   const edit = document.createElement("button")
   const del = document.createElement("button") 
   const label = document.createElement("label") 
   const span = document.createElement("span") 

   //Class
   item.classList.add("task")
   list.classList.add("list")
   actions.classList.add("actions")
   edit.classList.add("edit")
   del.classList.add("del")
   edit.classList.add("btn")
   del.classList.add("btn")
   input.classList.add("check")
   span.classList.add("buble")
   content.classList.add("content")
        //Checked
        input.type = "checkbox"
        input.checked = plan.done 
         //TextContent
        content.innerHTML = `<input class="task-text" type="text" value="${plan.content}" readonly>`
        edit.innerHTML = "edit"
        del.innerHTML = "delete"
        //PUT
        actions.appendChild(edit)
        actions.appendChild(del)
        label.appendChild(input)
        label.appendChild(span)
        item.appendChild(label)
        item.appendChild(content)
        item.appendChild(actions)
        list.appendChild(item)
        Tasklist.appendChild(list)

        if (plan.done) {
            content.classList.add("done")    
        }

        input.addEventListener("click", e=>{
            plan.done = e.target.checked;
            localStorage.setItem("task", JSON.stringify(Plans))

        if (plan.done) {
            content.classList.add("done")    
        }
        else{
            content.classList.remove("done")
        }
        DisplayTodos()
        })
        //edit
        edit.addEventListener("click", e=>{
            const input = content.querySelector('input')
            input.removeAttribute("readonly") 
            edit.textContent = 'save'
            input.focus()
            input.addEventListener('blur', e=>{
                input.setAttribute('readonly', true)
                plan.content = e.target.value
                localStorage.setItem("task", JSON.stringify(Plans))
                DisplayTodos()
            })
        })
        //delete
        del.addEventListener("click", e =>{
            Plans = Plans.filter(task => task != plan)
            localStorage.setItem("task", JSON.stringify(Plans))
            DisplayTodos()
        })
    });


}
DisplayTodos()
