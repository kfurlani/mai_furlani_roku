export default {
    name: 'TheUserComponent',

    props: ['user'],

    template: `
    <div @click="navToHomePage" class="card rounded userpanel">
    <div class="card-body text-center">
        <img :src='"images/" + user.avatar' class="rounded-circle img-fluid">
        <p>{{user.username}}</p>
    </div>
</div>`,

    methods: {
        navToHomePage() {
            console.log('this user has this level access level:', this.user.permissions);
            //let targetHome = 'home';
            // Every user has permissions as part of their data (this is coming from the database)
            //It's set in the permissions column / permissions field
            //We can use that data to figure out what home page they should have access to - it's like a rating
            //If the access level is less than 3, then they're not an adult and shouldn't see the adult home page
            //If it's GREATER than 3, then they get access to evrything. Because they ARE an adult.
            //if (this.user.permissions < 4) {
                //targetHome = 'KidsHome';
            //} else {
                //targetHome = 'home'
            //}
            let targetHome = (this.user.permissions < 4) ? "kidshome" : "home";
            this.$router.push({ name: targetHome });
        }
    }
}