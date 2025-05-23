/**
 * Created by qixiaowei on 16/8/8.
 *
 * @version 2.2.1.6
 * @time 2016-12-26
 * åŒºåˆ«äº†cocoså’Œegretå¼•æ“Žå¯¹minilogoçš„åŠ è½½ç¼“å­˜å¤„ç†æ–¹å¼
 *
* @version 2.2.1.5
 * @time 2016-09-12
 * å¢žåŠ äº‹ä»¶ç±»åž‹æ²¡æœ‰æ—¶çš„å…¼å®¹
 * ä¿®å¤MGFrameworkä¸Žcom4jAPIåŒæ—¶æœ‰æ—¶æ¸¸æˆå¤šæ¬¡æ‰§è¡Œäº‹ä»¶é—®é¢˜
 *
 * @version 2.2.1.4
 * @time 2016-08-17
 * å¢žåŠ App.debugæ—¶è¾“å‡º
 *
 * @version 2.2.1.3
 * @time 2016-08-17
 * App.Fullscreen()æ›´æ”¹ä¸ºApp.ClickFullscreen()
 *
 * @version 2.2.1.2
 * @time 2016-08-17
 * å¢žåŠ App.ClickCredits()
 *
 * @version 2.2.1.2
 * @time 2016-08-11
 * ç»Ÿä¸€å‘½å
 * App.ScreenshotEnabled = App.frameworkInfo["HasScreenshot"];
 * App.CreditsEnabled = App.frameworkInfo['showCredits'];
 * App.MoreGamesButtonEnabled = App.frameworkInfo['showMoreGamesButton'];
 * App.FullscreenEnabled = App.frameworkInfo['fullscreenEnabled'];
 *
 * @version 2.2.1.1
 * @time 2016-08-11
 * FIX: åœ¨éžCom4jAPIæƒ…å†µä¸‹æ— æ³•åˆ‡æ¢åœºæ™¯
 *
 * @version 2.2.1
 * @time 2016/08/10
 * æ›´æ”¹App.ChangeScene()ä¸ºå¸¦å›žè°ƒæ–¹æ³•å‚æ•°
 *
 * @version 2.2.0
 * @time 2016/08/08
 * å¢žåŠ App.CreditsEnabled
 * å¢žåŠ App.MoreGamesButtonEnabled
 * å¢žåŠ App.ContinueGame();
 * å¢žåŠ App.LevelFail();
 * å¢žåŠ App.LevelWin();
 *
 *
 */
var App = (function () {
    App.VERSION = "2.2.1.6";
    App.debug = true;
    App.frameworkInfo = null;
    App.engine=null;
    App.Doc = null;
    App.miniLogoUrl = "";
    App.instance = null;
    App.PLATFORM_FACEBOOK = "facebook";
    App.PLATFORM_TWITTER = "twitter";
    App.PLATFORM_WEIXIN = "weixin";
    App.PLATFORM_QQ = "qq";
    App.PLATFORM_WEIBO = "weibo";
    App.PLATFORM_GOOGLE_PLUS = "google_plus";
    App.gamename = "-1";
    App.nameid = "-1";
    App.sharemsgs = {};
    App.showmsgs = {};
    App.platforms = [];
    ///ä¸ºegretç¼“å­˜logoç­‰textureå›¾ç‰‡èµ„æº
    App.textures={};
    App.FullscreenEnabled = true;
    /**
     * ä¸‹è½½å¹³å°ï¼ˆAppStoreï¼Œ GooglePlay)
     * @type {Array}
     */
    App.apps = [];
    App.language = "";
    /**
     * loadingç•Œé¢çŠ¶æ€
     * @type {string}
     */
    App.PREGAME = "pregame";
    /**
     * å·²ç»è¿›å…¥æ¸¸æˆäº†
     * @type {string}
     */
    App.INGAME = "ingame";
    /**
     * æ¸¸æˆçŠ¶æ€
     * @type {string}
     */
    App.state = App.PREGAME;
    /**
     * LOGOæ˜¾ç¤ºæ–¹å¼
     * å¯¹é½æ–¹å¼| NONE=ä¸æ˜¾ç¤ºï¼ŒTL=top left; TM=top middle; TR=top right; BL=bottom left; BM=bottom middle; BR=bottom right; XY=x,y(ç¤ºä¾‹100,100)
     * @type {string}
     */
    App.LogoAlign = "NONE";
    /**
     * æ˜¯å¦å¯ä»¥æˆªå±
     * @type {boolean}
     */
    App.ScreenshotEnabled = true;
    /**
     * æ˜¯å¦æ˜¾ç¤ºCredits
     * @type {boolean}
     */
    App.CreditsEnabled = true;
    /**
     * æ˜¯å¦æ˜¾ç¤ºmore games button
     * @type {boolean}
     */
    App.MoreGamesButtonEnabled = true;
    function App() {
        if (App.instance) {
            console.log("can not new App again");
        }
        this.onAddToStageHandler();
    };

    var dispatch = function (event) {
        if (App.debug) {
            console.log('%c%s', 'background:yellow;color:green;', event.type);
        }
        MGDelegate.dispatcherEvent(event);
    };

    App.prototype.onAddToStageHandler = function () {
        MGDelegate.isApp = false;
        MGDelegate.addEventListener(MGEvent.FRAMEWORK_INFO_RESPONSE || "FRAMEWORK_INFO_RESPONSE", this.onFrameworkInfoHandler, this);
        MGDelegate.addEventListener(MGEvent.ENTER_GAME || "ENTER_GAME", this.enterGame, this);
        //è¯·æ±‚èŽ·å–FRAMEWORKä¿¡æ¯
        var evt = new MGEvent(MGEvent.FRAMEWORK_INFO_REQUEST || "FRAMEWORK_INFO_REQUEST");
        evt.data = {"AppVersion": App.VERSION};
        dispatch(evt);
        //é€šçŸ¥æ¸¸æˆå·²ç»æ·»åŠ åˆ°èˆžå°
        dispatch(new MGEvent(MGEvent.ADDED_TO_STAGE || "ADDED_TO_STAGE"));
    };
    ///èŽ·å–æ¡†æž¶çš„ä¿¡æ¯
    App.prototype.onFrameworkInfoHandler = function (event) {
        MGDelegate.removeEventListener(MGEvent.FRAMEWORK_INFO_RESPONSE || "FRAMEWORK_INFO_RESPONSE", this.onFrameworkInfoHandler, this);
        App.frameworkInfo = event.data;
        if (App.frameworkInfo) {
            console.log("AppVersion: " + App.VERSION);
        }
        App.debug = App.frameworkInfo['debug'];

        if (window.location.hostname == 'localhost'
            || window.location.hostname == '127.0.0.1') {
            App.debug = true;
        }

        App.gamename = App.frameworkInfo["gamename"];
        App.nameid = App.frameworkInfo["nameid"];
        App.language = App.frameworkInfo["language"] || 'en';
        App.sharemsgs = App.frameworkInfo["sharemsgs"] || [];
        App.showmsgs = App.frameworkInfo["showmsgs"] || [];

        App.ScreenshotEnabled = App.frameworkInfo["HasScreenshot"];
        App.CreditsEnabled = App.frameworkInfo.hasOwnProperty("showCredits") ? App.frameworkInfo['showCredits'] : true;
        App.MoreGamesButtonEnabled = App.frameworkInfo.hasOwnProperty("showMoreGamesButton") ? App.frameworkInfo['showMoreGamesButton'] : true;
        App.FullscreenEnabled = App.frameworkInfo.hasOwnProperty("fullscreenEnabled") ? App.frameworkInfo['fullscreenEnabled'] : true;

        for (var p in App.sharemsgs) {
            if (p.substr(0, 4) == "app_") {
                App.apps.push(p);
            }
            else {
                App.platforms.push(p);
            }
        }
        //è¿›è¡ŒæŽ’åºï¼Œä½¿æ¯æ¬¡æ˜¾ç¤ºé¡ºåºéƒ½ç»Ÿä¸€
        App.platforms.sort();
        App.apps.sort();

        try {
            eval("cc");
            App.engine="cocos";
        } catch (e) {

        }
        try {
            eval("egret");
            App.engine="egret";
        } catch (e) {

        }
        if(!App.engine){
            throw "no such a engine exsit!";
        }
        switch (App.engine){
            case "cocos":
                this.CocosFrameworkInfoHandler();
                break;
            case "egret":
                this.EgretFrameworkInfoHandler();
                break;
        }
    };
    ////Cocoså¯¹æ¡†æž¶èµ„æºçš„å¤„ç†
    App.prototype.CocosFrameworkInfoHandler=function () {
        if (App.frameworkInfo["miniLogoUrl"]) {
            App.miniLogoUrl = App.frameworkInfo["miniLogoUrl"];

            res.miniLogoUrl = App.miniLogoUrl;
            res_resource.push(App.miniLogoUrl);
            //RES.getResByUrl(App.miniLogoUrl, App.instance["onMiniLogoLoaded"], App.instance);
        }
        var platformLen = App.platforms.length;
        var appLen = App.apps.length;
        var new_key = "";
        var itm;
        var key = "";
        if (platformLen != 0) {
            for (var i = 0; i < platformLen; i++) {
                key = App.platforms[i];
                if (key.indexOf("weixin") < 0) {
                    var url = "res/platform/" + key + ".png";
                    new_key = "$platform_" + key;
                    res[new_key] = url;
                    res_resource.push(url);
                }
            }
        }
        if (appLen != 0) {
            for (var i = 0; i < appLen; i++) {
                key = App.apps[i];
                var url = "res/app/" + key + ".png";
                new_key = "$" + key;
                res[new_key] = url;
                res_resource.push(url);
            }
        }
        var creditsRes = [
            "c_button",
        ];
        var creditsLen = creditsRes.length;
        for (var i = 0; i < creditsLen; i++) {
            key = creditsRes[i];
            var url = "res/credits/" + key + ".png";
            new_key = "$" + key;
            res[new_key] = url;
            res_resource.push(url);
        }
    }
    ////egretä¸­logoç­‰èµ„æºé¢„åŠ è½½
    App.prototype.PreLoadEgretTexture=function (new_key,url) {
        RES.getResByUrl(url, function (texture) {
            //å°†åŠ è½½å®Œçš„èµ„æºè¿›è¡Œæ˜¾ç¤º
            App.textures[new_key]=texture;
        }, App, RES.ResourceItem.TYPE_IMAGE);
    }
    ////Egretå¯¹æ¡†æž¶èµ„æºçš„å¤„ç†
    App.prototype.EgretFrameworkInfoHandler=function () {
        if (App.frameworkInfo["miniLogoUrl"]) {
            App.miniLogoUrl = App.frameworkInfo["miniLogoUrl"];
            if(App.miniLogoUrl.indexOf("office")>-1){
                return;
            }
            this.PreLoadEgretTexture("miniLogoUrl",App.miniLogoUrl);
        }
    }
    ///æ¡†æž¶é€šçŸ¥å¯ä»¥å¼€å§‹æ¸¸æˆäº†
    App.prototype.enterGame = function (event) {
        App.state = App.INGAME;
    };
    /**
     * åˆ†äº«åˆ°å¹³å°
     * @param platform
     * @param score
     * @param level
     * @param percent
     * @constructor
     */
    App.Share = function (platform, score, level, percent) {
        if (score === void 0) {
            score = 0;
        }
        if (level === void 0) {
            level = 0;
        }
        if (percent === void 0) {
            percent = 0;
        }
        if (!App.sharemsgs[platform]) {
//			console.warn("Can not found platform msg: " + platform);
            return;
        }
        var msg = App.sharemsgs[platform];
        msg = msg.replace(/\{nameid\}/g, App.nameid);
        msg = msg.replace(/\{gamename\}/g, App.gamename);
        msg = msg.replace(/\{score\}/g, score + "");
        msg = msg.replace(/\{level\}/g, level + "");
        msg = msg.replace(/\{percent\}/g, percent + "");

        var evt = new MGEvent(MGEvent.SHARE || "SHARE");
        evt.data = {
            "platform": platform,
            "gamename": App.gamename,
            "nameid": App.nameid,
            "msg": msg
        };
        dispatch(evt);
    };
    /**
     * èŽ·å–æ˜¾ç¤ºç±»æ–‡æœ¬
     * @param language
     * @param score
     * @param percent
     * @returns {string}
     * @constructor
     */
    App.GetShowMsg = function (language, score, level, percent) {
        if (language === void 0) {
            language = App.language;
        }
        if (score === void 0) {
            score = 0;
        }
        if (level === void 0) {
            level = 0;
        }
        if (percent === void 0) {
            percent = 0;
        }
        if (!App.showmsgs[language]) {
            console.warn("can not found show msg: ");
            return;
        }


        App.Share("weixin", score, level, percent);
        var msg = App.showmsgs[language];
        msg = msg.replace(/\{nameid\}/g, App.nameid);
        msg = msg.replace(/\{gamename\}/g, App.gamename);
        msg = msg.replace(/\{score\}/g, score + "");
        msg = msg.replace(/\{percent\}/g, percent + "");
        return msg;
    };
    /**
     * ç‚¹å‡»Appä¸‹è½½
     * @param platform
     * @constructor
     */
    App.DownloadApp = function (platform) {
        var evt = new MGEvent(MGEvent.DOWNLOAD_APP || "DOWNLOAD_APP");
        evt.data = {"platform": platform};
        dispatch(evt);
    };
    /**
     * å¼€å§‹æ¸¸æˆ
     * @constructor
     */
    App.Start = function () {
        dispatch(new MGEvent(MGEvent.START_GAME || "START_GAME"));
    };
    /**
     * æš‚åœæ¸¸æˆ
     * @constructor
     */
    App.Pause = function () {
        dispatch(new MGEvent(MGEvent.PAUSE_GAME || "PAUSE_GAME"));
    };
    /**
     * ç‚¹å‡»æ›´å¤š
     * @constructor
     */
    App.ClickMore = function () {
        dispatch(new MGEvent(MGEvent.CLICK_MORE || "CLICK_MORE"));
    };
    /**
     * ç‚¹å‡»LOGO
     * @constructor
     */
    App.ClickLogo = function () {
        dispatch(new MGEvent(MGEvent.CLICK_MINILOGO || "CLICK_MINILOGO"));
    };
    /**
     * ç‚¹å‡»Credits
     * @constructor
     */
    App.ClickCredits = function () {
        dispatch(new MGEvent(MGEvent.CLICK_CREDITS || "CLICK_CREDITS"));
    };

    /**
     * æ˜¾ç¤ºèµ¢äº†ç•Œé¢ï¼Œå¹¶è°ƒç”¨æŽ¥å£
     * @constructor
     */
    App.ShowWin = function () {
        App.Pause();
        dispatch(new MGEvent(MGEvent.SHOW_WIN || "SHOW_WIN"));
    };
    /**
     * æ˜¾ç¤ºèµ¢äº†ç•Œé¢ï¼Œå¹¶è°ƒç”¨æŽ¥å£
     * @constructor
     */
    App.ShowLose = function () {
        App.Pause();
        dispatch(new MGEvent(MGEvent.SHOW_LOSE || "SHOW_LOSE"));
    };
    /**
     * æˆªå±
     * @param clipBounds            æˆªå±çš„çŸ©å½¢
     * @param msg                   æˆªå±åˆ†äº«æ–‡å­—
     * @param callback_success      æˆªå±åˆ†äº«æˆåŠŸ
     * @param callback_failed       æˆªå±åˆ†äº«å¤±è´¥
     */
    App.Screenshot = function (clipBounds, msg, callback_success, callback_failed) {
        if (!clipBounds) {
            clipBounds = cc.winSize;
            //clipBounds = new egret.Rectangle(0, 0, App.stage.stageWidth, App.stage.stageHeight);
        }
        if (!msg) {
            msg = "";
        }
        if (!callback_success) {
            callback_success = function () {
                console.log("screenshot success.");
            };
        }
        if (!callback_failed) {
            callback_failed = function () {
                console.log("screenshot faild.");
            };
        }
        if (MGDelegate.isApp) {
            var evt = new MGEvent(MGEvent.SCREENSHOT || "SCREENSHOT");
            evt.data = {
                "rect": clipBounds,
                "msg": msg,
                "success": callback_success,
                "faild": callback_failed
            };
            dispatch(evt);
        }
        var newCanvas = App.Doc.getElementById("screenshootCanvas");
        if (!newCanvas) {
            var container = App.Doc.getElementById("gameCanvas");
            newCanvas = App.Doc.createElement("canvas");
            newCanvas.id = "screenshootCanvas";
            newCanvas.style.display = "none";
            newCanvas.width = clipBounds.width;
            newCanvas.height = clipBounds.height;
            container.appendChild(newCanvas);
        }
        else {
            newCanvas.getContext("2d").clearRect(0, 0, newCanvas.width, newCanvas.height);
            newCanvas.width = clipBounds.width;
            newCanvas.height = clipBounds.height;
        }
        setTimeout(function () {
            try {
                var canvas = App.Doc.getElementById("gameCanvas");
                var data = canvas.getContext("2d").getImageData(clipBounds.x, clipBounds.y, clipBounds.width, clipBounds.height);
                newCanvas.getContext("2d").putImageData(data, 0, 0, 0, 0, clipBounds.width, clipBounds.height);
                var evt = new MGEvent(MGEvent.SCREENSHOT || "SCREENSHOT");
                evt.data = {
                    "rect": clipBounds,
                    "msg": msg,
                    "success": callback_success,
                    "faild": callback_failed
                };
                dispatch(evt);
            }
            catch (e) {
                console.error("Security Error", e.message);
            }
        }, 60);
    };
    /**
     * ç»§ç»­æ¸¸æˆ
     * @constructor
     */
    App.ContinueGame = function () {
        BaseScene.creditNone = false;
        dispatch(new MGEvent(MGEvent.CONTINUE_GAME || "CONTINUE_GAME"));
    };
    /**
     * å…³å¡å¤±è´¥
     * @param level
     * @constructor
     */
    App.LevelFail = function (level) {
        var evt = new MGEvent(MGEvent.LEVEL_FAIL || "LEVEL_FAIL");
        evt.data = {"level": level};
        dispatch(evt);
    };
    /**
     * å…³å¡èƒœåˆ©
     * @param level
     */
    App.LevelWin = function (level) {
        var evt = new MGEvent(MGEvent.LEVEL_WIN || "LEVEL_WIN");
        evt.data = {"level": level};
        dispatch(evt);
    };
    /**
     * æ›´æ”¹åœºæ™¯
     * @param {Function}    callback
     * @param {Object}      thisObj
     * @constructor
     */
    App.ChangeScene = function (callback, thisObj) {
        var args = null;
        if (arguments.length >= 3) {
            args = arguments.slice(2);
        }
        var type = MGEvent.CHANGE_SCENE || "CHANGE_SCENE";
        if (!MGDelegate._eventMap[type] || MGDelegate._eventMap[type].length == 0) {
            callback.apply(thisObj, args);
            return;
        }
        var evt = new MGEvent(type);
        evt.data = {
            'callback': callback,
            'thisObj': thisObj,
            'args': args
        };
        dispatch(evt);
    };
    App.ClickFullscreen = function () {
        if (App.FullscreenEnabled) {
            dispatch(new MGEvent(MGEvent.FULLSCREEN || "FULLSCREEN"));
        }
    };
    return App;
})();
App.init = function () {
    if (!App.instance) {
        App.instance = new App();
    }
}
App.prototype.__class__ = "App";