/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main,get_cloud_filter_obj_main,get_title_url_main } = require('./main');

class DataType {
     static DT_BLANK='blank_biz';
     static DT_BLOG_POST='blog_post_biz';
     static DT_SERVICE='service_biz';
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
