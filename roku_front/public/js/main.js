// import at the top
import TheLoginComponent from './components/TheLoginComponent.js' ;
import TheUsersComponent from './components/TheUsersComponent.js';
import AllUsersPage from './components/TheAllUsersComponent.js';
import DefaultHome from './components/TheHomePage.js';
import KidsHome from './components/TheKidsHomePage.js';
//import ErrorPage from './modules/ErrorPage.js';

const{ createApp } = Vue;



const router = VueRouter.createRouter({
    
    history: VueRouter.createWebHashHistory(),
    routes: [

        {
            path: '/', 
            name: 'login', 
            component: TheLoginComponent
        },

        //the vue router willl try to math these routes this is what the you put in the location browser when you get a math, vue eill render the specidied component into the router view tag in index.html
        { path: '/', //browser location bar looks like this
        name: 'allusers', //for proframmatic nav
        component: AllUsersPage
        }, // the component render
        
        {
            path: '/home', //This for the adult home page
            name: 'home',
            component: DefaultHome
        },

        {
            path: '/kidshome', //This for the kids home page
            name: 'kidshome',
            component: KidsHome
        },

        {
            path: '/users', 
            name: 'user', 
            component: TheUsersComponent
        }

       // {path: '/:pathMatch(.*)*', 
       // name: 'error', 
       // component: ErrorPage}//
       
    ]
  })
  
 
  const app = Vue.createApp({
    mounted(){
        if (window.localStorage.getItem('user')) {
            this.authenticated = true;
            this.$router.push({name: 'allusers'});
        }
    },
    data() {
        return {
            authenticated: false
        }
    },
        methods: {
            logUserOut() {
                this.authenticated = false;
                window.localStorage.removeItem('user');
                this.$router.push({name: 'login'});
            },

            loggedIn() {
                this.authenticated = true;
            }
        }
   // methods: {
     //   tryRouterPush(){
       //     //programmaic routing
         //   this.$router.push({
           //     name: 'users'
           // })
      //  }
    //}
  });
  // Make sure to _use_ the router instance to make the
  // whole app router-aware.
  app.use(router)
  
  app.mount('#app')
  