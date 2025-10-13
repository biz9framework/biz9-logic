const series = require('async-series');
const {DataItem,DataType,Page_Logic,Product_Logic,Type,Title,Stat_Logic,Service_Logic,Blog_Post_Logic,Event_Logic,Demo_Logic,Cart_Logic,Order_Logic} = require('./index');
const {Log,Num,Str} = require('biz9-utility');
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

                let post_cart = {};
                //let post_cart = Cart_Logic.get_new(DataType.PRODUCT,0,);
                post_cart = Cart_Logic.get_new(DataType.PRODUCT,0);
                Log.w('post_cart',post_cart);
                //let post_cart_list = [];
                //let post_cart_item = Cart_Logic.get_new_cart_item(DataType.PRODUCT,123,post_cart.cart_number,1,30);
                //let post_cart_sub_item = Cart_Logic.get_new_cart_sub_item(DataType.PRODUCT,1234,post_cart.cart_number,1,10);
                //let post_cart_sub_item_2 = Cart_Logic.get_new_cart_sub_item(DataType.PRODUCT,1234,post_cart.cart_number,1,30);
                //post_cart_item.cart_sub_item_list.push(post_cart_sub_item);
                //post_cart_item.cart_sub_item_list.push(post_cart_sub_item_2);
                //post_cart.cart_item_list.push(post_cart_item);

                //Log.w('post_cart',post_cart);
                //Log.w('post_order',Order_Logic.get_new(post_cart,{get_payment_plan:true,payment_plan:Title.ORDER_PAYMENT_PLAN_1,payment_plan_status:Title.ORDER_PAYMENT_STATUS_OPEN}));
                //Log.w('post_cart_2',Cart_Logic.get_total(post_cart));

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


