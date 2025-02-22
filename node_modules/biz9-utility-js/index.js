/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Utility
*/
import { w_main,error_main,get_id_main,get_test_item_main,error_append_main,get_guid_main} from './main';

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

export {
    w,
    get_id,
    get_guid,
    w_error,
    error_append,
    get_test_item,

};
