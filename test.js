const series = require('async-series');
const {DataItem,Type,App_Logic,Data_Logic} = require('./index');
const {Log,Num,Str,Obj} = require('biz9-utility');
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
                console.log('CONNECT-BASE-START');
                // -->
                //let parent_item = DataItem.get_new(Type.DATA_PRODUCT,0);
                // -->
                //let join = App_Logic.get_join({},'','',{});
                // -->
                //let data = Data_Logic.get_biz(Type.DATA_BLANK,0);
                let parent = Data_Logic.get_biz(Type.DATA_SERVICE,0,{test:true,generate_title:true});
                let data = Data_Logic.get_biz(Type.DATA_BLANK,0,{test:true,generate_title:true,parent:parent});
                //let data = Data_Logic.get_biz(Type.DATA_BLANK,0,{title:'cool bean',data:{field_1:'field_1',field_2:'field_2'}});
                //let data = Data_Logic.get_biz(Type.DATA_BLANK,0,{title:'cool bean'});
                //let data = Data_Logic.get_biz(Type.DATA_BLANK,0,{data:{field_1:'field_1',field_2:'field_2'}});
                //let data = Data_Logic.get_biz(Type.DATA_BLANK,0,{test:true});
                //Log.w('99_result_parent',parent);
                //Log.w('99_result_data',data);

                //Log.w('Title',Type.get_title(Type.ORDER_STATUS_NEW));
                //Log.w('Title 2',Type.get_title(Type.ORDER_STATUS_COMPLETE));
                //Log.w('Title 2',Field_Logic.get_field_value_title(Type.FIELD_VALUE_LIST,3,4,'cool'));
                //Log.w('item_list',item_list);
                //Log.w('bind_obj_list',App_Logic.bind_item_parent_user_list(item_list));

                //item.id = 333;
                //item.items = ['a','b'];
                //Log.w('bind_obj',App_Logic.bind_item_parent_user_obj(item,parent_item,user));
                //let stat = Stat_Logic.get_new(parent_data_type,parent_id,Type.STAT_VIEW,user_id,item);
                //Log.w('stat',stat);
                console.log('CONNECT-BASE-END');
            }
            /*
        function(call) {
            console.log('CONNECT-CMS-DEMO-START');
            let category_type = Type.DATA_PRODUCT;
            let category_count = 12;
            let item_count = 500;

            //let category_type_title_list = ['Add On','Admin Panel','Hosting','Landing Page','Mobile','Website'];
            //let category_title_list = ['Beauty','Church','Fashion','Food Trucks','Health Care','Music','Pets','Services','Service Repair','Sports','Trucking'];

            let category_type_title_list = '';
            let category_title_list = '';

            let item_title_list = [];
            let post_type_list = [];
            let val_category_title = '';
            let cat_max = 0;
            let option = {get_category:true,category_count:category_count,category_data_type:category_type,categorys:val_category_title?val_category_title:null,
                   get_item:true,item_count:item_count,item_data_type:category_type,items:null}

            console.log(Demo_Logic.get_new_type('',option));
            for(const item of category_type_title_list){
                post_type_list.push(
                    Demo_Logic.get_new_type(item,option));
            }
            console.log('CONNECT-CMS-DEMO-SUCCESS');
            },
            */
            /*
            function(call) {
            //console.log('CONNECT-START');
            //let post_cart = Cart_Logic.get_new(Type.DATA_PRODUCT,0,);
            //let post_cart_list = [];
            //let post_cart_item = Cart_Logic.get_new_cart_item(Type.DATA_PRODUCT,123,post_cart.cart_number,1,30);
            //let post_cart_sub_item = Cart_Logic.get_new_cart_sub_item(Type.DATA_PRODUCT,1234,post_cart.cart_number,1,10);
            //let post_cart_sub_item_2 = Cart_Logic.get_new_cart_sub_item(Type.DATA_PRODUCT,1234,post_cart.cart_number,1,30);
            //post_cart_item.cart_sub_item_list.push(post_cart_sub_item);
            //post_cart_item.cart_sub_item_list.push(post_cart_sub_item_2);
            //post_cart.cart_item_list.push(post_cart_item);

            //Log.w('post_cart',post_cart);
            //Log.w('post_order',Order_Logic.get_new(post_cart,{get_payment_plan:true,payment_plan:Title.ORDER_PAYMENT_PLAN_1,payment_plan_status:Title.ORDER_PAYMENT_STATUS_OPEN}));
            //Log.w('post_cart_2',Cart_Logic.get_total(post_cart));

            //console.log('CONNECT-END');
            //call();
            },
            /* --- TEST LOGIC - CONNECT - END --- */

            /*
            function(call) {
                console.log('BLANK-START');
                console.log('BLANK-END');
            },
            */
        ], function(err) {
            console.log(err.message) // "another thing"
        })
    });
});


