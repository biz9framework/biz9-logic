/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Adapter-Server
*/
const { get_new_item_main,get_data_config_main,get_cloud_url_main } = require('./main.js');

const get_new_item = (data_type,id) => {
    return get_new_item_main(data_type,id);
};
const get_data_config = (biz9_config,params) => {
    return get_data_config_main(biz9_config,params);
};
const get_cloud_url = (app_title_id,domain_url,action_url)=>{
    return get_cloud_url_main(app_title_id,domain_url,action_url);
}

module.exports = {
    get_data_config,
    get_cloud_url,
    get_new_item,
};
