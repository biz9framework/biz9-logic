/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic - Main
*/

const { DateTime,Number } = require('biz9-utility');
const biz9_config_local=__dirname+"/../../"+"biz9_config";

const get_cloud_filter_obj_main = (data_type,filter,sort_by,page_current,page_size) => {
    return {data_type:data_type,filter:filter,sort_by:sort_by,page_current:page_current,page_size:page_size};
}
const get_new_item_main = (data_type,id) => {
    if(!id){
        id=0;
    }
    return {data_type:data_type,id:id};
}
const get_cloud_url_main = (app_title_id,domain_url,action_url,params) =>{
    if(!params){
        params='';
    }
    var app_title_id_url='?app_title_id='+app_title_id;
    return domain_url+"/"+action_url+app_title_id_url + params;
}
const get_biz_item_main=(biz9_config,item,options) =>{
    /*
    -options {
        get_count: true/false, false=default --
        get_date: true/false, false=default --
        get_biz_map: true/false, false=default --
        get_money: true/false, false=default --
    }
    */
    //money setting - start
    if(options.get_money){
        if(isNaN(item.cost)){
            item.cost=parseFloat(0.00);
        }
        if(isNaN(item.old_cost)){
            item.old_cost=parseFloat(0.00);
        }
        if(isNaN(item.discount)){
            item.discount=parseFloat(0.00);
        }
        discount = item.old_cost - item.cost;
        item.discount= parseInt(((discount / item.old_cost) * 100));
        if(isNaN(item.discount)){
            item.discount="0%";
        }else{
            item.discount=item.discount+"%";
        }
        item.cost = Number.get_money(item.cost);
        item.old_cost = Number.get_money(item.old_cost);
    }
    //money setting - end

    //count setting - start
    if(options.get_count){
        if(!item.view_count){
            item.view_count='0';
        }
        if(!item.like_count){
            item.like_count='0';
        }
        if(!item.review_count){
            item.review_count='0';
        }
    }
    //count setting - end
    //date setting - start
    if(options.get_date){
        let no_date_str='';
        if(!item.date_create){
            item.date_create = DateTime.get_new_date();
            item.date_save = DateTime.get_new_date();
        }
        item={
            pretty_create: (item.date_create) ? DateTime.get_pretty(item.date_create) : no_date_str,
            pretty_update: (item.date_create) ? DateTime.get_pretty(item.date_save): no_date_str,
            full_date_create: (item.date_create) ? DateTime.get_date_str(item.date_create) : no_date_str,
            full_date_update: (item.date_create) ? DateTime.get_date_str(item.date_save) : no_date_str,
            full_date_time_create: (item.date_create) ? DateTime.get_str(item.date_create) : no_date_str,
            full_date_time_update: (item.date_create) ? DateTime.get_str(item.date_save) : no_date_str,
            month_create: (item.date_create) ? DateTime.get_month_title(1+DateTime.get_obj(item.date_create).month()) : no_date_str,
            month_update: (item.date_create) ? DateTime.get_month_title(1+DateTime.get_obj(item.date_save).month()) : no_date_str,
            mo_create: (item.date_create) ? (1+DateTime.get_obj(item.date_create).month()) : no_date_str,
            mo_update: (item.date_create) ? (1+DateTime.get_obj(item.date_save).month()) : no_date_str,
            date_create: (item.date_create) ? DateTime.get_obj(item.date_create).date() : no_date_str,
            year_create: (item.date_create) ? DateTime.get_obj(item.date_create).year() : no_date_str,
            year_update: (item.date_create) ? DateTime.get_obj(item.date_save).year() : no_date_str,
            time_create: (item.date_create) ? DateTime.get_time_str(item.date_create) : no_date_str,
            time_update: (item.date_create) ? DateTime.get_time_str(item.date_save) : no_date_str,
        }
    }
    //date setting - end
    //biz_map setting - start
    if(options.get_biz_map){
        for(let a=0;a<20;a++){
            if(item['field_'+a]){
                item[item['field_'+a]]=item['value_'+a];
            }
        }
    }
    //biz_map setting - end
    return item;
}
const get_title_url_main = (title) => {
    if(!title){
        title='';
    }
    return title.replace(/[^a-z0-9]+/ig, "_").toLowerCase();
}

module.exports = {
    get_new_item_main,
    get_cloud_url_main,
    get_cloud_filter_obj_main,
    get_title_url_main,
    get_biz_item_main
};
