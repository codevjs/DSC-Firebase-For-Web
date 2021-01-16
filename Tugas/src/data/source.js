import firebase from "firebase/app";
import "firebase/firestore";

class Source {

    constructor() {
        this._collection = 'articles'
    }

    ref() {
        // return firebase.firestore().collection(this._collection);
    }

    /**
     * @param query
     * @param {$ElementType} renderer
     */
    getDocumentsInQuery(query, renderer) {
        // TODO fetch data dari database
        // query.onSnapshot(snapshot => {
        //     if (!snapshot.size) return renderer.articles = [];
        //     let data = [];
        //     snapshot.forEach(doc => {
        //         data.push({...doc.data(), id: doc.id})
        //     });
        //     return renderer.articles = data;
        // });
    }

    /**
     * @param {$ElementType} renderer
     */
    getAllArticles(renderer) {
        // TODO membuat query untuk mengambil semua data artikel
        // let query = this.ref()
        // this.getDocumentsInQuery(query, renderer);
    }

    /**
     *
     * @param id
     * @returns {Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>}
     */
    getArticle(id) {
        // TODO membuat query untuk mengambil data artikel berdasarkan id
        // return this.ref().doc(id).get()
    }

    /**
     *
     * @param filter
     * @param renderer
     */
    getFilteredArticle(filter, renderer) {
        // TODO membuat query untuk menyaring data artikel berdasarkan kategori
        // let query;
        // if (filter !== 'Semua'){
        //     query = this.ref()
        //         .where('category', '==', filter)
        //         .orderBy('title', "asc");
        // }else {
        //     query = this.ref();
        // }
        //
        // this.getDocumentsInQuery(query, renderer);
    }

    /**
     * @param {object} data
     * @return {Promise<string>}
     */
    setArticle(data) {
        // TODO membuat query untuk membuat artikel baru
        // return this.ref().add(data)
        //     .then(() => {
        //         return Promise.resolve('Artikel berhasil ditambahkan.')
        //     })
        //     .catch(error => {
        //         return Promise.reject(error.message)
        //     })
    }

    /**
     * 
     * @param articleId
     */
    addView(articleId){
        // TODO membuat transaksi viewers pada artikel
        // let document = this.ref().doc(articleId);
        // firebase.firestore().runTransaction(transaction => {
        //    return transaction.get(document)
        //        .then(doc => {
        //            let data = doc.data();
        //            return transaction.update(document, {
        //                views : data.views ? data.views + 1 : 1
        //            })
        //        })
        // });
    }

}

export default Source
