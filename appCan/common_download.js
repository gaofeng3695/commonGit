function downLoadNewApp(downUrl){
    var downUrlArry = downUrl.split('/');
    var tempFileName = downUrlArry[downUrlArry.length-1];
    var flag_sdcard = 1;
    var fileName=tempFileName.split('.')[0]+Math.floor(Math.random() * ( 100000 + 1))+"."+tempFileName.split('.')[1];
    var fileRootPath = "wgt://";//保存到sd卡
    var platform1 = '';//平台版本 //var update_msg = "当前有新版本，是否更新?";  //提示文字
    //获取平台版本 （step:1）
    uexWidgetOne.getPlatform();
    //获取平台版本回调函数，确定是客户端是那个平台的客户端 （step:2）
    uexWidgetOne.cbGetPlatform = function(opId, dataType, data) {
        //获取系统版本信息回调函数
        platform1 = data;
        if (data == 1) {
            // 是android
            flag_sdcard = 0;
            uexFileMgr.isFileExistByPath(fileRootPath);//先判断是否存在sd卡
        }else if(data == 0){
            //alert("我是IOS");
            uexWidget.loadApp("itms-apps://itunes.apple.com/us/app/id1056624907?mt=8", "", "");
        }
    };
    
    //检查是否已经存在sd卡的回调函数（step:3）
    uexFileMgr.cbIsFileExistByPath = function(opCode, dataType, data) {
        if (flag_sdcard == 0) {
            if (data == 0) {
                alert('请检查手机存储是否正常');
            } else {
                if (platform1 == 1) {
                    //安卓版更新，通过创建下载对象进行下载
                    uexDownloaderMgr.createDownloader(Math.floor(Math.random() * ( 100000 + 1)));
                }else if(platform1 == 0){
                    //苹果更新
                    //uexWidget.loadApp("", "", updateurl);
                }
            }
        } 
    };
    
    //安卓版 ，创建下载对象回调函数（step:6）
    uexDownloaderMgr.cbCreateDownloader = function(opId, dataType, data) {
        //alert('uexDownloaderMgr.cbCreateDownloader data='+data);
        if (data == 0) {
            //updateurl是通过调用cbCheckUpdate回调后，放入全局变量的
            uexDownloaderMgr.download(opId, downUrl, fileRootPath+fileName, '0');//开始下载apk文件
        } else {
            console.log(data);
        }
    };
    
    //安卓版 ，显示下载进度 （step:7）
    uexDownloaderMgr.onStatus = function(opId, fileSize, percent, status) {
        if (status == 0) {
            // 下载中...
            uexWindow.toast('1', '5', '正在下载：' + percent + '%', '');
        } else if (status == 1) {// 下载完成.
            uexWindow.closeToast();
            uexDownloaderMgr.closeDownloader(opId);//关闭下载对象
            uexWidget.installApp(fileRootPath+fileName);// 安装下载apk文件
        } else {
            uexDownloaderMgr.closeDownloader(opId);//关闭下载对象
            uexWindow.toast('1', '5', '请检查手机存储是否正常', '');
        }
    }
}
