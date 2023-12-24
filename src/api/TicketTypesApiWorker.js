import axios from "axios";

class TicketTypesApiWorker {
    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:5151/ticket-types/"
        });
    }

    async getAllTicketTypes() {
        return await this.#axios.get("get-all");
    }
}

export default TicketTypesApiWorker;