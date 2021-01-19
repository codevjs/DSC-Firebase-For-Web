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
    apiKey: "AIzaSyDliysy6ibZjg4JGCCHFis0jeYfI5lbkrU",
    authDomain: "testing-dsc-e76b1.firebaseapp.com",
    databaseURL: "https://testing-dsc-e76b1-default-rtdb.firebaseio.com",
    projectId: "testing-dsc-e76b1",
    storageBucket: "testing-dsc-e76b1.appspot.com",
    messagingSenderId: "771203247658",
    appId: "1:771203247658:web:6a7bcc4b9a4c1c6f541d53"
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


