export default{
    name: 'TheAllUsersComponent',

    created(){
        //get all of our users from the database - everyone with a profile connected to Roku.
        //we would then render a profile panel for each user using a sub-component inside of this main component
    },

    template: `
    <section>
    <h1> this is the all users component</h1>
    <p> render a panel for every user in the database</p>
    </section>
        `,

    methods: {
        navToUserHome(){
            //nav to the user home page parents/kids etc, we'll pass along the user object that goes with the user panel we click on
        }
    }


}