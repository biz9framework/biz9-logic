const series = require('async-series');
const {Data_Logic,Value_Type,Table} = require('./index');
const {Log,Num,Str,Obj} = require("/home/think1/www/doqbox/biz9-framework/biz9-utility/source");
const {Scriptz}= require('biz9-scriptz');
class Project_Table{
    static PRODUCT='product_biz';
}
//9_connect
describe("connect", () => {
    it("_connect", () => {
        series([
            function(call) {
                console.log('CONNECT-BASE-START');
                //let parent = Data_Logic.get(Project_Table.PRODUCT,0,{count:3});
                //Log.w('parent',parent);
                //let search = Data_Logic.get_search(Project_Table.PRODUCT,{},{},1,0,{});
                //Log.w('search',search);
                //let group = Data_Logic.get_group({value_type:Value_Type.ITEMS});
                //Log.w('group',group);
                let foreign = Data_Logic.get_foreign(Value_Type.ITEMS,Table.BLANK,'cool','apple',{title:'ffff'});
                Log.w('foreign',foreign);


                // -- POST-START --//
                //Log.w('11_parent',parent);

            }
        ], function(err) {
            console.log(err.message) // "another thing"
        })
    });
});
