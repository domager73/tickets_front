import axios from "axios";

class TicketsApiWorker {
    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:5151/tickets/"
        });
    }

    async getAllTickets() {
        return await this.#axios.get("get-all");
    }

    async deleteTicketsByID(id) {
        return await this.#axios.delete(`delete/${id}`);
    }

    async addNewTicket(ticket) {
        return await this.#axios.post(`add`, ticket);
    }
}

export default TicketsApiWorker;