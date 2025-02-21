/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
import { get_new_item_main,get_data_config_main,get_cloud_url_main,get_biz_item_main } from './main.js';

const global = {
    APP_VERSION:'1.0.0',
    PROJECT_ID:'19',
    APP_TITLE:'DG-CMS',
    APP_TITLE_ID:'dg-cms-feb-18b',
    CLOUD_PORT_ID:"1902",
    DT_BLANK:'blank_biz',
    DT_PAGE:'page_biz',
    CLOUD_URL:'http://localhost',
};

const get_new_item = (data_type,id) => {
    return get_new_item_main(data_type,id);
};
const get_cloud_url = (action_url)=>{
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
}
const get_cloud_url_action_update_item = (data_type,id) => {
    let action_url= "main/crud/update/"+data_type + "/" + id;
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
};
const get_cloud_url_action_get_item = (data_type,id) => {
    let action_url= "main/crud/get/"+data_type + "/" + id;
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
};
const get_cloud_url_action_delete_item = (data_type,id) => {
    let action_url= "main/crud/delete/"+data_type + "/" + id;
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
};
const get_cloud_url_action_get_list = (data_type) => {
    let action_url= "main/crud/get_list/"+data_type;
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
};
const get_cloud_url_action_delete_list = (data_type) => {
    let action_url= "main/crud/delete_list/"+data_type;
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
};
const get_cloud_url_action_update_list = (data_type) => {
    let action_url= "main/crud/update_list/"+data_type;
    return get_cloud_url_main(global.APP_TITLE_ID,global.CLOUD_URL,global.CLOUD_PORT_ID,action_url);
};
const get_cloud_filter_obj = (data_type,filter,sort_by,page_current,page_size)=>{
    return get_cloud_filter_obj_main(data_type,filter,sort_by,page_current,page_size);
}
const get_biz_item = (biz9_config,item,options)=>{
    return get_biz_item_main(biz9_config,item,options);
}
const error_append = (org_error,new_error) => {
    return error_append_main(org_error,new_error);
};
export  {
    global,
    get_new_item,
    get_cloud_url,
    get_cloud_url_action_update_item,
    get_cloud_url_action_get_item,
    get_cloud_url_action_delete_item,
    get_cloud_url_action_get_list,
    get_cloud_url_action_update_list,
    get_cloud_url_action_delete_list,
    get_biz_item,
    error_append_main
};
