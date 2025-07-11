async function logar(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {email,senha};

    const response = await fetch('http://localhost:3001/usuario/login', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)      
    })

    let results = await response.json();

    if(results.success) {
        window.location.href = "../paginaInicial/index.html"

        alert(results.message)
    } else {

        alert(results.message)
    }
    
}