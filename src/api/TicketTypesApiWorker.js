import axios from "axios";
import LocalStorage from "../Repository/localStorage";

class TicketTypesApiWorker {
    #axios;
    localSoragess;

    constructor() {
        this.localSoragess = new LocalStorage();

        this.#axios = axios.create({
            baseURL: "http://localhost:5151/ticket-types/",
        });
    }

    async getAllTicketTypes() {
        return await this.#axios.get("get-all", {
            headers: {
                "Authorization": "Bearer " + this.localSoragess.get('jwt')
            }
        });
    }
}

export default TicketTypesApiWorker;