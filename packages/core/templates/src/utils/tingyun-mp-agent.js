/*AGENT_VERSION=1.3.9*/"use strict";var i=wx;function l(){return+new Date}function a(t){var e;try{e=i.getStorageSync(t)}catch(t){}return e}function r(t,e){try{i.setStorageSync(t,e)}catch(t){}}function t(){return i.getSystemInfoSync()}function d(t){return t.statusCode}function e(){return["requestPayment","scanCode","previewImage"]}function n(){return"request"}var o=[],p={context:null},s={networkType:"",system:t()};function c(t){o.push({timestamp:l(),route:t})}function u(){o=[]}function h(){return o.slice()}function f(e){return function(t){return"Array"===e&&Array.isArray?Array.isArray(t):Object.prototype.toString.call(t)==="[object "+e+"]"}}var m=f("String"),y=f("Array"),g=f("Function"),v=f("Object"),T=f("Boolean"),D=f("Number");function q(t,e){return function(){if(g(e))try{e.apply(this,arguments)}catch(t){}if(g(t))return t.apply(this,arguments)}}function S(e,n,a){return function(){var t;if(g(n))try{n.apply(this,arguments)}catch(t){}if(g(e)&&(t=e.apply(this,arguments)),g(a))try{a.apply(this,arguments)}catch(t){}return t}}function b(t,e){var n,a;v(t)&&g(t.handler)&&(n=t.name,a=t.handler,t=t.afterHandler,e[n]=S(e[n],a,t),e[n]._ty_hook=!0)}var x=function(){function t(t){return t<0?NaN:t<=30?0|Math.random()*(1<<t):t<=53?(0|Math.random()*(1<<30))+(0|Math.random()*(1<<t-30))*(1<<30):NaN}function e(t,e){for(var n=t.toString(16),a=e-n.length,r="0";0<a;a>>>=1,r+=r)1&a&&(n=r+n);return n}return function(){return e(t(32),8)+"-"+e(t(16),4)+"-"+e(16384|t(12),4)+"-"+e(32768|t(14),4)+"-"+e(t(48),12)}}();function I(t){return t&&m(t)?JSON.parse(t):t}function k(t){try{return I(t)}catch(t){}return null}function C(t,e){var n="",a=!1;try{n=JSON.stringify(t)}catch(t){a=!(n="")}return e?{error:a,value:n}:n}function E(t){return t?v(t)?C(t).length:m(t)?t.length:t instanceof ArrayBuffer?t.byteLength:t.length||0:0}function _(t,e){t=v(t)?C(t):m(t)?t:"";return t=e?t.substring(0,e):t}var A="recordTyTime",O="TINGYUN_UID",L="custom",F="TRIGGER_LIFECYCLE",M="2.6.4",R=20,N="event",P="request",j="api",w="timer",H=1500,z=!0,B=!0,Y=5,G="TY_CONFIG",K="TY_SAMPLING",U="TY_SETDATA_THRESHOLD",J="TY_SETDATA_TRACE",V="TY_SETDATA_TRACEHINT",X="TY_IGNORE_ERRCODES",Q="TY_SETDATA_TIME_INTERVAL",W=[500,1500],Z=256,$=256,tt="__ty_page_param",et="__ty_component_hooked",nt={},at=!1;function rt(t){null==(nt=t||{}).requestFailMessageSize&&(nt.requestFailMessageSize=$),null==nt.apiFailMessageSize&&(nt.apiFailMessageSize=Z)}function it(){return at}function ot(t){at=t}function st(){for(var t=0;t<arguments.length;t++)if(null!=arguments[t])return arguments[t]}var ct=n();function ut(t){this.size=t||100,this.queue=[],this.running=!1}ut.prototype.add=function(t){this.queue.length>=this.size||(this.queue.push(t),this.running||(this.running=!0,this.run()))},ut.prototype.run=function(){var t=this;this.handler(this.queue.shift(),function(){0<t.queue.length?t.run():t.running=!1})},ut.prototype.handler=function(t,e){var n={url:"".concat(nt.beacon).concat(t.uri),method:t.method||"POST",_no_record:!0,success:function(){t.success&&t.success.apply(this,arguments)},fail:function(){t.fail&&t.fail.apply(this,arguments)},complete:function(){t.complete&&t.complete.apply(this,arguments),e()}};t.data&&(n.data=t.data),i[ct](n)};var dt=new ut;function ht(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var ft=6e5,lt=Tt(K),pt=!1;function mt(t){return null!=t&&D(t)}function yt(t){return null!=t&&T(t)}function gt(t){return null!=t&&y(t)}function vt(t){return gt(t)&&2==t.length}function Tt(t){var e=a(G);if(e&&v(e))return e[t]}function Dt(t){var e=a(G);if(e&&v(e)||(e={}),t)for(var n in t)ht(t,n)&&(e[n]=t[n]);r(G,e)}function qt(t,a){var r=this,i={};t.forEach(function(t){var e=t.key,n=t.storeKey,t=t.validFunc;!!t&&t.call(r,a[e])&&(nt[e]=a[e],i[n]=a[e])}),Dt(i)}function St(t){nt.key&&nt.beacon&&dt.add({uri:"/mp-config/config/pullSampling?encodeMpId=".concat(nt.key),success:function(t){var e=t.data||{},t=e.data;200===e.code&&t&&(mt(t.sampling)&&(lt=t.sampling,(e={})[K]=lt,Dt(e)),qt([{key:"setdataThreshold",storeKey:U,validFunc:mt},{key:"setdataTrace",storeKey:J,validFunc:yt},{key:"setdataTraceHint",storeKey:V,validFunc:yt},{key:"ignoreErrorCodes",storeKey:X,validFunc:gt},{key:"setdataTimeInterval",storeKey:Q,validFunc:vt}],t))},complete:function(){t&&t(lt)}})}function bt(){lt=lt||(+nt.sampleRate||1);var t=Math.random();pt=t<=lt}function xt(){return{uniqueId:0,requestId:0,apiId:0,otherActions:[],eventActions:[],setData:{threshold:st(nt.setdataThreshold,Tt(U),H),setDataTrace:st(nt.setdataTrace,Tt(J),z),setDataTraceHint:st(nt.setdataTraceHint,Tt(V),B),setDataTimeInterval:st(nt.setdataTimeInterval,Tt(Q),W),stuck:!1,max:0,currentSegmentTime:0,data:{},requestBridge:[]},reqStat:{currentSegmentTime:0,data:{}},lastSetDataInOnReady:0,stuck:!1,jsError:!1,netError:!1,recordFirstLoad:!1}}function It(){return{stuck:!1,firstLoad:0,jsError:!1,netError:!1}}setInterval(St,ft);var kt={},Ct=[],Et=0,_t={},At=xt(),Ot=It(),Lt={canSend:!1,sent:!1,apiRemain:0,needClearDeferredData:!1};function Ft(){kt={},Ct=[],Et=0,Lt.apiRemain=0,At=xt(),Lt.needClearDeferredData=!0}function Mt(){Ot=It()}function Rt(t){var e;At.eventActions||(At.eventActions=[]),At.otherActions||(At.otherActions=[]),t&&(t.type===N?(e=nt&&nt.eventMaxSize||R,At.eventActions&&At.eventActions.length>=e&&At.eventActions.shift(),At.eventActions.push(t)):At.otherActions.push(t))}function Nt(t,e){for(var n in e)ht(e,n)&&e[n]&&0<e[n].count&&t.push(Object.assign(e[n]||{},{timestamp:+n}))}function Pt(){var t=[],e=[];Nt(t,At.setData.data),Nt(e,At.reqStat.data);var n={metric:{jsError:Ct&&0<Ct.length,netError:At.netError,stuck:At.stuck}};return 0<t.length&&(n.setData={threshold:st(At.setData.threshold,H),setDataTrace:st(At.setData.setDataTrace,z),setDataTraceHint:st(At.setData.setDataTraceHint,B),setDataTimeInterval:st(At.setData.setDataTimeInterval,W),max:At.setData.max,requestBridge:At.setData.requestBridge,data:t}),0<e.length&&(n.reqStat=e),!kt.onLoad||(e=(e=At.lastSetDataInOnReady)||kt.onReady)&&(e=0<(e=e-kt.onLoad)?e:0,n.metric.firstLoad=e),Ot=n.metric,n}function jt(){Et=l()}var wt={uid:Ht(),sid:x(),v:"1.3.9",at:"wx"};function Ht(){var t=a(O);return t||(t=x(),r(O,t)),t}function zt(t){var e;pt&&((e=Object.assign({},wt,s||{},{key:nt.key},t||{})).launch=!t,e.launch&&(e.launchOptions=p.launchOptions),dt.add({uri:"/mp-app",data:e}))}function Bt(t){var e;pt&&(F===t&&(Lt.canSend=!0),!Lt.sent&&Lt.canSend&&(e=Object.assign({},{path:_t.current,pageEvent:Object.assign({},kt),errs:Ct.slice(),fromPath:_t.prev||"",actions:(At.eventActions||[]).concat(At.otherActions||[])},Object.assign({},wt,s||{},{key:nt.key}),0<Et?{ct:Et}:{},Pt()),(t=h())&&(e.routeTrack=t),dt.add({uri:"/mp-page",data:e}),Ft(),Lt.sent=!0,Lt.canSend=!1))}function Yt(t){bt();var e=t.path,n=t.query,a=t.scene;s.openPath=e,nt.disableFetchQuery||(s.query=n),s.scene=a,p.launchOptions=t,i.getNetworkType({success:function(t){s.networkType=t.networkType},complete:function(){zt()}})}function Gt(t){var e="",n="";m(t)?e=t:t&&(e=t.stack,n=t.message),e&&(e={time:l(),stack:e},n&&(e.msg=n),Ct.push(e))}function Kt(){var t=h();u();var e=_t.current;_t.prev="",_t.current="",zt({routeTrack:t,closePath:e,metric:Ot})}function Ut(t,e){t=t.split("."),e=e.split(".");for(var n=Math.max(t.length,e.length);t.length<n;)t.push("0");for(;e.length<n;)e.push("0");for(var a=0;a<n;a++){var r=parseInt(t[a]),i=parseInt(e[a]);if(i<r)return 1;if(r<i)return-1}return 0}function Jt(){return 0<=Vt(s,M)}function Vt(t,e){var n="";return(n=t&&t.system?t.system.SDKVersion:n)&&e?Ut(n,e):-1}var Xt=[{name:"onLaunch",handler:Yt},{name:"onError",handler:Gt},{name:"onHide",handler:Kt}];function Qt(e){return Xt.forEach(function(t){b(t,e)}),e}function Wt(t){return Jt()||!it()?t:Qt.apply(this,arguments)}function Zt(){var e=App;App=function(t){if(t=Qt(t),e)return e.call(this,t)}}function $t(t){return nt.ignoredPages&&y(nt.ignoredPages)?nt.ignoredPages.indexOf(t)<0:!nt.pages||!y(nt.pages)||-1<nt.pages.indexOf(t)}function te(t,e){if(!v(e))return t;try{var n=Object.keys(e).map(function(t){return"".concat(t,"=").concat(e[t])}).join("&");n&&(t+="?".concat(n))}catch(t){}return t}function ee(){var c=this.setData,u=At.setData.threshold,d=At.setData.setDataTrace,h=At.setData.setDataTraceHint,f=At.setData.setDataTimeInterval;this.setData=function(){var a=arguments[0],r=arguments[1],t=l(),i={start:t},o=p.context,s=o&&o.type===P&&o.data&&o.data.recordFirstLoad;(At.recordFirstLoad||s)&&(i.calcFirstLoad=!0);try{var e=At.setData.currentSegmentTime;1e3<t-e?(At.setData.currentSegmentTime=t,At.setData.data[t]={count:0,grade:{good:{count:0},normal:{count:0},bad:{count:0}},traces:[]},i.segmentTime=t):i.segmentTime=e}catch(t){}function n(){try{i.end=l(),i.calcFirstLoad&&i.end>At.lastSetDataInOnReady&&(At.lastSetDataInOnReady=i.end),i.duration=i.end-i.start;var t=At.setData.data[i.segmentTime];if(t.count++,i.duration>At.setData.max&&(At.setData.max=i.duration),i.duration>f[1]?t.grade.bad.count++:i.duration>f[0]?t.grade.normal.count++:t.grade.good.count++,i.duration>u&&(At.stuck||(At.stuck=!0),t.traces.length<Y&&d))try{var e=C(a,!0),n={timestamp:i.start,duration:i.duration,size:e.value.length};h&&(n.hint=e.value.substring(0,200)),e.error&&(n.error=e.error),t.traces.push(n)}catch(t){}s&&At.setData.requestBridge.push({start:i.start,end:i.end,requestId:o.data.requestId,url:o.data.url})}catch(t){}return r&&r.apply(this,arguments)}return c.call(this,arguments[0],n)}}function ne(){$t(this.route)&&(Lt.needClearDeferredData&&(Mt(),Lt.needClearDeferredData=!1),At.recordFirstLoad=!0,ee.call(this),kt.onLoad=l(),this[tt]=te(this.route,arguments[0]))}function ae(){var t;$t(this.route)&&(Lt.needClearDeferredData&&(Mt(),Lt.needClearDeferredData=!1),kt.onShow=l(),c(t=this[tt]||this.route),_t.prev=_t.current,_t.current=t,Lt.sent=!1)}function re(){$t(this.route)&&(kt.onReady=l())}function ie(){$t(this.route)&&(At.recordFirstLoad=!1)}function oe(){$t(this.route)&&(kt.onHide=l(),Bt(F))}function se(){$t(this.route)&&(kt.onUnload=l(),Bt(F))}var ce=[{name:"onLoad",handler:ne},{name:"onShow",handler:ae},{name:"onReady",handler:re,afterHandler:ie},{name:"onHide",handler:oe},{name:"onUnload",handler:se}];function ue(t,e){for(var n in t){var a;ht(t,n)&&g(t[n])&&!t[n]._ty_hook&&g(e)&&(a=t[n],t[n]=e.call(this,n,a),t[n]._ty_hook=!0)}}var de=[P,j,w];function he(){var e={};return de.forEach(function(t){e[t]={current:0,children:0}}),e}function fe(t,e){for(var n=0;n<t.length;n++)if(t[n].cid===e.id){e.requests&&0<e.requests.length&&(t[n].requests=e.requests),e.apis&&0<e.apis.length&&(t[n].apis=e.apis);break}}function le(t){t=t||{},this.id=++At.uniqueId,this.parent=t.parent||null,this.name=t.name||"<root>",this.type=t.type||N,this.subType=this.type===N?t.subType||"tap":t.subType,this.requests=[],this.apis=[],this.remain=he(),this.s=l(),this.e=null,this.data=t.data,this.closed=!1,this.path=_t.current,this.prevPath=_t.prev,this.dataComposed=t.dataComposed||!1}le.prototype.end=function(t){var e;this.closed||(t&&((e=this.getItemsByType(t.type))&&0<e.length&&fe(e,t),this.updateRemain(-1,t.type)),this.isNoRemain()&&(this.e=l(),this.closed=!0,this.parent?this.parent.end(this):(Rt(this.composeActionData()),p.context=null)))},le.prototype.getItemsByType=function(t){var e;return t===P?e=this.requests:t===j&&(e=this.apis),e},le.prototype.isNoRemain=function(t){var e,n=!0;for(e in this.remain)if(ht(this.remain,e))if(!(this.remain[e].current<=0&&(!!t||this.remain[e].children<=0))){n=!1;break}return n},le.prototype.setData=function(t){this.data=t},le.prototype.hasPrevAssignedData=function(){return this.requests&&0<this.requests.length||this.apis&&0<this.apis.length},le.prototype.composeActionData=function(){var t={id:this.id,name:this.name,type:this.type,start:this.s,end:this.e,duration:0<this.e-this.s?this.e-this.s:0,path:this.path,prevPath:this.prevPath};return this.requests&&0<this.requests.length&&(t.requests=this.requests),this.apis&&0<this.apis.length&&(t.apis=this.apis),this.data&&(t.data=this.data),this.type!==P&&this.type!==j||(delete(t=Object.assign({},t,this.data)).data,this.type===P&&delete t.name),t},le.prototype.canEnd=function(){return this.isNoRemain(!0)},le.prototype.isEventChildContext=function(){for(var t=this.parent,e=!1;null!=t;){if(t.type===N){e=!0;break}t=t.parent}return e},le.prototype.updateRemain=function(t,e){e=e||P;var n=t||0;this.remain[e].current=this.remain[e].current+n;for(var a=this.parent;a;)a.remain[e].children=a.remain[e].children+n,a=a.parent},Object.defineProperty(le.prototype,"current",{get:function(){return p.context},enumerable:!0,configurable:!0});var pe="tyname";function me(t){return!t||"tap"!==t.type||!v(t.target)||!v(t.currentTarget)||null==t.timeStamp}function ye(t,e){var n=t.target||{},a=n.offsetLeft,r=n.offsetTop,i=n.id,o=n.dataset,s=t.detail||{},n=s.x,s=s.y;t._relatedInfo&&(c=t._relatedInfo.anchorTargetText);var c={target:{offsetLeft:a,offsetTop:r,id:i,x:n,y:s},dataset:{name:o[pe],targetName:c,methodName:e}},e=e||"";p.context=new le({name:e,type:N,subType:t.type,data:c,dataComposed:!0})}function ge(){p.context&&p.context.canEnd()&&p.context.end(),p.context=null}function ve(a,r){return function(){var t,e=arguments[0]||{},n=me(e);if(!n)try{ye.call(this,e,a)}catch(t){}try{t=r.apply(this,arguments)}finally{if(!n)try{ge.call(this)}catch(t){}}return t}}function Te(e){var n=p.context;return function(){var t;p.context=n;try{t=e.apply(this,arguments)}finally{p.context=null}return t}}function De(e){return ce.forEach(function(t){b(t,e)}),ue(e,ve),e[A]=jt,e}function qe(t){return Jt()||!it()?t:De.apply(this,arguments)}function Se(){var e=Page;Page=function(t){if(t=De(t),e)return e.call(this,t)}}function be(t){p.context=t.context}function xe(){p.context&&p.context.canEnd()&&p.context.end()}var Ie=n(),ke=i[Ie];function Ce(t,e){if(!t)return null;return k(t["X-Tingyun-Data"])}function Ee(t,e){nt.id&&(t.header["X-Tingyun"]="c=B|".concat(nt.id))}function _e(t){if(!t)return 0;var e=t.header,n=t.data,t=0;return t=!(t=+(e&&e["Content-Length"]))||!D(t)||Number.isNaN(t)?E(n)||0:t}function Ae(t,e){var n={},e=Ce(t.header,e.r);return e&&(n.s_id=e.id,n.s_name=e.tname,n.t_id=e.tid,n.s_du=e.duration,"user"in e&&(n.s_user=e.user)),n}function Oe(t,e,n){return{requestId:t.requestId,type:P,url:t.url,method:t.method,start:t.start,end:t.end,cbTime:t.cbTime,duration:0<t.end-t.start?t.end-t.start:0,send:E(e.data),rec:_e(n),statusCode:t.statusCode||0,failMessage:t.failMessage||"",cid:t.cid}}function Le(t,e){var n;t.context||(n="".concat(t.url,"-").concat(t.requestId),t.context=new le({parent:e,name:n,type:P,data:t.data}))}var Fe=function(){var t,e,s,n,a,c,u=arguments[0]||{};return!u._no_record&&u.url&&it()&&(1e3<(t=l())-(e=At.reqStat.currentSegmentTime)&&(e=t,At.reqStat.currentSegmentTime=t,At.reqStat.data[t]={count:0}),At.reqStat.data[e].count++,e=p.context,(s={requestId:++At.requestId,url:u.url,method:u.method&&u.method.toUpperCase()||"GET",callbackContextCreated:!1,cbTime:0,recordFirstLoad:At.recordFirstLoad,data:{}}).data={url:s.url,requestId:s.requestId,recordFirstLoad:s.recordFirstLoad},Le(s,e),s.context&&(s.cid=s.context.id),s.r=l()%1e9,u.header=u.header||{},Ee(u),n=u.success,a=u.fail,c=u.complete,u.success=Te(function(){var t;if(s.end||(s.end=l()),be(s),n){var e=l();try{t=n.apply(this,arguments)}finally{e=l()-e;0<e&&(s.cbTime+=e)}}return t}),u.fail=Te(function(){var t;if(s.end||(s.end=l()),be(s),a){var e=l();try{t=a.apply(this,arguments)}finally{e=l()-e;0<e&&(s.cbTime+=e)}}return t}),u.complete=Te(function(t){var e,n;s.end||(s.end=l()),s.statusCode=d(t);var a=nt[L];if(a&&g(a))try{var r=a.apply(this,arguments);v(r)&&(n={custom:r})}catch(t){}if(be(s),c){var i=l();try{e=c.apply(this,arguments)}finally{var o=l()-i;0<o&&(s.cbTime+=o)}}i=t,o=!1;400<=(i=i||{}).statusCode&&(nt.ignoreErrorCodes||[]).indexOf(i.statusCode)<0?(o=!0,t=i.data,s.failMessage=_(t,nt.requestFailMessageSize)):i.errMsg&&!i.statusCode&&(o=!0,s.failMessage=i.errMsg.substring(0,nt.requestFailMessageSize)),o&&!At.netError&&(At.netError=!0);o=Ae(i,s),i=Oe(s,u,i);return s.context&&(s.context.dataComposed=!0),Object.assign(s.data,i,o||{},n||{}),xe(),e}),s.start=t,e&&(e.updateRemain(1),e.requests.push(s.data))),ke.apply(this,arguments)};function Me(){Object.defineProperty(i,Ie,{configurable:!0,enumerable:!0,writable:!0,value:Fe})}function Re(e,t){if(!e||e[et])return e;t=t||{},e.methods||(e.methods={});t=(null!=t.disbaleComponentLifeCycleHook?t:nt).disbaleComponentLifeCycleHook;return null!=t&&!1!==t||ce.forEach(function(t){b(t,e.methods)}),ue(e.methods,ve),e[et]=!0,e}function Ne(t,e){return it()?Re.apply(this,arguments):t}function Pe(){var e=Component;Component=function(t){t=Re(t),e&&e.call(this,t)}}function je(t,e){s.uid=t,r(O,t)}function we(){return p.context}var He,ze={version:"1.3.9",setUser:je,hookApp:Wt,hookPage:qe,hookComponent:Ne,request:Fe,getContext:we},Be=["success","fail"],Ye=[],Ge={requestPayment:{fail:function(){var t=arguments&&arguments[0],e="fail";return e=t&&v(t)&&"requestPayment:fail cancel"===t.errMsg?"cancel":e}}};function Ke(){(He=nt.hookApis||e()).forEach(function(t){-1<Ye.indexOf(t)||"request"===t||Ye.push(t)})}function Ue(t){return{apiId:t.apiId,type:j,name:t.name,success:t.success||0,fail:t.fail||0,cancel:t.cancel||0,start:t.start,end:t.end,duration:0<t.end-t.start?t.end-t.start:0,count:1,failMessage:t.failMessage||"",cid:t.cid}}function Je(t,e){var n;t.context||(n="".concat(t.name,"-").concat(t.apiId),t.context=new le({parent:e,name:n,type:j,data:t.data}))}function Ve(a){var r=i[a];return function(){var t=arguments[0]||{},e=p.context,n={apiId:++At.apiId,name:a,data:{}};return Je(n,e),n.context&&(n.cid=n.context.id),Be.forEach(function(e){t[e]=Te(q(t[e],function(){var t;n.end||(n.end=l()),be(n),(t=Ge[a]&&Ge[a][e]&&g(Ge[a][e])?Ge[a][e].apply(this,arguments):e)&&(n[t]=1),"fail"===t&&(t=arguments&&arguments[0],n.failMessage=_(t,nt.apiFailMessageSize))}))}),t.complete=Te(S(t.complete,function(){n.end||(n.end=l()),be(n)},function(){Object.assign(n.data,Ue(n)),n.context&&(n.context.dataComposed=!0),xe()})),e&&(e.updateRemain(1,j),e.apis.push(n.data)),n.start=l(),r.apply(this,arguments)}}function Xe(t){t&&i[t]&&Object.defineProperty(i,t,{configurable:!0,enumerable:!0,writable:!0,value:Ve(t)})}function Qe(){He||Ke();var e={};return Ye.forEach(function(t){e[t]=Ve(t)}),e}function We(){He||Ke(),Ye.forEach(function(t){Xe(t)})}function Ze(t){t&&!Jt()||(Zt(),Se(),Me(),Pe(),We()),t&&Object.assign(ze,Qe()||{})}function $e(t){it()||(rt(t||{}),ot(!0),St(),t=!0,Ze(t=null!=nt.plugin?nt.plugin:t))}function tn(){return ze.config=$e,ze}i.onNetworkStatusChange(function(t){s.networkType=t.networkType});var en=tn();module.exports=en;