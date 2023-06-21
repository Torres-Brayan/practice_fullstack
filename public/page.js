
async function getData() {
    try {
        const link = "https://example-db-torres.onrender.com/todos";
        const result = await fetch(link, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
        });
        const data = await result.json();
        const main = document.getElementById('mainDiv');
        for (var i = 0; i < data.length; i++) {
            const htmlBlock = `
        <div class='todos'>
        <p class='todo-id'> ${data[i].id} </p>
        <p> ${data[i].todo_body} </p>
        <button class='select-btn'>select</button>
        </div>
        `;
            main.innerHTML += htmlBlock;
        }
    } catch (err) {
        console.log(err);
    }
}

getData();

async function getDataForOne(id) {
    try {
        const link = `https://example-db-torres.onrender.com/todos/${id}`;
        const result = await fetch(link, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
        });
        const data = await result.json();
        const main = document.getElementById('divForOne');
        const htmlBlock = `
        <div class='todos'>
        <p class='todo-id'> ${data.id} </p>
        <p> ${data.todo_body} </p>
        <button class='Delete-btn'>Delete</button>
        <button class='Edit-btn'>Edit</button>
        </div>
        `;
        main.innerHTML += htmlBlock;
    } catch (err) {
        console.log(err);
    }
}

async function delTodo(id) {
    try {
        const link = `https://example-db-torres.onrender.com/todos/${id}`;
        const result = await fetch(link, {
            method: "DELETE",
        });
        const data = await result.json();
        alert("Deleted");
    } catch (err) {
        console.log(err);
    }
}

async function createTodo(body1) {
    try {
        const link = "https://example-db-torres.onrender.com/todos/";
        const result = await fetch(link, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: "POST",
            body: JSON.stringify({
                todo_body: body1,
            }),
        });
        const data = await result.json();
        alert("Created");
    } catch (err) {
        console.log(err);
    }
}
async function editTodo(id, body1) {
    try {
        const link = `https://example-db-torres.onrender.com/todos/${id}`;
        const result = await fetch(link, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: "PUT",
            body: JSON.stringify({
                todo_body: body1,
            }),
        });
        const data = await result.json();
        alert("todo edited");
    } catch (err) {
        console.log(err);
    }
}


function addlistenr() {
    document.addEventListener('click', (e) => {
        e.preventDefault;
        const targetElement = e.target;
        const selectbtn = targetElement.closest('.select-btn');
        const deletebtn = targetElement.closest('.Delete-btn');
        const editbtn = targetElement.closest('.Edit-btn');
        const submitbtn = targetElement.closest('.submit-btn');
        const submitEditBtn = targetElement.closest('.submit-edit-btn');
        if (selectbtn) {
            let element = e.target.parentElement;
            const id = element.querySelector(".todo-id").textContent
            getDataForOne(id);
        }
        if (deletebtn) {
            let element = e.target.parentElement;
            const id = element.querySelector(".todo-id").textContent
            delTodo(id);
        }
        if (editbtn) {
            openEditForm()
        }
        if (submitbtn) {
            const newbody = document.getElementById("newTodoBody").value;
            createTodo(newbody);
        }
        if (submitEditBtn) {
            const editbody = document.getElementById("editTodoBody").value;
            let element = e.target.parentElement.parentElement;
            const id = element.querySelector(".todo-id").textContent
            editTodo(id, editbody);
        }
    });
}
addlistenr();

function openEditForm() {
    document.getElementById("editDiv").style.display = "block";
}