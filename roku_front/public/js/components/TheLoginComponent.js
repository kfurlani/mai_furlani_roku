export default {
    name: 'TheLoginComponent',

    template: `
    <section class="container">
    <div class="jumbotron">
        <h1>Welcome to Flashblack!</h1>
        <p class="lead">
        Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.
        </p>
    </div>

    <section class="log-in">
      <label class="sr-only" for="inlineFormInputName">Name</label>
      <input ref="username" v-model="username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>

      <label class="sr-only" for="inlineFormPassword">Name</label>
      <input ref="password" v-model="password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
    </section>
    <button @click="tryLogIn"
        type="submit" 
        class="btn btn-primary login-submit"
      >Go!
    </button>
   
<!-- if the user doesn't exist in database then they don't exist so signup -->
<button v-if="signUp" @click="trySignUp"
    type="submit" 
    class="btn btn-primary login-submit signup"
  >Join!
</button>
  </section>` ,

  data() {
    return {
      username: '',
      password: '',
      authenticated: false,
      signUp: false
    }
  },

  methods: {
    trySignUp(){
      debugger;
    },

    tryLogIn() {
      //Check t osee if there are a username and password
      //and maje sure there's no extrawhite space

      if (this.username.trim().length == 0) {
        //this means the username input is empty
        //the trim() method gets rid of any white space before or after text
        console.log('username is empty, mark the field and let the user know');
        this.$refs['username'].classList.add('missing-field');
        return;
      } else if (this.password.trim().length == 0) {
        console.log('password is empty, mark the field and let the user know');
        this.$refs['password'].classList.add('missing-field');
        return;
      }

      //end the input checks and remove marked fields css classes
      this.$refs['username'].classList.remove('missing-field');
      this.$refs['password'].classList.remove('missing-field');

      // try writing a temp fetch call to the back end login service
      console.log('login script should be good to go');

      //Create a user object with the username and password
      //and the pass that to the back end validation service

      let user = {
        username: this.username,
        password: this.password
      }

      //let formData = new FormData();
      //formData.append("username", this.username);
      //formData.append("password", this.password);
      
      fetch('/ums/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'no user') {
          // check for user, and then provide a signup button
          this.signUp = true;

        } else if (data.message == 'wrong password') {
          // password didn't match, try again
          this.$refs['password'].classList.add('missing-field');

        } else {
          this.$emit('setauthenticated');
          //ssave the user data locally on our system
          window.localStorage.setItem('user',JSON.stringify(data.user));
          this.$router.push({ name: 'allusers' });
        }
      })
      .catch(error => console.error(error));
      //end fetch call
    }
  }

}