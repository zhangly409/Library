import React, { PropTypes } from 'react';
import { Input } from 'antd';
import style from '../styles/auto-complete.less';

function getItemValue (item) {
  return item.value || item; //取option里的value值
}

class AutoComplete extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      show: false,
      displayValue: '',
      activeItemIndex: -1
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleChange (value) {
    // 按回车键且有列表选项选中时，则将activeItemIndex设置为未选中的状态，调用onChange函数，传入getItemValue(options[activeItemIndex]作为value值返回
    this.setState({activeItemIndex: -1, displayValue: ''});
    this.props.onChange(value);
  }

  handleKeyDown (e) {
    const {activeItemIndex} = this.state;
    const {options} = this.props;

    switch (e.keyCode) {
      case 13: {         // 13为回车键的键码
        if (activeItemIndex >= 0) { //判断是否有列表项选中的状态，acticeItemIndex默认为-1，moveitem函数里定义若按上方向键，则+1；若按下方向键，则-1
          e.preventDefault();
          e.stopPropagation();
          // 如果是回车键，且有列表选中的状态，则调用handlechange函数
          this.handleChange(getItemValue(options[activeItemIndex]));
        }
        break;
      }
      case 38:
      case 40: {
        e.preventDefault();
        this.moveItem(e.keyCode === 38 ? 'up' : 'down');
        break;
      }
    }
  }

  // moveItem来更新选中项，比如按上方向键，选中项上移；实现取消操作，如果activeItemIndex = -1，则表示没有选中项，则选择最后一项
  moveItem (direction) {
    const {activeItemIndex} = this.state;
    const {options} = this.props;
    const lastIndex = options.length - 1;
    let newIndex = -1;

    if (direction === 'up') {
      if (activeItemIndex === -1) {
        newIndex = lastIndex;
      } else {
        newIndex = activeItemIndex - 1;
      }
    } else {
      if (activeItemIndex < lastIndex) {
        newIndex = activeItemIndex + 1;
      }
    }

    let newDisplayValue = '';
    if (newIndex >= 0) {
      newDisplayValue = getItemValue(options[newIndex]);
    }

    this.setState({
      displayValue: newDisplayValue,
      activeItemIndex: newIndex
    });
  }

  handleEnter (index) {
    const currentItem = this.props.options[index];
    this.setState({activeItemIndex: index, displayValue: getItemValue(currentItem)});
  }

  handleLeave () {
    this.setState({activeItemIndex: -1, displayValue: ''});
  }

  render () {
    const {show, displayValue, activeItemIndex} = this.state;
    const {value, options} = this.props;
    return (
      <div className={style.wrapper}>
        <Input
          value={displayValue || value}
          onChange={e => this.handleChange(e.target.value)}
          onKeyDown={this.handleKeyDown}
          onFocus={() => this.setState({show: true})}
          onBlur={() => this.setState({show: false})}
        />
        {show && options.length > 0 && (
          <ul className={style.options} onMouseLeave={this.handleLeave}>
            {
              options.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={index === activeItemIndex ? style.active : ''}
                    onMouseEnter={() => this.handleEnter(index)}
                    onClick={() => this.handleChange(getItemValue(item))}
                  >
                    {item.text || item}
                  </li>
                );
              })
            }
          </ul>
        )}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default AutoComplete;
