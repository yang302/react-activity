import React, {
  PureComponent
} from 'react';

import ViewIcon from 'static/img/icon-view.png';

class Login extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleClick() {
    location.href = 'https://galaxy.qiangungun.com/galaxy/www/index.html#/login/multipleSignUp';
  }

  render() {

    return (
      <div className='loginWrapper'>
          <p><img src={ViewIcon}/></p>
          <p className='view'>请登录后查看</p>
          <p className='loginBtn' onClick={this.handleClick.bind(this)}>登录</p>
      </div>
    )
  }
}

export default Login;