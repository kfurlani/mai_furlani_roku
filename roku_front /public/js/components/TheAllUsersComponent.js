import SingleUser from './TheSingleUserComponent.js';

export default {
    name: 'TheAllUsersComponent',

    template: `
    <section class="user-panel">
    
    <h2 class="login_profile"> CHOOSE PROFILE </h2>
        <section>
                    <user v-for="user in users" :user="user"></user>
        </section>
    </section>
    `,

    created(){
        console.log('all users component is mounted');
        fetch('/ums/users')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //push our users into our VUE data object so we can render a component for each user
            this.users = data;
        })
     .catch(error => console.error(error));
    },

    data() {
        return {
            users: []      
        }
    },

    components: {
        user: SingleUser
    }


}