// 列表权限组件
import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal;

export default function RightList() {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => {
            //为了让首页不出现下级图标
            const list = res?.data;
            list.forEach(element => {
                if (element.children.length === 0)
                    element.children = ""
            });
            setDataSource(list)
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            //当有render方法，就不会按照dataIndex执行，而是执行render
            render: id => <b>{id}</b>
        },
        {
            title: '权限列表',
            dataIndex: 'title'
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: key => <Tag color="orange">{key}</Tag>
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button danger onClick={() => showConfirm(item)} style={{ marginRight: '10px' }} shape="circle" icon={<DeleteOutlined />} />
                        <Popover content={
                            <div style={{ textAlign: "center" }}>
                                <Switch onChange={() => changeSwitchCheck(item)} checked={item.pagepermisson === 1} />
                            </div>
                        }>
                            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
                        </Popover>
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
                deleteRightList(item)
            }
        });
    }

    // 删除函数
    const deleteRightList = (item) => {
        // console.log(item);
        // 删除第一层
        if (item.grade === 1) {
            axios.delete(`/rights/${item.id}`).then(() => {
                // 删除后更新hooks 数据，filter作用是过滤掉已经被删除的数据
                setDataSource(dataSource.filter((data) => data.id !== item.id))
            })
        } else {
            // 删除展开层
            // 通过子rigthId找到父id
            let list = dataSource.filter(data => data.id === item.rightId)
            // 过滤数据。 list是双向绑定，因为其是dataSource的浅拷贝
            list[0].children = list[0].children.filter(data => data.id !== item.id)

            axios.delete(`/children/${item.id}`).then(() => {
                setDataSource([...dataSource]) // 删除成功后更新hooks 数据
            })
        }
    }

    /**
     * 配置的开关
     * 在sideMenu  侧边栏页面设置了权限
     * decision函数中，当pagepermisson == 1 时才渲染
     */
    const changeSwitchCheck = (item) => {
        // 取反
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;

        if (item.grade === 1) {
            axios.patch(`/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            }).then(() => {
                // 更新hooks
                setDataSource([...dataSource])
            })
        } else {
            // 修改展开层
            axios.patch(`/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            }).then(() => {
                setDataSource([...dataSource])
            })
        }
    }

    return (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    )
}