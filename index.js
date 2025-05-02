/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_title_url_main } = require('./main');
const { Log,Test,Str,DateTime } = require('biz9-utility');

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

class PageType {

	static HOME='home';
	static ABOUT='about';
	static CONTACT='contact';
	static SERVICE='service';
	static PRODUCT='product';
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
class Business {

	static get_full_address(business){
		return business.address_1 + " "+ business.address_2 + " " + business.city + " " + business.state + " " + business.zip;
	}
}

class DataItem {

	static get_new = (data_type,id) => {
		return get_new_item_main(data_type,id);
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
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static delete_item=(biz9_config,data_type,id)=>{
		let action_url= "main/biz_item/delete/"+data_type+"/"+id ;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static get_full_item=(biz9_config,data_type,id)=>{
		let action_url= "main/biz_item/get_full/"+data_type+"/"+id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static get_page=(biz9_config,title_url)=>{
		let action_url= "main/biz_item/get_page/"+title_url;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static get_template=(biz9_config,title_url)=>{
		let action_url= "main/biz_item/get_template/"+title_url;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

}

class Url {

	static get = (biz9_config,action_url,params)=>{
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,params);
	}

	static connect = (biz9_config) => {
		let action_url= "main/test/connect/";
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static upload_file = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static update_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static update_delete_cache_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update_delete_cache/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static get_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/get/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static delete_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static get_list = (biz9_config,data_type) => {
		let action_url= "main/crud/get_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static update_list = (biz9_config,data_type) => {
		let action_url= "main/crud/update_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static delete_list = (biz9_config,data_type) => {
		let action_url= "main/crud/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static delete_biz_item = (biz9_config,data_type,id) => {
		let action_url= "main/biz_item/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static get_biz_list = (biz9_config,data_type) => {
		let action_url= "main/biz_item/get_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

	static delete_biz_list = (biz9_config,data_type) => {
		let action_url= "main/biz_item/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};

}

class Obj {

	static get_filter = (biz9_config,data_type,filter,sort_by,page_current,page_size)=>{
		return get_cloud_filter_obj_main(data_type,filter,sort_by,page_current,page_size);
	}

};

class Cat {

	static get_category_drop_down_list_by_list = (cat_list) => {
		let category_list = [];
		for(let a=0;a<cat_list.length;a++){
			category_list.push({value:cat_list[a].title,label:cat_list[a].title});
		}
		return category_list;
	};

	static get_category_list = () => {
		return [
			{ value: DataType.BLOG_POST, label: "Blog Posts" },
			{ value: DataType.CONTENT, label: "Content" },
			{ value: DataType.EVENT, label: "Events" },
			{ value: DataType.GALLERY, label: "Galleries" },
			{ value: DataType.SERVICE, label: "Services" },
			{ value: DataType.PRODUCT, label: "Products" },
			{ value: DataType.TEMPLATE, label: "Template" }
		];
	};

	static get_title_by_type = (data_type) => {
		switch (data_type) {
			case DataType.EVENT:
				return "Event";
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
			case DataType.PRODUCT:
				return "Product";
				break;
			case DataType.SERVICE:
				return "Service";
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
module.exports = {
	BiZ_Url,
	Business,
	Cat,
	CMS,
	DataItem,
	DataType,
	Message,
	Obj,
	PageType,
	TemplateType,
	Url,
	Storage,
	Schedule,
	Stock,
};
