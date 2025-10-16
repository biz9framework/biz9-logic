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
            console.log('CONNECT-CMS-DEMO-START');

        let category_type = DataType.PRODUCT;
        let category_count = 12;
        let item_count = 500;
        let category_type_title_list = ['Add On','Admin Panel','Hosting','Landing Page','Mobile','Website'];
        let category_title_list = ['Beauty','Church','Fashion','Food Trucks','Health Care','Music','Pets','Services','Service Repair','Sports','Trucking'];
        let item_title_list = [];
		let post_type_list = [];
        let val_category_title = '';
        let cat_max = 0;
        let option = {get_category:true,category_count:category_count,category_data_type:category_type,categorys:val_category_title?val_category_title:null,
                   get_item:true,item_count:item_count,item_data_type:category_type,items:null}

       for(const item of category_type_title_list){
            post_type_list.push(
            Demo_Logic.get_new_type(item,option));
        }

        Log.w('44-post_type_list',post_type_list);
        Log.w('55-post_type_list-a',post_type_list.length);
        Log.w('55-post_type_list-b',post_type_list[0].categorys[0].items.length);
        Log.w('55-post_type_list-b',post_type_list[0].categorys[1].items.length);
        Log.w('55-post_type_list-b',post_type_list[0].categorys[2].items.length);
        Log.w('55-post_type_list-b',post_type_list[0].categorys[3].items.length);
        Log.w('55-post_type_list-b',post_type_list[0].categorys[4].items.length);
        console.log('CONNECT-CMS-DEMO-SUCCESS');

            },
            function(call) {
                //console.log('CONNECT-START');
                //let post_cart = Cart_Logic.get_new(DataType.PRODUCT,0,);
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

                //console.log('CONNECT-END');
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


