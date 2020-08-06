import React, { Component } from 'react';
import {
  Button,
  Form,
  Upload,
  Icon,
} from 'antd';

@Form.create()
class UploadDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /**
   * 重置imageList
   */
  restUpLoad = () => {
    const { form } = this.props;
    // 建议使用form.setFieldsValue()去置空, 使用form.resetFields()置空还会存在值
    form.setFieldsValue({
      "imageList": undefined,
    });
  };

  /**
   * 上传组件自定义校验
   */
  handleUploadListen = (rule, value, callback) => {
    let listLog = true;
    let newCode = "200";
    if (value && value.length > 0) {
      value.map((item) => {
        const { response = {} } = item;
        const { code } = response;
        if (item.status === "error") {
          listLog = false;
        }
        if (code && code !== "200") {
          newCode = code;
        }
        return null;
      });

      if (!listLog || newCode !== "200") {
        callback("上传错误，请重新上传！");
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  /**
   * 提交
   * @param {Object} e event
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newImageList = []; // 服务端文件名（传参）
        const { imageList } = values;
        if (imageList && imageList.length > 0) {
          imageList.map((item) => {
            const { response } = item;
            if (item.status !== "error" && response && response.code === "200") {
              newImageList.push(response.data);
            }
            return null;
          });
        }
      }
    });
  };
  
  /**
   * 使用getValueFromEvent可以把 onChange 的参数（如 event）转化为控件的值
   * @param {Array} e event
   */
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render () {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="上传图片">
            {getFieldDecorator('imageList', {
              rules: [
                {
                  required: true,
                  message: '必填项',
                },
                {
                  validator: this.handleUploadListen, // 自定义校验
                },
              ],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload
                accept=".png, .jpg, .jpeg" // 支持的文件类型
                action="/api/uploadImg" // 上传接口的url
                listType="picture"
                multiple
                name="file" // 发到后台的文件参数名
                method="get"
                data={{ // 额外传参
                  fileType: 0,
                }}
                directory //支持上传文件夹（支持后无法单独上传一张图片...）
              >
                <Button>
                  <Icon type="upload" />
                  上传图片
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default UploadDemo;