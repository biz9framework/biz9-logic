const series = require('async-series');
const {Log,Test} = require('biz9-utility');
const { get_data_config, Item, get_cloud_url,get_cloud_url_action_update_item,get_cloud_url_action_get_item, get_cloud_url_action_get_list,get_cloud_url_action_update_list,get_cloud_url_action_delete_item, get_cloud_url_action_delete_list, Cloud  }= require('./');

/* --- TEST CONFIG START --- */
//const ID='0';
const ID='f23c2372-df8e-4c09-a919-677fe32ba0bb';
const APP_TITLE_ID='cool_bean';
const DATA_TYPE='dt_blank';
const PORT_ID="1901";
const CLOUD_URL="http://localhost:"+PORT_ID;
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
                console.log('CONNECT-START');
                let cloud_url = Cloud.get_url('aa');
                Log.w('connect_url',cloud_url);
                call()
            },
            function(call) {
                console.log('GET_URL-ACTION-UPDATE-ITEM-START');
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Cloud.get_url_action_update_item(data_type,id);
                Log.w('get_url_action_update_item',cloud_url);
                console.log('GET_URL-ACTION-UPDATE-ITEM-SUCCESS');
                call()
            },

            function(call) {
                console.log('GET_URL-ACTION-GET-ITEM-START');
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Cloud.get_url_action_get_item(data_type,id);
                Log.w('get_url_action_get_item',cloud_url);
                console.log('GET_URL-ACTION-GET-ITEM-SUCCESS');
                call()
            },

            function(call) {
                console.log('GET_URL-ACTION-DELETE-ITEM-START');
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Cloud.get_url_action_delete_item(data_type,id);
                Log.w('get_url_action_delete_item',cloud_url);
                console.log('GET_URL-ACTION-DELETE-ITEM-SUCCESS');
                call()
            },

            function(call) {
                console.log('GET_URL-ACTION-GET-LIST-ITEM-START');
                let data_type = 'dt_blank';
                let cloud_url = Cloud.get_url_action_get_list(data_type);
                Log.w('get_url_action_get_list_item',cloud_url);
                console.log('GET_URL-ACTION-GET-LIST-ITEM-SUCCESS');
                call()
            },

            function(call) {
                console.log('GET_URL-ACTION-DELETE-LIST-ITEM-START');
                let data_type = 'dt_blank';
                let cloud_url = Cloud.get_url_action_delete_list(data_type);
                Log.w('get_url_action_delete_list_item',cloud_url);
                console.log('GET_URL-ACTION-DELETE-LIST-ITEM-SUCCESS');
                call()
            },

            function(call) {
                console.log('GET_URL-ACTION-UPDATE-LIST-ITEM-START');
                let data_type = 'dt_blank';
                let cloud_url = Cloud.get_url_action_delete_list(data_type);
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
                let filter_obj = Cloud.get_filter_obj(data_type,filter,sort_by,page_current,page_size);
                Log.w('get_url_action_filter_obj',filter_obj);
                console.log('GET_FILTER-OBJECT-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-NEW-ITEM-START');
                var new_item = Item.get_new(DATA_TYPE,0);
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
                let item_biz = Item.get_biz(biz9_config,item_test,{get_photo:true,get_date:true,get_count:true,get_biz_map:true});
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


