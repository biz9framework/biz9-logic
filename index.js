/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const moment = require('moment'); const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_new_full_item_main } = require('./main');
const { Log,Str,DateTime,Num,Obj } = require('/home/think2/www/doqbox/biz9-framework/biz9-utility/code');
class Message {
	static SUCCESS="Update Success";
	static LOGIN_GOOD="Login Success";
	static LOGIN_BAD="Login Incorrect";
}
class TemplateType {
	static PRIMARY='primary';
	static HEADER='header';
	static NAVIGATION='navigation';
	static BODY='body';
	static FOOTER='footer';
}
class Item_Logic {
	static get_test = (title,data_type,id,option)=>{
		data_type = data_type ? data_type : DataType.BLANK;
		id = id ? id : 0;
		option = Field_Logic.get_option(data_type,option?option:{});
		let item = DataItem.get_new_full_item(
			DataItem.get_new(data_type,0),
			DataItem.get_new(data_type,0),
			DataItem.get_new(data_type,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			item.items = Sub_Item_Logic.get_test_list(item,item,option);
			item = Sub_Item_Logic.bind_parent_child_list(item,item.items);
		}
		return item;
	}
	static get_not_found = (data_type,id,option) =>{
		if(!id){
			id=0;
		}
		let item = Item_Logic.get_test("",data_type,id,{get_blank:true})
		item.id = 0;
		item.id_key = id;
		item.title = "Item Not Found";
		item.title_url = Str.get_title_url(item.title);
		if(option.app_id){
			item.app_id = option.app_id;
		}
		return item;
	};
	static get_test_list = (data_type,option) =>{
		option = Field_Logic.get_option(data_type,option?option:{});
		let item_list = [];
		for(let a=0;a<option.item_count+1;a++){
			item_list.push(Item_Logic.get_test("Item " +String(parseInt(a+1)),data_type,option));
		}
		return item_list;
	}
	static get_search = (data_type,filter,sort_by,page_current,page_size) => {
		return {data_type:data_type,filter:filter,sort_by:sort_by,page_current:page_current,page_size:page_size};
	}
static get_search_query(search){
		let url = "";
		if(search.data_type){
			url = url + "&data_type="+search.data_type;
		}else{
			url = url + "&data_type="+DataType.BLANK;
		}
		if(search.sort_by_key){
			url = url + "&sort_by_key="+search.sort_by_key;
		}else{
			url = url + "&sort_by_key=title";
		}
		if(search.sort_by_value){
			url = url + "&sort_by_value="+search.sort_by_value;
		}else{
			url = url + "&sort_by_value=-1";
		}
		if(search.page_current){
			url = url + "&page_current="+search.page_current;
		}else{
			url = url + "&page_current=1";
		}
		if(search.page_size){
			url = url + "&page_size="+search.page_size;
		}else{
			url = url + "&page_size=9";
		}
		for(let a=1;a<19;a++){
			if(!Str.check_is_null(search['filter_key_'+String(a)])){
				url = url + "&filter_key_"+String(a)+"="+ search['filter_key_'+String(a)];
				url = url + "&filter_value_"+String(a)+"="+ search['filter_value_'+String(a)];
			}
		}
		return url;
	}
	static get_search_by_query(query){
		let filter = [];
		let sort_by = [];
		if(query['sort_by_key']){
			sort_by[query['sort_by_key']] = query['sort_by_value'];
		}
		for(let a = 0; a < 19; a++){
			if(query['filter_key_'+a]){
				filter[query['filter_key_'+a]] = query['filter_value_'+a]
			}
		}
		return Item_Logic.get_search(query.data_type,filter,sort_by,query.page_current,query.page_size);
	}
}
class Stat_Logic {
	/*
	static STAT_VIEW_ADD_ID='1';
	static STAT_LIKE_ADD_ID='2';
	static STAT_FAVORITE_ADD_ID='3';
	static STAT_CART_ADD_ID='4';
	static STAT_ORDER_ADD_ID='5';
	static STAT_REVIEW_ADD_ID='6';
	*/
	static get_new = (parent_data_type,user_id,stat_type_id,item_list,option)=>{
		return {
			parent_data_type:parent_data_type,
			user_id:user_id,
			stat_type_id:stat_type_id,
			item_list:item_list,
	}
	}
}
class Template_Logic {
	static get_test = (title,option) =>{
		if(!Str.check_is_null(title) && Obj.check_is_empty(option)){
			option = title;
			title = "Test " + Num.get_id();
		}
		option = Field_Logic.get_option(DataType.TEMPLATE,option?option:{});
		let template = DataItem.get_new_full_item(
			DataItem.get_new(DataType.TEMPLATE,0),
			DataItem.get_new(DataType.TEMPLATE,0),
			DataItem.get_new(DataType.TEMPLATE,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			let title_list = ['Header','Body','Footer','Navigation']
			//template.items = Sub_Item_Logic.get_test_list(template,template,option);
			template.items = [];
			for(let a = 0; a<title_list.length;a++){
				let item = Sub_Item_Logic.get_test(title_list[a],template,template,option);
				item.items = Sub_Item_Logic.get_test_section_list(item,template,option);
				item = Sub_Item_Logic.bind_parent_child_list(item,item.items);
				template.items.push(item);
				//template.items.push(Sub_Item_Logic.get_test(title_list[a],template,template,option));
			}
			if(option.get_item_bind){
				template = Sub_Item_Logic.bind_parent_child_list(template,template.items);
			}
		}
		return template;
	};
}
class Team_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let team = DataItem.get_new_full_item(
			DataItem.get_new(DataType.TEAM,0),
			DataItem.get_new(DataType.TEAM,0),
			DataItem.get_new(DataType.TEAM,0),
			Field_Logic.get_test(title,option));
		team.members = [];
		if(option.get_member){
			for(let a=0;a<option.member_count+1;a++){
				team.members.push(Team_Logic.get_test_member("Full Name " + String(parseInt(a+1)),team,option));
			}
		}
		return team;
	};
	static get_test_member = (team,title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let team_member = DataItem.get_new_full_item(
			DataItem.get_new(DataType.ITEM,0),
			DataItem.get_new(DataType.TEAM,team.id),
			DataItem.get_new(DataType.TEAM,team.id),
			Field_Logic.get_test(title,option));
		team_member.first_name = "First Name "+ Num.get_id();
		team_member.last_name = "Last Name "+ Num.get_id();
		team_member.position = "Position "+ Num.get_id();
		team_member.city = "City "+ Num.get_id();
		team_member.state = "State "+ Num.get_id();
		return team_member;
	};
	static get_test_member_list = (team,option) =>{
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let item_list = [];
		for(let a=0;a<option.member_count+1;a++){
			item_list.push(Team_Logic.get_test_member(team,"Full Name " +parseInt(a+1),option));
		}
		return item_list;
	}
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let item_list = [];
		for(let a=0;a<option.team_count+1;a++){
			item_list.push(Team_Logic.get_test("Team " +parseInt(a+1),option));
		}
		return item_list;
	}
}
class Page_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.PAGE,option?option:{});
		let page = DataItem.get_new_full_item(
			DataItem.get_new(DataType.PAGE,0),
			DataItem.get_new(DataType.PAGE,0),
			DataItem.get_new(DataType.PAGE,0),
			Field_Logic.get_test(title,option));
		if(option.get_section){
			page.items = Sub_Item_Logic.get_test_section_list(page,page,option);
			page = Sub_Item_Logic.bind_parent_child_list(page,page.items);
		}
		return page;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.PAGE,option?option:{});
		let item_list = [];
		for(let a=0;a<option.page_count+1;a++){
			item_list.push(Page_Logic.get_test( "Page " +parseInt(a+1)? !option.get_blank : "",option));
		}
		return item_list;
	}
}
class Order_Logic {
	static get_order_number = () => {
		return FieldType.ORDER_NUMBER + Num.get_id(99999);
	};
	 static get_transaction_id = () => {
        return FieldType.TRANSACTION_ID + Num.get_id(99999);
    };
}
class Cart_Logic {
	static get_cart_number = () => {
		return FieldType.CART_NUMBER + Num.get_id(99999);
	};
	static get_cart = (user_id) => {
         return DataItem.get_new(DataType.CART,0,{user_id:user_id,cart_number:Cart_Logic.get_cart_number(),quanity:1,grand_total:0,cart_item_list:[]});
    };
    static get_cart_item = (parent_data_type,parent_id,cart_number,user_id,quanity) =>{
         return DataItem.get_new(DataType.CART_ITEM,0,{parent_data_type:parent_data_type,parent_id:parent_id,cart_number:cart_number,user_id:user_id,quanity:quanity,sub_total:0,cart_sub_item_list:[]});
    };
	static get_test_item = (cart_item_id,cart_number,user_id,parent_data_type,parent_id,option) =>{
		option = Field_Logic.get_option(DataType.CART_ITEM,option?option:{generate_id:Str.check_is_null(cart_item_id)? true : false  });
		let cart_item = DataItem.get_new(DataType.CART_ITEM,Num.get_guid(),Field_Logic.get_test("Cart Item "+Num.get_id(),option));
		cart_item.cart_item_id = cart_item_id;
		cart_item.cart_number = cart_number;
		cart_item.user_id = user_id;
		cart_item.parent_data_type = parent_data_type;
		cart_item.parent_id = parent_id;
		if(option.get_cart_sub_item){
		cart_item.cart_sub_item_list = [];
			for(let a = 0;a<option.cart_sub_item_count;a++){
				let cart_sub_item = Cart_Logic.get_test_sub_item(cart_number,user_id,cart_item.id,parent_data_type,parent_id,{get_value:true,get_cart_sub_item:option.get_cart_sub_item,cart_sub_item_count:option.cart_sub_item_count});
				cart_item.cart_sub_item_list.push(cart_sub_item);
			}
		}
		return cart_item;
	};
	static get_test_sub_item = (cart_number,user_id,cart_item_id,parent_data_type,parent_id,option) =>{
		option = Field_Logic.get_option(DataType.CART_SUB_ITEM,option?option:{});
		let item_blank = Item_Logic.get_test('Sub Item '+Num.get_id(),DataType.ITEM,0,{generate_id:true});
		let cart_sub_item = DataItem.get_new(DataType.CART_SUB_ITEM,Num.get_guid(),Field_Logic.get_test("Cart Sub Item "+Num.get_id(),option));
		cart_sub_item.cart_number = cart_number;
		cart_sub_item.user_id = user_id;
		cart_sub_item.cart_item_id = cart_item_id;
		cart_sub_item.parent_data_type = item_blank.data_type;
		cart_sub_item.parent_id = item_blank.id;
		cart_sub_item.cost = Field_Logic.get_test_cost();
		cart_sub_item.parent_item = item_blank;
		return cart_sub_item;
	};
static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.product_count+1;a++){
			item_list.push(Product_Logic.get_test("Product "+String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let product_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.PRODUCT,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.product_count;b++){
				item_count++;
				let product = Product_Logic.get_test("Product "+String(parseInt(b+1)),option);
				product.category = category_list[Num.get_id(category_list.length+1)].title;
				product_list.push(product);
			}
		}
		return [category_list,product_list]
	};
}
class Product_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let product = DataItem.get_new(DataType.PRODUCT,0,Field_Logic.get_test(title,option));
		if(option.get_blank ==false){
			product.cost = Field_Logic.get_test_cost();
			product.old_cost = Field_Logic.get_test_cost();
			product.cart_count = 0;
			product.order_count = 0;
			product.type = "Type "+String(Num.get_id());
			product.sub_type = "Sub Type "+String(Num.get_id());
			product.stock = String(Num.get_id(3-1));
			product.tag = "Tag "+ Num.get_id() + ", Tag "+Num.get_id() + ", Tag "+ Num.get_id();
		}else{
			product.cost = "";
			product.old_cost = "";
			product.type = "";
			product.sub_type = "";
			product.stock = "";
			product.tag = "";
		}
		if(option.get_item){
			product.items = Sub_Item_Logic.get_test_list(product,product,option);
		}
		return product;
	};
	static get_test_cart = (cart_number,user_id,option) =>{
		[cart_number,option] = Field_Logic.get_option_title(cart_number,option);
		option = Field_Logic.get_option(DataType.CART,option?option:{});
		let cart = DataItem.get_new(DataType.CART,Num.get_guid(),Field_Logic.get_test(cart_number,option));
		cart.user_id = user_id;
		cart.cart_number = cart_number;
	if(option.get_cart_item){
		let product_option = {product_count:option.cart_item_count,generate_id:true};
		let product_list = Product_Logic.get_test_list(product_option);
		cart.cart_item_list = [];
			for(let a = 0;a<product_list.length;a++){
				let product_cart_item =Cart_Logic.get_test_item(cart_number,cart.id,user_id,product_list[a].data_type,product_list[a].id,{get_value:false,get_cart_sub_item:option.get_cart_sub_item,cart_sub_item_count:option.cart_sub_item_count,generate_id:true});
				product_cart_item.parent_item = product_list[a];
				cart.cart_item_list.push(product_cart_item);
			}
		}
		return cart;
	};
static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.product_count+1;a++){
			item_list.push(Product_Logic.get_test("Product "+String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let product_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.PRODUCT,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.product_count;b++){
				item_count++;
				let product = Product_Logic.get_test("Product "+String(parseInt(b+1)),option);
				product.category = category_list[Num.get_id(category_list.length+1)].title;
				product_list.push(product);
			}
		}
		return [category_list,product_list]
	};
}
class Service_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.SERVICE,option?option:{});
		let service = DataItem.get_new(DataType.SERVICE,0,Field_Logic.get_test(title,option));
		service.cost = Field_Logic.get_test_cost();
		service.old_cost = Field_Logic.get_test_cost();
		service.type = "Type "+String(Num.get_id());
		service.sub_type = "Sub Type "+String(Num.get_id());
		service.stock = String(Num.get_id(3-1));
		service.tag = "Tag "+ Num.get_id() + ", Tag "+Num.get_id() + ", Tag "+ Num.get_id();
		if(option.get_item){
			service.items = Sub_Item_Logic.get_test_list(service,service,option);
		}
		return service;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.SERVICE,option?option:{});
		let item_list = [];
		for(let a=0;a<option.service_count+1;a++){
			item_list.push(Service_Logic.get_test("Service "+String(parseInt(a+1))),option);
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.SERVICE,option?option:{});
		let service_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.SERVICE,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.service_count;b++){
				item_count++;
				let service = Service_Logic.get_test("Service "+String(parseInt(b+1)),option);
				service.category = category_list[Num.get_id(category_list.length+1)].title;
				service_list.push(service);
			}
		}
		return [category_list,service_list]
	};
}
class Content_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.CONTENT,option?option:{});
		let content = DataItem.get_new_full_item(
			DataItem.get_new(DataType.CONTENT,0),
			DataItem.get_new(DataType.CONTENT,0),
			DataItem.get_new(DataType.CONTENT,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			content.items = Sub_Item_Logic.get_test_section_list(content,content,option);
			if(option.get_item_bind){
				content = Sub_Item_Logic.bind_parent_child_list(content,content.items);
			}
		}
		return content;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.CONTENT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.content_count+1;a++){
			item_list.push(Content_Logic.get_test("Content " +String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.CONTENT,option?option:{});
		let content_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.CONTENT,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.content_count;b++){
				item_count++;
				let content = Content_Logic.get_test("Content "+String(parseInt(b+1)),option);
				content.category = category_list[Num.get_id(category_list.length+1)].title;
				content_list.push(content);
			}
		}
		return [category_list,content_list]
	};
}
class Blog_Post_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.BLOG_POST,option?option:{});
		let blog_post = DataItem.get_new(DataType.BLOG_POST,0,Field_Logic.get_test(title,option));

		if(!option.get_blank){
			blog_post.author="First Name "+ Num.get_id();
			blog_post.tag = "Tag "+ Num.get_id() + ", Tag "+Num.get_id() + ", Tag "+ Num.get_id();
		}else{
			blog_post.author="";
			blog_post.tag = "";
		}
		if(option.get_item){
			blog_post.items = Sub_Item_Logic.get_test_list(blog_post,blog_post,option);
		}
		return blog_post;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.BLOG_POST,option?option:{});
		let item_list = [];
		for(let a=0;a<option.blog_post_count+1;a++){
			item_list.push(Blog_Post_Logic.get_test("Blog Post " +String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.BLOG_POST,option?option:{});
		let blog_post_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.BLOG_POST,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.blog_post_count;b++){
				item_count++;
				let blog_post = Blog_Post_Logic.get_test("Blog Post "+String(parseInt(b+1)),option);
				blog_post.category = category_list[Num.get_id(category_list.length+1)].title;
				blog_post_list.push(blog_post);
			}
		}
		return [category_list,blog_post_list]
	};
}
class Event_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.EVENT,option?option:{});
		let event = DataItem.get_new(DataType.EVENT,0,Field_Logic.get_test(title,option));
		if(!option.get_blank){
		event.cost = Field_Logic.get_test_cost();
		event.old_cost = Field_Logic.get_test_cost();
		event.date = String(String(Num.get_id(2030)) + "-" + String(Num.get_id(13)) + "-" + String(Num.get_id(30))).trim();
		event.time = String(Num.get_id(24)) + ":" + String(Num.get_id(59));
		event.website = "Website "+String(Num.get_id());
		event.location = "Location "+String(Num.get_id());
		event.meeting_link = "Meeting Link "+String(Num.get_id());
		event.stock = String(Num.get_id(3-1));
		event.category ="Category " + String(Num.get_id());
		event.tag = "Tag "+ Num.get_id() + ", Tag "+Num.get_id() + ", Tag "+ Num.get_id();
		}else{
			event.cost = "";
			event.old_cost = "";
			event.date = "";
			event.time = "";
			event.website = "";
			event.location = "";
			event.meeting_link = "";
			event.stock = "";
			event.category ="";
			event.tag = "";
		}
		if(option.get_item){
			event.items = Sub_Item_Logic.get_test_list(event,event,option);
		}
		return event;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.EVENT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.event_count+1;a++){
			item_list.push(Event_Logic.get_test("Event "+String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.EVENT,option?option:{});
		let event_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.EVENT,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.event_count;b++){
				item_count++;
				let event = Event_Logic.get_test("Event "+String(parseInt(b+1)),option);
				event.category = category_list[Num.get_id(category_list.length+1)].title;
				event_list.push(event);
			}
		}
		return [category_list,event_list]
	};
}
class Field_Logic {
	static get_test_cost(){
		return String(Num.get_id(999)) + "." + String(Num.get_id(99));
	}
	static get_test_note = () => {
		return "Note "+String(Num.get_id()) + " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	}
	static get_test = (title,option) =>{
		option = !Obj.check_is_empty(option) ? option : {};
		let item = {};
			if(option.get_blank == true){
				option.category_title = "";
				 item = {
					title:"",
					title_url:"",
					sub_note:"",
					note:"",
					date_create:"",
					date_save:""
				}
		}else{
		 item = {
			title:title,
			setting_visible:"1",
			title_url:Str.get_title_url(title),
			sub_note:"Sub Note "+String(Num.get_id()),
			note:Field_Logic.get_test_note(),
			view_count:0,
			id:0,
			date_create:new moment().toISOString(),
			date_save:new moment().toISOString()
		}
		}
		if(!Str.check_is_null(option.category_title)){
			item.category =  'Category ' + Num.get_id();
		}
		if(option.generate_id){
			item.id=Num.get_guid();
		}
		if(option.get_value){
			item = Field_Logic.get_value_list(item,option);
		}
		if(option.fields){
			let field_list = String(option.fields).split(',');
			for(let a = 0; a<field_list.length;a++){
				if(option.get_blank == true){
					if(item[field_list[a]]){
					item[field_list[a]] = "";
					}
				}else{
					if(!Str.check_is_null(field_list[a])){
						item[Str.get_title_url(field_list[a])] = Str.get_title(field_list[a]) +"_" + Num.get_id();
					}
				}
			}
		}
		return item;
	}
	static get_value_list(item,option){
		for(let b=0;b<option.value_count;b++){
			if(option.get_blank == false){
				item['value_'+String(b+1)] = 'value ' + String(b+1);
				item['field_'+String(b+1)] = Str.get_title_url(item['value_'+String(b+1)]);
				item[Str.get_title_url('value ' + String(b+1))] = item.title + ' value ' + String(b+1);
			}else{
				item['value_'+String(b+1)] = "";
				item['field_'+String(b+1)] = "";
				item[Str.get_title_url('value ' + String(b+1))] ="";
			}
		}
		return item;
	};
	static get_option(data_type,option){
		data_type = data_type ? data_type : DataType.BLANK;
		option = !Obj.check_is_empty(option) ? option : {get_value:false,get_item:false,get_photo:false,item_count:9,value_count:9};
		option.generate_id = option.generate_id ? option.generate_id : false;
		option.get_photo = option.get_photo ? true : false;
		option.get_value = option.get_value ? true : false;
		option.get_item = option.get_item ? true : false;
		option.get_blank = option.get_blank ? true : false;
		option.get_item_bind = option.get_item_bind ? true : true;
		option.value_count = option.value_count ? option.value_count : 9;
		option.section_count = option.section_count ? option.section_count : 9;
		option.item_count = option.item_count ? option.item_count : 9;
		option.category_count = option.category_count ? option.category_count : 9;
		option.category_title = option.category_title ? option.category_title : "";
		option.fields = option.fields ? option.fields : [];
		if(option.data_type==DataType.PAGE){
			option.page_count = option.page_count ? option.page_count : 9;
			option.section_count = option.section_count ? option.section_count : 9;
			option.get_section = option.get_section ? true : false;
		}
		if(data_type==DataType.PRODUCT){
			option.product_count = option.product_count ? option.product_count : 9;
		}
		if(data_type==DataType.SERVICE){
			option.service_count = option.service_count ? option.service_count : 9;
		}
		if(data_type==DataType.BLOG_POST){
			option.blog_post_count = option.blog_post_count ? option.blog_post_count : 9;
		}
		if(data_type==DataType.EVENT){
			option.event_count = option.event_count ? option.event_count : 9;
		}
		if(data_type==DataType.TEAM){
			option.get_member = option.get_member ? true : false;
			option.member_count = option.member_count ? option.member_count : 9;
		}
		if(data_type==DataType.FAQ){
			option.get_question = option.get_question ? true : false;
			option.question_count = option.question_count ? option.question_count : 9;
		}
		if(data_type==DataType.CONTENT){
			option.content_count = option.content_count ? option.content_count : 9;
		}
		if(data_type==DataType.SUB_ITEM){
			option.item_count = option.item_count ? option.item_count : 9;
		}
		if(data_type==DataType.USER){
			option.user_count = option.user_count ? option.user_count : 9;
		}
		if(data_type==DataType.CART){
			option.category_title = option.category_title ? option.category_title : "";
			option.value_count = option.value_count ? option.value_count : 9;
			option.get_cart_item = option.get_cart_item ? option.get_cart_item : false;
			option.cart_item_count = option.cart_item_count ? option.cart_item_count : 5;
			option.get_cart_sub_item = option.get_cart_sub_item ? option.get_cart_sub_item : false;
			option.cart_sub_item_count = option.cart_sub_item_count ? option.cart_sub_item_count : 3;
		}
		if(data_type==DataType.CART_ITEM){
			option.category_title = option.category_title ? option.category_title : "";
			option.value_count = option.value_count ? option.value_count : 9;
			option.get_cart_sub_item = option.get_cart_sub_item ? option.get_cart_sub_item : false;
			option.cart_sub_item_count = option.cart_sub_item_count ? option.cart_sub_item_count : 1;
		}
		if(data_type==DataType.ORDER){
			option.category_title = option.category_title ? option.category_title : "";
			option.value_count = option.value_count ? option.value_count : 9;
			option.get_order_item = option.get_order_item ? option.get_order_item : false;
			option.order_item_count = option.order_item_count ? option.order_item_count : 5;
			option.get_order_sub_item = option.get_order_sub_item ? option.get_order_sub_item : false;
			option.order_sub_item_count = option.order_sub_item_count ? option.order_sub_item_count : 3;
		}
		if(data_type==DataType.ORDER_ITEM){
			option.category_title = option.category_title ? option.category_title : "";
			option.value_count = option.value_count ? option.value_count : 9;
			option.get_order_sub_item = option.get_order_sub_item ? option.get_order_sub_item : false;
			option.order_sub_item_count = option.order_sub_item_count ? option.order_sub_item_count : 1;
		}
		return option;
	}
	static get_option_title = (title,option) =>{
		if(!title){
			let title = '';
		}
		if(!option){
			let option = {};
		}
		if(!Str.check_is_null(title) && Obj.check_is_empty(option)){
			if(Obj.check_is_empty(option)){
				if(!Str.check_is_null(title) && Obj.check_is_empty(option)){
					if(typeof title === 'string'){
						option = {};
					}else{
						option = title;
						title = "Test " + Num.get_id();
					}
				}
			}
		}else{
			if(Str.check_is_null(title) && Obj.check_is_empty(option)){
				title = "Test " + Num.get_id();
				option = {};
			}
		}
		return [title,option];
	}
	static get_option_admin(req){
		let option = {};
		option.value_count = req.query.value_count ? req.query.value_count : 9;
		option.section_count = req.query.section_count ? req.query.section_count : 9;
		option.question_count = req.query.question_count ? req.query.question_count : 9;

		option.get_blog_post = req.query.get_blog_post ? req.query.get_blog_post : false;
		option.get_category_blog_post = req.query.get_category_blog_post ? req.query.get_category_blog_post : false;
		option.category_blog_post_count = req.query.category_blog_post_count ? req.query.category_blog_post_count : 9;
		option.blog_post_count = req.query.blog_post_count ? req.query.blog_post_count : 9;

		option.get_product = req.query.get_product ? req.query.get_product : false;
		option.get_category_product = req.query.get_category_product ? req.query.get_category_product : false;
		option.category_product_count = req.query.category_product_count ? req.query.category_product_count : 9;
		option.product_count = req.query.product_count ? req.query.product_count : 9;

		option.get_service = req.query.get_service ? req.query.get_service : false;
		option.get_category_service = req.query.get_category_service ? req.query.get_category_service : false;
		option.category_service_count = req.query.category_service_count ? req.query.category_service_count : 9;
		option.service_count = req.query.service_count ? req.query.service_count : 9;

		option.get_event = req.query.get_event ? req.query.get_event : false;
		option.get_category_event = req.query.get_category_event ? req.query.get_category_event : false;
		option.category_event_count = req.query.category_event_count ? req.query.category_event_count : 9;
		option.event_count = req.query.event_count ? req.query.event_count : 9;

		option.get_product_review = req.query.get_product_review ? req.query.get_product_review : false;
		option.product_review_count = req.query.product_review_count ? req.query.product_review_count : 19;

		option.user_count = req.query.user_count ? req.query.user_count : 9;
		option.get_admin = req.query.get_admin ? req.query.get_admin : false;
		option.get_business = req.query.get_business ? req.query.get_business : false;
		option.get_faq = req.query.get_faq ? req.query.get_faq : false;
		option.get_template = req.query.get_template ? req.query.get_template : false;
		option.get_page = req.query.get_page ? req.query.get_page : false;
		option.get_team = req.query.get_team ? req.query.get_team : false;


		return option;
	}

}
class FieldType {
	static APP_ID='app_id';
	static ID='id';
	static DATA_TYPE='data_type';
	static DATE_CREATE='date_create';
	static PARENT_ID='parent_id';
	static PARENT_DATA_TYPE='parent_data_type';
	static PHOTO_DATA='photo_data';
	static TOP_ID='top_id';
	static TOP_DATA_TYPE='top_data_type';
	static TITLE='title';
	static TITLE_URL='title_url';
	static SETTING_DELETE_PROTECTION='setting_delete_protection';
	static SETTING_VISIBLE='setting_visible';
	static SETTING_ORDER='setting_order';
	static SOURCE='source';
	static SOURCE_ID='source_id';
	static SOURCE_DATA_TYPE='source_data_type';
	static SOURCE_PARENT_ID='source_parent_id';
	static SOURCE_PARENT_DATA_TYPE='source_parent_data_type';
	static SOURCE_TOP_ID='source_top_id';
	static SOURCE_TOP_DATA_TYPE='source_top_data_type';
	static DATE_CREATE='date_create';
	static DATE_SAVE='date_save';

	static STAT_VIEW_ADD_ID='1';
	static STAT_LIKE_ADD_ID='2';
	static STAT_FAVORITE_ADD_ID='3';
	static STAT_CART_ADD_ID='4';
	static STAT_ORDER_ADD_ID='5';
	static STAT_REVIEW_ADD_ID='6';

	static KEY_ADMIN="key_admin";
	static KEY_APP_ID="key_app_id";
	static KEY_BUSINESS="key_business";
	static KEY_TEMPLATE="key_template";
	static KEY_CART="key_cart";
	static KEY_GUEST="key_guest";
	static KEY_ORDER="key_order";
	static KEY_USER="key_user";

	static ORDER_NUMBER="OR-";
	static CART_NUMBER="CA-";
	static TRANSACTION_ID="TR-";

	static PAYMENT_PLAN_1="1 Payment";
	static PAYMENT_PLAN_2="2 Payments";
	static PAYMENT_PLAN_3="3 Payments";
	static PAYMENT_PLAN_4="4 Payments";

	static ORDER_STATUS_NEW="New";
	static ORDER_STATUS_OPEN="Open";
	static ORDER_STATUS_PAYMENT="Payment Plan";
	static ORDER_STATUS_COMPLETE="Complete";

	static PAYMENT_PLAN="Open";

	static ORDER_PAYMENT_TYPE_STRIPE="Stripe";
	static ORDER_PAYMENT_TYPE_CASH="Cash";
	static ORDER_PAYMENT_TYPE_OTHER="Other";
	static ORDER_PAYMENT_TYPE_TEST="Test";
}
class Social {
	static FACEBOOK_URL="https://facebook.com/";
	static TWITTER_URL="https://twitter.com/";
	static INSTAGRAM_URL="https://instagram.com/";
	static YOUTUBE_URL="https://youtube.com/";
	static LINKEDIN_URL="https://linkedin.com/";
}
class UserType {
	static ADMIN="admin";
	static MEMBER="member";
	static GUEST="guest";
}
class PageType {
	static get_title = (data_type) => {
		if(!data_type){
			return "";
		}else{
			return String(Str.get_title(data_type.replaceAll('_',' '))).trim();
		}
	}
	static get_item_list = () =>{
		return [
			{title:DataType.get_title(PageType.ABOUT),type:DataType.ABOUT},
			{title:DataType.get_title(PageType.BLOG_POST),type:DataType.BLOG_POST},
			{title:DataType.get_title(PageType.CONTACT),type:DataType.CONTACT},
			{title:DataType.get_title(PageType.EVENT),type:DataType.EVENT},
			{title:DataType.get_title(PageType.GALLERY),type:DataType.GALLERY},
			{title:DataType.get_title(PageType.HOME),type:DataType.HOME},
			{title:DataType.get_title(PageType.TEAM),type:DataType.TEAM},
			{title:DataType.get_title(PageType.PRODUCT),type:DataType.PRODUCT},
			{title:DataType.get_title(PageType.SERVICE),type:DataType.SERVICE}
		]
	};
	static HOME='home';
	static ABOUT='about';
	static CONTACT='contact';

	static BLOG_POST='blog_post';
	static BLOG_POST_BROWSE='blog_post_browse';
	static BLOG_POST_DETAIL='blog_post_detail';

	static CATEGORY='category';
	static CATEGORY_BROWSE='category_browse';
	static CATEGORY_DETAIL='category_detail';

	static EVENT='event';
	static EVENT_BROWSE='event_browse';
	static EVENT_DETAIL='event_detail';

	static GALLERY='gallery';
	static GALLERY_BROWSE='gallery_browse';
	static GALLERY_DETAIL='gallery_detail';

	static SERVICE='service';
	static SERVICE_BROWSE='service_browse';
	static SERVICE_DETAIL='service_detail';

	static PRODUCT='product';
	static PRODUCT_BROWSE='product_browse';
	static PRODUCT_DETAIL='product_detail';

	static PROJECT='project';
	static PROJECT_BROWSE='project_browse';
	static PROJECT_DETAIL='project_detail';

	static SECTION_1='section_1';
	static SECTION_2='section_2';
	static SECTION_3='section_2';
	static SECTION_4='section_4';
	static SECTION_5='section_5';
	static SECTION_6='section_6';
	static SECTION_7='section_7';
	static SECTION_8='section_8';
	static SECTION_9='section_9';
	static SECTION_10='section_10';
	static SECTION_11='section_11';
	static SECTION_12='section_12';
	static SECTION_13='section_13';
	static SECTION_14='section_14';
	static SECTION_15='section_15';
	static SECTION_16='section_16';
	static SECTION_17='section_17';
	static SECTION_18='section_18';
	static SECTION_19='section_19';
	static VALUE_1='value_1';
	static VALUE_2='value_2';
	static VALUE_3='value_2';
	static VALUE_4='value_4';
	static VALUE_5='value_5';
	static VALUE_6='value_6';
	static VALUE_7='value_7';
	static VALUE_8='value_8';
	static VALUE_9='value_9';
	static VALUE_10='value_10';
	static VALUE_11='value_11';
	static VALUE_12='value_12';
	static VALUE_13='value_13';
	static VALUE_14='value_14';
	static VALUE_15='value_15';
	static VALUE_16='value_16';
	static VALUE_17='value_17';
	static VALUE_18='value_18';
	static VALUE_19='value_19';
}
class DataType {
	static get_title = (data_type) => {
		return (!data_type) ? "" : String(Str.get_title(data_type.replaceAll('_',' ').replaceAll('dt','').replace('biz',''))).trim();
	}
	static get_item_list = () =>{
		return [
			{	title:DataType.get_title(DataType.BLOG_POST),type:DataType.BLOG_POST},
			{	title:DataType.get_title(DataType.GALLERY),type:DataType.GALLERY},
			{	title:DataType.get_title(DataType.EVENT),type:DataType.EVENT},
			{	title:DataType.get_title(DataType.TEAM),type:DataType.TEAM},
			{	title:DataType.get_title(DataType.PRODUCT),type:DataType.PRODUCT},
			{	title:DataType.get_title(DataType.SERVICE),type:DataType.SERVICE}
		]
	};
	static ADMIN='admin_biz';
	static BLANK='blank_biz';
	static BUSINESS='business_biz';
	static BLOG_POST='blog_post_biz';
	static CART_ITEM="cart_item_biz";
	static CATEGORY='category_biz';
	static CUSTOMER='customer_biz';
	static CUSTOM_FIELD='custom_field_biz';
	static CONTENT='content_biz';
	static EVENT='event_biz';
	static FAQ='faq_biz';
	static FAVORITE='favorite_biz';
	static GALLERY='gallery_biz';
	static ITEM_MAP='item_map_biz';
	static ITEM='item_biz';

	static CART="cart_biz";
	static CART_ITEM="cart_item_biz";
	static CART_SUB_ITEM="cart_sub_item_biz";

	static ORDER="order_biz";
	static ORDER_ITEM="order_item_biz";
	static ORDER_SUB_ITEM="order_sub_item_biz";
	static ORDER_PAYMENT="order_payment_biz";

	static PROJECT='project_biz';
	static PRODUCT='product_biz';
	static PHOTO='photo_biz';
	static PAGE='page_biz';
	static REVIEW='review_biz';
	static SERVICE='service_biz';
	static STAT='stat_biz';
	static TEMPLATE='template_biz';
	static TEAM='team_biz';
	static USER='user_biz';
	static VIDEO='video_biz';
}
class Blank_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.BLANK,option?option:{});
		let blank = DataItem.get_new_full_item(
			DataItem.get_new(DataType.BLANK,0),
			DataItem.get_new(DataType.BLANK,0),
			DataItem.get_new(DataType.BLANK,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			blank.items = Sub_Item_Logic.get_test_list(blank,blank,option);
			blank = Sub_Item_Logic.bind_parent_child_list(blank,blank.items);
		}
		return blank;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.BLANK,option?option:{});
		let item_list = [];
		for(let a=0;a<option.blank_count+1;a++){
			item_list.push(Blank_Logic.get_test("Blank " +String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_category = (option) =>{
		option = Field_Logic.get_option(DataType.BLANK,option?option:{});
		let blank_list = [];
		let category_list = Category_Logic.get_type_category_list(DataType.BLANK,option.category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<option.blank_count;b++){
				item_count++;
				let blank = Blank_Logic.get_test("Blank "+String(parseInt(b+1)),option);
				blank.category = category_list[Num.get_id(category_list.length+1)].title;
				blank_list.push(blank);
			}
		}
		return [category_list,blank_list]
	};
}
class Faq_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.FAQ,option?option:{});
		option.get_value = false;
		let faq = DataItem.get_new(DataType.FAQ,0,Field_Logic.get_test(title,option));
		for(let a=0;a<option.question_count+1;a++){
			if(!option.get_blank){
			let question_title = "FAQ Question " + String(parseInt(a+1));
			let answer = "My answer "+ Num.get_id() + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
			faq[Str.get_title_url(question_title).toLowerCase()] = answer;
			faq['field_'+parseInt(a+1)] =question_title;
			}else{
			let question_title = "";
			let answer = "";
			faq[Str.get_title_url(question_title).toLowerCase()] = answer;
			faq['field_'+parseInt(a+1)] =question_title;
			}
		}
		return faq;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.FAQ,option?option:{});
		let item_list = [];
		for(let a=0;a<option.question_count+1;a++){
			item_list.push(Faq_Logic.get_test("FAQ " +String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_faq_question_list(faq){
		let item_list = [];
		for(let a=0;a<19;a++){
			let row = a + 1;
			if(!Str.check_is_null(faq['field_'+a]))   {
				item_list.push({ id: Num.get_id(333), question:faq['field_'+a], answer: String(faq[Str.get_title_url(faq['field_'+a]).toLowerCase()   ]) });
			}
		}
		return item_list;
	}
}
class Favorite_Logic {
	static get_new = (parent_data_type,parent_id,user_id,option) =>{
		option = Field_Logic.get_option(DataType.FAVORITE,option?option:{});
		let favorite = DataItem.get_new(DataType.FAVORITE,0,{
			parent_data_type:parent_data_type,
			parent_id:parent_id,
			user_id:user_id,
		});
		return favorite;
	}
	static get_user_search_filter = (parent_data_type,user_id) =>{
		 return {
            $and: [
            { parent_data_type: { $regex:String(parent_data_type), $options: "i" } },
            { user_id: { $regex:String(user_id), $options: "i" } }
            ] };
	}
	static get_search_filter = (parent_data_type,parent_id,user_id) =>{
		 return {
            $and: [
            { parent_data_type: { $regex:String(parent_data_type), $options: "i" } },
            { parent_id: { $regex:String(parent_id), $options: "i" } },
            { user_id: { $regex:String(user_id), $options: "i" } }
            ] };
	}
}
class Review_Logic {
	static get_new = (parent_data_type,parent_id,user_id,title,comment,rating) =>{
		return DataItem.get_new(DataType.REVIEW,0,{
			parent_data_type:parent_data_type,
			parent_id:parent_id,
			user_id:user_id,

			title:title ? title : "",
			comment:comment ? comment : "",
			rating:rating ? rating : ""
		});
	}
	static get_search_filter = (parent_data_type,parent_id) =>{
		 return {
            $and: [
            { parent_data_type: { $regex:String(parent_data_type), $options: "i" } },
            { parent_id: { $regex:String(parent_id), $options: "i" } },
            ] };
	}
	static get_test = (parent_data_type,parent_id,user_id,option) =>{
		option = Field_Logic.get_option(DataType.REVIEW,option?option:{});
		let review = DataItem.get_new(DataType.REVIEW,0);
		if(!option.get_blank){
		review.title = 'Title ' + Num.get_id();
		review.parent_data_type = parent_data_type;
		review.parent_id = parent_id;
		review.rating = Num.get_id(6);
		review.user_id = user_id;
		review.comment = "My comment "+ Field_Logic.get_test_note();
		}else{
			review.title = '';
			review.parent_data_type = parent_data_type;
			review.parent_id = parent_id;
			review.rating = 0;
			review.user_id = user_id;
			review.comment = "";
		}
		return review;
	};
	static get_test_list=(option)=>{
		option = !Obj.check_is_empty(option) ? option : {review_count:19};
		let item_list = [];
		for(let a=0;a<option.review_count;a++){
			item_list.push(Review_Logic.get_test(option));
		}
		return item_list;
	};
}
class Admin_Logic {
	static get_new = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		return DataItem.get_new_full_item(
			DataItem.get_new(DataType.ADMIN,0),
			DataItem.get_new(DataType.ADMIN,0),
			DataItem.get_new(DataType.ADMIN,0),{
				title:title,
				email:"",
			});
	};
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.ADMIN,option?option:{});
		let item = DataItem.get_new(DataType.ADMIN,0);
		let admin = DataItem.get_new(DataType.ADMIN,0,Field_Logic.get_test(title,option));
		if(!option.get_blank){
			admin.email="ceo@admin"+Num.get_id()+".com";
			admin.password="1234567";
		}else{
			admin.email="";
			admin.password="";
		}
		return admin;
	};
	static get_full_address(admin){
		admin.address_1 = (admin.address_1) ? admin.address_1 : "";
		admin.address_2 = (admin.address_2) ? admin.address_2 : "";
		admin.city = (admin.city) ? admin.city : "";
		admin.state = (admin.state) ? admin.state : "";
		admin.zip = (admin.zip) ? admin.zip : "";
		return admin.address_1 + " "+ admin.address_2 + " " + admin.city + " " + admin.state + " " + admin.zip;
	}
}
class Business_Logic {
	static get_new = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		return DataItem.get_new_full_item(
			DataItem.get_new(DataType.BUSINESS,0),
			DataItem.get_new(DataType.BUSINESS,0),
			DataItem.get_new(DataType.BUSINESS,0),{
				title:title,
				email:"",
				phone:"",
				address_1:"",
				address_2:"",
				city:"",
				state:"",
				zip:"",
				website:"",
				youtube:"",
				instagram:"",
				facebook:"",
				twitter:""
			});
	};
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.BUSINESS,option?option:{});
		let item = DataItem.get_new(DataType.BUSINESS,0);
		let city_list = ["Miami","Atlanta","Chicago","Seattle","New York City"];
		let state_list = ["Georgia","New York","Illinois","Washington","Flordia"];
		let business = DataItem.get_new(DataType.BUSINESS,0,Field_Logic.get_test(title,option));
		if(!option.get_blank){
		business.email="ceo@business"+Num.get_id()+".com";
		business.phone=Num.get_id(parseInt(777+100)) + "-" + Num.get_id(parseInt(777+100)) + "-"+Num.get_id(parseInt(7777+1000));
		business.address_1=Num.get_id(99)+" Main St.";
		business.address_2="PO "+Num.get_id(99);
		business.city=city_list[Num.get_id(city_list.length-1)];
		business.state=state_list[Num.get_id(state_list.length-1)];
		business.zip=Num.get_id(parseInt(77777+1000));
		business.website="website_" + Num.get_id(9999);
		business.youtube="youtube_"+Num.get_id(9999);
		business.instagram="instagram_"+Num.get_id(9999);
		business.facebook="facebook_"+Num.get_id(9999);
		business.twitter="twitter_"+Num.get_id(9999);
		}else{
		business.email="";
		business.phone="";
		business.address_1="";
		business.address_2="";
		business.city="";
		business.state="";
		business.zip="";
		business.website="";
		business.youtube="";
		business.instagram="";
		business.facebook="";
		business.twitter="";
		}
		return business;
	};
	static get_full_address(business){
		business.address_1 = (business.address_1) ? business.address_1 : "";
		business.address_2 = (business.address_2) ? business.address_2 : "";
		business.city = (business.city) ? business.city : "";
		business.state = (business.state) ? business.state : "";
		business.zip = (business.zip) ? business.zip : "";
		return business.address_1 + " "+ business.address_2 + " " + business.city + " " + business.state + " " + business.zip;
	}
}
class DataItem {
	static get_new = (data_type,id,option) => {
		return get_new_item_main(data_type,id,option?option:{});
	};
	static get_new_full_item = (item,parent_item,top_item,option) => {
		return get_new_full_item_main(item,parent_item,top_item,option?option:{});
	};
	static get_biz = (biz9_config,item,option)=>{
		return get_biz_item_main(biz9_config,item,option?option:{});
	}
	static get_biz_by_list = (biz9_config,list,option)=>{
		let r_list = [];
		for(let a=0;a<list.length;a++){
			r_list.push(get_biz_item_main(biz9_config,list[a],option));
		}
		return r_list;
	}
}
class Blank_Url {
	static get = (biz9_config,key,params) => {
		let action_url="blank/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="blank/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="blank/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Blog_Post_Url {
	static get = (biz9_config,key,params) => {
		let action_url="blog_post/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="blog_post/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="blog_post/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="blog_post/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Custom_Field_Url {
	static get = (biz9_config,data_type,key,params) => {
		let action_url="custom_field/get/"+data_type+"/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="custom_field/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class FAQ_Url {
	static get = (biz9_config,key,params) => {
		let action_url="faq/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,title_url,params) => {
		let action_url="faq/category/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Cart_Url {
	static update = (biz9_config,parent_data_type,user_id,params) => {
		let action_url="cart/update/"+parent_data_type+"/"+user_id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static get = (biz9_config,cart_number,params) => {
		let action_url="cart/get/"+cart_number;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static delete = (biz9_config,id,params) => {
		let action_url="cart/delete/"+id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Order_Url {
	static update = (biz9_config,params) => {
		let action_url="order/update";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static get = (biz9_config,order_number,params) => {
		let action_url="order/get/"+order_number;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static delete = (biz9_config,id,params) => {
		let action_url="order/delete/"+id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Product_Url {
	static get = (biz9_config,key,params) => {
		let action_url="product/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="product/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="product/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="product/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Review_Url {
	static update = (biz9_config,parent_data_type,parent_id,user_id,params) => {
		let action_url="review/update/"+parent_data_type+"/"+parent_id+"/"+user_id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Event_Url {
	static get = (biz9_config,key,params) => {
		let action_url="event/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="event/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="event/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="event/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Service_Url {
	static get = (biz9_config,key,params) => {
		let action_url="service/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="service/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="service/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="service/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Content_Url {
	static get = (biz9_config,key,params) => {
		let action_url="content/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="content/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="content/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="content/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Gallery_Url {
	static get = (biz9_config,key,params) => {
		let action_url="gallery/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="gallery/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,category,params) => {
		let action_url="gallery/category/"+category;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="gallery/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class User_Url {
	static register = (biz9_config,params) => {
		let action_url="user/register";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static login = (biz9_config,params) => {
		let action_url="user/login";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Favorite_Url {
	static get = (biz9_config,parent_data_type,user_id,page_current,page_size,params) => {
		let action_url="favorite/get/"+parent_data_type+"/"+user_id+"/"+page_current+"/"+page_size;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static update = (biz9_config,parent_data_type,parent_id,user_id,params) => {
		let action_url="favorite/update/"+parent_data_type+"/"+parent_id +"/"+user_id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Category_Url {
	static get = (biz9_config,key,params) => {
		let action_url="category/get/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="category/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static search = (biz9_config,params) => {
		let action_url="category/search";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Page_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="page/get/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static home = (biz9_config,params) => {
		let action_url=PageType.get_title(PageType.HOME);
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Team_Url {
	static get = (biz9_config,key,params) => {
		let action_url="team/"+key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static member = (biz9_config,title_url,params) => {
		let action_url="team/member/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Url{
	static copy = (biz9_config,data_type,id) => {
		let action_url = "main/crud/copy/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete = (biz9_config,data_type,id) => {
		let action_url = "main/crud/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_check_protection = (biz9_config,data_type,id) => {
		let action_url = "main/crud/delete_item_check_protection/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_search = (biz9_config,data_type) => {
		let action_url = "main/crud/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static url = (biz9_config,action_url,params) => {
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	}
	static get = (biz9_config,data_type,key) => {
		let action_url= "main/crud/get/"+data_type + "/" + key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_parent_top = (biz9_config,data_type,id,parent_data_type,parent_id,top_data_type,top_id) => {
		let action_url = "main/crud/get_parent_top/"+data_type+"/"+id+"/"+parent_data_type+ "/"+parent_id+"/"+top_data_type+ "/"+top_id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static search = (biz9_config,data_type) => {
		let action_url = "main/crud/search/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static upload_file = (biz9_config,data_type,id) => {
		let action_url = "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update = (biz9_config,data_type,id) => {
		let action_url = "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_delete_cache = (biz9_config,data_type,id) => {
		let action_url = "main/crud/update_delete_cache/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_list = (biz9_config,data_type) => {
		let action_url = "main/crud/update_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
}
class Category_Logic {
	static get_test = (title,option) =>{
		title = (title) ? title : "Category 1";
		option = Field_Logic.get_option(DataType.CATEGORY,option?option:{});
		let category = DataItem.get_new(DataType.CATEGORY,0,Field_Logic.get_test(title,option));
		if(option.get_item){
			category.items = Sub_Item_Logic.get_test_list(category,category,option);
		}
		return category;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.CATEGORY,option);
		let item_list = [];
		for(let a=0;a<option.category_count;a++){
			item_list.push(Category_Logic.get_test("Category " +String(parseInt(a+1)),option));
		}
		return item_list;
	}
	static get_test_list_by_type = (type,option) =>{
		option = Field_Logic.get_option(DataType.CATEGORY,option);
		let category_list = [];
		for(let a=0;a<option.category_count;a++){
			let category = DataItem.get_new_full_item(
				DataItem.get_new(DataType.CATEGORY,0),
				DataItem.get_new(DataType.CATEGORY,0),
				DataItem.get_new(DataType.CATEGORY,0),
				Field_Logic.get_test("Category " +String(parseInt(a+1)),option));
			category.type = type;
			category_list.push(category);
		}
		return category_list;
	};
	static get_category_drop_down_list_by_list = (cat_list) => {
		let category_list = [];
		for(let a=0;a<cat_list.length;a++){
			category_list.push({value:cat_list[a].title,label:cat_list[a].title});
		}
		return category_list;
	};
	static get_category_list = () => {
		return [
			{data_type:DataType.BLOG_POST,value:DataType.BLOG_POST,label:"Blog Posts"},
			{data_type:DataType.CATEGORY,value:DataType.CATEGORY,label:"Category"},
			{data_type:DataType.CONTENT,value:DataType.CONTENT,label:"Content"},
			{data_type:DataType.EVENT,value:DataType.EVENT,label:"Events"},
			{data_type:DataType.GALLERY,value:DataType.GALLERY,label:"Galleries"},
			{data_type:DataType.SERVICE,value:DataType.SERVICE,label:"Services"},
			{data_type:DataType.PRODUCT,value:DataType.PRODUCT,label:"Product"},
			{data_type:DataType.TEMPLATE,value:DataType.TEMPLATE,label:"Template"},
			{data_type:DataType.TEAM,value:DataType.TEAM,label:"Team"}
		];
	};
	static get_title_by_type = (data_type) => {
		switch (data_type) {
			case DataType.BLOG_POST:
				return "Blog Post";
				break;
			case DataType.CATEGORY:
				return "Category";
				break;
			case DataType.CUSTOMER:
				return "Customer";
				break;
			case DataType.CONTENT:
				return "Content";
				break;
			case DataType.EVENT:
				return "Event";
				break;
			case DataType.GALLERY:
				return "Gallery";
				break;
			case DataType.PAGE:
				return "Page";
				break;
			case DataType.PHOTO:
				return "Photo";
				break;
			case DataType.PRODUCT:
				return "Product";
				break;
			case DataType.SERVICE:
				return "Service";
				break;
			case DataType.TEMPLATE:
				return "Template";
				break;
			case DataType.TEAM:
				return "Team";
				break;
			default:
				return "Blank";
		}
	}
};
class CMS {
	static Tab_Edit_Title_General = 'general';
	static Tab_Edit_Title_Photo = 'photo';
	static Tab_Edit_Title_List = 'list';
	static Tab_Edit_Title_Value = 'value';
	static Tab_Edit_Title_Setting = 'setting';
	static Tab_Edit_Title_Custom_Field = 'custom_field';
	static Tab_Edit_Title_Audio = 'audio';
	static Tab_Edit_Title_Video = 'video';
	static Tab_Edit_Title_Note = 'note';
	static get_new_query_item_by_item = (item) => {
		return {
			id: item.id ? item.id : 0,
			data_type:item.data_type ? item.data_type : DataType.BLANK,

			parent_id:item.parent_id ? item.parent_id : 0,
			parent_data_type:item.parent_data_type ? item.parent_data_type  : DataType.BLANK,

			top_id:item.top_id ? item.top_id : 0,
			top_data_type:item.top_data_type ? item.top_data_type : DataType.BLANK
		}
	};
	static get_new_query_item = (item,parent_item,top_item) => {
		return {
			id: item.id ? item.id : 0,
			data_type:item.data_type ? item.data_type : DataType.BLANK,
			parent_id:parent_item.id ? parent_item.id : 0,
			parent_data_type:parent_item.data_type ? parent_item.data_type : DataType.BLANK,

			top_id:top_item.id ? top_item.id : 0,
			top_data_type:top_item.data_type ? top_item.data_type : DataType.BLANK
		}
	};
	static get_query_itemz_by_query = (item) => {
		return [];
	};
	static get_query_item_by_page = (item) => {
		return { id:item.id ? item.id : 0, data_type:item.data_type ? item.data_type : DataType.BLANK };
	};
	static get_query_parent_item_by_page = (parent_item) => {
		return { id:parent_item.id ? parent_item.id : 0, data_type:parent_item.data_type ? parent_item.data_type : DataType.BLANK };
	};
	static get_query_top_item_by_page = (top_item) => {
		return { id:top_item.id ? top_item.id : 0, data_type:top_item.data_type ? top_item.data_type : DataType.BLANK };
	};
	static get_query_item_by_query = (query) => {
		return { id:query.get('id') ? query.get('id') : 0, data_type:query.get('data_type') ? query.get('data_type') : DataType.BLANK } ;
	};
	static get_query_parent_item_by_query = (query) => {
		return { id:query.get('parent_id') ? query.get('parent_id') : 0, data_type:query.get('parent_data_type') ? query.get('parent_data_type') : DataType.BLANK } ;
	};
	static get_query_top_item_by_query = (query) => {
		return { id:query.get('top_id') ? query.get('top_id') : 0, data_type:query.get('top_data_type') ? query.get('top_data_type') : DataType.BLANK } ;
	};
	static get_sub_page_title = (title) => {
		switch(title)
		{
			case CMS.Tab_Edit_Title_General:
				return 'General';
				break;
			case CMS.Tab_Edit_Title_Photo:
				return 'Photos';
				break;
			case CMS.Tab_Edit_Title_Value:
				return 'Values';
				break;
			case CMS.Tab_Edit_Title_Setting:
				return 'Settings';
				break;
			case CMS.Tab_Edit_Title_Note:
				return 'Note';
				break;
			case CMS.Tab_Edit_Title_Audio:
				return 'Audio';
				break;
			case CMS.Tab_Edit_Title_Video:
				return 'Video';
			case CMS.Tab_Edit_Title_Custom_Field:
				return 'Custom Fields';
				break;
			default:
				return 'N/A';
				break;
		}
	}
	static get_page_url = (url,tab_title,item,parent_item,top_item,parms) => {
		let r_url="?tab_title="+tab_title
			+"&id="+item.id
			+"&data_type="
			+item.data_type
			+"&parent_id="
			+parent_item.id
			+"&parent_data_type="
			+parent_item.data_type
			+"&top_id="
			+top_item.id
			+"&top_data_type="
			+top_item.data_type;
		if(parms){
			r_url = r_url + parms;
		}
		return url+r_url;
	}
}
class Stock {
	static get_event_stock_list = () => {
		const r_list=
			[
				{ value: "0", label: "Sold Out" },
				{ value: "1", label: "Less Than 25 Tickets Remaining" },
				{ value: "2", label: "Tickets Are Availble" },
				{ value: "3", label: "Sold Out" },
			];
		return r_list;
	};
	static get_event_stock_by_value = (stock_val) => {
		switch(stock_val)
		{
			case "0":
				return 'Sold Out';
				break;
			case "1":
				return 'Less Than 25 Tickets Remaining';
				break;
			case "2":
				return 'Tickets Are Availble';
				break;
			case "3":
				return 'Sold Out';
				break;
		}
	};
	static get_service_stock_list = () => {
		const r_list=
			[
				{ value: "0", label: "No Sessions Availble" },
				{ value: "1", label: "Ready For Booking" },
				{ value: "2", label: "No Sessions Availble" }
			];
		return r_list;
	};
	static get_service_stock_by_value = (stock_val) => {
		switch(stock_val)
		{
			case "0":
				return 'No Sessions Availble';
				break;
			case "1":
				return 'Ready For Booking';
				break;
			case "2":
				return 'No Sessions Availble';
				break;
		}
	};
	static get_product_stock_list = () => {
		const r_list=
			[
				{ value: "0", label: "Out of Stock" },
				{ value: "1", label: "Only 1 Left" },
				{ value: "2", label: "Less Than 3 Left" },
				{ value: "3", label: "Availble" }
			];
		return r_list;
	};
	static get_product_stock_by_value = (stock_val) => {
		switch(stock_val)
		{
			case "0":
				return 'Out of Stock';
				break;
			case "1":
				return 'Only 1 Left';
				break;
			case "2":
				return 'Less Than 3 Left';
				break;
			case "3":
				return 'Availble';
				break;
			default:
				return 'Availble';
				break;
		}
	};
}
class Schedule {
	static get_start_date_time = (item) => {
		item.date = (item.date)  ? item.date : new Date();
		item.time = (item.time)  ? item.time : new Date();
		item.start_date = DateTime.get_full_date_by_date_time(item.date,item.time);
		item.start_time = DateTime.get_full_time_by_date_time(item.date,item.time);
		item.start_date_time = DateTime.get_full_date_time_by_date_time(item.date,item.time);
		return item;
	}
	static get_start_date_time_by_list = (list) => {
		for(let a=0;a<list.length;a++){
			list[a].date = (list[a].date) ? list[a].date : new Date();
			list[a].time = (list[a].time) ? list[a].time : new Date();
			list[a].start_date = DateTime.get_full_date_by_date_time(list[a].date,list[a].time);
			list[a].start_time = DateTime.get_full_time_by_date_time(list[a].date,list[a].time);
			list[a].start_date_time = DateTime.get_full_date_time_by_date_time(list[a].date,list[a].time);
		}
		return list;
	}
};
class Storage {
	static get = (window,key) => {
		if(window){
			if(Str.check_is_null(window.localStorage.getItem(key))){
				return null;
			}else{
				return JSON.parse(window.localStorage.getItem(key));
			}
		}else{
			return null;
		}
	}
	static set = (window,key,obj) => {
		if(window){
			if(window.localStorage){
				window.localStorage.setItem(key,JSON.stringify(obj));
			}
		}
	}
	static remove = (window,key) =>{
		if(window){
			if(window.localStorage){
				window.localStorage.removeItem(key);
			}
		}
	}
	static clear = (window) =>{
		if(window){
			if(window.localStorage){
				window.localStorage.clear();
			}
		}
	}
}
class User_Logic {
	static get_user_country_state_city(item){
		let country_state_city = "";
		if(item.country == "United States"){
			let state = "";
			if(!Str.check_is_null(item.state)){
				country_state_city = item.state;
			}
			if(!Str.check_is_null(item.city)){
				if(!Str.check_is_null(item.state)){
					country_state_city = item.city + ", " + item.state;
				}else{
					country_state_city = item.city;
				}
			}
		}
		else{
			if(!Str.check_is_null(item.city)){
				country_state_city = item.city + ", " + item.country;
			}else{
				country_state_city = item.country;
			}
		}
		return country_state_city;
	}
	static get_guest(){
		return DataItem.get_new(DataType.USER,Num.get_id(999),{is_guest:true,title:"Guest",country:"United States"});
	}
	static get_request_user(req){
		if(!req || !req.session.user){
			let user=DataItem.get_new(DataType.USER,Num.get_id(9999999),{is_guest:true});
			req.session.user=user;
		}
		return req.session.user;
	}
	static set_request_user(req){
		req.session.user=user;
	}
	static del_request_user(req){
		req.session.user=null;
		delete req.session.user;
	}
	static get_not_found = (user_id,option) =>{
		if(!user_id){
			user_id=0;
		}
		let user = User_Logic.get_test("",{get_blank:true})
		user.id = 0;
		user.id_key = user_id;
		user.title = "User Not Found";
		user.first_name = "User Not Found";
		user.title_url = Str.get_title_url(user.title);
		if(option.app_id){
			user.app_id = option.app_id;
		}
		return user;
	};
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.USER,option?option:{});
		let user = DataItem.get_new(DataType.USER,0,
			Field_Logic.get_test(title,option));
		if(option.get_blank){
			user.first_name="";
			user.last_name="";
			user.email="";
			user.city="";
			user.state="";
			user.password="";
			user.country="";
		}else{
			user.first_name="First Name "+ Num.get_id();
			user.last_name="First Name "+ Num.get_id();
			user.email="email"+ Num.get_id() + "@email.com";
			user.city="City"+ Num.get_id();
			user.state="State"+ Num.get_id();
			user.password="1234567";
			user.country="United States";
		}
		return user;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.USER,option?option:{});
		let item_list = [];
		for(let a=0;a<option.user_count+1;a++){
			item_list.push(User_Logic.get_test("User " +String(parseInt(a+1)),option));
		}
		return item_list;
	}
}
class Sub_Item_Logic {
	static get_test(title,parent_item,top_item,option){
		option = Field_Logic.get_option(DataType.ITEM,option?option:{});
		let item_title =title;
		let item = DataItem.get_new(
			DataType.ITEM,0, {
				top_id:top_item.id,
				top_data_type:top_item.data_type,
				parent_id:parent_item.id,
				parent_data_type:parent_item.data_type,
				title:item_title,
				title_url:Str.get_title_url(item_title),
				sub_note:"Sub Note "+String(Num.get_id()),
				note:Field_Logic.get_test_note()
			}
		);
		if(option.get_value){
			item = Field_Logic.get_value_list(item,option);
		}
		return item;
	}
	static get_test_list(parent_item,top_item,option){
		option = Field_Logic.get_option(DataType.SUB_ITEM,option?option:{});
		let new_list = [];
		for(let a=0;a<option.item_count;a++){
			let item_title ="Item " + String(parseInt(a+1));
			new_list.push(Sub_Item_Logic.get_test(item_title,parent_item,top_item,option));
		}
		return new_list;
	}
	static get_test_section_list(parent_item,top_item,option){
		let new_list = [];
		for(let a=0;a<option.section_count;a++){
			let item_title ="Section " + String(parseInt(a+1));
			let item = Sub_Item_Logic.get_test(item_title,parent_item,top_item,option);
			/*
			item.items = [];
			let new_sub_list = [];
			for(let b=0;b<option.section_count;b++){
				let sub_item_title ="Section " + String(parseInt(b+1));
				let sub_item = Sub_Item_Logic.get_test(sub_item_title,item,top_item,option);
				item.items.push(sub_item);
			}
			item = Sub_Item_Logic.bind_parent_child_list(item,new_sub_list);
			*/
			new_list.push(item);
		}
		return new_list;
	}
	static bind_parent_child_list(item,item_list){
		for(let a=0;a<item_list.length;a++){
			item[Str.get_title_url(item_list[a].title)] = item_list[a];
		}
		return item;
	}
}
module.exports = {
	Admin_Logic,
	Business_Logic,
	Blank_Logic,
	Blank_Url,
	Blog_Post_Logic,
	Blog_Post_Url,
	Cart_Logic,
	Cart_Url,
	Category_Logic,
	Category_Url,
	Content_Url,
	Content_Logic,
	Custom_Field_Url,
	CMS,
	DataItem,
	DataType,
	Event_Url,
	Field_Logic,
	FieldType,
	Faq_Logic,
	Favorite_Logic,
	Favorite_Url,
	Gallery_Url,
	Item_Logic,
	Event_Logic,
	Message,
	Page_Logic,
	Page_Url,
	Product_Url,
	PageType,
	Product_Logic,
	Review_Logic,
	Review_Url,
	Order_Logic,
	Order_Url,
	Service_Logic,
	Service_Url,
	Social,
	Sub_Item_Logic,
	Stat_Logic,
	Storage,
	Schedule,
	Stock,
	TemplateType,
	Team_Logic,
	Template_Logic,
	Url,
	User_Url,
	User_Logic,
};
