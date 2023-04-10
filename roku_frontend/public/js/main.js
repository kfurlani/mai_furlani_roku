// import your modules/components here
import LoginPage from "./components/TheLoginComponent.js";
import AllUsersPage from "./components/TheAllUsersComponent.js";
import KidsHome from "./components/TheKidsHomeComponent.js";
import DefaultHome from "./components/TheDefaultHomeComponent.js";


const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes: [ // vue will try to match the following routes
            // and render the appropriate component onto the page
    { 
        path: '/', // the location bar URL
        name: `login`, // the name of the route (for programmic navigation)
        component: LoginPage //the component to render
    },

    { 
      path: '/users', // the location bar URL
      name: `allusers`, // the name of the route (for programmic navigation)
      component: AllUsersPage //the component to render
    },
    { 
          path: '/home', // the location bar URL
          name: `defaultHome`, // the name of the route (for programmic navigation)
          component: DefaultHome //the component to render
    },
    { 
        path: '/kids', // the location bar URL
        name: `kidsHome`, // the name of the route (for programmic navigation)
        component: KidsHome //the component to render
    }
  ] // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = Vue.createApp({

  mounted() {

    // check to see if the user has already logged in.
    // if they have, push them to the all users route
    if(window.localStorage.getItem('user')) {
      this.authenticated = true;
      this.$router.push({name: 'allusers'});
    }
  },

  data() {
    return {
      authenticated: false,
      // save the current user so that we can access this data later
      currentUser: {}
    }
  },

  methods: {
    
    setAuth() {
      this.authenticated = true;
    },

    logOut() {
      // switch off controls
      this.authenticated = false;

      this.currentUser = {};

      window.localStorage.removeItem('user');
      // push the user back to the login
      this.$router.push({name: 'login'});
    },

    changeUser(){
      // send the user back to the all users view
      this.$router.push({name: 'allusers'})
    },

    setCurrentUser(user){
      // recieve the user data from the user's panel in the alluserscomponent
      // save it here so that we can re-inject it into the user's home page
      this.currentUser = user;
    },

    created(){
      if (window.localStorage.getItem('user')) {
          this.$router.push({name: 'allusers'});
      }
    }

}
})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);
app.mount('#app');

// Now the app has started!
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ac74eb31femsh5a6e6ed80df43a7p10857djsn00f94077808e',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=game', options)
	.then(response => response.json())
	.then(data => {
    const list = data.d;

    list.map((item) => {
      const name = item.l;
      const poster = item.i.imageUrl;
      const movie = `<li><img src="${poster}" <h2>${name}</h2></li>`

      document.querySelector('.movies').innerHTML += movie;
    })
  })
	.catch(err => console.error(err));