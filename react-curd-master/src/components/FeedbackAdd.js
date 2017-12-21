import React from 'react';
import { Input, InputNumber, Form, Button, message ,Select} from 'antd';
import AutoComplete from '../components/AutoComplete';
import request, { get } from '../utils/request';

const Option = Select.Option;
const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class FeedbackAdd extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    // 在componentWillMount里使用form.setFieldsValue无法设置表单的值
    // 所以在componentDidMount里进行赋值
    // see: https://github.com/ant-design/ant-design/issues/4802
    const {editTarget, form} = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    const {form, editTarget} = this.props;

    form.validateFields((err, values) => {
      if (err) {
        message.warn(err);
        return;
      }

      let editType = '添加';
      let apiUrl = 'http://localhost:3000/feedback';
      let method = 'post';
      if (editTarget) {
        editType = '编辑';
        apiUrl += '/' + editTarget.id;
        method = 'put';
      }

      request(method, apiUrl, values)
        .then((res) => {
          if (res.id) {
            message.success(editType + '反馈成功');
            this.context.router.push('/feedback/list');
          } else {
            message.error(editType + '失败');
          }
        })
        .catch((err) => console.error(err));
    });
  }

  timer = 0;


  render () {
    const {recommendUsers} = this.state;
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width: '400px'}}>
        <FormItem label="姓名：" {...formLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入姓名'
              }
            ]
          })(<Input type="text"/>)}
        </FormItem>

        <FormItem label="年龄：" {...formLayout}>
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: '请输入年龄',
                type: 'number'
              },
              {
                min: 1,
                max: 99,
                type: 'number',
                message: '请输入1~99的数字'
              }
            ]
          })(<InputNumber/>)}
        </FormItem>

        <FormItem label="性别：" {...formLayout}>
        {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: '请输入性别'
              }
            ]
          })(<Select >
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          </Select>)}
        </FormItem>
        <FormItem label="反馈内容：" {...formLayout}>
        {getFieldDecorator('feedbackcontent', {
            rules: [
              {
                required: true,
                message: '请输入反馈内容'
              }
            ]
          })(<Input type="textarea" autosize={{minRows: 5, maxRows: 10 }}/>)}
        </FormItem>
        <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

FeedbackAdd.contextTypes = {
  router: React.PropTypes.object.isRequired
};

FeedbackAdd = Form.create()(FeedbackAdd);

export default FeedbackAdd;