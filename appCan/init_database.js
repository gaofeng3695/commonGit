var initAppDB = {
    /*
     * 创建本地ip配置库
     */
    createIpConfig:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table IpConfig (id INTEGER PRIMARY KEY AUTOINCREMENT,protocol text,ip text,port text);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
                that.createInsRecord();
            }
        });
    },
    /*
     * 创建本地巡检记录表 InsRecord
     * sf 2016-11-02
     */
    createInsRecord:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table InsRecord (id INTEGER PRIMARY KEY AUTOINCREMENT,localID text,recordID text,partURL text,postdata text,flag int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
                that.createInsTrajectory();
            }
        });
    },
    /*
     * 创建本地巡检轨迹表 InsTrajectory
     * sf 2016-11-02
     */
    createInsTrajectory:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table InsTrajectory (id INTEGER PRIMARY KEY AUTOINCREMENT,localID text,recordID text,partURL text,postdata text,flag int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createInsMonitor();
            }
        });
    },
    /*
     * 创建本地监控记录表
     * sf 2016-11-02
     */
    createInsMonitor:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table InsMonitor (id INTEGER PRIMARY KEY AUTOINCREMENT,localID text,recordID text,partURL text,postdata text,flag int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createEventList();
            }
        });
    },
    /*
     * 创建事件的草稿箱列表
     */
    createEventList:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table eventlist (id INTEGER PRIMARY KEY AUTOINCREMENT,localId text,eventId text,partURL text,postdata text,enterpriseId text,userId text,state int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createEventAttachment();
            }
        });
    },
    /*
     * 创建事件的草稿箱附件的列表
     */
    createEventAttachment:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table event_attachment (id INTEGER PRIMARY KEY AUTOINCREMENT,localID text,eventId text,attaType text,localURL text,postdata text,state int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createLoginInfo();
            }
        });
    },
    /*
     * 创建手机号和密码的记录表
     */
    createLoginInfo:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table login_info (id INTEGER PRIMARY KEY AUTOINCREMENT,registNum text,pwd text);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createEventType();
            }
        });
    },
    /*
     * 事件类型域值
     */
    createEventType:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table eventType (id INTEGER PRIMARY KEY AUTOINCREMENT,parentId text,objectId text,typeName text,indexNum int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createFavContacts();
            }
        });
    },
    /*
     * 创建常用联系人
     */
    createFavContacts:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table favcontacts (id INTEGER PRIMARY KEY AUTOINCREMENT,userId text,enterpriseId text,jsonData text,usedCount int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createLocalNews();
            }
        });
    },
    /*
     * 创建消息草稿箱
     */
    createLocalNews:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table localnews (id INTEGER PRIMARY KEY AUTOINCREMENT,localId text,objectId text,userId text,enterpriseId text,postdata text,state int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createLocalNewsAtta();
            }
        });
    },
    /*
     * 创建消息草稿箱的附件表
     */
    createLocalNewsAtta:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table localnewsatta (id INTEGER PRIMARY KEY AUTOINCREMENT,localId text,objectId text,attaType text,localURL text,postdata text,state int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.createGuidePage();
            }
        });
    },
    /*
     * 创建引导页记录
     */
    createGuidePage:function(){
        var that = this;//!必须有
        var dbOperation = new DataBaseOperation();
        var sql = "create table guidepage (id INTEGER PRIMARY KEY AUTOINCREMENT,state int);";
        dbOperation.dbCreateTable(sql,function(err,data){
            if(err == null && data>=0){
               that.initSysConfig();
            }
        });
    },
    /*
     * 初始化网络配置(important)
     */
    initSysConfig:function(){
        var dbOperation = new DataBaseOperation();
        dbOperation.dbSelect("select * from IpConfig",function(err,data){
            if(err != null){
                appcan.locStorage.setVal('serverProtocol','https://');
                appcan.locStorage.setVal('serverIP','apigw.zyax.cn');
                appcan.locStorage.setVal('serverPort','');
                return;
            }
            
            if(err == null && data =="")
            {
                appcan.locStorage.setVal('serverProtocol','https://');
                appcan.locStorage.setVal('serverIP','apigw.zyax.cn');
                appcan.locStorage.setVal('serverPort','');
                dbOperation.dbExec("INSERT INTO IpConfig (protocol,ip,port) VALUES ('https://','apigw.zyax.cn','');",function(err2,data2){
                });
                return;
            }
            
            if(err == null && data !=null){
                appcan.locStorage.setVal('serverProtocol',data[0].protocol);
                appcan.locStorage.setVal('serverIP',data[0].ip);
                appcan.locStorage.setVal('serverPort',data[0].port);
                return;
            }
        });
    },
    /*
     * 初始化方法
     */
    initDB:function(){
        this.createIpConfig();
    }
}
