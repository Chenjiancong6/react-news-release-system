//角色列表
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Tree } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios"

const { confirm } = Modal;

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [rightsList, setRightsList] = useState([]); // 取角色的菜单,"/user-manage"
    const [rightsId, setRightsId] = useState(0); // 角色的id
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        axios.get("/roles").then(res => {
            setDataSource(res.data);
        });
        // 拿到所有角色的权限菜单
        axios.get("/rights?_embed=children").then(res => {
            setTreeData(res.data);
        });
    }, [])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: id => <b>{id}</b>,
        },
        {
            title: "角色名称",
            dataIndex: "roleName",
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button
                            style={{ marginRight: '10px' }}
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => showConfirm(item)}
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setIsModalVisible(true);
                                setRightsList(item.rights);
                                setRightsId(item.id)
                            }}
                        />
                    </div>
                )
            }
        }
    ]

    // 删除弹窗
    const showConfirm = (item) => {
        confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除吗?',
            onOk() {
                deleteRoleList(item)
            }
        });
    }
    // 删除角色
    const deleteRoleList = (item) => {
        axios.delete(`/roles/${item.id}`).then(() => {
            setDataSource(dataSource.filter(data => data.id !== item.id));
        })
    }

    // 确认弹窗
    const handleOk = () => {
        axios.patch(`/roles/${rightsId}`, {
            rights: rightsList,
        }).then(() => {
            setDataSource(dataSource.map(item => {
                // 重新保存菜单
                if (item.id === rightsId) {
                    return {
                        ...item,
                        rights: rightsList
                    }
                }
                return item;
            }));
        });
        setIsModalVisible(false)
    }

    // 树形数据打勾
    const onCheck = (data) => {
        setRightsList(data.checked);
    }

    return (
        <div>
            <Table rowKey={item => item.id} dataSource={dataSource} columns={columns} />
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={() => handleOk()}
                onCancel={() => setIsModalVisible(false)}
            >
                <Tree
                    checkStrictly
                    checkable
                    treeData={treeData}
                    checkedKeys={rightsList}
                    onCheck={onCheck}
                />
            </Modal>
        </div>
    )
}