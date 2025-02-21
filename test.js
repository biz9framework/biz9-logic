import series from 'async-series';
import { get_data_config, get_new_item, get_cloud_url, get_biz_item,get_cloud_url_action_update_item,get_cloud_url_action_get_item, get_cloud_url_action_get_list,get_cloud_url_action_update_list,get_cloud_url_action_delete_item, get_cloud_url_action_delete_list  } from './';

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
                call()
            },
            function(call) {
                console.log('GET-NEW-ITEM-START');
                var _new_item = get_new_item(DATA_TYPE,0);
                console.log(_new_item);
                console.log('GET-NEW-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-CLOUD-URL-START');
                let cloud_url = get_cloud_url('apple');
                console.log(cloud_url);
                console.log('GET-CLOUD-URL-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-ACTION-UPDATE-ITEM-START');
                let data_type = 'dt_blank';
                let id = '0';
                let cloud_url = get_cloud_url_action_update_item(data_type,id);
                console.log(cloud_url);
                console.log('GET-ACTION-UPDATE-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-ACTION-GET-ITEM-START');
                let data_type = 'dt_blank';
                let id = '0';
                let cloud_url = get_cloud_url_action_get_item(data_type,id);
                console.log(cloud_url);
                console.log('GET-ACTION-GET-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-ACTION-DELETE-START');
                let data_type = 'dt_blank';
                let id = '0';
                let cloud_url = get_cloud_url_action_delete_item(data_type,id);
                console.log(cloud_url);
                console.log('GET-ACTION-DELETE-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-ACTION-UPDATE-LIST-START');
                let data_type = 'dt_blank';
                let id = '0';
                let cloud_url = get_cloud_url_action_update_list(data_type);
                console.log(cloud_url);
                console.log('GET-ACTION-UPDATE-LIST-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-ACTION-GET-LIST-START');
                let data_type = 'dt_blank';
                let id = '0';
                let cloud_url = get_cloud_url_action_get_list(data_type);
                console.log(cloud_url);
                console.log('GET-ACTION-GET-LIST-SUCCESS');
                call()
            },
             function(call) {
                console.log('GET-ACTION-DELETE-LIST-START');
                let data_type = 'dt_blank';
                let id = '0';
                let cloud_url = get_cloud_url_action_delete_list(data_type);
                console.log(cloud_url);
                console.log('GET-ACTION-DELETE-LIST-SUCCESS');
                call()
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


