import Source from "../data/source";
import '../component/article';

const article = async (id) => {
    let dataSource   = new Source();
    let element      = document.createElement('single-article');
    let doc          = await dataSource.getArticle(id.replace('id=', ''));
    await dataSource.addView(id.replace('id=', ''));
    element.setArticle({...doc.data()});
    document.querySelector('#root').appendChild(element);
};

export default article;


