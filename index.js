/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_title_url_main } = require('./main');
const {Log,Test,Str} = require('biz9-utility');

class DataType {
	static get_title = (data_type) => {
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
class DataItem {
	static get_new = (data_type,id) => {
		return get_new_item_main(data_type,id);
	};
	static get_biz = (biz9_config,item,options)=>{
		return get_biz_item_main(biz9_config,item,options);
	}
}
class BiZ_Url {
	static get_item = (biz9_config,item) => {
		let action_url= "main/biz_item/get/"+item.data_type + "/" + item.id ;
		return get_cloud_url_main(biz9_config.APP_TITLE_ID,biz9_config.URL,action_url,null);
	};
	static get_full_item = (biz9_config,item,parent_item,top_item) => {
		let action_url= "main/biz_item/get_full/"+item.data_type + "/" + item.id +"/"+parent_item.data_type + "/" + parent_item.id +"/"+top_item.data_type + "/" + top_item.id;
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
	static update_item = (biz9_config,data_type,id) => {
		let action_url= "main/crud/update/"+data_type + "/" + id;
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
class CMS {
	static Tab_Edit_Title_General = 'general';
	static Tab_Edit_Title_Photo = 'photo';
	static Tab_Edit_Title_List = 'list';
	static Tab_Edit_Title_Value = 'value';
	static Tab_Edit_Title_Setting = 'setting';
	static Tab_Edit_Title_Note = 'note';

	static get_new_query_item = (item,parent_item,top_item) => {
		return {
			id: item.id ? item.id : 0,
			data_type:item.data_type ? item.data_type : DataType.DT_BLANK,
			parent_id:parent_item.id ? parent_item.id : 0,
			parent_data_type:parent_item.data_type ? parent_item.data_type : DataType.DT_BLANK,

			top_id:top_item.id ? top_item.id : 0,
			top_data_type:top_item.data_type ? top_item.data_type : DataType.DT_BLANK
		}
	};
	static get_query_itemz_by_query = (item) => {
		return [];
	};
	static get_query_item_by_page = (item) => {
		return { id:item.id ? item.id : 0, data_type:item.data_type ? item.data_type : DataType.DT_BLANK };
	};
	static get_query_parent_item_by_page = (parent_item) => {
		return { id:parent_item.id ? parent_item.id : 0, data_type:parent_item.data_type ? parent_item.data_type : DataType.DT_BLANK };
	};
	static get_query_top_item_by_page = (top_item) => {
		return { id:top_item.id ? top_item.id : 0, data_type:top_item.data_type ? top_item.data_type : DataType.DT_BLANK };
	};
	static get_query_item_by_query = (query) => {
		return { id:query.get('id') ? query.get('id') : 0, data_type:query.get('data_type') ? query.get('data_type') : DataType.DT_BLANK } ;
	};
	static get_query_parent_item_by_query = (query) => {
		return { id:query.get('parent_id') ? query.get('parent_id') : 0, data_type:query.get('parent_data_type') ? query.get('parent_data_type') : DataType.DT_BLANK } ;
	};
	static get_query_top_item_by_query = (query) => {
		return { id:query.get('top_id') ? query.get('top_id') : 0, data_type:query.get('top_data_type') ? query.get('top_data_type') : DataType.DT_BLANK } ;
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
			case CMS.Tab_Edit_Title_Note:
				return 'Note';
			default:
				return 'N/A';
		}
	}
	static get_page_url = (url,tab_title,item,parent_item,top_item,parms) => {
		let url+"?tab_title="+tab_title
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
			url = url + parms;
		}
		return url;
	}
}

module.exports = {
	DataType,
	DataItem,
	Url,
	BiZ_Url,
	Obj,
	CMS
};
