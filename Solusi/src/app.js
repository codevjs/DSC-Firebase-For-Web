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
const config = {
    apiKey: "AIzaSyDdCqWTe1TEFXRy9gTKIVhgquHXg3-wmKg",
    authDomain: "dsc-firebase-8b756.firebaseapp.com",
    projectId: "dsc-firebase-8b756",
    storageBucket: "dsc-firebase-8b756.appspot.com",
    messagingSenderId: "313965723430",
    appId: "1:313965723430:web:5f8a6cbf09c504ce814be7"
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


