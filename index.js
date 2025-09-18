/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const moment = require('moment');
const { exec } = require('child_process');
const sharp = require('sharp');
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_new_full_item_main } = require('./main');
const { Log,Str,DateTime,Num,Obj } = require('/home/think2/www/doqbox/biz9-framework/biz9-utility/code');
class Message {
	static SUCCESS="Success";
	static CONFIRM="Are You Sure?";

	static USER_LOGIN_SUCCESS="Login Success";
	static USER_LOGIN_BAD="Login Incorrect";
	static USER_REGISTER_SUCCESS="Register Success";
	static USER_REGISTER_BAD="Register Fail";
	static USER_EMAIL_BAD="Please Enter A Valid Email.";
	static USER_EMAIL_NEW_CONFIRM_BAD="The New and Confirm Email Dont Match.";
	static USER_PASSWORD_NEW_CONFIRM_BAD="The New and Confirm Password Dont Match.";
	static USER_PASSWORD_BAD="Please Enter A Valid Password.";
	static USER_EMAIL_NOT_UNIQUE="Email Not Availble. Please Choose Another.";
	static USER_USERNAME_BAD="Please Enter A Valid Username.";
	static USER_USERNAME_NOT_UNIQUE="Username Not Availble. Please Choose Another.";
	static ITEM_TITLE_BAD="Please Enter A Valid Title.";

	static DATA_NOT_FOUND="Data Not Found.";
	static SYSTEM_NOT_FOUND="System Not Found.";

	static FAVORITE_ADD_SUCCESS="Favorite Add Success.";
	static FAVORITE_REMOVE_SUCCESS="Favorite Remove Success.";
	static FAVORITE_USER_LOGIN="Please Login To Add Favorite.";

	static REVIEW_ADD_SUCCESS="Review Add Success.";
	static REVIEW_REMOVE_SUCCESS="Review Remove Success.";
	static REVIEW_USER_LOGIN="Please Login To Add Review.";
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
		let item = DataItem.get_new(data_type,0,Field_Logic.get_test(title,option));
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
	static get_field_value = (item_data_type,item_id,value_type,value_id,value,value_list) => {
		return {item_data_type:item_data_type,item_id:item_id,value_type:value_type,value_id:value_id,value:value,value_list:value_list};
	};
	static get_item_field_value_type_list = () => {
		return [
			{value:'text',label:'Text'},
			{value:'note',label:'Note'},
			{value:'image',label:'Image'},
			{value:'list',label:'List'},
		];
	};
	static get_field_value_value = (value_type,item,value_id) =>{
		switch(value_type){
			case FieldType.ITEM_FIELD_VALUE_TYPE_TEXT:
			case FieldType.ITEM_FIELD_VALUE_TYPE_NOTE:
			case FieldType.ITEM_FIELD_VALUE_TYPE_IMAGE:
				return !Str.check_is_null(item[Item_Logic.get_field_value_title(value_type,value_id)]) ? item[Item_Logic.get_field_value_title(value_type,value_id)] : "";
				break;
			case FieldType.ITEM_FIELD_VALUE_TYPE_LIST:
				let r_list = [];
				for(let a=0;a<30;a++){
					if(!Str.check_is_null(item[Item_Logic.get_field_value_title(value_type,value_id,a+1)])){
						r_list.push(item[Item_Logic.get_field_value_title(value_type,value_id,a+1)]);
					}
				}
				return r_list;
				break;
			default:
				return "";
		};
	}
	static get_field_value_title = (value_type,value_id,row_id) =>{
		let type_str = '';
		switch(value_type){
			case FieldType.ITEM_FIELD_VALUE_TYPE_TEXT:
				return 'text'+'_value_'+value_id;
				break;
			case FieldType.ITEM_FIELD_VALUE_TYPE_NOTE:
				return 'note'+'_value_'+value_id;
				break;
			case FieldType.ITEM_FIELD_VALUE_TYPE_IMAGE:
				return 'image'+'_value_'+value_id;
				break;
			case FieldType.ITEM_FIELD_VALUE_TYPE_LIST:
				return 'list'+'_value_'+value_id +'_row_'+row_id;
				break;
			default:
				return "";
		};
	}
	static get_data_search_result = (app_id,data_type,item_count,page_count,filter,data_list,option) =>{
		return{
			option:option?option:{},
			data_type:data_type?data_type:DataType.BLANK,
			item_count:item_count?item_count:0,
			page_count:page_count?page_count:1,
			filter:filter?filter:{},
			data_list:data_list?data_list:[],
			app_id:app_id?app_id:null,
		}
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
	static get_new = (user_id,stat_type_id,parent_item_list)=>{
		return {
			user_id:user_id,
			stat_type_id:stat_type_id,
			parent_item_list:parent_item_list,
		}
	}
}
class Page_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.PAGE,option?option:{});
		let page = DataItem.get_new(DataType.PAGE,0,Field_Logic.get_test(title,option));
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
	};
}
class Order_Logic {
	static get_new = (cart) => {
		let order = DataItem.get_new(DataType.ORDER,0,{
			order_number:FieldType.ORDER_NUMBER + Num.get_id(99999),
			parent_data_type:cart.parent_data_type,
			user_id:cart.user_id,
			cart_number:cart.cart_number,
			grand_total:cart.grand_total,
			order_item_list:[]
		});
		cart.cart_item_list.forEach(cart_item => {
			let order_item = DataItem.get_new(DataType.ORDER_ITEM,0,{
				order_number:order.order_number,
				parent_data_type:cart_item.parent_data_type,
				parent_id:cart_item.parent_id,
				user_id:order.user_id,
				quanity:cart_item.quanity,
				order_sub_item_list:[]
			});
			cart_item.cart_sub_item_list.forEach(cart_sub_item => {
				let order_sub_item = DataItem.get_new(DataType.ORDER_SUB_ITEM,0,{
					order_number:order.order_number,
					parent_data_type:cart_sub_item.parent_data_type,
					parent_id:cart_sub_item.parent_id,
					user_id:order.user_id,
					quanity:cart_sub_item.quanity
				})
				order_item.order_sub_item_list.push(order_sub_item);
			});

			order.order_item_list.push(order_item);

		});
		return order;
	};
	static get_new_order_payment = (order_number,payment_method_type,payment_amount) => {
		return DataItem.get_new(DataType.ORDER_PAYMENT,0,
			{
				order_number:order_number,
				payment_method_type:payment_method_type,
				payment_amount:payment_amount,
				transaction_id:FieldType.TRANSACTION_ID + Num.get_id(99999)
			});
	};
}
class Cart_Logic {
	static get_new = (parent_data_type,user_id) => {
		return DataItem.get_new(DataType.CART,0,{user_id:user_id,cart_number:FieldType.CART_NUMBER + Num.get_id(99999),parent_data_type:parent_data_type,grand_total:0,cart_item_list:[]});
	};
	static get_new_cart_item = (parent_data_type,parent_id,cart_number,quanity) =>{
		return DataItem.get_new(DataType.CART_ITEM,0,{parent_data_type:parent_data_type,parent_id:parent_id,cart_number:cart_number,quanity:quanity,cart_sub_item_list:[]});
	};
	static get_new_cart_sub_item = (parent_data_type,parent_id,cart_number,quanity) =>{
		return DataItem.get_new(DataType.CART_SUB_ITEM,0,{parent_data_type:parent_data_type,parent_id:parent_id,cart_number:cart_number,quanity:quanity});
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
				product_cart_item.item_item = product_list[a];
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
		let content = DataItem.get_new(DataType.CONTENT,0,Field_Logic.get_test(title,option));
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
class Template_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.TEMPLATE,option?option:{});
		let template = DataItem.get_new(DataType.TEMPLATE,0,Field_Logic.get_test(title,option));
		return template;
	};
}
class Blog_Post_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.BLOG_POST,option?option:{});
		let blog_post = DataItem.get_new(DataType.BLOG_POST,0,Field_Logic.get_test(title,option));
		if(!option.get_blank){
			blog_post.author="First Name "+ Num.get_id();
			blog_post.tag = "Tag "+ Num.get_id() + ", Tag "+Num.get_id() + ", Tag "+ Num.get_id(), " Tag "+ Num.get_id() + ", Tag "+Num.get_id() + ", Tag "+ Num.get_id();
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
class Gallery_Logic {
	static get_test = (title,option) =>{
		[title,option] = Field_Logic.get_option_title(title,option);
		option = Field_Logic.get_option(DataType.GALLERY,option?option:{});
		let gallery = DataItem.get_new(DataType.GALLERY,0,Field_Logic.get_test(title,option));
		if(!option.get_blank){
			gallery.date = String(String(Num.get_id(2030)) + "-" + String(Num.get_id(13)) + "-" + String(Num.get_id(30))).trim();
			gallery.time = String(Num.get_id(24)) + ":" + String(Num.get_id(59));
			gallery.website = "Website "+String(Num.get_id());
		}else{
			gallery.website = "";
		}
		if(option.get_item){
			gallery.items = Sub_Item_Logic.get_test_list(gallery,gallery,option);
		}
		return gallery;
	};
};

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
				title:title,
				title_url:title,
				title_url:Str.get_title_url(title),
				setting_visible:"1",
			}
		}else{
			item = {
				title:title,
				setting_visible:"1",
				title_url:Str.get_title_url(title),
				sub_note:"Sub Note "+String(Num.get_id()),
				note:Field_Logic.get_test_note(),
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
		option = !Obj.check_is_empty(option) ? option : {get_value:false,get_item:false,get_image:false,item_count:9,value_count:9};
		option.generate_id = option.generate_id ? option.generate_id : false;
		option.get_image = option.get_image ? true : false;
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
		if(data_type==DataType.FAQ){
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

		option.get_faq = req.query.get_faq ? req.query.get_faq : false;
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

		option.get_business_review = req.query.get_business_review ? req.query.get_business_review : false;
		option.business_review_count = req.query.business_review_count ? req.query.business_review_count : 19;

		option.user_count = req.query.user_count ? req.query.user_count : 9;
		option.get_admin = req.query.get_admin ? req.query.get_admin : false;
		option.get_template = req.query.get_template ? req.query.get_template : false;
		option.get_page = req.query.get_page ? req.query.get_page : false;

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
	static IMAGE_DATA='image_data';
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

	static USER_ROLE_SUPER_ADMIN='super_admin';
	static USER_ROLE_ADMIN='admin';
	static USER_ROLE_MANAGER='manager';
	static USER_ROLE_USER='user';
	static USER_ROLE_GUEST='guest';

	static STAT_VIEW_ADD_ID='1';
	static STAT_LIKE_ADD_ID='2';
	static STAT_FAVORITE_ADD_ID='3';
	static STAT_CART_ADD_ID='4';
	static STAT_ORDER_ADD_ID='5';
	static STAT_REVIEW_ADD_ID='6';

	/*
	static KEY_ADMIN="key_admin";
	static KEY_APP_ID="key_app_id";
	static KEY_TEMPLATE="key_template";
	static KEY_CART="key_cart";
	static KEY_ORDER="key_order";
	static KEY_USER="key_user";
	*/

	static ORDER_NUMBER="OR-";
	static CART_NUMBER="CA-";
	static TRANSACTION_ID="TR-";

	static ORDER_PAYMENT_STATUS_OPEN="Open";
	static ORDER_PAYMENT_STATUS_COMPLETE="Complete";

	static PAYMENT_PLAN_TYPE_PENDING="Pending";
	static PAYMENT_PLAN_TYPE_1="1 Payment";
	static PAYMENT_PLAN_TYPE_2="2 Payments";
	static PAYMENT_PLAN_TYPE_3="3 Payments";
	static PAYMENT_PLAN_TYPE_4="4 Payments";

	static PAYMENT_METHOD_STRIPE="Stripe";
	static PAYMENT_METHOD_CASH="Cash";
	static PAYMENT_METHOD_OTHER="Other";
	static PAYMENT_METHOD_TEST="Test";

	static APP_TYPE_MOBILE="Mobile";
	static APP_TYPE_WEBSITE="Website";
	static APP_TYPE_LANDING="Landing";

	static DATA_SOURCE_CACHE="cache";
	static DATA_SOURCE_DATABASE="database";
	static DATA_SOURCE_SERVER="server";
	static DATA_SOURCE_NOT_FOUND="not_found";

	static ENVIRONMENT_TEST="test";
	static ENVIRONMENT_STAGE="stage";
	static ENVIRONMENT_PRODUCTION="production";

	static ACTIVITY_TYPE_LOGIN="login";
	static ACTIVITY_TYPE_REGISTER="register";

	static ITEM_FIELD_VALUE_TYPE_TEXT="text";
	static ITEM_FIELD_VALUE_TYPE_NOTE="note";
	static ITEM_FIELD_VALUE_TYPE_IMAGE="image";
	static ITEM_FIELD_VALUE_TYPE_LIST="list";

	static IMAGE_SIZE_THUMB="thumb";
	static IMAGE_SIZE_MID="mid";
	static IMAGE_SIZE_LARGE="large";
	static IMAGE_SIZE_SQUARE_THUMB="squre_thumb";
	static IMAGE_SIZE_SQUARE_MID="squre_mid";
	static IMAGE_SIZE_SQUARE_LARGE="squre_large";

	static get_title(field_type){
		switch(field_type){
			case FieldType.USER_ROLE_SUPER_ADMIN:
				return "Super Admin";
			case FieldType.USER_ROLE_ADMIN:
				return "Admin";
			case FieldType.USER_ROLE_Manager:
				return "Manager";
			case FieldType.USER_ROLE_USER:
				return "User";
			case FieldType.USER_ROLE_GUEST:
				return "Guest";
		}
	}
}
class Social {
	static FACEBOOK_URL="https://facebook.com/";
	static TWITTER_URL="https://twitter.com/";
	static INSTAGRAM_URL="https://instagram.com/";
	static YOUTUBE_URL="https://youtube.com/";
	static LINKEDIN_URL="https://linkedin.com/";
}
class PageType {
	static HOME='home';
	static ABOUT='about';
	static CONTACT='contact';
	static FAQ='faq';

	static BLOG_POST='blog_post';
	static BLOG_POST_DETAIL='blog_post_detail';

	static EVENT='event';
	static EVENT_DETAIL='event_detail';

	static GALLERY='gallery';
	static GALLERY_DETAIL='gallery_detail';

	static SERVICE='service';
	static SERVICE_DETAIL='service_detail';

	static PRODUCT='product';
	static PRODUCT_DETAIL='product_detail';

	static PAGE_LIST = [PageType.HOME,PageType.ABOUT,PageType.CONTACT,PageType.FAQ,PageType.BLOG_POST,PageType.EVENT,PageType.GALLERY,PageType.SERVICE,PageType.PRODUCT];

	static get_title = (data_type) => {
		if(!data_type){
			return "";
		}else{
			return String(Str.get_title(data_type.replaceAll('_',' '))).trim();
		}
	}
}
class DataType {

	static SECTION='section';
	static SUB_SECTION='sub_section';

	static ACTIVITY='activity_biz';
	static APP='app_biz';
	static BLANK='blank_biz';
	static BLOG_POST='blog_post_biz';
	static CART_ITEM="cart_item_biz";
	static CATEGORY='category_biz';
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

	static PRODUCT='product_biz';
	static IMAGE='image_biz';
	static PAGE='page_biz';
	static REVIEW='review_biz';
	static SERVICE='service_biz';
	static SECURITY='security_biz';
	static STAT='stat_biz';
	static TEMPLATE='template_biz';
	static USER='user_biz';
	static VIDEO='video_biz';

	static get_title = (data_type,get_plural) => {
		let r_data_type =  (!data_type) ? "" : String(Str.get_title(data_type.replaceAll('_',' ').replaceAll('dt','').replace('biz',''))).trim();
		if(get_plural){
			if(data_type==DataType.GALLERY){
				return 'Galleries';
			}else{
				return r_data_type + "s";
			}
		}else{
			return r_data_type;
		}

	}
	static get_url(data_type){
		switch(data_type){
			case DataType.ACTIVITY:
				return 'activity';
			case DataType.BLOG_POST:
				return 'blog_post';
			case DataType.SERVICE:
				return 'service';
			case DataType.EVENT:
				return 'event';
			case DataType.GALLERY:
				return 'gallery';
			case DataType.PRODUCT:
				return 'product';
			case DataType.BLANK:
				return 'blank';
			case DataType.REVIEW:
				return 'review';
			case DataType.FAQ:
				return 'faq';
			case DataType.FAVORITE:
				return 'favorite';
			case DataType.CATEGORY:
				return 'category';
			case DataType.VIDEO:
				return 'video';
			case DataType.IMAGE:
				return 'image';
			case DataType.PAGE:
				return 'page';
			case DataType.USER:
				return 'user';
			case DataType.TEMPLATE:
				return 'template';
			case DataType.CONTENT:
				return 'content';
			case DataType.ITEM:
				return 'item';
			case DataType.CUSTOM_FIELD:
				return 'custom_field';
		}
	}
	static get_list = () =>{
		return [
			{	title:DataType.get_title(DataType.BLOG_POST),type:DataType.BLOG_POST},
			{	title:DataType.get_title(DataType.EVENT),type:DataType.EVENT},
			{	title:DataType.get_title(DataType.GALLERY),type:DataType.GALLERY},
			{	title:DataType.get_title(DataType.USER),type:DataType.USER},
			{	title:DataType.get_title(DataType.PRODUCT),type:DataType.PRODUCT},
			{	title:DataType.get_title(DataType.SERVICE),type:DataType.SERVICE}
		]
	};
}
class Favorite_Logic {
	static get_new = (parent_data_type,parent_id,user_id) =>{
		return DataItem.get_new(DataType.FAVORITE,0,{
			parent_data_type:parent_data_type,
			parent_id:parent_id,
			user_id:user_id
		});
	}
	static get_favorite_by_list = (favorite_list,item_list) =>{
		favorite_list.forEach(item => {
			const item_match = item_list.find(item_find => item_find.id === item.item_id);
			if (item_match) {
				item_match.is_favorite = true;
			}
		});
		return item_list;
	}
	static get_user_search_filter = (item_data_type,user_id) =>{
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
			rating:rating ? rating : 5
		});
	}
	static get_user_search_filter = (item_data_type,user_id) =>{
		return {
			$and: [
				{ item_data_type: { $regex:String(item_data_type), $options: "i" } },
				{ user_id: { $regex:String(user_id), $options: "i" } }
			] };
	}
	static get_search_filter = (item_data_type,parent_id) =>{
		return {
			$and: [
				{ item_data_type: { $regex:String(item_data_type), $options: "i" } },
				{ parent_id: { $regex:String(parent_id), $options: "i" } },
			] };
	}
	static get_test = (item_data_type,item_id,user_id,option) =>{
		option = Field_Logic.get_option(DataType.REVIEW,option?option:{});
		let review = DataItem.get_new(DataType.REVIEW,0);
		if(!option.get_blank){
			review.title = 'Title ' + Num.get_id();
			review.item_data_type = item_data_type;
			review.item_id = item_id;
			review.rating = Num.get_id(6);
			review.user_id = user_id;
			review.comment = "My comment "+ Field_Logic.get_test_note();
		}else{
			review.title = '';
			review.item_data_type = item_data_type;
			review.item_id = item_id;
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
class DataItem {
	static get_new = (data_type,id,option) => {
		return get_new_item_main(data_type,id,option?option:{});
	};
	static get_new_full_item = (item,parent_item,top_item,option) => {
		return get_new_full_item_main(item,parent_item,top_item,option?option:{});
	};
}
class Dashboard_Url {
	static user_home = (app_id,url,params) => {
		let action_url="dashboard/user_home";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static app_home = (app_id,url,params) => {
		let action_url="dashboard/app_home";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Blog_Post_Url {
	static detail = (app_id,url,key,params) => {
		let action_url="blog_post/detail/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="blog_post";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,params) => {
		let action_url="blog_post/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Product_Url {
	static detail = (app_id,url,key,params) => {
		let action_url="product/detail/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="product";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,params) => {
		let action_url="product/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Event_Url {
	static detail = (app_id,url,key,params) => {
		let action_url="event/detail/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="event";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,params) => {
		let action_url="event/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Service_Url {
	static detail = (app_id,url,key,params) => {
		let action_url="service/detail/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="service/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,params) => {
		let action_url="service/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Gallery_Url {
	static detail = (app_id,url,key,params) => {
		let action_url="gallery/detail/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="gallery";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,params) => {
		let action_url="gallery/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class User_Url {
	static info = (app_id,url,params) => {
		let action_url="user/info/";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static register = (app_id,url,params) => {
		let action_url="user/register";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static login = (app_id,url,params) => {
		let action_url="user/login";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static logout = (app_id,url,params) => {
		let action_url="user/logout";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Image_Url {
	static post = (app_id,url,params) => {
		let action_url="main/image/post";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_cdn = (app_id,url,params) => {
		let action_url="main/image/post_cdn";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Item_Url {
	static activity = (app_id,url,params) => {
		let action_url="item/activity";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static cart = (app_id,url,cart_number,params) => {
		let action_url="item/cart/"+cart_number;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static content = (app_id,url,key,params) => {
		let action_url="item/content/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static custom_field = (app_id,url,data_type,key,params) => {
		let action_url="item/custom_field/"+data_type+"/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static delete_order = (app_id,url,id,params) => {
		let action_url="item/delete_order/"+id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static delete_cart = (app_id,url,id,params) => {
		let action_url="item/delete_cart/"+id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static favorite = (app_id,url,parent_data_type,page_current,page_size,params) => {
		let action_url="item/favorite/"+parent_data_type+"/"+page_current+"/"+page_size;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static order = (app_id,url,order_number,params) => {
		let action_url="item/order/"+order_number;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_cart = (app_id,url,parent_data_type,params) => {
		let action_url="item/post_cart/"+parent_data_type;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_cms = (app_id,url,data_type,id,params) => {
		let action_url = "item/post_cms/"+data_type+"/"+id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_favorite = (app_id,url,parent_data_type,parent_item_id,params) => {
		let action_url="item/post_favorite"+parent_data_type+"/"+parent_item_id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_field_value = (app_id,url,item_data_type,parent_item_id,value_id,params) => {
		let action_url="item/post_field_value/"+item_data_type+"/"+parent_item_id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_review = (app_id,url,parent_data_type,item_id,params) => {
		let action_url="item/post_review/"+parent_data_type+"/"+item_id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_order = (app_id,url,params) => {
		let action_url="item/post_order";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static review = (app_id,url,parent_data_type,page_current,page_size,params) => {
		let action_url="item/review/"+parent_data_type+"/"+page_current+"/"+page_size;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search_cart = (app_id,url,parent_data_type,params) => {
		let action_url="item/search_cart/"+parent_data_type;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search_order = (app_id,url,parent_data_type,params) => {
		let action_url="item/search_order/"+parent_data_type;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static template = (app_id,url,key,params) => {
		let action_url="item/template/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Category_Url {
	static detail = (app_id,url,key,params) => {
		let action_url="category/detail/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="category";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,params) => {
		let action_url="category/search";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Page_Url {
	static get = (app_id,url,title_url,params) => {
		let action_url="page/get/"+title_url;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static home = (app_id,url,params) => {
		let action_url="page/home";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static about = (app_id,url,params) => {
		let action_url="page/about";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static contact = (app_id,url,params) => {
		let action_url="page/contact";
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static faq = (app_id,url,key,params) => {
		let action_url="page/faq/"+key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
}
class Url{
	static copy = (app_id,url,data_type,id,params) => {
		let action_url = "main/crud/copy/"+data_type + "/" + id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static delete = (app_id,url,data_type,id,params) => {
		let action_url = "main/crud/delete/"+data_type + "/" + id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static delete_check_protection = (app_id,url,data_type,id,params) => {
		let action_url = "main/crud/delete_item_check_protection/"+data_type + "/" + id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static delete_search = (app_id,url,data_type,params) => {
		let action_url = "main/crud/delete_list/"+data_type;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static url = (app_id,url,action_url,params) => {
		return get_cloud_url_main(app_id,url,action_url,params);
	}
	static get = (app_id,url,data_type,key,params) => {
		let action_url= "main/crud/get/"+data_type + "/" + key;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static get_parent_top = (app_id,url,data_type,id,params) => {
		let action_url = "main/crud/get_parent_top/"+data_type+"/"+id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static search = (app_id,url,data_type,params) => {
		let action_url = "main/crud/search/"+data_type;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static upload_file = (app_id,url,data_type,id,params) => {
		let action_url = "main/crud/post/"+data_type + "/" + id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post = (app_id,url,data_type,id,params) => {
		let action_url = "main/crud/post/"+data_type + "/" + id;
		return get_cloud_url_main(app_id,url,action_url,params);
	};
	static post_list = (app_id,url,params) => {
		let action_url = "main/crud/post_list";
		return get_cloud_url_main(app_id,url,action_url,params);
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
			let category = DataItem.get_new(DataType.CATEGORY,0,Field_Logic.get_test("Category " +String(parseInt(a+1)),option));
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
	static get_category_type_list = () => {
		return [
			{data_type:DataType.BLOG_POST,value:DataType.BLOG_POST,label:"Blog Post"},
			{data_type:DataType.CATEGORY,value:DataType.CATEGORY,label:"Category"},
			{data_type:DataType.CONTENT,value:DataType.CONTENT,label:"Content"},
			{data_type:DataType.EVENT,value:DataType.EVENT,label:"Event"},
			{data_type:DataType.GALLERY,value:DataType.GALLERY,label:"Gallery"},
			{data_type:DataType.SERVICE,value:DataType.SERVICE,label:"Service"},
			{data_type:DataType.USER,value:DataType.USER,label:"User"},
			{data_type:DataType.PRODUCT,value:DataType.PRODUCT,label:"Product"},
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
			case DataType.CONTENT:
				return "Content";
				break;
			case DataType.EVENT:
				return "Event";
				break;
			case DataType.GALLERY:
				return "Gallery";
				break;
			case DataType.USER:
				return "User";
				break;
			case DataType.PAGE:
				return "Page";
				break;
			case DataType.IMAGE:
				return "Image";
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
			default:
				return "Blank";
		}
	}
};
class CMS {
	static Tab_Edit_Title_General = 'general';
	static Tab_Edit_Title_Image = 'image';
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
			case CMS.Tab_Edit_Title_Image:
				return 'Images';
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
		if(!Obj.check_is_empty(window)){
			if(Str.check_is_null(window.localStorage.getItem(key))){
				return null;
			}else{
				return JSON.parse(window.localStorage.getItem(key));
			}
		}else{
			return null;
		}
	}
	static post = (window,key,obj) => {
		if(!Obj.check_is_empty(window)){
			if(window.localStorage){
				window.localStorage.setItem(key,JSON.stringify(obj));
			}
		}
	}
	static delete = (window,key) =>{
		if(!Obj.check_is_empty(window)){
			if(window.localStorage){
				window.localStorage.removeItem(key);
			}
		}
	}
	static delete_all = (window) =>{
		if(!Obj.check_is_empty(window)){
			if(window.localStorage){
				window.localStorage.clear();
			}
		}
	}
}
class User_Logic {
	static get_role_list = () => {
		return [
			{value:'admin',label:"Admin"},
			{value:'manager',label:"Manager"},
			{value:'user',label:"User"},
			{value:'guest',label:"Guest"},
		];
	};
	static get_country_state_city(item){
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
	static get_full_name(first_name,last_name){
		let str_first_name = !Str.check_is_null(first_name) ? first_name : "";
		let str_last_name = !Str.check_is_null(last_name) ? last_name : "";
		return !Str.check_is_null(String(str_first_name + " " + str_last_name)) ? String(str_first_name + " " + str_last_name).trim() : "N/A";

	}
	static get_guest(){
		return DataItem.get_new(DataType.USER,0,{is_guest:true,title_url:'guest',first_name:'Guest',last_name:'User',email:'guest@email.com',title:"Guest",country:"United States"});
	}
	static get_request_user(req){
		if(!req || !req.session.user){
			let user=DataItem.get_new(DataType.USER,Num.get_id(9999999),{is_guest:true});
			req.session.user=user;
		}
		return req.session.user;
	}
	static post_request_user(req,user){
		req.session.user=user;
	}
	static delete_request_user(req){
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
class App_Logic {
	static get_new = (title,user_id,type,option) =>{
		option = Field_Logic.get_option(DataType.APP,option?option:{});
		let app = DataItem.get_new(DataType.APP,0);
		app.title = title;
		app.user_id = user_id;
		app.type = type;
		return app;
	}
}

class Image_Logic {
	static get_url = (host,image_filename,size) =>{
		return host+"/"+size + "_"+image_filename;
	}
	static get_new_by_base64 = (base64) =>{
		return DataItem.get_new(DataType.IMAGE,0,
			{
				mime_type:!Str.check_is_null(Str.get_file_type_from_base64(base64)) ? Str.get_file_type_from_base64(base64).mimeType : 'image/jpeg',
				extension:!Str.check_is_null(Str.get_file_type_from_base64(base64)) ? Str.get_file_type_from_base64(base64).extension : 'jpeg',
				image_filename:!Str.check_is_null(Str.get_file_type_from_base64(base64)) ? Str.get_guid()+"."+Str.get_file_type_from_base64(base64).extension : 'not_found.jpeg',
				buffer:!Str.check_is_null(Str.get_file_type_from_base64(base64)) ? Buffer.from(base64.split(';base64,').pop(), 'base64') : null,
		});
	}
 	static get_cloud_flare_batch_token = (cloud_flare_account_id,cloud_flare_api_token) => {
        return new Promise((callback) => {
            let data_batch,error=null;
            const url = "https://api.cloudflare.com/client/v4/accounts/"+cloud_flare_account_id+"/images/v1/batch_token";
            const headers = {
                "Accept": "application/json",
                "Authorization": "Bearer " +cloud_flare_api_token
            };
            let curlCommand = `curl -s -H "Accept: ${headers.Accept}"`;
            if (headers.Authorization) {
                curlCommand += ` -H "Authorization: ${headers.Authorization}"`;
            }
            curlCommand += ` "${url}"`;
            exec(curlCommand,async(err,stdout,stderr) => {
                if (err) {
                    err = `1 Error executing curl command: ${error.message}`;
                    console.error(err);
                    error=Log.append(error,err);
                    return;
                }
                if (stderr) {
                    err = `2 Curl stderr: ${stderr}`;
                    console.error(err);
                    error=Log.append(error,err);
                    return;
                }
                try {
                    const jsonData =await JSON.parse(stdout);
                    data_batch =  jsonData.result.token;
                    if(data_batch!== null){
                        callback([error,data_batch]);
                    }
                } catch (parseError) {
                    console.error(`Error parsing JSON response: ${parseError.message}`);
                    console.log('Raw Response:', stdout);
                    callback([parseError,null]);
                }
            });
        });
    };
 	static post_cloud_flare_batch_image = (cloud_flare_api_token,batch_token,image_filename,item_file_path) => {
        let error = null;
        return new Promise((callback) => {
            async.series([
                async function(call){
                    const post_url = "https://batch.imagedelivery.net/images/v1";
                    const headers = {
                        "Accept": "application/json",
                        "Authorization": "Bearer " +batch_token
                    };
                    let curlCommand = `curl -s -H "Accept: ${headers.Accept}"`;
                    curlCommand += ` -H "Authorization: ${headers.Authorization}"`;
                    curlCommand += " -H X-Auth-Key: "+ cloud_flare_api_token;
                    curlCommand += " -F requireSignedURLs=false";
                    curlCommand += " -F id="+image_filename;
                    curlCommand += " -F file=@"+item_file_path;
                    curlCommand += ` "${post_url}"`;
                    exec(curlCommand, (err, stdout, stderr) => {
                        if (err) {
                            err = `Error executing curl command: ${err.message}`;
                            console.error(err);
                            error=Log.append(error,err);
                        }
                        if (stderr) {
                            err = `Curl stderr: ${stderr}`;
                            console.error(err);
                            error=Log.append(error,err);
                        }
                        try {
                            const jsonData = JSON.parse(stdout);
                            console.log('cool');
                            console.log(jsonData);
                            console.log('bean');
                            if(jsonData!== null){
                                callback([error,jsonData]);
                            }
                        } catch (parseError) {
                            console.error(`Error parsing JSON response: ${parseError.message}`);
                            console.log('Raw Response:', stdout);
                            error=Log.append(error,parseError);
                            callback([error,null]);
                        }
                    });
                },
            ])
        });
    };

 	static post_write = (buffer,size,path_filename,is_square) => {
        return new Promise((callback) => {
            let data,error=null;
            if(is_square){
            sharp(buffer)
                .resize(size)
                .toFile(path_filename,(err, info) => {
                    if(err){
                        error=Log.append(error,'Error thumb saving file:');
                        console.error('Error thumb saving file:', err);
                    }
                    if(info!==null){
                        callback([error,true]);
                    }
                });
            }else{
            sharp(buffer)
                .resize(size,size,{fit:sharp.fit.fill,quality:100})
                .toFile(path_filename,(err, info) => {
                    if(err){
                        error=Log.append(error,'Error thumb saving file:');
                        console.error('Error thumb saving file:', err);
                    }
                    if(info!==null){
                        callback([error,true]);
                    }
                });
            }
        });
	}
	static get_process_list = (upload_dir,image_filename) =>{
		 return [
			{
				image_filename:FieldType.IMAGE_SIZE_THUMB+"_"+image_filename,
				path_filename:upload_dir+"/"+FieldType.IMAGE_SIZE_THUMB+"_"+image_filename,
				size:250,
				is_square:false,
				post_file:false,
				post_cdn:false
			},
			{
				image_filename:FieldType.IMAGE_SIZE_MID+"_"+image_filename,
				path_filename:upload_dir+"/"+FieldType.IMAGE_SIZE_MID+"_"+image_filename,
				size:720,
				is_square:false,
				post_file:false,
				post_cdn:false
			},
			{
				image_filename:FieldType.IMAGE_SIZE_LARGE+"_"+image_filename,
				path_filename:upload_dir+"/"+FieldType.IMAGE_SIZE_LARGE+"_"+image_filename,
				size:1000,
				is_square:false,
				post_file:false,
				post_cdn:false
			},
			{
				image_filename:FieldType.IMAGE_SIZE_SQUARE_THUMB+"_"+image_filename,
				path_filename:upload_dir+"/"+FieldType.IMAGE_SIZE_SQUARE_THUMB+"_"+image_filename,
				size:250,
				is_square:true,
				post_file:false,
				post_cdn:false
			},
			{
				image_filename:FieldType.IMAGE_SIZE_SQUARE_MID+"_"+image_filename,
				path_filename:upload_dir+"/"+FieldType.IMAGE_SIZE_SQUARE_MID+"_"+image_filename,
				size:720,
				is_square:true,
				post_file:false,
				post_cdn:false
			},
			{
				image_filename:FieldType.IMAGE_SIZE_SQUARE_LARGE+"_"+image_filename,
				path_filename:upload_dir+"/"+FieldType.IMAGE_SIZE_SQUARE_LARGE+"_"+image_filename,
				size:1000,
				is_square:true,
				post_file:false,
				post_cdn:false
			},
		];
	}
}
module.exports = {
	App_Logic,
	Admin_Logic,
	Blog_Post_Logic,
	Blog_Post_Url,
	Dashboard_Url,
	Cart_Logic,
	Category_Logic,
	Category_Url,
	Content_Logic,
	CMS,
	DataItem,
	DataType,
	Event_Url,
	Field_Logic,
	FieldType,
	Favorite_Logic,
	Gallery_Logic,
	Gallery_Url,
	Item_Logic,
	Image_Logic,
	Image_Url,
	Item_Url,
	Event_Logic,
	Message,
	Page_Logic,
	Page_Url,
	Product_Url,
	PageType,
	Product_Logic,
	Review_Logic,
	Order_Logic,
	Service_Logic,
	Service_Url,
	Social,
	Sub_Item_Logic,
	Stat_Logic,
	Storage,
	Schedule,
	Stock,
	Template_Logic,
	TemplateType,
	Url,
	User_Url,
	User_Logic,
};
