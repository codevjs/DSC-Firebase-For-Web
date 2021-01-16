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

               // TODO mengupload gambar ke firebase storage

               // TODO menyimpan artikel ke database

               // TODO menampilkan pesan

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
