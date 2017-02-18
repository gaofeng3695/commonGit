/*
 * 初始化创建数据库对象的方法(获取数据库操作的对象)
 */
function DataBaseOperation(){
    //数据库名称
    dbName = "ZYXXWSDB3";
    //数据库的对象
    dbObj = null;
    //初始化数据库
    appcan.database.create(dbName,function(err,data,db,dataType,optId){
        if(err){
            dbObj = null;
            //alert('create error');
            return;
        }
        if(data == 0){
            dbObj = db;//数据库创建成功可以使用了
        }else{
            //alert("本地数据库异常");
            dbObj = null;//数据库创建失败了
        }
    });
}
/*
 * 操作数据库的方法
 */
DataBaseOperation.prototype = {
    constructor: DataBaseOperation,
    //数据库查询的方法
    dbSelect:function(sql,callback){
        appcan.database.select(dbName, sql, function(err, data, dataType, optId) {
            var result = "";
            if (!err) {
                result = JSON.parse(data);
            }
            if (appcan.isFunction(callback)) {
                callback(err,result);
            }
        });
    },
    //数据库创建Table的方法
    dbCreateTable:function(sql,callback){
        appcan.database.exec(dbName, sql, function(err, data, dataType, optId) {
            if (appcan.isFunction(callback)) {
                callback(err,data);
            }
        });
    },
    //数据库执行的方法（insert、update、delete）
    dbExec:function(sql,callback){
        appcan.database.exec(dbName, sql, function(err, data, dataType, optId) {
            if (appcan.isFunction(callback)) {
                callback(err,data);
            }
        });
    }
}
