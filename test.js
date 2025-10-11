const series = require('async-series');
const {DataItem,DataType,Page_Logic,Product_Logic,Type,Stat_Logic,Service_Logic,Blog_Post_Logic,Event_Logic,Demo_Logic,Cart_Logic} = require('./index');
const {Log,Num} = require('biz9-utility');
const {Scriptz}= require('biz9-scriptz');

/* --- TEST CONFIG START --- */
//const ID='0';
const ID='f23c2372-df8e-4c09-a919-677fe32ba0bb';
const APP_ID='cool_bean';
const DATA_TYPE='dt_blank';
const URL="http://localhost:1901";
const biz9_config ={
    SERVICE_HOST_TYPE:'multiple',
    URL:'http://localhost:1901',
    APP_ID:APP_ID,
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

//9_connect
describe("connect", () => {
    it("_connect", () => {
        series([
            function(call) {
                console.log('CONNECT-START');
                console.log(Cart_Logic.get_new(DataType.PRODUCT,123));

                let post_type_list = [
                Demo_Logic.get_new_type('Computer 1',{
                    get_category:true,category_count:12,category_data_type:DataType.PRODUCT,categorys:'',
                   get_item:true,item_count:500,item_data_type:DataType.PRODUCT,items:null}),
                Demo_Logic.get_new_type('Computer 2',{
                    get_category:true,category_count:12,category_data_type:DataType.PRODUCT,categorys:'',
                   get_item:true,item_count:500,item_data_type:DataType.PRODUCT,items:null})
                ];

                Log.w('post_type_list',post_type_list);

                let post_item_count = 0;
                let post_category_count = 0;
                for(const item_type of post_type_list){
                    for(const item_cat of item_type.categorys){
                        post_category_count = post_category_count+1;
                        if(!item_cat.items){
                            item_cat.items = []
                        }
                            for(const item_item of item_cat.items){
                                post_item_count = post_item_count+1;
                            }
                    }
                };

                Log.w('post_type_list',post_type_list);
                Log.w('post_type_list',post_type_list[0].categorys);
                //Log.w('post_item_count',post_item_count);

                console.log('CONNECT-END');
                //call();
            },
            function(call) {
                console.log('GET_START_DATE_TIME_BY_LIST-START');
            },
        ], function(err) {
            console.log(err.message) // "another thing"
        })
    });
});


