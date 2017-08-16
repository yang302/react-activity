import React, {
  PureComponent
} from 'react';
import LazyLoad from 'react-lazyload';

import Button from 'components/Button';

import * as util from 'static/js/util';

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: ''
    };
  }

  componentDidMount() {
    const currentDate = this.props.currentDate;
    this.setState({currentDate: currentDate});
  }

  render() {
    const data = this.props.data;

    const list = data.length ? data.map((item ,index) => {
            return (
            <li key={index}>
              <div className='imgContainer'>{item.stick == '1' ? <span className='stick'>置顶</span> : ''}<LazyLoad height={200} offset={400}><a href={item.imgLink}><img src={item.imgUrl} alt=''/></a></LazyLoad></div>
              <p className='clearfix time'>
                <span className='startTime'>{util.formatDate(item.startTime)}</span>至<span className='endTime'>{util.formatDate(item.endTime)}</span><span className='fr'>                
                    {item.startTime > this.state.currentDate ? <Button backgroundColor={'#ddd'}>未开始</Button> : ''} 
                    {item.startTime <= this.state.currentDate && item.endTime >= this.state.currentDate ? <Button backgroundColor={'#fc6047'}>进行中</Button> : ''} 
                    {item.endTime < this.state.currentDate ? <Button backgroundColor={'#ddd'}>已结束</Button> : ''}                  
                </span>
              </p>
            </li>)
          }) : '';

    return (
      <div className='listWrapper'>
        <ul className='clearfix'> 
          {list}
        </ul>
      </div>
    )
  }
}

export default ListItem