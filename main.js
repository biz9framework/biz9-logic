/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Adapter - Main
*/

const get_new_item_main = (data_type,id) => {
    if(!id){
        id=0;
    }
    return {data_type:data_type,id:id};
}
const get_cloud_url_main = (app_title_id,domain_url,action_url) =>{
    var app_title_id_url='?app_title_id='+app_title_id;
    return domain_url+action_url+app_title_id_url;
}
const get_data_config_main = (biz9_config,query) =>{
    if(biz9_config.SERVICE_HOST_TYPE == 'multiple'){
        biz9_config.APP_TITLE_ID=query.app_title_id;
    }
    return biz9_config;
}

module.exports = {
    get_data_config_main,
    get_new_item_main,
    get_cloud_url_main,
};
