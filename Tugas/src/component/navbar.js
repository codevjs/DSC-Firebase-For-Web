import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";

class Navbar extends HTMLElement {

    constructor() {
        super();
        this.auth = false;
    }

    connectedCallback(){
        const sessionCookie = Cookies.get("session");
        this.auth = !!sessionCookie;
        this.render();
        this.active();
        this.logout();
    }

    active(){
        let path = window.location.href;
        let el   = document.querySelector('.navbar').children;
        for (let i in el){
            if (!el.hasOwnProperty(i)) continue;
            if (!el[i]?.children) break;
            if (el[i]?.children[0].href === path) {
                el[i].className = 'active';
                break;
            }
        }
    }

    logout() {

        let button = document.getElementById("logout");

         if (button) {
             button.onclick = async () => {

                 await firebase.auth().signOut();

                 Cookies.remove("session");

                 window.location.href = "/";

                 this.render();
             }
         }
    }

    render(){

        this.sign =  this.auth ? `<button id="logout" style="background: white; border : 1px solid #ff5483; color: #ff5483" >Keluar</button>` : `<a href="/masuk">Masuk</a>`;

        this.innerHTML = `
                <nav style="overflow: auto">
                    <section class="container">
                        <div style="float: left">
                            <a href="/">
                                <img 
                                    src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
                                    alt="Renaldi Pranata"
                                />
                            </a>
                        </div>
                        <div style="float: right">
                            <ul class="navbar">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/tambah-artikel">Tambah Artikel</a>
                                </li>
                                 <li>
                                    ${this.sign}
                                </li>
                            </ul>
                        </div>
                    </section>
                </nav>
        `
    }
}

customElements.define('nav-bar', Navbar);
