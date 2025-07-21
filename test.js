const path = require('path');
const series = require('async-series');
const {DataItem,DataType,Url,Obj,BiZ_Url,Cat,Stock,Schedule,Storage,Business,Product,Service,Event,Template,Page,Category,Review,Blog_Post,Faq_Logic,Category_Url,Blank_Url,Blank_Logic,Item_Logic,Service_Logic,Template_Logic,Page_Logic,Product_Logic,Event_Logic,Blog_Post_Logic,Content_Logic,Category_Logic,Team_Logic,Business_Logic,PageType,Sub_Item_Logic,Page_Url,Review_Logic,User_Logic,Field_Logic,Order_Logic,Cart_Logic} = require('./index');
const {Log,Number} = require('biz9-utility');
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

describe("connect", () => {
    it("_connect", () => {
        series([

            function(call) {
                //console.log('GET-URL-START');
                //let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                //let action_url = 'test_get_url';
                //let params = '&myparam1=p1&myparam2=p2'
                //let data_type = DataType.PRODUCT;
                //let id = "123";
                //let cloud_url = Page_Url.home(biz9_config);
                //console.log(biz9_config);
                //let cloud_url = Category_Url.get_page(biz9_config,'cool');
                //let cloud_url = Category_Url.get_page(biz9_config,'cool');
                //Log.w('cloud_url',cloud_url);
                //console.log('GET-URL-SUCCESS');
                call();
            },

            function(call) {
                //console.log('STORAGE-START');
                //console.log(Storage.get({},'apples'));
                //Log.w('storage-start',Storage.set(Number.get_id()));
                //console.log('STORAGE-END');
                /* --PAGE--START */
                //let page = Page_Logic.get_test()
                //let page = Page_Logic.get_test("Page "+Number.get_id())
                //let page = Page_Logic.get_test("Page "+Number.get_id(),{get_value:true,value_count:5,get_section:false,section_count:2,get_photo:true,get_blank:true})
                //Log.w("page",page);
                //Log.w("page_section_1",page.section_1);
                //Log.w("page_section_6",page.section_6.items);
                //Log.w("page_section_1_section_1",page.section_1.section_1);
                //let page_list = Page_Logic.get_test_list({page_count:10});
                //Log.w("Page_list",page_list);
                /*
                let page = Page.get_test({item_count:9,page_count:19,get_item:true,get_value:true})
                //let page = Page.get_test()
                Log.w("Page_section_1_section_1_section_1",page.section_1.section_1.section_1);
                */
                /* --PAGE--END */


               /* --TEAM--START */
               //let team = Team_Logic.get_test()
               //let team = Team_Logic.get_test({get_value:false,get_member:true})
               //let team_member = Team_Logic.get_test_member(team,{get_value:true,get_blank:false,fields:['hometown','member_since', 'speaks','last_project','avg_response_time']});
               //let team_member = Blog_Post_Logic.get_test({get_value:true,get_blank:false,fields:['hometown','member_since', 'speaks','last_project','avg_response_time']});
                //let team_member = Team_Logic.get_test_member(Team_Logic.get_test(),{fields:["hometown_aa","member_since_bb"], get_value:true});
                //Log.w("team",team);
                //Log.w("team_member",team_member);
               //let team_list = Team_Logic.get_test_list();
                //let [team_list,team_list]=Team_Logic.get_test_list_by_team();
                //Log.w('team_list',team_list);
                //Log.w('team_list',team_list);
                /* --TEAM--END */

                /* --FIELD-LOGIC--START */
                //let field_logic = Field_Logic.get_test();
                //Log.w('field_logic',field_logic);
                //let country_state = User_Logic.get_user_country_state_city(user);
                //Log.w('country_state',country_state);
                //let user = User_Logic.get_test();
                //let user_list = User_Logic.get_test_list();
                //Log.w('user',user);
                //Log.w('user_list',user_list);
                /* --FIELD-LOGIC--END */


                /* --USER--START */
                //let user = {country:"United States",state:"",city:"Atlanta"};
                //let country_state = User_Logic.get_user_country_state_city(user);
                //Log.w('country_state',country_state);
                //let user = User_Logic.get_test();
                //let user_list = User_Logic.get_test_list();
                //Log.w('user',user);
                //Log.w('user_list',user_list);
                Log.w('guest',User_Logic.get_guest());
                /* --USER--END */

               /* --SEARCH--START */
                //console.log(Url.get_search(DataType.BLOG_POST,{title:-1},{cool:-1},1,10));

                /*
                let data_type = DataType.PRODUCT;
                let search_filter_key_1 = 'key1';
                let search_filter_value_1 = 'value1';
                let search_filter_key_2 = 'key2';
                let search_filter_value_2 = 'value2';
                */

                //let query = "?app_id=19&data_type="+data_type+"&sort_by={}&page_current=1&page_size=99&search_filter_key_1="+search_filter_key_1+"&search_filter_value_1="+search_filter_value_1+"&search_filter_key_2="+search_filter_key_2+"&search_filter_value_2="+search_filter_value_2;

                //Log.w('query',query);


               /* --SEARCH--END */

               /* --CATEGORY--START */
               //let category = Category_Logic.get_test("Category 1")
               //let category = Category_Logic.get_test("Category 1",{get_value:true,get_item:true})
               //let category_list = Category_Logic.get_test_list({get_value:true,get_item:true})
                //Log.w("category",category);
               //let category_list = Category_Logic.get_test_list_by_type(DataType.PRODUCT,{get_value:true});
                //let [category_list,category_list]=Category_Logic.get_test_list_by_category();
               //Log.w('category_list',category_list);
                //Log.w('category_list',category_list);
                /* --CATEGORY--END */

                /* --SUB_ITEM--START */
                /*
                console.log('TEST-SUB_ITEM-START');
                let item = DataItem.get_new(DataType.BLANK,0);
                let parent_item = DataItem.get_new(DataType.BLANK,0);
                let top_item = DataItem.get_new(DataType.BLANK,0);
                let sub_item = Sub_Item_Logic.get_test("cool 1",item,top_item);
                //Log.w('sub_item',sub_item);
                let sub_item_list = Sub_Item_Logic.get_test_list(item,top_item,{get_value:true});
               // Log.w('sub_item',sub_item);
                Log.w('sub_item_list',sub_item_list);
                Log.w('sub_item_list_len',sub_item_list.length);
                console.log('TEST-SUB_ITEM-END');
                */
                /* --SUB_ITEM--END */


                /* --CONTENT--START */
                //let content = Content_Logic.get_test("cool 1");
                //let content = Content_Logic.get_test("Content 1",{get_value:true,get_item:true})
                //Log.w("content",content);
                //let content_list = Content_Logic.get_test_list();
                //let [category_list,content_list]=Content_Logic.get_test_list_by_category();
                //Log.w('content_list',content_list);
                //Log.w('category_list',category_list);
                /*
               */
                /* --CONTENT--END */


                /* --BLOG_POST--START */
               // let blog_post = Blog_Post_Logic.get_test("Blog_Post 1")
                //let blog_post = Blog_Post_Logic.get_test("Blog_Post 1",{get_value:true})
                //let blog_post = Blog_Post_Logic.get_test("Blog_Post 1",{get_value:true})
                //let blog_post = Blog_Post_Logic.get_test("Blog_Post 1",{get_value:true,get_item:true})
                //let [category_list,blog_post_list]=Blog_Post_Logic.get_test_list_by_category();
                //Log.w("blog_post",blog_post);
                //let blog_post_list = Blog_Post_Logic.get_test_list({get_value:true,get_item:true});
                //Log.w('blog_post_list',blog_post_list);
                //Log.w('blog_post_list',blog_post_list[0].items);
                //Log.w('category_list',category_list);
                /*
               */
                /* --BLOG_POST--END */


                /* --EVENT--START */
                //let event = Event_Logic.get_test("Event 1");
                //let event = Event_Logic.get_test("Event 1",{get_value:true,get_item:true})
                //Log.w("event",event);
                //let event_list = Event_Logic.get_test_list();
                //let [category_list,event_list]=Event_Logic.get_test_list_by_category();
                //Log.w('event_list',event_list);
                //Log.w('category_list',category_list);
                /*
               */
                /* --EVENT--END */


                /* --SERVICE--START */
                //let service = Service_Logic.get_test("Service 1",{get_value:true,get_item:true})
                //Log.w("service",service);
                //let service_list = Service_Logic.get_test_list();
                //let [category_list,service_list]=Service_Logic.get_test_list_by_category();
                //Log.w('service_list',service_list);
                //Log.w('category_list',category_list);
                /*
               */
                /* --SERVICE--END */


                /*
                console.log('PRODUCT-START');

                console.log('PRODUCT-CART-START');
                let data_type = DataType.PRODUCT;
                let user = User_Logic.get_test({generate_id:true});
                //Log.w('user',user);
                let cart_number = Cart_Logic.get_cart_number();
                let product_cart = Product_Logic.get_test_cart(cart_number,user.id,{get_cart_item:true,cart_item_count:1,get_cart_sub_item:true,cart_sub_item_count:1,category_title:null});
                Log.w('product_cart',product_cart);
                Log.w('product_cart_parent',product_cart.cart_item_list[0]);
                Log.w('product_cart_sub_item_list',product_cart.cart_item_list[0].cart_sub_item_list);
                //cart.cart_number = cart_number;
                //Log.w('cart',cart);
                //let product = Product_Logic.get_test("Product "+Number.get_id(),{get_value:false,get_item:false})
                //cart_item_id,cart_number,user_id,parent_data_type,parent_id
                //let cart_item = Cart_Logic.get_test_cart_item(0,Order_Logic.get_cart_number(),user.id,product.data_type,product.id);
                //Log.w('user',user);
                //Log.w('product',product);
                //Log.w('cart_item',cart_item);
                //let cart_number = Order_Logic.get_order_id();
                //let product_cart = Product_Logic.get_test_cart(cart_number,user.id,{get_cart_item:true,cart_item_count:1, get_cart_sub_item:true,cart_sub_item_count:1 });
                //let product_cart = Product_Logic.get_test_cart(user.id,{get_cart_item:true,order_item_count:1,get_order_sub_item:true,order_sub_item_count:2 });
                //Log.w('product_cart',product_cart);
                //Log.w('product_cart_item_list',product_order.order_item_list.length);
                //Log.w('product_cart_item_list_len',product_order.order_item_list[0].order_sub_item_list.length);
                //Log.w('product_order',product_order.order_item_list[0].order_sub_item_list.length);
                //console.log('PRODUCT-CART-END');
                */

                /*
                console.log('PRODUCT-ORDER-START');
                let order_id = "OR"+Number.get_id();
                let user = User_Logic.get_test({generate_id:true});
                let product_order = Product_Logic.get_test_order(order_id,user.id,{get_order_item:true,order_item_count:1,get_order_sub_item:true,order_sub_item_count:2 });
                Log.w('product_order',product_order);
                Log.w('product_order_item_list',product_order.order_item_list.length);
                Log.w('product_order_item_list_len',product_order.order_item_list[0].order_sub_item_list.length);
                //Log.w('product_order',product_order.order_item_list[0].order_sub_item_list.length);
                console.log('PRODUCT-ORDER-END');
                */

                //let product = Product_Logic.get_test("Product 1",{get_value:true,get_item:true})
                //let product = Product_Logic.get_test("Product 1")
                //let product = Product_Logic.get_test({fields:["date_create"]})
                //let product = Product_Logic.get_test({fields:["cool_beanj]})
                //Log.w("product",product);
                //let product_list = Product_Logic.get_test_list({product_count:10,get_blank:true});
                //let product_list = Product_Logic.get_test_list({product_count:2,get_blank:false,fields:'delivery_time,apple,basnnah'})
                //let product_list = Product_Logic.get_test_list();
                //Log.w('product_list',product_list);
                //let [category_list,product_list]=Product.get_test_list_by_category({category_count:5,product_count:9});
                //Log.w('category_list',category_list);

                //let product = Template_Logic.get_test({get_value:true,value_count:3,get_item:true})
                //Log.w("product",product);
                //Log.w("Product_section_1",product.section_1);
                //Log.w("Product_section_1_section_1_section_1",product.section_1.section_1.section_1);
                //
                //console.log('PRODUCT-END');


               /* --ITEM-TEST--START */
                //let item = Item_Logic.get_test("Item_" +Number.get_id(),DataType.BLOG_POST,0,{get_blank:false});
                //Log.w('item',item);
                /*
                let item_list = Item_Logic.get_test_list(DataType.BLANK,{item_count:10,get_value:true});
                Log.w('item_list',item_list);
                Log.w('item_list_len',item_list.length);
                */
                /* --ITEM-TEST--END */


                /* --TEMPLATE--START */
                //let template = Template_Logic.get_test("Primary",{});
                //let template = Template_Logic.get_test("Primary",{get_value:true,get_item:true});
                /*
                let template_item_list = Template_Logic.get_test("Primary",template,template,{get_value:false,get_item:false,item_count:2});
                */
                //Log.w('template',template);
                //Log.w('template_item_list',template_item_list);
                /* --TEMPLATE--END */



                /* --ITEM-PARENT-TOP-URL-TEST--START */
                //let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                //let cloud_url = Url.get_item_parent_top(biz9_config,DataType.SERVICE,0,DataType.BLOG_POST,1,DataType.PRODUCT,2);
                //console.log(cloud_url);
                //let item_test_list = Item_Logic.get_test_item_list(DataType.BLANK,{item_count:10,get_value:true});
                //Log.w('item_test_list',item_test_list);
                /* --ITEM-PARENT-TOP-TEST-URL-START */


                                //console.log('CONNECT-START');
                /* --BLANK--START */
                //let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});

                //let title_url = "blank_1";
                //let cloud_url = Blank_Url.browse(biz9_config);
                //Log.w('cloud_url',cloud_url);
                //let blank_list=Blank_Logic.get_test_list({category_count:5,blank_count:9,get_value:false,get_item:false});
                //let [category_list,blank_list]=Blank.get_test_list_by_category({category_count:5,blank_count:9});
                //Log.w('blank_list',blank_list);
                //Log.w('category_list',category_list);

                //let blank = Blank_Logic.get_test("cool",{item_count:9,blank_count:19,get_item:true,get_value:true})
                //let blank = Blank_Logic.get_test()
                //Log.w('blank_list',blank_list);
                //Log.w("Blank",blank);
                //Log.w("BLog_Post_section_1",blank.section_1);
                //Log.w("BLog_Post_section_1_section_1_section_1",blank.section_1.section_1.section_1);
                /* --BLANK--END */


                /* --CONFIG--START */
                //let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                //let cloud_url = Url.connect(biz9_config);
                /* --CONFIG--END */

                /* --PAGE--START */
                /*
                let page = Page_Logic.get_test({item_count:2,page_count:2,get_value:true,get_item:true,value_count:5})
                let page_row_item = Sub_Item_Logic.get_test_section_list(page,page,{get_value:true,value_count:9,section_count:9});
                Log.w("Page",page);
                Log.w("Page_Row_Item",page_row_item);
                */
                //let page = Page.get_test({item_count:9,page_count:19,get_item:true,get_value:true})
                //let page = Page.get_test()
                //Log.w("Page_section_1",page.section_1);
                //Log.w("Page_section_1_section_1_section_1",page.section_1.section_1.section_1);
                /* --PAGE--END */




                /* --FAQ--START */
                //Log.w("FAQ",Faq_Logic.get_test());
                //Log.w("FAQ List",Faq_Logic.get_test_list(Faq_Logic.get_test()));
                //let faq = Faq_Logic.get_test();
                //let faq = Faq_Logic.get_test('cool 1');
                //let faq = Faq_Logic.get_test('cool 1',{count:33});
                //let faq = Business_Logic.get_test('ser 1',{question_count:33});
                //let faq_list = Faq_Logic.get_faq_question_list(faq);
                //let faq_list = Faq_Logic.get_question_list();
                //Log.w('faq_list',faq_list);
                //Log.w('faq',faq);
                /*
                let review_list = Review.get_test_list({review_count:3,get_item:true})
                Log.w("Review List",review_list);
                */
                /* --FAQ--END */


                /* --REVIEW--START */
                /*
                let parent_data_type = DataType.PRODUCT;
                let parent_id = Number.get_id();
                let user = User_Logic.get_test({generate_id:false});
                let product_review = Review_Logic.get_test(parent_data_type,parent_id,user.id);
                let review = Review_Logic.get_new(parent_data_type,parent_id,user,product_review);
                Log.w('review',review);
                */
                //Log.w("Review",Review_Logic.get_new(parent_data_type,parent_id,user_id));
                //Log.w("Review",Review_Logic.get_test({generate_id:true}));
                //Log.w("Review List",Review_Logic.get_test_list({generate_id:true,review_count:3}));
                /*
                let review_list = Review.get_test_list({review_count:3,get_item:true})
                Log.w("Review List",review_list);
                */
                /* --REVIEW--END */

                /* --BUSINESS--START */
                //Log.w("Business",Business_Logic.get_test("Business " + Number.get_id()));
                //Log.w("Business",Business_Logic.get_test());
                /* --BUSINESS--END */

                console.log('CONNECT-SUCCESS');
                //call()
            },

            function(call) {
                /*
                console.log('GET-FULL-ITEM-START');
                let item = DataItem.get_new(DataType.BLANK,0);
                let parent_item = DataItem.get_new(DataType.BLOG_POST,2);
                let top_item = DataItem.get_new(DataType.PRODUCT,3);
                let options={title:'cool_bean'};
                console.log(DataItem.get_new_full_item(item,parent_item,top_item,options));
                console.log('GET-FULL-ITEM-END');
                */
                //call();
            },

            function(call) {
                console.log('GET-BiZ-Url-Item-Get-Item-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                //let item = DataItem.get_new(DataType.BLANK,0,{title:'title',apple:'butter'});
                //Log.w('item',item);
                //let cloud_url = BiZ_Url.get_item(biz9_config,item.data_type,item.id);
                let title_url = 'primary';
                //let cloud_url = BiZ_Url.get_template(biz9_config,title_url);
                //let cloud_url = BiZ_Url.get_page(biz9_config,title_url);
                let business = {address_1:"addrress 1", address_2:"address 2",city:"city",state:"Geogia",zip:30003};
                //Log.w('kusiness',Business.get_full_address(business));
                //Log.w('connect_url',cloud_url);
                console.log('GET-BiZ-Url-Item-Get-Item-SUCCESS');
                //call()
            },


            function(call) {
                console.log('GET_START_STORAGE-START');
                Log.w('storage-start',Storage.set(Number.get_id()));
                console.log('GET_START_STORAGE-END');
                //call();
            },

            function(call) {
                console.log('GET_START_DATE_TIME-START');
                Log.w('get_start_date_time',Schedule.get_start_date_time({date:new Date(),time: new Date()}));
                console.log('GET_START_DATE_TIME-END');
                //call();
            },
            function(call) {
                console.log('GET_START_DATE_TIME_BY_LIST-START');
                event_list = [
                    {date:new Date(),time: new Date()},
                    {date:new Date(),time: new Date()},
                    {date:new Date(),time: new Date()}
                ];
                Log.w('get_event_list',Schedule.get_start_date_time_by_list(event_list));
                console.log('GET_START_DATE_TIME_BY_LIST-END');
                //call();
            },

            function(call) {
                console.log('GET-ALL-STOCK-LIST-START');
                Log.w('get_event_list',Stock.get_event_stock_list());
                Log.w('get_product_list',Stock.get_product_stock_list());
                Log.w('get_service_list',Stock.get_service_stock_list());
                console.log('GET-ALL-STOCK-LIST-SUCCESS');
                //call();
            },

            function(call) {
                console.log('SET-ITEM-BIZ-BY-LIST-START');
                let item_test_list = [];
                let item_test = Item_Logic.get_test_item('dt_blank',0);
                item_test.cost = String(Number.get_id())+'.55';
                item_test.old_cost = String(Number.get_id())+'.20';
                item_test.title ='_title_'+Number.get_id();

                item_test_list.push(item_test);

                let item_test_1 = Item_Logic.get_test_item('dt_blank',0);
                item_test_1.cost = '5.55';
                item_test_1.old_cost = '9.55';
                item_test_1.title ='_title_'+Number.get_id();

                item_test_list.push(item_test_1);

                let item_list_biz = DataItem.get_biz_by_list(biz9_config,item_test_list,{get_date:false,get_count:false,get_biz_map:false,get_money:true});
                console.log(item_list_biz);
                console.log('SET-ITEM-BIZ-BY-LIST-SUCCESS');
                //call();
            },
            function(call) {
                console.log('SET-ITEM-BIZ-START');
                let item_test = Item_Logic.get_test_item('dt_blank',0);
                item_test.photofilename='abc.png';
                item_test.cost = '5.55';
                item_test.old_cost = '9.55';
                item_test.field_1 = 'my_field_1';
                item_test.value_1 = 'my_value_1';
                item_test.field_2 = 'my_field_2';
                item_test.value_2 = 'my_value_2';
                item_test.field_3 = 'my_field_3';
                item_test.value_3 = 'my_value_3';
                let item_biz = DataItem.get_biz(biz9_config,item_test,{get_date:false,get_count:false,get_biz_map:false,get_money:true});
                console.log(item_biz);
                console.log('SET-ITEM-BIZ-SUCCESS');
                call();
            },

            /*
        function(call) {
                console.log('SET_CATEGORY_DROP_DOWN_LIST-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let category_list = [];
                category_list.push({data_type:DataType.BLANK,id:0,title:Number.get_id()});
                category_list.push({data_type:DataType.BLANK,id:0,title:Number.get_id()});
                category_list.push({data_type:DataType.BLANK,id:0,title:Number.get_id()});
                Log.w('cat',Cat.set_category_drop_down_list(category_list));
    //let cloud_url = CMS.get_new_query_item_by_item(item);
    //Log.w('connect_url',cloud_url);
    //console.log('SET_CATEGORY_DROP_DOWN_LIST-END');
    //call()
            },




        function(call) {
                console.log('GET-NEW-QUERY-ITEM-BY-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let item = DataItem.get_new(DataType.BLANK,0);
                item.parent_id = Number.get_id();
                item.parent_data_type = DataType.BLANK;
                item.top_id = Number.get_id();
                item.top_data_type = DataType.BLANK;
                Log.w('item',item);
//let cloud_url = CMS.get_new_query_item_by_item(item);
//Log.w('connect_url',cloud_url);
                console.log('GET-NEW-QUERY-ITEM-BY-ITEM-SUCCESS');
//call()
            },


            function(call) {
                console.log('GET-BiZ-Full-Url-Item-Get-Item-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let item = DataItem.get_new(DataType.BLANK,0);
                let parent_item = DataItem.get_new(DataType.BLANK,0);
                let top_item = DataItem.get_new(DataType.BLANK,0);
                Log.w('item',item);
                let cloud_url = BiZ_Url.get_full_item(biz9_config,item,parent_item,top_item);
                Log.w('connect_url',cloud_url);
                console.log('GET-BiZ-Full-Url-Item-Get-Item-SUCCESS');
//call()
            },


                       function(call) {
                console.log('GET-BIZ9-GET-DATA-TYPE-START');
                console.log(DataType.get_data_type_title(DataType.CART_ITEM));
                console.log(DataType.ID);
                console.log(DataType.TITLE);
                console.log('GET-BIZ9-GET-DATA-TYPE-END');
                call();
            },
            function(call) {
                console.log('GET-BIZ9-CONFIG-FILE-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                Log.w('APP_TITLE_ID',biz9_config.APP_TITLE_ID);
                Log.w('APP_TITLE',biz9_config.TITLE);
                Log.w('URL',biz9_config.URL);
                console.log('----------------------');
                Log.w('DATA_TYPE',DataType.BLANK);
                Log.w('BLOG_POST',DataType.BLOG_POST);
                Log.w('SERVICE',DataType.SERVICE);
                console.log('----------------------');
                console.log('GET-BIZ9-CONFIG-FILE-SUCCESS');
                call()
            },
           function(call) {
                console.log('GET_URL-UPDATE-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Url.update_item(biz9_config,data_type,id);
                Log.w('get_url_update_item',cloud_url);
                console.log('GET_URL-UPDATE-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-GET-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Url.get_item(biz9_config,data_type,id);
                Log.w('get_url_get_item',cloud_url);
                console.log('GET_URL-GET-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-DELETE-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let id = 0;
                let cloud_url = Url.delete_item(biz9_config,data_type,id);
                Log.w('get_url_delete_item',cloud_url);
                console.log('GET_URL-DELETE-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-GET-LIST-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let cloud_url = Url.get_list(biz9_config,data_type);
                Log.w('get_url_get_list',cloud_url);
                console.log('GET_URL-GET-LIST-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-DELETE-LIST-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let cloud_url = Url.delete_list(biz9_config,data_type);
                Log.w('get_url_delete_list_item',cloud_url);
                console.log('GET_URL-DELETE-LIST-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_URL-UPDATE-LIST-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
                let cloud_url = Url.update_list(biz9_config,data_type);
                Log.w('get_url_update_list_item',cloud_url);
                console.log('GET_URL-UPDATE-LIST-ITEM-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET_FILTER-OBJECT-START');
                let data_type = 'dt_blank';
                let filter = {data_type:'dt_blank'};
                let sort_by = {title:-1};
                let page_current = 0;
                let page_size = 15;
                let filter_obj = Obj.get_filter(data_type,filter,sort_by,page_current,page_size);
                Log.w('get_filter_obj',filter_obj);
                console.log('GET_FILTER-OBJECT-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-NEW-ITEM-START');
                var new_item = DataItem.get_new(DATA_TYPE,0);
                console.log(new_item);
                console.log('GET-NEW-ITEM-SUCCESS');
                call()
            },
           function(call) {
                console.log('GET_URL-BIZ-ITEM-START');
                let biz9_config = Scriptz.get_biz9_config({biz9_config_file:path.resolve('../../biz9_config')});
                let data_type = 'dt_blank';
//let cloud_url = Url.get_biz_item(biz9_config,data_type,ID);
                let cloud_url = Url.delete_biz_item(biz9_config,data_type,ID);
                Log.w('get_url_biz_item',cloud_url);
                console.log('GET_URL-BIZ-ITEM-SUCCESS');
                call()
            },
           */
    function(call) {
        // never happens, because "second thing"
        // passed an error to the done() callback
    }
        ], function(err) {
            console.log(err.message) // "another thing"
        })
    });
});


