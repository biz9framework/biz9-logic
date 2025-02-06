const async = require('async');
const { get_data_config, get_new_item, get_cloud_url  } = require('./');
/* --- TEST CONFIG START --- */
//const ID='0';
const ID='f23c2372-df8e-4c09-a919-677fe32ba0bb';
const APP_TITLE_ID='cool_bean';
const DATA_TYPE='dt_blank';
const PORT_ID="1901";
const CLOUD_URL="http://localhost:"+PORT_ID;
/* --- TEST CONFIG END --- */
/* --- TEST DATA CONFIG START --- */
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
    REDIS_PORT_ID:"27019"
};
/* --- TEST DATA CONFIG END --- */

describe("connect", () => {
    it("_connect", () => {
        async.series([
            function(call) {
                console.log('TEST-BIZ9-ADAPTER-SERVER-CONNECT-START');
                call();
            },
            function(call) {
                console.log('TEST-BIZ9-ADAPTER-SERVER-GET-NEW-ITEM-START');
                var _new_item = get_new_item(DATA_TYPE,0);
                console.log(_new_item);
                console.log('TEST-BIZ9-ADAPTER-SERVER-GET-NEW-ITEM-SUCCESS');
                call();
            },
            function(call) {
                console.log('TEST-BIZ9-ADAPTER-SERVER-GET-DATA-CONFIG-START');
                var _data_config = get_data_config(biz9_config,{app_title_id:'local_app_title_id'});
                console.log(_data_config);
                console.log('TEST-BIZ9-ADAPTER-SERVER-GET-DATA-CONFIG-SUCCESS');
                call();
            },
            function(call) {
                console.log('TEST-BIZ9-ADAPTER-SERVER-GET-CLOUD-URL-START');
                var _cloud_url = get_cloud_url(biz9_config.APP_TITLE_ID,CLOUD_URL,'/get/test/');
                console.log(_cloud_url);
                console.log('TEST-BIZ9-ADAPTER-SERVER-GET-CLOUD-URL-SUCCESS');
                call();
            },
        ], function(err, results) {
            console.log('TEST-BIZ9-ADAPTER-SERVER-CONNECT-SUCCESS');
            console.log('TEST-BIZ9-ADAPTER-SERVER-GET-DATA-CONFIG-SUCCESS');
            console.log('TEST-BIZ9-ADAPTER-SERVER-GET-NEW-ITEM-SUCCESS');
            console.log('TEST-BIZ9-ADAPTER-SERVER-GET-CLOUD-URL-SUCCESS');
            console.log('TEST-BIZ9-ADAPTER-SERVER-CONNECT-DONE');
        });
    });
});


