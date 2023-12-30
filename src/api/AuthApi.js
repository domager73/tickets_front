import axios from "axios";

class AuthApi {
    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:5151/auth/"
        });
    }

    async login(user) {
        return await this.#axios.post(`login`, user);
    }

    async verifyLogin(userWithCode) {
        return await this.#axios.post(`verify-login`, userWithCode);
    }
}

export default AuthApi;