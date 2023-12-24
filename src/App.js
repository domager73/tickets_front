import React, {useEffect, useState} from 'react';
import TicketsApiWorker from "./api/TicketsApiWorker";
import {Table, Select, Form, Input, Space, Button, message} from "antd";
import {DeleteOutlined, DownOutlined} from "@ant-design/icons";
import TicketModel from "./Models/TicketModel";
import TicketTypesApiWorker from "./api/TicketTypesApiWorker";

const App = () => {
    const apiTickets = new TicketsApiWorker();
    const apiTicketTypes = new TicketTypesApiWorker();

    const [tickets, setTickets] = useState();

    const [ticketTypesList, setTicketTypesList] = useState();

    useEffect(() => {
        apiTickets.getAllTickets().then((res) => {
            setTickets(res.data);
        });


        try {
            apiTicketTypes.getAllTicketTypes().then((res) => {
                    setTicketTypesList(res.data.map(item => {
                        console.log({value: item.id, label: item.name});
                        return {value: item.id, label: item.name};
                    }));
                    console.log(ticketTypesList);
                }
            );
        } catch (e) {
            setTicketTypesList([{value: '1', label: 'dima'}, {value: '2', label: 'vany'}])
        }
    }, []);

    const columns = [{
        key: "1", title: "ИД", dataIndex: "id",
    }, {
        key: "2", title: "Имя", dataIndex: "ownerFirstName",
    }, {
        key: "3", title: "Фамилия", dataIndex: "ownerLastName",
    }, {
        key: "4", title: "Тип билета", dataIndex: "ticketType",
    }, {
        key: "5", title: "Телефон", dataIndex: "phone",
    }, {
        key: "6", title: "Действия", render: (record) => {
            return (<div>
                <DeleteOutlined
                    onClick={() => {
                        console.log(record.id);

                        apiTickets.deleteTicketsByID(record.id).then(r => apiTickets.getAllTickets().then((res) => {
                            setTickets(res.data);
                        }));
                    }}
                    style={{color: "red", marginLeft: 12}}
                />
            </div>);
        },
    }];

    const [form] = Form.useForm();

    const onFinish = () => {
        let ticket = new TicketModel(
            form.getFieldValue('name'),
            form.getFieldValue("secondName"),
            form.getFieldValue('phone'),
            form.getFieldValue('ticketType'));

        apiTickets.addNewTicket(ticket).then(() => {
            apiTickets.getAllTickets().then((res) => {
                setTickets(res.data);
            });
        });


        console.log(ticket);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (<div>
        <Table dataSource={tickets} columns={columns}/>
        <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            marg
        >
            <text>Введите свои данные</text>
            <Form.Item
                name="name"
                label="Name"
                rules={[{required: true}, {type: 'string', min: 3}]}
            >
                <Input placeholder="input placeholder"/>
            </Form.Item>
            <Form.Item
                name="secondName"
                label="SecondName"
                rules={[{required: true}, {type: 'string', min: 5}]}
            >
                <Input placeholder="input placeholder"/>
            </Form.Item>
            <Form.Item
                name="ticketType"
                label="TicketType"
                rules={[{required: true}]}
            >
                <Select
                    style={{width: 120}}
                    onChange={(value) => {
                    }}
                    options={ticketTypesList}
                />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[{required: true}, {
                    type: 'string',
                },
                    // {validator: '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'}
                ]}
            >
                <Input placeholder="input placeholder"/>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => {
                    }}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </div>);
};

export default App;
