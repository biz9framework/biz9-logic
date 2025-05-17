/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const moment = require('moment');
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_new_full_item_main } = require('./main');
const { Log,Test,Str,DateTime,Number } = require('biz9-utility');
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
class Template{
	static get_test = () =>{
		let template = DataItem.get_new_full_item(
			DataItem.get_new(DataType.TEMPLATE,Number.get_id()),
			DataItem.get_new(DataType.TEMPLATE,0),
			DataItem.get_new(DataType.TEMPLATE,0),
			Field.get_test("Primary"));
		let template_sub_title_list = ["Header","Navigation","Body","Footer"];
		for(let a=0;a<template_sub_title_list.length;a++){
			template = Sub_Item.get_test_bind_new_child(Number.get_id(),template_sub_title_list[a],template,template,template);
		}
		template = Sub_Item.get_test_bind_item_sub_item(template);
		return template;
	};
}
class Page{
	static get_test = (title) =>{
		let page = DataItem.get_new_full_item(
			DataItem.get_new(DataType.PAGE,Number.get_id()),
			DataItem.get_new(DataType.PAGE,0),
			DataItem.get_new(DataType.PAGE,0),
			Field.get_test(title));

		for(let a=0;a<20;a++){
			page=Sub_Item.get_test_bind_new_child(Number.get_id(),"Section "+a,page,page,page);
		}
		page = Sub_Item.get_test_bind_item_sub_item(page);

		return page;
	};
}
class Product{
	static get_test = (option) =>{
		if(!option){
			option={};
		}
		let product = DataItem.get_new_full_item(
			DataItem.get_new(DataType.PRODUCT,Number.get_id()),
			DataItem.get_new(DataType.PRODUCT,0),
			DataItem.get_new(DataType.PRODUCT,0),
			Field.get_test("Product "+Number.get_id(),{get_value:false}));
		product.cost = String(Number.get_id()) + "." + String(Number.get_id());
		product.old_cost = String(Number.get_id()) + "." + String(Number.get_id());
		product.type = "Type "+String(Number.get_id());
		product.sub_type = "Sub Type "+String(Number.get_id());
		product.stock = String(Number.get_id(3-1));
		product.category ="Category " + String(Number.get_id());
		if(option.get_item){
			product = Sub_Item.get_test_bind_new_child(Number.get_id(),"Product "+Number.get_id(),product,product,product);
			for(let a=0;a<10;a++){
				product=Sub_Item.get_test_bind_new_child(Number.get_id(),"Section " + String(a),product,product,product);
			}
			product = Sub_Item.get_test_bind_item_sub_item(product);
		}
		return product;
	};
	static get_test_list_by_category = (option) =>{
		let product_list = [];
		let category_count = 9;
		let product_count = 19;
		if(!option){
			option={};
		}
		else{
			if(option.category_count){
				category_count = parseInt(option.category_count);
			}
			if(option.category_count){
				product_count = parseInt(option.product_count);
			}
		}
		let category_list = Category.get_type_category_list(DataType.PRODUCT,category_count);
		let item_count = 0;
		for(let a=0;a<category_list.length;a++){
			for(let b=0;b<product_count;b++){
				item_count++;
				let product = Product.get_test("Product " + String(item_count));
				product.category = category_list[Number.get_id(category_list.length-1)].title;
				product_list.push(product);
			}
		}
		return [category_list,product_list]
	};
}
class Service{
	static get_test = (option) =>{
		if(!option){
			option = {get_value:false,get_item:false};
		}
		let service = DataItem.get_new_full_item(
			DataItem.get_new(DataType.SERVICE,Number.get_id()),
			DataItem.get_new(DataType.SERVICE,0),
			DataItem.get_new(DataType.SERVICE,0),
			Field.get_test("Service "+Number.get_id(),{get_value:false}));
		service = Sub_Item.get_test_bind_new_child(Number.get_id(),"Service "+Number.get_id(),service,service,service);
		service.cost = String(Number.get_id()) + "." + String(Number.get_id());
		service.old_cost = String(Number.get_id()) + "." + String(Number.get_id());
		service.type = "Type "+String(Number.get_id());
		service.sub_type = "Sub Type "+String(Number.get_id());
		service.stock = String(Number.get_id(3-1));
		service.category ="Category " + String(Number.get_id());
		if(option.get_item){
			service = Sub_Item.get_test_bind_new_child(Number.get_id(),"Service "+Number.get_id(),service,service,service);
			for(let a=0;a<10;a++){
				service=Sub_Item.get_test_bind_new_child(Number.get_id(),"Section " + String(a),service,service,service);
			}
			service = Sub_Item.get_test_bind_item_sub_item(service);
		}
	return service;
	};
	static get_test_list=(option)=>{
		if(!option){
			option={service_count:19};
		}
		let item_list=[];
		for(let a=0;a<option.service_count;a++){
			item_list.push(Service.get_test());
		}
		return item_list;
	};
}
class Event{
	static get_test = (option) =>{
		if(!option){
			option = {get_value:false,get_item:false};
		}
		let event = DataItem.get_new_full_item(
			DataItem.get_new(DataType.EVENT,Number.get_id()),
			DataItem.get_new(DataType.EVENT,0),
			DataItem.get_new(DataType.EVENT,0),
			Field.get_test("Event "+Number.get_id(),{get_value:false}));
		event = Sub_Item.get_test_bind_new_child(Number.get_id(),"Event "+Number.get_id(),event,event,event);
		event.cost = String(Number.get_id()) + "." + String(Number.get_id());
		event.old_cost = String(Number.get_id()) + "." + String(Number.get_id());
		event.date = String(String(Number.get_id(2030)) + "-" + String(Number.get_id(13)) + "-" + String(Number.get_id(30))).trim();
		event.time = String(Number.get_id(24)) + ":" + String(Number.get_id(59));
		event.website = "Website "+String(Number.get_id());
		event.location = "Location "+String(Number.get_id());
		event.meeting_link = "Meeting Link "+String(Number.get_id());
		event.stock = String(Number.get_id(3-1));
		event.category ="Category " + String(Number.get_id());
		if(option.get_item){
			event=Sub_Item.get_test_bind_new_child(Number.get_id(),"Event "+Number.get_id(),event,event,event);
			for(let a=0;a<10;a++){
				event=Sub_Item.get_test_bind_new_child(Number.get_id(),"Section " +String(a),event,event,event);
			}
			event=Sub_Item.get_test_bind_item_sub_item(event);
		}
		return event;
	};
	static get_test_list=(option)=>{
		if(!option){
			option={event_count:19};
		}
		let item_list=[];
		for(let a=0;a<option.event_count;a++){
			item_list.push(Event.get_test());
		}
		return item_list;
	};
}
class Field{
	static get_test = (title,option) =>{
		if(!title){
			title="";
		}
		if(!option){
			option={get_value:true};
		}
		Log.w('option',option);
		let item = {
			date_create:new moment().toISOString(),
			date_save:new moment().toISOString(),
			title:title,
			setting_visible:"1",
			photo_data:"/images/no_img.jpg",
			title_url:Str.get_title_url(title),
			sub_note : "Sub Note "+String(Number.get_id()),
			note : "Note "+String(Number.get_id())
		}
		if(option.get_value){
			for(let b = 1;b<20;b++){
				item['value_'+String(b)] = 'value ' + String(b);
			}
		}
		return item;
	}
}
class FieldType {
	static APP_ID='app_id';
	static ID='id';
	static DATA_TYPE='data_type';
	static PARENT_ID='parent_id';
	static PARENT_DATA_TYPE='parent_data_type';
	static PHOTO_DATA='photo_data';
	static TOP_ID='top_id';
	static TOP_DATA_TYPE='top_data_type';
	static DATE_CREATE='date_create';
	static DATE_SAVE='date_save';
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
}
class PageType {
	static HOME='home';
	static ABOUT='about';
	static CONTACT='contact';
	static BLOG_POST='blog_post';
	static GALLERY='gallery';
	static EVENT='event';
	static SERVICE='service';
	static PRODUCT='product';
	static PROJECT='project';
	static TEAM='team';
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
		if(!data_type){
			return "";
		}else{
			return String(Str.get_title(data_type.replaceAll('_',' ').replaceAll('dt','').replace('biz',''))).trim();
		}
	}
	static get_item_list = () =>{
		return [
			{	title:DataType.get_title(DataType.BLOG_POST),type:DataType.BLOG_POST},
			{	title:DataType.get_title(DataType.SERVICE),type:DataType.SERVICE},
			{	title:DataType.get_title(DataType.EVENT),type:DataType.EVENT},
			{	title:DataType.get_title(DataType.GALLERY),type:DataType.GALLERY},
			{	title:DataType.get_title(DataType.PRODUCT),type:DataType.PRODUCT}
		]
	};
	static ADMIN='admin_biz';
	static BLANK='blank_biz';
	static BUSINESS='business_biz';
	static BLOG_POST='blog_post_biz';
	static CART_ITEM="cart_item_biz";
	static CATEGORY='category_biz';
	static CONTENT='content_biz';
	static EVENT='event_biz';
	static GALLERY='gallery_biz';
	static ITEM_MAP='item_map_biz';
	static ITEM='item_biz';
	static ORDER="order_biz";
	static ORDER_ITEM="order_item_biz";
	static PROJECT='project_biz';
	static PRODUCT='product_biz';
	static PHOTO='photo_biz';
	static PAGE='page_biz';
	static REVIEW='review_biz';
	static SERVICE='service_biz';
	static TEMPLATE='template_biz';
	static USER='user_biz';
	static VIDEO='video_biz';
}
class Blog_Post{
	static get_test = (option) =>{
		if(!option){
			option = {get_value:false,get_item:false};
		}
		let blog_post = DataItem.get_new_full_item(
			DataItem.get_new(DataType.BLOG_POST,Number.get_id()),
			DataItem.get_new(DataType.BLOG_POST,0),
			DataItem.get_new(DataType.BLOG_POST,0),
			Field.get_test("Blog Post "+Number.get_id(),{get_value:false}));
		blog_post.author="First Name "+ Number.get_id();
		blog_post.tag="tag 1,tag 2,tag 3";
		blog_post.category ="Category " + String(Number.get_id());
		if(option.get_item){
			blog_post=Sub_Item.get_test_bind_new_child(Number.get_id(),"Blog Post "+Number.get_id(),blog_post,blog_post,blog_post);
			for(let a=0;a<10;a++){
				blog_post=Sub_Item.get_test_bind_new_child(Number.get_id(),"Section " +String(a),blog_post,blog_post,blog_post);
			}
			blog_post=Sub_Item.get_test_bind_item_sub_item(blog_post);
		}
		return blog_post;
	};
	static get_test_list=(option)=>{
		if(!option){
			option={blog_post_count:19};
		}
		let item_list=[];
		for(let a=0;a<option.blog_post_count;a++){
			item_list.push(Blog_Post.get_test());
		}
		return item_list;
	};
}
class Review{
	static get_test = () =>{
		let city_list = ["Miami","Atlanta","Chicago","Seattle","New York City"];
		let state_list = ["Georgia","New York","Illinois","Washington","Flordia"];
		let review = DataItem.get_new_full_item(
			DataItem.get_new(DataType.REVIEW,Number.get_id()),
			DataItem.get_new(DataType.REVIEW,0),
			DataItem.get_new(DataType.REVIEW,0),
			Field.get_test("Review "+Number.get_id(),{get_value:false}));
		review.email="ceo@biz"+String(Number.get_id())+".com";
		review.first_name="First Name "+ Number.get_id();
		review.last_name="Last Name "+ Number.get_id();
		review.position="Position "+ Number.get_id();
		review.comment="My comment "+ Number.get_id();
		review.city=city_list[Number.get_id(city_list.length-1)];
		review.state=state_list[Number.get_id(state_list.length-1)];
		return review;
	};
	static get_test_list=(option)=>{
		if(!option){
			option = {review_count:19};
		}
		let item_list = [];
		for(let a=0;a<option.review_count;a++){
			item_list.push(Review.get_test());
		}
		return item_list;
	};
}
class Business {
	static get_new = (title) =>{
		if(!title){
			title="";
		}
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
				zip:""});
	};
	static get_test = () =>{
		let item = DataItem.get_new(DataType.BUSINESS,Number.get_id());
		let city_list = ["Miami","Atlanta","Chicago","Seattle","New York City"];
		let state_list = ["Georgia","New York","Illinois","Washington","Flordia"];
		let business = DataItem.get_new_full_item(
			DataItem.get_new(DataType.BUSINESS,Number.get_id()),
			DataItem.get_new(DataType.BUSINESS,0),
			DataItem.get_new(DataType.BUSINESS,0),
			Field.get_test("Title "+Number.get_id()));
		item.email="ceo@business.com";
		item.phone="123-456-"+Number.get_id();
		item.address_1=Number.get_id()+" Apple St.";
		item.address_2="PO Box "+Number.get_id();
		item.city=city_list[Number.get_id(city_list.length-1)];
		item.state=state_list[Number.get_id(state_list.length-1)];
		item.zip="123"+Number.get_id();
		return item;
	};
	static get_full_address(business){
		if(!business.address_1){
			business.address_1 = "";
		}
		if(!business.address_2){
			business.address_2 = "";
		}
		if(!business.city){
			business.city = "";
		}
		if(!business.state){
			business.state = "";
		}
		return business.address_1 + " "+ business.address_2 + " " + business.city + " " + business.state + " " + business.zip;
	}
}
class DataItem {
	static get_new = (data_type,id,options) => {
		return get_new_item_main(data_type,id,options);
	};
	static get_new_full_item = (item,parent_item,top_item,options) => {
		return get_new_full_item_main(item,parent_item,top_item,options);
	};
	static get_biz = (biz9_config,item,options)=>{
		return get_biz_item_main(biz9_config,item,options);
	}
	static get_biz_by_list = (biz9_config,list,options)=>{
		let r_list = [];
		for(let a=0;a<list.length;a++){
			r_list.push(get_biz_item_main(biz9_config,list[a],options));
		}
		return r_list;
	}
}
class BiZ_Url {
	static get_item=(biz9_config,data_type,id)=>{
		let action_url="main/biz_item/get/"+data_type+"/"+id ;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_item=(biz9_config,data_type,id)=>{
		let action_url= "main/biz_item/delete/"+data_type+"/"+id ;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_full_item=(biz9_config,data_type,id)=>{
		let action_url= "main/biz_item/get_full/"+data_type+"/"+id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_page=(biz9_config,title_url)=>{
		let action_url= "main/biz_item/get_page/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_template=(biz9_config,title_url)=>{
		let action_url= "main/biz_item/get_template/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
}
class Url{
	static get = (biz9_config,action_url,params)=>{
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	}
	static connect = (biz9_config) => {
		let action_url= "main/test/connect/";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static upload_file = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_delete_cache_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update_delete_cache/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/get/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static copy_item = (biz9_config,data_type,id) => {
		let action_url= "main/biz_item/copy/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_list = (biz9_config,data_type) => {
		let action_url= "main/crud/get_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_list = (biz9_config,data_type) => {
		let action_url= "main/crud/update_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_list = (biz9_config,data_type) => {
		let action_url= "main/crud/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_biz_item = (biz9_config,data_type,id) => {
		let action_url= "main/biz_item/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_biz_list = (biz9_config,data_type) => {
		let action_url= "main/biz_item/get_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_biz_list = (biz9_config,data_type) => {
		let action_url= "main/biz_item/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
}
class Obj {
	static get_filter = (biz9_config,data_type,filter,sort_by,page_current,page_size)=>{
		return get_cloud_filter_obj_main(data_type,filter,sort_by,page_current,page_size);
	}
};
class Category {
	static get_test(){
		let category = DataItem.get_new_full_item(
			DataItem.get_new(DataType.CATEGORY,Number.get_id()),
			DataItem.get_new(DataType.CATEGORY,0),
			DataItem.get_new(DataType.CATEGORY,0),
			Field.get_test("Category " +Number.get_id()));
		category.type = Category.get_category_list()[Number.get_id(category_list.length-1)].data_type;
		return category;
	}
	static get_type_category_list(type,count){
		let category_list = [];
		for(let a=0;a<count;a++){
			let category = DataItem.get_new_full_item(
				DataItem.get_new(DataType.CATEGORY,"Category "+Number.get_id()),
				DataItem.get_new(DataType.CATEGORY,0),
				DataItem.get_new(DataType.CATEGORY,0),
				Field.get_test("Category " +Number.get_id()));
			category.type = type
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
			{data_type:DataType.CONTENT,value:DataType.CONTENT,label:"Content"},
			{data_type:DataType.EVENT,value:DataType.EVENT,label:"Events"},
			{data_type:DataType.GALLERY,value:DataType.GALLERY,label:"Galleries"},
			{data_type:DataType.SERVICE,value:DataType.SERVICE,label:"Services"},
			{data_type:DataType.PRODUCT,value:DataType.PRODUCT,label:"Product"},
			{data_type:DataType.TEMPLATE,value:DataType.TEMPLATE,label:"Template"}
		];
	};
	static get_title_by_type = (data_type) => {
		switch (data_type) {
			case DataType.EVENT:
				return "Event";
				break;
			case DataType.PAGE:
				return "Page";
				break;
			case DataType.PHOTO:
				return "Photo";
				break;
			case DataType.GALLERY:
				return "Gallery";
				break;
			case DataType.PRODUCT:
				return "Product";
				break;
			case DataType.SERVICE:
				return "Service";
				break;
			case DataType.EVENT:
				return "Event";
				break;
			case DataType.CATEGORY:
				return "Category";
				break;
			case DataType.BLOG_POST:
				return "Blog Post";
				break;
			case DataType.TEMPLATE:
				return "Template";
				break;
			case DataType.CONTENT:
				return "Content";
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
	static get_start_date_time = (item) =>{
		if(!item.date){
			item.date = new Date();
		}
		if(!item.time){
			item.time = new Date();
		}
		item.start_date = DateTime.get_full_date_by_date_time(item.date,item.time);
		item.start_time = DateTime.get_full_time_by_date_time(item.date,item.time);
		item.start_date_time = DateTime.get_full_date_time_by_date_time(item.date,item.time);
		return item;
	}
	static get_start_date_time_by_list = (list) =>{
		for(let a=0;a<list.length;a++){
			if(!list[a].date){
				list[a].date = new Date();
			}
			if(!list[a].time){
				list[a].time = new Date();
			}
			list[a].start_date = DateTime.get_full_date_by_date_time(list[a].date,list[a].time);
			list[a].start_time = DateTime.get_full_time_by_date_time(list[a].date,list[a].time);
			list[a].start_date_time = DateTime.get_full_date_time_by_date_time(list[a].date,list[a].time);
		}
		return list;
	}
};
class Storage {
	static KEY_ADMIN="key_admin";
	static KEY_USER="key_user";
	static KEY_BUSINESS="key_business";
	static KEY_GUEST="key_guest";
	static KEY_APP_ID="key_app_id";
	static get = (window,key) => {
		return JSON.parse(window.localStorage.getItem(key));
	}
	static set = (window,key,obj) => {
		window.localStorage.setItem(key,JSON.stringify(obj));
	}
	static remove = (window,key) =>{
		window.localStorage.removeItem(key);
	}
	static clear = (window) =>{
		window.localStorage.clear();
	}
}
class Sub_Item{
	static get_bind_new_child = (id,title,item,parent_item,top_item,options) =>{
		let new_sub_item = DataItem.get_new_full_item(
			DataItem.get_new(DataType.ITEM,id),
			DataItem.get_new(parent_item.data_type,parent_item.id),
			DataItem.get_new(top_item.data_type,top_item.id)
		);
		new_sub_item.title = title;
		if(options){
			for (const key in options) {
				item[key] = options[key];
			}
		}
		if(!item.items){
			item.items = [];
		}
		item[Str.get_title_url(title)] = new_sub_item;
		item.items.push(new_sub_item);
		return item;
	};
	static get_test_bind_item_sub_item = (item) =>{
		for(let b=0;b<item.items.length;b++){
			for(let c=0;c<20;c++){
				item.items[b]=Sub_Item.get_test_bind_new_child(Number.get_id(),'Section '+String(c),item.items[b],item,item);
				for(let d=0;d<item.items[b].items.length;d++){
					item.items[b].items[d]=Sub_Item.get_test_bind_new_child(Number.get_id(),'Section '+String(d),item.items[b].items[d],item.items[b],item);
				}
			}
		}
		return item;
	}
	static get_test_bind_new_child = (id,title,item,parent_item,top_item,options) =>{
		let new_sub_item = DataItem.get_new_full_item(
			DataItem.get_new(DataType.ITEM,id),
			DataItem.get_new(parent_item.data_type,parent_item.id),
			DataItem.get_new(top_item.data_type,top_item.id),
			get_bind_test_field(title)
		)
		new_sub_item.title = title;
		if(options){
			for (const key in options) {
				item[key] = options[key];
			}
		}
		if(!item.items){
			item.items = [];
		}
		item[Str.get_title_url(title)] = new_sub_item;
		item.items.push(new_sub_item);
		return item;
		function get_bind_test_field(title){
			let item = {
				date_create:new moment().toISOString(),
				date_save:new moment().toISOString(),
				title:title,
				setting_visible:"1",
				photo_data:"/images/no_img.jpg",
				title_url:Str.get_title_url(title),
				sub_note : "Sub Note "+String(Number.get_id()),
				note : "Note "+String(Number.get_id())
			}
			for(let b = 1;b<20;b++){
				item['value_'+String(b)] = title+ ' value ' + String(b);
			}
			return item;
		};
	};
}
module.exports = {
	BiZ_Url,
	Business,
	Blog_Post,
	Category,
	CMS,
	DataItem,
	DataType,
	Field,
	FieldType,
	Event,
	Message,
	Obj,
	Page,
	PageType,
	Product,
	Review,
	TemplateType,
	Template,
	Url,
	Service,
	Sub_Item,
	Storage,
	Schedule,
	Stock,
};
