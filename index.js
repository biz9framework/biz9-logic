/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const moment = require('moment');
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_new_full_item_main } = require('./main');
const { Log,Str,DateTime,Number } = require('biz9-utility');
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
		if(!data_type){
			data_type=DataType.BLANK;
		}
		if(!id){
			id=0;
		}
		option = Field_Logic.get_option(data_type,option?option:{});
		let item = DataItem.get_new_full_item(
			DataItem.get_new(data_type,0),
			DataItem.get_new(data_type,0),
			DataItem.get_new(data_type,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			item.items = Sub_Item_Logic.get_test_item_list(item,item,option);
			item = Sub_Item_Logic.bind_parent_child_list(item,item.items);
		}
		return item;
	}
	static get_test_list = (data_type,option) =>{
		option = Field_Logic.get_option(data_type,option?option:{});
		let item_list = [];
		for(let a=0;a<option.item_count;a++){
			item_list.push(Item_Logic.get_test("Item " +a,data_type,option));
		}
		return item_list;
	}
}
class Template_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.TEMPLATE,option?option:{});
		let template = DataItem.get_new_full_item(
			DataItem.get_new(DataType.TEMPLATE,0),
			DataItem.get_new(DataType.TEMPLATE,0),
			DataItem.get_new(DataType.TEMPLATE,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			template.items = Sub_Item_Logic.get_test_item_list(template,template,option);
			template = Sub_Item_Logic.bind_parent_child_list(template,template.items);
		}
		return template;
	};
}
class Team_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let team = DataItem.get_new_full_item(
			DataItem.get_new(DataType.TEAM,0),
			DataItem.get_new(DataType.TEAM,0),
			DataItem.get_new(DataType.TEAM,0),
			Field_Logic.get_test(title,option));
		team.members = [];
		if(option.get_member){
			for(let a=0;a<option.member_count;a++){
				team.members.push(Team_Logic.get_test_member("Full Name " + Number.get_id(),team,option));
			}
		}
		return team;
	};
	static get_test_member = (title,team,option) =>{
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let team_member = DataItem.get_new_full_item(
			DataItem.get_new(DataType.ITEM,0),
			DataItem.get_new(DataType.TEAM,team.id),
			DataItem.get_new(DataType.TEAM,team.id));
		team_member.title = title;
		team_member.first_name = "First Name "+ Number.get_id();
		team_member.last_name = "Last Name "+ Number.get_id();
		team_member.position = "Position "+ Number.get_id();
		team_member.city = "City "+ Number.get_id();
		team_member.state = "State "+ Number.get_id();
		return team_member;
	};
	static get_test_member_list = (team,option) =>{
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let item_list = [];
		for(let a=0;a<option.member_count;a++){
			item_list.push(Team_Logic.get_test_member("Full Name " +parseInt(a+1),team,option));
		}
		return item_list;
	}
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.TEAM,option?option:{});
		let item_list = [];
		for(let a=0;a<option.team_count;a++){
			item_list.push(Team_Logic.get_test("Team " +parseInt(a+1),option));
		}
		return item_list;
	}
}
class Page_Logic {
	static get_test = (title,option) =>{
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
		for(let a=0;a<option.page_count;a++){
			item_list.push(Page_Logic.get_test("Page " +parseInt(a+1),option));
		}
		return item_list;
	}
}
class Product_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let product = DataItem.get_new_full_item(
			DataItem.get_new(DataType.PRODUCT,0),
			DataItem.get_new(DataType.PRODUCT,0),
			DataItem.get_new(DataType.PRODUCT,0),
			Field_Logic.get_test(title,option));
		product.cost = String(Number.get_id()) + "." + String(Number.get_id());
		product.old_cost = String(Number.get_id()) + "." + String(Number.get_id());
		product.type = "Type "+String(Number.get_id());
		product.sub_type = "Sub Type "+String(Number.get_id());
		product.stock = String(Number.get_id(3-1));
		if(option.get_item){
			product.items = Sub_Item_Logic.get_test_item_list(product,product,option);
		}
		return product;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.PRODUCT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.product_count;a++){
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
				product.category = category_list[Number.get_id(category_list.length+1)].title;
				product_list.push(product);
			}
		}
		return [category_list,product_list]
	};
}
class Service_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.SERVICE,option?option:{});
		let service = DataItem.get_new_full_item(
			DataItem.get_new(DataType.SERVICE,0),
			DataItem.get_new(DataType.SERVICE,0),
			DataItem.get_new(DataType.SERVICE,0),
			Field_Logic.get_test(title,option));
		service.cost = String(Number.get_id()) + "." + String(Number.get_id());
		service.old_cost = String(Number.get_id()) + "." + String(Number.get_id());
		service.type = "Type "+String(Number.get_id());
		service.sub_type = "Sub Type "+String(Number.get_id());
		service.stock = String(Number.get_id(3-1));
		if(option.get_item){
			service.items = Sub_Item_Logic.get_test_item_list(service,service,option);
		}
		return service;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.SERVICE,option?option:{});
		let item_list = [];
		for(let a=0;a<option.service_count;a++){
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
				service.category = category_list[Number.get_id(category_list.length+1)].title;
				service_list.push(service);
			}
		}
		return [category_list,service_list]
	};
}
class Content_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.CONTENT,option?option:{});
		let content = DataItem.get_new_full_item(
			DataItem.get_new(DataType.CONTENT,0),
			DataItem.get_new(DataType.CONTENT,0),
			DataItem.get_new(DataType.CONTENT,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			content.items = Sub_Item_Logic.get_test_section_list(content,content,option);
			content = Sub_Item_Logic.bind_parent_child_list(content,content.items);
		}
		return content;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.CONTENT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.content_count;a++){
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
				content.category = category_list[Number.get_id(category_list.length+1)].title;
				content_list.push(content);
			}
		}
		return [category_list,content_list]
	};
}
class Blog_Post_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.BLOG_POST,option?option:{});
		let blog_post = DataItem.get_new_full_item(
			DataItem.get_new(DataType.BLOG_POST,0),
			DataItem.get_new(DataType.BLOG_POST,0),
			DataItem.get_new(DataType.BLOG_POST,0),
			Field_Logic.get_test(title,option));
		blog_post.author="First Name "+ Number.get_id();
		blog_post.tag="tag 1,tag 2,tag 3";
		if(option.get_item){
			blog_post.items = Sub_Item_Logic.get_test_item_list(blog_post,blog_post,option);
		}
		return blog_post;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.BLOG_POST,option?option:{});
		let item_list = [];
		for(let a=0;a<option.blog_post_count;a++){
			item_list.push(Blog_Post_Logic.get_test("Blog_Post " +String(parseInt(a+1)),option));
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
				let blog_post = Blog_Post_Logic.get_test("Blog_Post "+String(parseInt(b+1)),option);
				blog_post.category = category_list[Number.get_id(category_list.length+1)].title;
				blog_post_list.push(blog_post);
			}
		}
		return [category_list,blog_post_list]
	};
}
class Event_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.EVENT,option?option:{});
		let event = DataItem.get_new_full_item(
			DataItem.get_new(DataType.EVENT,0),
			DataItem.get_new(DataType.EVENT,0),
			DataItem.get_new(DataType.EVENT,0),
			Field_Logic.get_test(title,option));
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
			event.items = Sub_Item_Logic.get_test_item_list(event,event,option);
		}
		return event;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.EVENT,option?option:{});
		let item_list = [];
		for(let a=0;a<option.event_count;a++){
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
				event.category = category_list[Number.get_id(category_list.length+1)].title;
				event_list.push(event);
			}
		}
		return [category_list,event_list]
	};
}
class Field_Logic {
	static get_test = (title,option) =>{
		if(!option){
			option= {};
		}
		if(!option.category_title){
			option.category_title = 'Category '+String(Number.get_id());
		}
		let item = {
			title:title,
			setting_visible:"1",
			title_url:Str.get_title_url(title),
			category:option.category_title,
			sub_note:"Sub Note "+String(Number.get_id()),
			note:"Note "+String(Number.get_id())
		}
		if(option.get_value){
			item = Field_Logic.get_value_list(item,option);
		}
		return item;
	}
	static get_value_list(item,option){
		for(let b=0;b<option.value_count;b++){
			item['value_'+String(b+1)] = 'value ' + String(b+1);
			item['field_'+String(b+1)] = Str.get_title_url(item['value_'+String(b+1)]);
			item[Str.get_title_url('value ' + String(b+1))] = item.title + ' value ' + String(b+1);
		}
		return item;
	};
	static get_option(data_type,option){
		if(!data_type){
			data_type = DataType.BLANK;
		}
		if(!option){
			option = {get_value:false,get_item:false,get_photo:false,item_count:9,value_count:9};
		}
		if(!option.get_photo){
			option.get_photo=false;
		}
		if(!option.get_value){
			option.get_value=false;
		}
		if(!option.value_count){
			option.value_count=9;
		}
		if(!option.section_count){
			option.section_count=9;
		}
		if(!option.get_item){
			option.get_item=false;
		}
		if(!option.item_count){
			option.item_count=9;
		}
		if(!option.category_count){
			option.category_count=9;
		}
		if(!option.category_title){
			option.category_title=null;
		}
		if(option.data_type==DataType.PAGE){
			if(!option.page_count){
				option.page_count=9;
			}
			if(!option.section_count){
				option.section_count=9;
			}
			if(!option.get_section){
				option.get_section=false;
			}
		}
		if(option.data_type==DataType.PRODUCT){
			if(!option.product_count){
				option.product_count=9;
			}
		}
		if(data_type==DataType.SERVICE){
			if(!option.service_count){
				option.service_count=9;
			}
		}
		if(data_type==DataType.BLOG_POST){
			if(!option.blog_post_count){
				option.blog_post_count=9;
			}
		}
		if(data_type==DataType.EVENT){
			if(!option.event_count){
				option.event_count=9;
			}
		}
		if(data_type==DataType.TEAM){
			if(!option.get_member){
				option.get_member=false;
			}
			if(!option.member_count){
				option.member_count=9;
			}
		}
		if(data_type==DataType.FAQ){
			if(!option.get_question){
				option.get_question=false;
			}
			if(!option.question_count){
				option.question_count=9;
			}
		}
		if(data_type==DataType.CONTENT){
			if(!option.content_count){
				option.content_count=9;
			}
		}
		return option;
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
	static TEAM='team_biz';
	static USER='user_biz';
	static VIDEO='video_biz';
}
class Blank_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.BLANK,option?option:{});
		let blank = DataItem.get_new_full_item(
			DataItem.get_new(DataType.BLANK,0),
			DataItem.get_new(DataType.BLANK,0),
			DataItem.get_new(DataType.BLANK,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			blank.items = Sub_Item_Logic.get_test_item_list(blank,blank,option);
			blank = Sub_Item_Logic.bind_parent_child_list(blank,blank.items);
		}
		return blank;
	};
	static get_test_list = (option) =>{
		option = Field_Logic.get_option(DataType.BLANK,option?option:{});
		let item_list = [];
		for(let a=0;a<option.blank_count;a++){
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
				blank.category = category_list[Number.get_id(category_list.length+1)].title;
				blank_list.push(blank);
			}
		}
		return [category_list,blank_list]
	};
}
class Faq_Logic {
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.FAQ,option?option:{});
		option.get_value = false;
		let faq = DataItem.get_new_full_item(
			DataItem.get_new(DataType.FAQ,0),
			DataItem.get_new(DataType.FAQ,0),
			DataItem.get_new(DataType.FAQ,0),
			Field_Logic.get_test(title,option));
		for(let b=0;b<option.question_count;b++){
			faq['question_'+String(b+1)] = 'question ' + String(b+1);
			faq['field_'+String(b+1)] = Str.get_title_url(faq['question_'+String(b+1)]);
			faq[Str.get_title_url('question ' + String(b+1))] = 'Answer ' + String(b+1);
		}

		return faq;
	};
	static get_test_list=(option)=>{
		option = Field_Logic.get_option(DataType.FAQ,option?option:{});
		let item_list = [];
		for(let a=0;a<option.question_count;a++){
			item_list.push(Faq_Logic.get_test("FAQ Questions " +parseInt(a+1),option));
		}
		return item_list;
	};
}
class Review_Logic {
	static get_test = () =>{
		let city_list = ["Miami","Atlanta","Chicago","Seattle","New York City"];
		let state_list = ["Georgia","New York","Illinois","Washington","Flordia"];
		let review = DataItem.get_new_full_item(
			DataItem.get_new(DataType.REVIEW,Number.get_id()),
			DataItem.get_new(DataType.REVIEW,0),
			DataItem.get_new(DataType.REVIEW,0),
			Field_Logic.get_test("Review "+Number.get_id(),{get_value:false}));
		review.email="ceo@biz"+String(Number.get_id())+".com";
		review.first_name="First Name "+ Number.get_id();
		review.last_name="Last Name "+ Number.get_id();
		review.position="Position "+ Number.get_id();
		review.comment="My comment "+ Number.get_id() + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
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
			item_list.push(Review_Logic.get_test());
		}
		return item_list;
	};
}
class Business_Logic {
	static get_new = (title) =>{
		if(!title){
			title="Business "+Number.get_id();
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
				zip:"",
				website:"",
				youtube:"",
				instagram:"",
				facebook:"",
				twitter:""
			});
	};
	static get_test = (title,option) =>{
		option = Field_Logic.get_option(DataType.BUSINESS,option?option:{});
		Log.w('option',option);
		let item = DataItem.get_new(DataType.BUSINESS,0);
		let city_list = ["Miami","Atlanta","Chicago","Seattle","New York City"];
		let state_list = ["Georgia","New York","Illinois","Washington","Flordia"];
		let business = DataItem.get_new_full_item(
			DataItem.get_new(DataType.BUSINESS,Number.get_id()),
			DataItem.get_new(DataType.BUSINESS,0),
			DataItem.get_new(DataType.BUSINESS,0),
			Field_Logic.get_test("Title "+Number.get_id()));
		item.email="ceo@business.com";
		item.phone="123-456-"+Number.get_id(3333);
		item.address_1=Number.get_id(99)+" Apple St.";
		item.address_2="PO "+Number.get_id(99);
		item.city=city_list[Number.get_id(city_list.length-1)];
		item.state=state_list[Number.get_id(state_list.length-1)];
		item.zip=Number.get_id(9999);
		item.website="website_" + Number.get_id(9999);
		item.youtube="youtube_"+Number.get_id(9999);
		item.instagram="instagram_"+Number.get_id(9999);
		item.facebook="facebook_"+Number.get_id(9999);
		item.twitter="twitter_"+Number.get_id(9999);
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
	static get = (biz9_config,title_url,params) => {
		let action_url="blank/get/"+title_url;
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
	static get = (biz9_config,title_url,params) => {
		let action_url="blog_post/get/"+title_url;
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
}
class Custom_Field_Url {
	static get = (biz9_config,data_type,id,params) => {
		let action_url="custom_field/get/"+data_type+"/"+id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="custom_field/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class FAQ_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="faq/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static category = (biz9_config,title_url,params) => {
		let action_url="faq/category/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Product_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="product/get/"+title_url;
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
	static cart = (biz9_config,params) => {
		let action_url="product/cart";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static checkout = (biz9_config,params) => {
		let action_url="product/checkout";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Event_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="event/get/"+title_url;
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
	static cart = (biz9_config,params) => {
		let action_url="event/cart";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static checkout = (biz9_config,params) => {
		let action_url="event/checkout";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Service_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="service/get/"+title_url;
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
	static cart = (biz9_config,params) => {
		let action_url="service/cart";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static checkout = (biz9_config,params) => {
		let action_url="service/checkout";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Content_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="content/get/"+title_url;
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
}
class Gallery_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="gallery/get/"+title_url;
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
}
class Category_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="category/get/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static browse = (biz9_config,params) => {
		let action_url="category/browse";
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Page_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="page/get/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Team_Url {
	static get = (biz9_config,title_url,params) => {
		let action_url="team/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
	static member = (biz9_config,title_url,params) => {
		let action_url="team/member/"+title_url;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	};
}
class Url{
	static copy_item = (biz9_config,data_type,id) => {
		let action_url = "main/crud/copy/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_item = (biz9_config,data_type,id) => {
		let action_url = "main/crud/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_item_check_protection = (biz9_config,data_type,id) => {
		let action_url = "main/crud/delete_item_check_protection/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static delete_list = (biz9_config,data_type) => {
		let action_url = "main/crud/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get = (biz9_config,action_url,params) => {
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,params);
	}
	static get_item = (biz9_config,data_type,key) => {
		let action_url= "main/crud/get/"+data_type + "/" + key;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_item_parent_top = (biz9_config,data_type,id,parent_data_type,parent_id,top_data_type,top_id) => {
		let action_url = "main/crud/get_item_parent_top/"+data_type+"/"+id+"/"+parent_data_type+ "/"+parent_id+"/"+top_data_type+ "/"+top_id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static get_list = (biz9_config,data_type) => {
		let action_url = "main/crud/get_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static upload_file = (biz9_config,data_type,id) => {
		let action_url = "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_item = (biz9_config,data_type,id) => {
		let action_url = "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_item_delete_cache = (biz9_config,data_type,id) => {
		let action_url = "main/crud/update_item_delete_cache/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
	static update_list = (biz9_config,data_type) => {
		let action_url = "main/crud/update_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_ID,biz9_config.URL,action_url,null);
	};
}
class Obj {
	static get_search = (data_type,filter,sort_by,page_current,page_size) => {
		return {data_type:data_type,filter:filter,sort_by:sort_by,page_current:page_current,page_size:page_size};
	}
};
class Category_Logic {
	static get_test = (title,option) =>{
		if(!title){
			title="Category 1";
			option={};
		}
		option = Field_Logic.get_option(DataType.CATEGORY,option?option:{});
		let category = DataItem.get_new_full_item(
			DataItem.get_new(DataType.CATEGORY,0),
			DataItem.get_new(DataType.CATEGORY,0),
			DataItem.get_new(DataType.CATEGORY,0),
			Field_Logic.get_test(title,option));
		if(option.get_item){
			category.items = Sub_Item_Logic.get_test_item_list(category,category,option);
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
	static get_start_date_time_by_list = (list) => {
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
class Sub_Item_Logic {
	static get_test(title,parent_item,top_item,option){
		if(option==null){
			option={get_value:true,value_count:9};
		}
		if(option.item_count==null){
			option.item_count = 9;
		}
		if(option.get_value==null){
			option.get_value = true;
		}
		if(option.value_count==null){
			option.value_count = 9;
		}
		let item_title =title;
		let item = DataItem.get_new(
			DataType.ITEM,0, {
				top_id:top_item.id,
				top_data_type:top_item.data_type,
				parent_id:parent_item.id,
				parent_data_type:parent_item.data_type,
				title:item_title,
				title_url:Str.get_title_url(item_title),
				sub_note:"Sub Note "+String(Number.get_id()),
				note:"Note "+String(Number.get_id()),
			}
		);
		if(option.get_value){
			item = Field_Logic.get_value_list(item,option);
		}
		return item;
	}
	static get_test_item_list(parent_item,top_item,option){
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
			item.items = [];
			let new_sub_list = [];
			for(let b=0;b<option.section_count;b++){
				let sub_item_title ="Section " + String(parseInt(b+1));
				let sub_item = Sub_Item_Logic.get_test(sub_item_title,item,top_item,option);
				item.items.push(sub_item);
			}
			item = Sub_Item_Logic.bind_parent_child_list(item,new_sub_list);
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
	Business_Logic,
	Blank_Logic,
	Blank_Url,
	Blog_Post_Logic,
	Blog_Post_Url,
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
	Gallery_Url,
	Item_Logic,
	Event_Logic,
	Message,
	Obj,
	Page_Logic,
	Product_Url,
	PageType,
	Product_Logic,
	Review_Logic,
	Service_Logic,
	Service_Url,
	Social,
	Sub_Item_Logic,
	Storage,
	Schedule,
	Stock,
	TemplateType,
	Team_Logic,
	Template_Logic,
	Url,
};
