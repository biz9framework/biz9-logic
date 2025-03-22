/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_title_url_main } = require('./main');
const {Log,Test,Str} = require('biz9-utility');

class DataType {
	static get_data_type_title = (data_type) => {
		if(!data_type){
			return "";
		}else{
			return String(Str.get_title(data_type.replaceAll('_',' ').replaceAll('dt','').replace('biz',''))).trim();
		}
	}
	static ID = 'id';
	static DATA_TYPE = 'data_type';
	static TITLE = 'title';
	static TITLE_URL = 'title_url';
	static COST = 'cost';
	static NOTE = 'note';
	static SUB_NOTE = 'sub_note';
	static ORDER = 'order';
	static VISIBLE = 'visible';
	static PHOTOFILENAME = 'photofilename';
	static SETTING_SORT_TYPE = 'setting_sort_type';
	static SETTING_SORT_ORDER = 'setting_sort_order';
	static DELETE_PROTECTION = 'delete_protection';
	static TOP_ID = 'top_id';
	static TOP_DATA_TYPE = 'top_data_type';
	static PARENT_ID = 'parent_id';
	static PARENT_DATA_TYPE = 'parent_data_type';
	static DT_ADMIN='admin_biz';
	static DT_BLANK='blank_biz';
	static DT_BLOG_POST='blog_post_biz';
	static DT_CART_ITEM="cart_item_biz";
	static DT_CATEGORY='category_biz';
	static DT_EVENT='event_biz';
	static DT_GALLERY='gallery_biz';
	static DT_ITEM_MAP='item_map_biz';
	static DT_ITEM='item_biz';
	static DT_ORDER="order_biz";
	static DT_ORDER_ITEM="order_item_biz";
	static DT_PROJECT='project_biz';
	static DT_PRODUCT='product_biz';
	static DT_PHOTO='photo_biz';
	static DT_PAGE='page_biz';
	static DT_REVIEW='review_biz';
	static DT_SERVICE='service_biz';
	static DT_USER='user_biz';
	static DT_VIDEO='video_biz';
}
class Logic {
	static get_new_item = (data_type,id) => {
		return get_new_item_main(data_type,id);
	};
	static get_biz_item = (biz9_config,item,options)=>{
		return get_biz_item_main(biz9_config,item,options);
	}
	static get_url = (biz9_config,action_url,params)=>{
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,params);
	}
	static get_url_action_connect = (biz9_config) => {
		let action_url= "main/test/connect/";
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_url_action_update_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_url_action_get_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/get/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_url_action_delete_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/delete/"+data_type + "/" + id;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_url_action_get_list = (biz9_config,data_type) => {
		let action_url= "main/crud/get_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_url_action_delete_list = (biz9_config,data_type) => {
		let action_url= "main/crud/delete_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_url_action_update_list = (biz9_config,data_type) => {
		let action_url= "main/crud/update_list/"+data_type;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_filter_obj = (biz9_config,data_type,filter,sort_by,page_current,page_size)=>{
		return get_cloud_filter_obj_main(data_type,filter,sort_by,page_current,page_size);
	}
};
module.exports = {
	Logic,
	DataType
};
