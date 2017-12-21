import React from 'react';
import { get } from '../utils/request';

class FeedbackDetail extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            fbdetail:[]
        }
        this.queryFeedbackDetail = this.queryFeedbackDetail.bind(this)
    }
    componentWillMount(){
        this.queryFeedbackDetail()
    }
    queryFeedbackDetail() {
        const id  = this.props.params.id
        console.log(this)
        console.log(this.props.params.id)
        get('http://localhost:3000/feedback?id=' + id) // 获取列表的接口可以追加查询参数
        .then((res) => {
          this.setState({
            fbdetail: res
          });
        });
    }
    
    render() {
        const {fbdetail}=this.state;
        // const detail=fbdetail[0];
        return (
            <div>{fbdetail.map(item =>item.feedbackcontent)}</div>
        )
    }
}

export default FeedbackDetail