import React, {useEffect, useState} from 'react';
import TicketsApiWorker from "./api/TicketsApiWorker";
import {Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const App = () => {
    const api = new TicketsApiWorker();

    const [tickets, setTickets] = useState();

    useEffect(() => {
        api.getAllTickets().then((res) => {
            setTickets(res.data);
        });
    }, []);

    const columns = [
        {
            key: "1",
            title: "ИД",
            dataIndex: "id",
        },
        {
            key: "2",
            title: "Имя",
            dataIndex: "ownerFirstName",
        },
        {
            key: "3",
            title: "Фамилия",
            dataIndex: "ownerLastName",
        },
        {
            key: "4",
            title: "Тип билета",
            dataIndex: "ticketType",
        },
        {
            key: "5",
            title: "Телефон",
            dataIndex: "phone",
        },
        {
            key: "6",
            title: "Действия",
            render: (record) => {
                return (
                    <div>
                        <DeleteOutlined
                            onClick={() => {
                                console.log(record.id);

                                api.deleteTicketsByID(record.id).then(r => api.getAllTickets().then((res) => {
                                    setTickets(res.data);
                                }));
                            }}
                            style={{color: "red", marginLeft: 12}}
                        />
                    </div>
                );
            },
        }
    ];

    return (
        <div>
            <Table dataSource={tickets} columns={columns}/>
        </div>
    );
};

export default App;
