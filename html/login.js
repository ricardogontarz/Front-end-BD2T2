function submitForm() {
    const form = document.getElementById("loginForm");

    if (form.checkValidity()) {

        const user = document.getElementById("user").value;
        const senha = document.getElementById("tf_senha").value;

        fetch("http://localhost:8081/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: user, senha: senha })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na autenticação");
            }
            return response.json();
        })
        .then(data => {

            console.log("Resposta da API:", data);
           // window.location.href= "/Venda/venda.html"
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro na autenticação. Consulte o console para mais informações.");
        });
    } else {
        form.classList.add("was-validated");
    }
}