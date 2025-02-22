/* Copyright (C) 2017 9_OPZ #Certified CoderZ
 * GNU GENERAL PUBLIC LICENSE
 * Full LICENSE file ( gpl-3.0-licence.txt )
 * BiZ9 Framework
 * Utility-Main
 */
const get_guid_main = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const get_id_main = (max) => {
    if(!max){
        max = 99999;
    }
    let r=Math.floor(Math.random()*max)+1;
    return r;
}
const error_main = (title,str) => {
    if(!str){
        str=title;
        title='';
    }
    if(!str){
        str='error null';
    }
    console.log('ERROR___' +String(title).toUpperCase()+ '___START__________________');
    console.log(str);
    console.log('ERROR___' +String(title).toUpperCase()+ '___END_____________________');
}
const w_main = (title,str) => {
    if(!str){
        str='null';
    }
    console.log('PRINT__'+String(title).toUpperCase()+ '___START__________________');
    console.log(str);
    console.log('PRINT__'+String(title).toUpperCase()+ '___END_____________________');
}
const error_append_main = (org_error,new_error) => {
    if(new_error){
        if(!org_error){
            org_error='';
        }
        new_error = ' error message: ' + new_error + ",";
        org_error = org_error + new_error
    }
    return org_error;
}
const get_test_item_main = (data_type,id) => {
    if(!data_type){
        data_type='dt_blank';
    }
    if(!id){
        id=0;
    }
    let _id=get_id_main(9999);
    let item_test = {data_type:data_type,id:id};
    item_test.title='title_'+_id;
    item_test.first_name='first_name_'+_id;
    item_test.last_name='last_name_'+_id;
    item_test.user_name='user_name_'+_id;
    item_test.group_id=_id;
    return item_test;
}

export {
    w_main,
    error_main,
    get_guid_main,
    get_id_main,
    error_append_main,
    get_test_item_main
};
