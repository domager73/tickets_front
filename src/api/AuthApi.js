import axios from "axios";

class AuthApi {
    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:5151/auth/"
        });
    }

    async login(email) {
        return await this.#axios.post(`login?email=${email}`);
    }

    async verifyLogin(email, code) {
        return await this.#axios.post(`verify-login?email=${email}&code=${code}`);
    }
}

export default AuthApi;