const path = require('path');
const series = require('async-series');
const {Logic,DataType} = require('./');
const {Log,Test} = require('biz9-utility');
const { Scriptz  }= require('biz9-scriptz');

/* --- TEST CONFIG START --- */
//const ID='0';
const ID='f23c2372-df8e-4c09-a919-677fe32ba0bb';
const APP_TITLE_ID='cool_bean';
const DATA_TYPE='dt_blank';
const URL="http://localhost:1901";
const biz9_config ={
    SERVICE_HOST_TYPE:'multiple',
    APP_TITLE_ID:APP_TITLE_ID,
    MONGO_IP:'0.0.0.0',
    MONGO_USERNAME_PASSWORD:'',
    MONGO_PORT_ID:"27019",
    MONGO_SERVER_USER:'admin',
    MONGO_CONFIG_FILE_PATH:'/etc/mongod.conf',
    SSH_KEY:"",
    REDIS_URL:"0.0.0.0",
    REDIS_PORT_ID:"27019",
    PHOTO_URL:"http://localhost:1901/"
};
/* --- TEST DATA CONFIG END --- */

describe("connect", () => {
    it("_connect", () => {
        series([
            function(call) {
                console.log('GET-BIZ9-CONFIG-FILE-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                Log.w('APP_TITLE_ID',biz9_config.APP_TITLE_ID);
                Log.w('APP_TITLE',biz9_config.TITLE);
                Log.w('URL',biz9_config.URL);
                console.log('----------------------');
                Log.w('DATA_TYPE',DataType.DT_BLANK);
                Log.w('BLOG_POST',DataType.DT_BLOG_POST);
                Log.w('SERVICE',DataType.DT_SERVICE);
                console.log('----------------------');
                console.log('GET-BIZ9-CONFIG-FILE-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-URL-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let action_url = 'test_get_url_action';
                let params = '&myparam1=p1&myparam2=p2'
                let cloud_url = Logic.get_url(biz9_config,action_url,params);
                Log.w('connect_url',cloud_url);
                console.log('GET-URL-SUCCESS');
                call()
            },
            function(call) {
                console.log('CONNECT-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let cloud_url = Logic.get_url_action_connect(biz9_config);
                Log.w('connect_url',cloud_url);
                console.log('CONNECT-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-UPDATE-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Logic.get_url_action_update_item(biz9_config,data_type,id);
                Log.w('get_url_action_update_item',cloud_url);
                console.log('GET_URL-ACTION-UPDATE-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-GET-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Logic.get_url_action_get_item(biz9_config,data_type,id);
                Log.w('get_url_action_get_item',cloud_url);
                console.log('GET_URL-ACTION-GET-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-DELETE-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Logic.get_url_action_delete_item(biz9_config,data_type,id);
                Log.w('get_url_action_delete_item',cloud_url);
                console.log('GET_URL-ACTION-DELETE-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-GET-LIST-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let cloud_url = Logic.get_url_action_get_list(biz9_config,data_type);
                Log.w('get_url_action_get_list_item',cloud_url);
                console.log('GET_URL-ACTION-GET-LIST-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-DELETE-LIST-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let cloud_url = Logic.get_url_action_delete_list(biz9_config,data_type);
                Log.w('get_url_action_delete_list_item',cloud_url);
                console.log('GET_URL-ACTION-DELETE-LIST-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-UPDATE-LIST-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let cloud_url = Logic.get_url_action_delete_list(biz9_config,data_type);
                Log.w('get_url_action_delete_list_item',cloud_url);
                console.log('GET_URL-ACTION-UPDATE-LIST-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_FILTER-OBJECT-START');
                let data_type = 'dt_blank';
                let filter = {data_type:'dt_blank'};
                let sort_by = {title:-1};
                let page_current = 0;
                let page_size = 15;
                let filter_obj = Logic.get_filter_obj(data_type,filter,sort_by,page_current,page_size);
                Log.w('get_url_action_filter_obj',filter_obj);
                console.log('GET_FILTER-OBJECT-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-NEW-ITEM-START');
                var new_item = Logic.get_new_item(DATA_TYPE,0);
                console.log(new_item);
                console.log('GET-NEW-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('SET-ITEM-BIZ-START');
                let item_test = Test.get_item('dt_blank',0);
                item_test.photofilename='abc.png';
                item_test.field_1 = 'my_field_1';
                item_test.value_1 = 'my_value_1';
                item_test.field_2 = 'my_field_2';
                item_test.value_2 = 'my_value_2';
                item_test.field_3 = 'my_field_3';
                item_test.value_3 = 'my_value_3';
                let item_biz = Logic.get_biz_item(biz9_config,item_test,{get_photo:true,get_date:true,get_count:true,get_biz_map:true});
                console.log(item_biz);
                console.log('SET-ITEM-BIZ-SUCCESS');
                call();
            },

            function(call) {
                // never happens, because "second thing"
                // passed an error to the done() callback
            }
        ], function(err) {
            console.log(err.message) // "another thing"
        })

     });
});


