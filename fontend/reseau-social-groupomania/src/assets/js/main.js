fetch("http://localhost:3000/api/user")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(value) {

        for (let userData of value) {
            let user = new User(userData);
            document
                .getElementById("content") //ajout de l'id derrière le lien de la page "productview afin de l'afficher et le récupérer//
                .innerHTML +=
                `<div class="card my-2 my-md-5">
                            <div class="card-body">
                                <a href ="product_view.html?${camera.username}" class="text-decoration-none stretched-link text-dark img-fluid">
                                <div class="card-title h2"> ${camera.email}</div></a> 
                                <div class="card-text display-6"> ${camera.bio}</div> </br>
                            </div>
                      </div>`
        }
    })

    .catch(function(err) {
        console.log(err);
    });