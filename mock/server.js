var app = require('koa')();
var router = require('koa-router')();

//活动列表
const listData = require('./activity/activity');
router.get('/api/activity', function*(next) {
	this.body = listData;
});


//开启服务
app
	.use(router.routes())
	.use(router.allowedMethods());
app.listen(3000);