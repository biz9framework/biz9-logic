const series = require('async-series');
const {DataItem,DataType,Item_Logic,User_Logic,Page_Logic,Product_Logic,Type,Title,Stat_Logic,Service_Logic,Blog_Post_Logic,Event_Logic,Demo_Logic,Cart_Logic,Order_Logic,App_Logic} = require('./index');
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
                let my_template = {
                    title1: "About Us",
                    title2: "aboout_link",
                    title3: "Categories",
                    title4: "category_link",
                    title5: "Create Gigs",
                    title6: "gigs_link",
                    title7: "Home",
                    title8: "home_link",
                    title9: "Service",
                    title10: "service_link",
                    title11: "Faq",
                    title12: "faq_link",
                    title13: "Contact",
                    title14: "contact_link"
                };
                /*
                let my_template = {
                    title1: "About Us",
                    title2: "aboout_link",
                    title3: "about_id",
                    title4: "Create Gigs",
                    title5: "gigs_link",
                    title6: "gigs_id",
                    title7: "Service",
                    title8: "service_link",
                    title9: "service_id",
                    title10: "Contact",
                    title11: "contact_link",
                    title12: "contact_id"
                };
                */

                value_count = 2;
                let new_list = [];
                let row_count = 1;
                for(let a = 1; a < 90; a++){
                    if(!Str.check_is_null(my_template['title'+row_count])){
                        let item = {};
                        item['value_1'] = my_template['title'+row_count];
                        if(value_count >=2){
                            item['value_2'] = my_template['title'+Number(row_count+1)];
                        }
                        if(value_count >=3){
                            item['value_3'] = my_template['title'+Number(row_count+2)];
                        }
                        new_list.push(item);
                        row_count = row_count + value_count;
                    }else{
                        break;
                    }
                }
       /*--work
       list_value_count = 2;
       let title_row = 1;
       let link_row = 2;
       for(let a = 1; a < 900; a++){
           if(!Str.check_is_null(my_template['title'+title_row])){
                new_list.push(
                {
                    value_1:my_template['title'+title_row],
                    value_2:my_template['title'+link_row]
                });
                title_row = title_row + list_value_count;
                link_row = title_row + 1;
           }else{
               console.log('bbbbbbbbb');
               break;
            }
       }
       */

                Log.w('cool',new_list);
            },
            function(call) {
                console.log('CONNECT-BASE-START');
                let data_type = DataType.PRODUCT;
                let id = 0;
                let parent_data_type = DataType.PRODUCT;
                let parent_id = 3334;
                let user_id = 0;
                let item_list = [];
                Log.w('Title',Type.get_title(Type.ORDER_STATUS_NEW));
                Log.w('Title 2',Type.get_title(Type.ORDER_STATUS_COMPLETE));
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
            let category_type = DataType.PRODUCT;
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


