class LogoutBtn extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `<button>Logout!</button>`;
        this.onclick = () => {
            localStorage.removeItem('my_name');
            location.reload();
        }
    }
}

customElements.define('logout-btn', LogoutBtn);
