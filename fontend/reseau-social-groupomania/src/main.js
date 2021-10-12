import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/custom.scss'
import router from './router'

library.add(faUserSecret)
library.add(faPlusCircle)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


/*class User{
  constructor(userData){
      this.email = userData.email;
      this.username = userData.username;
      this.password = userData.password;
      this.bio = userData.bio;
      this.isAdmin = userData.isAdmin;
  }
};

/*fetch("http://localhost:3000/api/user")
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
                `<div class="card">
                            <div class="card-body">
                                <div class= "card-title h2">${user.username}</div>
                                <div class="card-title h2"> ${user.email}</div>
                                <div class="card-text"> ${user.bio}</div> </br>
                            </div>
                      </div>`
        }
    })

    .catch(function(err) {
        console.log(err);
    }); */