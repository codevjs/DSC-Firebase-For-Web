import firebase from "firebase/app";
import "firebase/storage";
import Cookies from "js-cookie";
import Source from "../data/source";

class addArticle extends HTMLElement {

    constructor() {

        super();
    }

    // Akan terpanggil setiap kali elemen berhasil ditambahkan ke dokumen HTML (DOM).
    // Callback ini merupakan tempat yang tepat untuk menjalankan konfigurasi awal seperti mendapatkan data,
    // atau mengatur attribute.
    connectedCallback() {
        this.render(); // render element
        this.onSubmit();

        // TODO cek cookie apabila cookie tidak ada maka akan ke redirect ke halaman masuk
        let session = Cookies.get("session");

        if (session === undefined) {
            alert("Masuk terlebih dahulu");
            window.location.href = "/masuk"
        }
    }

    onSubmit() {

        const form          = document.querySelector('form');
        const buttonSubmit  = document.querySelector('#button-submit');

        form.addEventListener('submit', async e => {
           try {

               e.preventDefault();

               console.log(buttonSubmit)

               buttonSubmit.textContent = "Loading ....";

               const {image, title, description, category} = e.target.children;

               const file = image.files[0];

               function guidGenerator() {
                   let S4 = function() {
                       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                   };
                   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
               }

               // TODO mengupload gambar ke firebase storage
               let downloadURL = await new Promise((resolve, reject) => {

                   let storageRef = firebase.storage().ref();

                   let imageRef   = storageRef.child(guidGenerator());

                   let uploadTask = imageRef.put(file);

                   // Register three observers:
                   // 1. 'state_changed' observer, called any time the state changes
                   // 2. Error observer, called on failure
                   // 3. Completion observer, called on successful completion
                   uploadTask.on('state_changed', function(snapshot){
                       // Observe state change events such as progress, pause, and resume
                       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                       // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                       // console.log('Upload is ' + progress + '% done');
                       // switch (snapshot.state) {
                       //     case firebase.storage.TaskState.PAUSED: // or 'paused'
                       //         console.log('Upload is paused');
                       //         break;
                       //     case firebase.storage.TaskState.RUNNING: // or 'running'
                       //         console.log('Upload is running');
                       //         break;
                       // }
                   }, function(error) {
                       // Handle unsuccessful uploads
                        return reject(error.message);
                   }, function() {
                       // Handle successful uploads on complete
                       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                           return resolve(downloadURL);
                       });
                   });
               })

               // TODO menyimpan artikel ke database
               let message = await new Source().setArticle({
                   image : downloadURL,
                   title : title.value,
                   description : description.value,
                   category : category.value,
                   timestamp : new Date()
               })

               // TODO menampilkan pesan
               window.alert(message);

               this.render();

               this.onSubmit();

           } catch (e) {

               alert(e);

               this.render();

               this.onSubmit();

           } finally {

               buttonSubmit.textContent = "Tambahkan";
           }
        })
    }

    render() {

        this.innerHTML = `
            <div>
                <form>
                    <label>Gambar</label>
                    <input 
                        type="file" 
                        name="image" 
                        placeholder="example : https://xnxx.com/gambar.png" 
                        required
                    />
                    <br/>
                    <br/> 
                    <label>Judul Artikel</label>
                    <input 
                        type="text" 
                        name="title" 
                        required
                     />
                     <br/>
                     <br/> 
                      <label>Kategori</label>
                      <select name="category" required>
                            <option value="Berita">Berita</option>
                            <option value="Teknologi">Teknologi</option>
                            <option value="Olahraga">Olahraga</option>
                       </select>
                      <br/>
                      <br/> 
                    <label>Deskripsi</label>
                    <textarea name="description" required ></textarea>
                    <br/>
                    <br/>
                    <Button id="button-submit" type="submit" name="submit" >
                      Tambahkan
                    </Button>
                </form>
            </div>
        `;
    }
}

customElements.define("add-article", addArticle);
