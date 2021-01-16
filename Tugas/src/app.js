import firebase from "firebase/app";
import "regenerator-runtime";
import Navigo from "navigo";

// css
import './style/main.css';

// component
import './component/navbar.js';
import './component/sider.js';
import './component/footer.js';

// view
import home from './view/home.js';
import addArticle from "./view/addArticle.js";
import article from "./view/article.js";
import login from "./view/login";


// Your web app's Firebase configuration
// TODO Masukkan configurasi firebase
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
firebase.initializeApp(config);

const router = new Navigo();

router
    .on({
        '/': () => home(),
        '/artikel' : (param, query) => article(query),
        '/tambah-artikel': () => addArticle(),
        '/masuk': () => login(),
    })
    .resolve();


