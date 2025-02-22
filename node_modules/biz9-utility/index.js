/*
Copyright 2019 BiZ9 Framework
Author: biz9framework@gmail.com (BiZ9 Framework LLC)
License GNU General Public License v3.0
Description: BiZ9 Framework: Utility
*/
const {w_main,error_main,get_guid_main,get_id_main,error_append_main,get_test_item_main,get_title_url_main,
    get_date_time_str_main,get_date_str_main,get_date_time_pretty_main, get_currency_main, get_contains_main,remove_html_str_main,get_time_str_main,get_date_time_obj_main,get_iso_str_by_date_time_main,remove_money_main,get_money_main,get_cents_main,get_month_title_short_main,get_month_title_main,text_truncate_main,validate_email_main,get_paging_list_main,get_older_date_main,set_form_item_list_main} = require('./main');



    /*
    } = require('./main');
    */

const w = (title,str) => {
    return w_main(title,str);
};
const w_error = (title,str) => {
    return error_main(title,str);
};
const get_test_item = (data_type,id) => {
    return get_test_item_main(data_type,id);
};
const error_append = (org_error,new_error) => {
    return error_append_main(org_error,new_error);
};
const get_id = (max) => {
    return get_id_main(max);
};
const get_guid = () => {
    return get_guid_main();
};
const get_title_url = (title) => {
    return get_title_url_main(title);
};
const get_date_time_str = (datatime) => {
    return get_date_time_str_main(datatime);
};
const get_date_str = (date) => {
    return get_date_str_main(date);
};
const get_date_time_pretty = (date) => {
    return get_date_time_pretty_main(date);
};

module.exports = {
    w,
    get_id,
    get_guid,
    w_error,
    error_append,
    get_test_item,
    get_title_url,
    get_date_str,
    get_date_time_str,
    get_date_time_pretty

};
