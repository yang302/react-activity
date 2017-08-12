import React, {
  PureComponent
} from 'react';

class Button extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const style = {
      backgroundColor : this.props.backgroundColor
    };

    return (
      <span className='btnWrapper' style={style}>   
        {
          React.Children.map(this.props.children, function (child) {
            return <i >{child}</i>;
          })
        }
      </span>
    )
  }
}

export default Button