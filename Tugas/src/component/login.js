import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";

class Login extends HTMLElement {

    constructor() {
        super();
        this.isLoading = false
    }

    connectedCallback() {
        this.render();
        this.onSubmit();
    }

    onSubmit() {

        const form = document.querySelector('form');

        const signInWithGoogle = document.querySelector("#masuk-google");

        signInWithGoogle.addEventListener("click",  async () => {

            let provider = new firebase.auth.GoogleAuthProvider();

            let response = await firebase.auth().signInWithPopup(provider);

            Cookies.set('session', JSON.stringify(response.user), { expires: 7 });

            window.location.href = '/';

        })

        form.addEventListener('submit', async e => {
            try {

                e.preventDefault();

                const {email, password} = e.target.children;

                this.isLoading = true;

                this.render(email.value, password.value);

                this.onSubmit();

                // TODO masuk menggunakan email dan password auth sdk
                const response = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);

                // TODO menyimpan info pengguna pada cookie atau local storage
                Cookies.set('session', JSON.stringify(response.user), { expires: 7 });

                window.location.href = '/';

            } catch (e) {

                alert(e.message);

                console.log(e)

                this.isLoading = false;

                this.render();

                this.onSubmit();

            }
        })
    }

    render(email = "", password = "") {

        this.innerHTML = `
            <div>
                <form>
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        value="${email}"
                        required
                     />
                     <br/>
                     <br/> 
                     <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value="${password}"
                        required
                     />
                     <br/>
                     <br/> 
                    <Button type="submit" >
                       ${this.isLoading ? 'Loading...' : 'Masuk'}
                    </Button>
                    
                    <Button id="masuk-google" type="button" style="margin-left: 10px">
                       Masuk Dengan Google
                    </Button>
                    
                </form>
            </div>
        `
    }
}

customElements.define('login-app', Login);
