class Footer extends HTMLElement {

    constructor() {
        super();

    }

    connectedCallback(){

        this.render();
    }

    render(){
        this.innerHTML = `
                <footer>
                     <div class="footer-text">
                        <div class="container">
                            <p>copyright © Renaldi Pranata | Firebase for WEB</p>
                        </div>
                    </div>
                </footer>
        `
    }
}

customElements.define('footer-bar', Footer);
