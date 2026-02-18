/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Logic-JS
*/
const {Str,Num,Obj,Log} = require("/home/think1/www/doqbox/biz9-framework/biz9-utility/source");
class Value_Type {
    //type - search
    static COUNT = 'count';
    static ITEMS = 'items';
    static ONE = 'one';
}
class Field {
    static DATE_CREATE='date_create';
    static TABLE='table';
    static DATE_SAVE='date_save';
    static ID='id';
    static ITEM='item';
    static ITEMS='items';
    static OBJ='obj';
    static GROUP='group';
    static USER='user';
    static USER_ID = 'user_id';
    static USER_TABLE='user_table';
    static PARENT_ID = 'parent_id';
    static PARENT_TABLE='parent_table';
    static SOURCE='source';
    static TITLE='title';
    static TITLE_URL='title_url';
}
class Type {
    //result
    static RESULT_OK = 'resultOK';
    static RESULT_OK_DELETE = 'delete_resultOK';
    static RESULT_OK_GROUP_DELETE = 'group_delete_resultOK';
    static RESULT_OK_DELETE_CACHE = 'delete_cache_resultOK';
    static RESULT_OK_DELETE_DATABASE = 'delete_database_resultOK';
    //source
    static SOURCE='source';
    static SOURCE_TABLE='source_table';
    static SOURCE_KEY='source_key';
    static SOURCE_ID='source_id';
    static SOURCE_PARENT_ID='source_parent_id';
    //sort_by
    static SORT_BY_ASC='asc';
    static SORT_BY_DESC='desc';
    //data_source
    static DATA_SOURCE_CLIENT_CACHE="client_cache";
    static DATA_SOURCE_SERVER_CACHE="server_cache";
    static DATA_SOURCE_DATABASE="database";
    static DATA_SOURCE_CLIENT="client";
    static DATA_SOURCE_SERVER="server";
    static DATA_SOURCE_NOT_FOUND="not_found";
}
class Title {
    //general
    static FOREIGN='Foreign';
    static JOIN='Join';
    static GROUP='Group';
    static N_A='N/A';
    //source
    static SOURCE_DATABASE='Database';
    static SOURCE_CACHE='Cache';
    static SOURCE_NOT_FOUND='Not-Found';
}
class Table {
    static BLANK='blank_biz';
    static GROUP='group_biz';
}
class Data_Logic {
    static get = (table,id,option) => {
        /* Option
         * count / 3
         * parent / {parent_table,parent_id}
         * user / {user_table,user_id}
         * data / {}
         */
        let data = {table:table,id:id};
        if(option.data){
            data = Obj.merge(data,option.data);
        }
        if(option.title){
            data[Field.TITLE] = option.title;
            data[Field.TITLE_URL] = Str.get_title_url(option.title);
        }
        if(option.parent){
            data[Field.PARENT_TABLE] = option.parent[Field.TABLE];
            data[Field.PARENT_ID] = option.parent[Field.ID];
        }
        if(option.user){
            data[Field.USER_TABLE] = option.user[Field.TABLE];
            data[Field.USER_ID] = option.user[Field.ID];
        }
        if(option.count){
            let data_items = [];
            if(!data.title){
                data.title = 'Item';
                data.title_url = Str.get_title_url(data.title);
            }
            for(let a = 1; a < option.count+1; a++){
                const copy = { ...data };
                copy.title = data.title + " " + a;
                copy.title_url = Str.get_title_url(copy.title);
                data_items.push(copy);
            }
            data = data_items;
        }
        return data;
    };
    static get_search = (table,filter,sort_by,page_current,page_size,option) => {
        option = !Obj.check_is_empty(option) ? option : {};
        return {table:table,filter:filter,sort_by:sort_by,page_current:page_current,page_size:page_size,option:option};
    };
    static get_group = (option) => {
        option = !Obj.check_is_empty(option)  ? option : {};
        let value_type  = option.value_type ? option.value_type : Value_Type.ITEMS;
        let field = option.field ? option.field : {};
        let title = option.title ? Str.get_title_url(option.title) : Str.get_lower_case(Title.GROUP);
        let page_current = option.page_current ? option.page_current : 1;
        let page_size = option.page_size ? option.page_size : 0;
        let foreigns = option.foreigns ? option.foreigns : [];
        return {value_type:value_type,field:field,title:title,page_current:page_current,page_size:page_size,foreigns:foreigns};
    };
    static get_foreign = (value_type,foreign_table,foreign_field,parent_field,option) => {
        option = !Obj.check_is_empty(option)  ? option : {};
        value_type = value_type ? value_type : Value_Type.ITEMS;
        foreign_table = foreign_table ? foreign_table : {};
        foreign_field = foreign_field ? foreign_field : Type.FIELD_PARENT_ID;
        parent_field = parent_field ? parent_field : parent_field;
        let field = option.field ? option.field : null;
        let title = option.title ? Str.get_title_url(option.title) : Str.get_lower_case(Title.FOREIGN);
        let page_current = option.page_current ? option.page_current : 1;
        let page_size = option.page_size ? option.page_size : 0;
        return {value_type:value_type,foreign_table:foreign_table,foreign_field:foreign_field,parent_field:parent_field,field:field,title:title,page_current:page_current,page_size:page_size};
    };
    static get_search_join = (type,search,option) => {
        option = !Obj.check_is_empty(option)  ? option : {};
        type = type ? type : Type.SEARCH_ITEMS;
        search = search ? search : Data_Logic.get_search(Type.DATA_BLANK,{},{},1,0);
        let field = option.field ? option.field : {};
        let distinct = option.distinct ? option.distinct : null; //distinct:{field:'title',sort_by:Type.SEARCH_SORT_BY_DESC}
        let title = option.title ? Str.get_title_url(option.title) : Str.get_lower_case(Title.JOIN);
        let foreigns = option.foreigns ? option.foreigns : [];
        let page_current = option.page_current ? option.page_current : 1;
        let page_size = option.page_size ? option.page_size : 0;
        return {type:type,search:search,field:field,title:title,distinct:distinct,foreigns:foreigns,page_current:page_current,page_size:page_size};
    }
    /*
    static copy = (data_type,item,option)=>{
        let copy_item = Data_Logic.get_new(data_type,0);
        option = !Obj.check_is_empty(option)  ? option : {};
        const keys = Object.keys(item);
        keys.forEach(key => {
            if(
                key!=Type.FIELD_ID&&
                key!=Type.FIELD_SOURCE&&
                key!=Type.FIELD_DATE_CREATE&&
                key!=Type.FIELD_DATE_SAVE&&
                key!=Type.TITLE_OBJ&&
                key!=Type.TITLE_USER&&
                key!=Type.TITLE_GROUP&&
                key!=Type.TITLE_ITEM&&
                !Obj.check_is_array(item[key])&&
                Obj.check_is_value(item[key])
            ){
                copy_item[key]=item[key];
            }
        });
        return copy_item;
    };
    static get_not_found = (data_type,id,option) =>{
        option=!Obj.check_is_empty(option)?option:{};
        if(!data_type){
            data_type = Type.DATA_BLANK;
        }
        if(!id){
            id = 0;
        }
        if(data_type != Type.DATA_USER){
            if(!id){
                id=0;
            }
            let item = Data_Logic.get(data_type,id);
            item.id = 0;
            item.id_key = id;
            item.title = "Item Not Found";
            item.title_url = Str.get_title_url(item.title);
            item.source = Type.TITLE_SOURCE_NOT_FOUND;
            return item;
        }else{
            let user = Data_Logic.get(data_type,id);
            user.id = 0;
            user.id_key = id;
            user.title = "User Not Found";
            user.first_name = "User Not Found";
            user.title_url = Str.get_title_url(user.title);
            user.source = Type.TITLE_SOURCE_NOT_FOUND;
            return user;
        }
    };
    */
}

module.exports = {
    Data_Logic,
    Table,
    Type,
    Title,
    Field,
    Value_Type
};
