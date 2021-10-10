fetch("http://localhost:3000//api/stuff")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(value) {

        for (let cameraData of value) {
            let camera = new Camera(cameraData);
            document
                .getElementById("content") //ajout de l'id derrière le lien de la page "productview afin de l'afficher et le récupérer//
                .innerHTML +=
                `<div class="card my-2 my-md-5">
                            <div class="card-body">
                                <img class="card-img-top p-3 mb-5 bg-body rounded img-fluid" src="${camera.imageUrl}" alt= "appareil photo">
                                <a href ="product_view.html?${camera.id}" class="text-decoration-none stretched-link text-dark img-fluid">
                                <div class="card-title h2"> ${camera.title}</div></a> 
                                <div class="card-text display-6"> ${camera.description}</div> </br>
                                <div class="card-text display-6">Prix :  ${camera.price} cents</div>
                                 
                            </div>
                      </div>`
        }
    })

    .catch(function(err) {
        console.log(err);
    });