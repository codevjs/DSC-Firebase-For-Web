import '../component/listArticle.js';
import Source from "../data/source.js";

const home = async () => {
    let element = document.createElement('list-article');
    new Source().getAllArticles(element);
    document.querySelector('#root').appendChild(element);
};

export default home;


