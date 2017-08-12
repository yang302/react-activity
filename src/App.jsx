import React, {
  PureComponent
} from 'react';

import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from 'react-tabs';
import * as util from 'static/js/util';
import SessionStorage from 'static/js/sessionStore';

import {
  getListData
} from '../fetch/activity/activity';

import ListItem from 'components/ListItem';
import Login from 'components/Login';

import './App.scss';

import NoneIcon from 'static/img/icon-none.png';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasLogin: false,
      tabIndex: 0,
      currentDate: '',
      allList: [],
      myList: []
    };
  }

  componentWillMount() {
    const objParams = util.urlParse();
    const userId = objParams.userId;
    const sessionId = objParams.sessionId;
    SessionStorage.setItem('userInfo', JSON.stringify(objParams));

    if (userId != null && sessionId != null) {
      this.setState({
        hasLogin: true
      });
    } else {
      this.setState({
        hasLogin: false
      });
    }
  }

  componentDidMount() {
    const result = getListData();
    result.then(res => {
      if(res.ok){
        return res.json();
      }
    }).then(json => {
      const allList = json.data.allList;
      const myList = json.data.myList;
      const allData = this.sortData(allList, json.currentDate);
      const myData = this.sortData(myList, json.currentDate);

      this.setState({
        currentDate: json.currentDate,
        allList: this.state.allList.concat(allData),
        myList: this.state.myList.concat(myData)
      });
    }).catch(err => {
      console.log(err.message);
    });
  }

  sortData(data, currentDate) {
    const newData = util.setArrSameType(data, currentDate);
    const newData1 = util.setArrFirst(newData, 'stick', '1');
    return newData1;
  }

  render() {
    const allData = this.state.allList;
    const myData = this.state.myList;
    const allListItem = allData.length ? <ListItem currentDate={this.state.currentDate} data={allData}/> : <div className='waiting'><img src={NoneIcon}/><p>暂无， 敬请期待<span>~</span></p></div>;
    const myListItem = myData.length ? <ListItem currentDate={this.state.currentDate} data={myData}/> : <div className='waiting'><img src={NoneIcon}/><p>暂无， 快去看看感兴趣的活动吧<span>~</span></p></div>;

    return (
      <Tabs className='tabContainer' selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
        <TabList>
          <Tab>全部活动</Tab>
          <Tab>我的活动</Tab>
        </TabList>

        <TabPanel>
          {allListItem}
        </TabPanel>
        <TabPanel>
          {this.state.hasLogin ? myListItem : <Login/>}
        </TabPanel>
      </Tabs>
    )
  }
}

export default App