
import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, Modal, Switch } from 'antd'
import UserForm from "../../components/UserForm"
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal;

const UserManage = () => {
    const formRef = useRef(null)
    const [dataSource, setDataSource] = useState([])
    const [visible, setVisible] = useState(false);
    const [isUpData, setIsUpData] = useState(false);
    const [regionsList, setRegionsList] = useState([])// 获取属于哪一个州
    const [rolesList, setRolesList] = useState([])  // 用户的角色
    const [currentUser, setCurrentUser] = useState(null) // 拿到当前用户的数据

    useEffect(() => {
        const saveCurrentUser = JSON.parse(localStorage.getItem("token"))
        // 接口请求
        axios.get('/users?_expand=role').then(res => {
            const { data } = res
            setDataSource(saveCurrentUser.roleId === 1 ? data : [
                ...data.filter(item => item.username === saveCurrentUser.username),
                ...data.filter(item => item.region === saveCurrentUser.region && item.roleId === 3)
            ])
        });

        axios.get("/regions").then((res) => {
            setRegionsList(res.data)
        });

        axios.get("/roles").then((res) => {
            setRolesList(res.data)
        })
    }, []);


    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                ...regionsList.map(item => ({
                    text: item.title,
                    value: item.value
                })),
                {
                    text: "全球",
                    value: "全球"
                }
            ],
            // 用户筛选
            onFilter: (value, item) => {
                if (item.region === "")
                    return "全球"
                return item.region === value
            },
            render: region => <b>{region === "" ? "全球" : region}</b>
        },
        {
            title: '角色名称',
            render: (item) => item.role?.roleName
        },
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '用户状态',
            render: (item) => <Switch checked={item.roleState} disabled={item.default} onChange={() => changeSwitchChecked(item)} />
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button style={{ marginRight: '10px' }} danger shape="circle" onClick={() => showConfirm(item)} icon={<DeleteOutlined />} disabled={item.default} />
                        <Button type="primary" shape="circle" onClick={() => upUserData(item)} icon={<EditOutlined />} disabled={item.default} />
                    </div>
                )
            }
        },
    ]

    // 用户状态
    const changeSwitchChecked = (item) => {
        item.roleState = !item.roleState
        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState
        }).then(() => {
            setDataSource([...dataSource])
        })
    }

    const showConfirm = item => {
        confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除吗?',
            onOk() {
                deleteRightList(item)
            }
        });
    }
    const deleteRightList = item => {
        axios.delete(`/users/${item.id}`).then(() => {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            // setVisible(false)
        })
    }

    // 更新用户
    const upUserData = (item) => {
        // console.log(item);
        setTimeout(() => {
            setIsUpData(true)
            // 打开弹窗
            setVisible(true)
            // 获取当前列的数据，并赋值给表单回显！！
            formRef.current.setFieldsValue(item)
            // 获取当前行的数据
            setCurrentUser(item)
        }, 0)
    }

    // form 确认新增、修改用户的弹窗
    const formOk = () => {
        // 新增用户
        if (!isUpData) {
            //formRef.current.validateFields()： 校验数据是否合法
            formRef.current.validateFields().then((res) => {
                //console.log(res);
                const { username, password, region, roleId } = res
                axios.post("/users", {
                    username,
                    password,
                    region,
                    roleId,
                    roleState: true,
                    default: false
                }).then((res) => {
                    //清空输入框
                    formRef.current.resetFields()
                    setDataSource([...dataSource, {
                        ...res.data,
                        //给users添加上role中对应的属性
                        role: rolesList.filter(data => roleId === data.id)[0]
                    }])
                    setVisible(false)
                })

            }).catch((res) => {
                console.log(res);
            })
        } else {
            // 修改用户
            formRef.current.validateFields().then((res) => {
                axios.patch(`/users/${currentUser.id}`, (res)).then(() => {
                    setDataSource(dataSource.map((item) => {
                        if (item.id === currentUser.id) {
                            return {
                                ...item,
                                ...res,
                                role: rolesList.filter(data => res.roleId === data.id)[0]
                            }
                        } else {
                            return item
                        }
                    }))
                    formRef.current.resetFields()
                    setVisible(false)
                })
            })
        }
    }

    return (
        <div>
            <Modal
                visible={visible}
                title={isUpData ? "更新用户" : "添加用户"}
                okText={isUpData ? "更新" : "确定"}
                cancelText="取消"
                onCancel={() => setVisible(false)}
                onOk={formOk}>
                {/* ref={formRef}  获取子组件的dom*/}
                <UserForm ref={formRef} rolesList={rolesList} regionsList={regionsList} isUpData={isUpData} />
            </Modal>
            <Button
                type="primary"
                onClick={() => { setIsUpData(false); setVisible(true) }}
                style={{ marginBottom: '5px' }}
            >添加用户
            </Button>
            <Table rowKey={item => item.id} dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default UserManage;


