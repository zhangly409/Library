import React from 'react';
import { Table } from 'antd';
import { get, del } from '../utils/request';

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
            dataIndex: 'gender'
          },
          {
            title: '年龄',
            dataIndex: 'age'
          },
          {
            title: '反馈内容',
            dataIndex: 'feedbackcontent'
          }
        ];
    
        return (
          <Table columns={columns} dataSource={feedbackList} rowKey={row => row.id}/>
        );
      }
}

export default FeedbackList