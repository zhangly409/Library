import React from 'react';
import { hashHistory } from 'react-router'
import { Table } from 'antd';
import { get, del } from '../utils/request';
import {Link} from 'react-router'
import {convertGender} from './../utils/EnumConvertUtil'

class FeedbackList extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        feedbackList: []
      };
    }

    componentWillMount () {
        get('http://localhost:3000/feedback')
          .then(res => {
            this.setState({
              feedbackList: res
            });
          });
      }
      render () {
        const {feedbackList} = this.state;
    
        const columns = [
          {
            title: '用户ID',
            dataIndex: 'id'
          },
          {
            title: '用户名',
            dataIndex: 'name'
          },
          {
            title: '性别',
            dataIndex: 'gender',
            render: c => convertGender(c)
          },
          {
            title: '年龄',
            dataIndex: 'age'
          },
          {
            title: '反馈内容',
            dataIndex: 'feedbackcontent'
          },
          {
            title: '详情',
            dataIndex: 'feedbackdetail',
            render :(c,record) => <Link to={`/feedback/detail/${record.id}`}>详情链接</Link>
          }
        ];
    
        return (
          <Table columns={columns} dataSource={feedbackList} rowKey={row => row.id}/>
        );
      }
}

export default FeedbackList