import axios from "axios";
import LocalStorage from "../Repository/localStorage";

class TicketsApiWorker {
    #axios;
    localSoragess;

    constructor() {
        this.localSoragess = new LocalStorage();

        this.#axios = axios.create({
            baseURL: "http://localhost:5151/tickets/",
        });
    }

    async getAllTickets() {
        return await this.#axios.get("get-all", {
            headers: {
                "Authorization": "Bearer " + this.localSoragess.get('jwt')
            }
        });
    }

    async deleteTicketsByID(id) {
        return await this.#axios.delete(`delete/${id}`,{
            headers: {
                "Authorization": "Bearer " + this.localSoragess.get('jwt')
            }
        });
    }

    async addNewTicket(ticket) {
        return await this.#axios.post(`add`, ticket,{
            headers: {
                "Authorization": "Bearer " + this.localSoragess.get('jwt')
            }
        });
    }
}

export default TicketsApiWorker;