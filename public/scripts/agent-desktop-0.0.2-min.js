Uint8Array.prototype.slice||Object.defineProperty(Uint8Array.prototype,"slice",{value:function(e,t){return new Uint8Array(Array.prototype.slice.call(this,e,t))}});var CreateAgentRemoteDesktop=function(e,t){var g={},p=("string"==typeof(g.CanvasId=e)&&(g.CanvasId=Q(e)),g.Canvas=g.CanvasId.getContext("2d"),g.scrolldiv=t,g.State=0,g.PendingOperations=[],g.tilesReceived=0,g.TilesDrawn=0,g.KillDraw=0,g.ipad=!1,g.tabletKeyboardVisible=!1,g.LastX=0,g.LastY=0,g.touchenabled=0,g.submenuoffset=0,g.touchtimer=null,g.TouchArray={},g.connectmode=0,g.connectioncount=0,g.rotation=0,g.protocol=2,g.debugmode=0,g.firstUpKeys=[],g.stopInput=!1,g.localKeyMap=!0,g.remoteKeyMap=!1,g.pressedKeys=[],g.sessionid=0,g.oldie=!1,g.ImageType=1,g.CompressionLevel=50,g.ScalingLevel=1024,g.FrameRateTimer=100,g.SwapMouse=!1,g.UseExtendedKeyFlag=!0,g.FirstDraw=!1,g.onRemoteInputLockChanged=null,g.RemoteInputLock=null,g.onKeyboardStateChanged=null,g.KeyboardState=0,g.ScreenWidth=960,g.ScreenHeight=701,g.width=960,g.height=960,g.displays=null,g.selectedDisplay=null,g.onScreenSizeChange=null,g.onMessage=null,g.onConnectCountChanged=null,g.onDebugMessage=null,g.onTouchEnabledChanged=null,g.onDisplayinfo=null,!(g.accumulator=null)),S="default",v=(g.mouseCursorActive=function(e){p!=e&&(p=e,g.CanvasId.style.cursor=1==e?S:"default")},["default","progress","crosshair","pointer","help","text","no-drop","move","nesw-resize","ns-resize","nwse-resize","w-resize","alias","wait","none","not-allowed","col-resize","row-resize","copy","zoom-in","zoom-out"]),a=(g.Start=function(){g.State=0,g.accumulator=null},g.Stop=function(){g.setRotation(0),g.UnGrabKeyInput(),g.UnGrabMouseInput(),g.touchenabled=0,null!=g.onScreenSizeChange&&g.onScreenSizeChange(g,g.ScreenWidth,g.ScreenHeight,g.CanvasId),g.Canvas.clearRect(0,0,g.CanvasId.width,g.CanvasId.height)},g.xxStateChange=function(e){g.State!=e&&(g.State=e,g.CanvasId.style.cursor="default",0===e)&&g.Stop()},g.send=function(e){2<g.debugmode&&console.log("KSend("+e.length+"): "+rstr2hex(e)),null!=g.parent&&g.parent.send(e)},g.ProcessPictureMsg=function(e,t,n){for(var o=new Image,a=(o.xcount=g.tilesReceived++,g.tilesReceived),r=e.slice(4),s=0,i=[];5e4<r.byteLength-s;)i.push(String.fromCharCode.apply(null,r.slice(s,s+5e4))),s+=5e4;i.push(0<s?String.fromCharCode.apply(null,r.slice(s)):String.fromCharCode.apply(null,r)),o.src="data:image/jpeg;base64,"+btoa(i.join("")),o.onload=function(){if(null!=g.Canvas&&g.KillDraw<a&&0!=g.State)for(g.PendingOperations.push([a,2,o,t,n]);g.DoPendingOperations(););else g.PendingOperations.push([a,0])},o.error=function(){console.log("DecodeTileError")}},g.DoPendingOperations=function(){if(0!=g.PendingOperations.length){for(var e=0;e<g.PendingOperations.length;e++){var t=g.PendingOperations[e];if(t[0]==g.TilesDrawn+1)return null!=g.onPreDrawImage&&g.onPreDrawImage(),1==t[1]?g.ProcessCopyRectMsg(t[2]):2==t[1]&&(g.Canvas.drawImage(t[2],g.rotX(t[3],t[4]),g.rotY(t[3],t[4])),delete t[2]),g.PendingOperations.splice(e,1),delete t,g.TilesDrawn++,g.TilesDrawn==g.tilesReceived&&g.KillDraw<g.TilesDrawn&&(g.KillDraw=g.TilesDrawn=g.tilesReceived=0),!0}g.oldie&&0<g.PendingOperations.length&&g.TilesDrawn++}return!1},g.ProcessCopyRectMsg=function(e){var t=((255&e.charCodeAt(0))<<8)+(255&e.charCodeAt(1)),n=((255&e.charCodeAt(2))<<8)+(255&e.charCodeAt(3)),o=((255&e.charCodeAt(4))<<8)+(255&e.charCodeAt(5)),a=((255&e.charCodeAt(6))<<8)+(255&e.charCodeAt(7)),r=((255&e.charCodeAt(8))<<8)+(255&e.charCodeAt(9)),e=((255&e.charCodeAt(10))<<8)+(255&e.charCodeAt(11));g.Canvas.drawImage(Canvas.canvas,t,n,r,e,o,a,r,e)},g.SendUnPause=function(){1<g.debugmode&&console.log("SendUnPause"),g.send(String.fromCharCode(0,8,0,5,0))},g.SendPause=function(){1<g.debugmode&&console.log("SendPause"),g.send(String.fromCharCode(0,8,0,5,1))},g.SendCompressionLevel=function(e,t,n,o){g.ImageType=e,t&&(g.CompressionLevel=t),n&&(g.ScalingLevel=n),o&&(g.FrameRateTimer=o),g.send(String.fromCharCode(0,5,0,10,e,g.CompressionLevel)+g.shortToStr(g.ScalingLevel)+g.shortToStr(g.FrameRateTimer))},g.SendRefresh=function(){g.send(String.fromCharCode(0,6,0,4))},g.ProcessScreenMsg=function(e,t){if(0<g.debugmode&&console.log("ScreenSize: "+e+" x "+t),g.ScreenWidth!=e||g.ScreenHeight!=t){for(g.Canvas.setTransform(1,0,0,1,0,0),g.rotation=0,g.FirstDraw=!0,g.ScreenWidth=g.width=e,g.ScreenHeight=g.height=t,g.KillDraw=g.tilesReceived;0<g.PendingOperations.length;)g.PendingOperations.shift();g.SendCompressionLevel(g.ImageType),g.SendUnPause(),g.SendRemoteInputLock(2),null!=g.onScreenSizeChange&&g.onScreenSizeChange(g,g.ScreenWidth,g.ScreenHeight,g.CanvasId)}},g.ProcessBinaryCommand=function(e,t,n){var o,a;switch(3!=e&&4!=e&&7!=e||(o=(n[4]<<8)+n[5],a=(n[6]<<8)+n[7]),2<g.debugmode&&console.log("CMD",e,t,o,a),null!=g.recordedData&&(65e3<t?g.recordedData.push(C(2,1,g.shortToStr(27)+g.shortToStr(8)+g.intToStr(t)+g.shortToStr(e)+g.shortToStr(0)+g.shortToStr(0)+g.shortToStr(0)+String.fromCharCode.apply(null,n))):g.recordedData.push(C(2,1,String.fromCharCode.apply(null,n)))),e){case 3:g.FirstDraw&&g.onResize(),g.ProcessPictureMsg(n.slice(4),o,a);break;case 7:g.ProcessScreenMsg(o,a),g.SendKeyMsgKC(g.KeyAction.UP,16),g.SendKeyMsgKC(g.KeyAction.UP,17),g.SendKeyMsgKC(g.KeyAction.UP,18),g.SendKeyMsgKC(g.KeyAction.UP,91),g.SendKeyMsgKC(g.KeyAction.UP,92),g.SendKeyMsgKC(g.KeyAction.UP,16),g.send(String.fromCharCode(0,14,0,4));break;case 11:var r=0,s={},i=(n[4]<<8)+n[5];if(0<i)for(var r=(n[6+2*i]<<8)+n[7+2*i],c=0;c<i;c++){var u=(n[6+2*c]<<8)+n[7+2*c];s[u]=65535==u?"All Displays":"Display "+u}g.displays=s,g.selectedDisplay=r,null!=g.onDisplayinfo&&g.onDisplayinfo(g,s,r);break;case 12:break;case 14:g.touchenabled=1,g.TouchArray={},null!=g.onTouchEnabledChanged&&g.onTouchEnabledChanged(g.touchenabled);break;case 15:g.TouchArray={};break;case 17:var d=String.fromCharCode.apply(null,n.slice(4));console.log("Got KVM Message: "+d),null!=g.onMessage&&g.onMessage(d,g);break;case 18:5==t&&g.KeyboardState!=n[4]&&(g.KeyboardState=n[4],g.onKeyboardStateChanged&&g.onKeyboardStateChanged(g,g.KeyboardState),console.log("MNG_KVM_KEYSTATE:"+(1&g.KeyboardState?" NumLock":"")+(2&g.KeyboardState?" ScrollLock":"")+(4&g.KeyboardState?" CapsLock":"")));break;case 65:"."!=(d=String.fromCharCode.apply(null,n.slice(4)))[0]?(console.log(d),g.parent&&g.parent.setConsoleMessage&&g.parent.setConsoleMessage(d)):console.log("KVM: "+d.substring(1));break;case 82:if(!(t<4||(t-4)%10!=0))for(var l=(t-4)/10,h=4,c=0;c<l;c++)(n[h+0]<<8)+n[h+1],{x:(n[h+2]<<8)+n[h+3],y:(n[h+4]<<8)+n[h+5],w:(n[h+6]<<8)+n[h+7],h:(n[h+8]<<8)+n[h+9]},h+=10;break;case 87:5!=t||null!=g.RemoteInputLock&&g.RemoteInputLock===(0!=n[4])||(g.RemoteInputLock=0!=n[4],g.onRemoteInputLockChanged&&g.onRemoteInputLockChanged(g,g.RemoteInputLock));break;case 88:5!=t||g.stopInput||(r=n[4],S=v[r=v.length<r?0:r],p&&(g.CanvasId.style.cursor=S));break;default:console.log("Unknown command",e,t)}},g.MouseButton={NONE:0,LEFT:2,RIGHT:8,MIDDLE:32},g.KeyAction={NONE:0,DOWN:1,UP:2,SCROLL:3,EXUP:4,EXDOWN:5,DBLCLICK:6},g.InputType={KEY:1,MOUSE:2,CTRLALTDEL:10,TOUCH:15,KEYUNICODE:85},g.Alternate=0,{Pause:19,CapsLock:20,Space:32,Quote:222,Minus:189,NumpadMultiply:106,NumpadAdd:107,PrintScreen:44,Comma:188,NumpadSubtract:109,NumpadDecimal:110,Period:190,Slash:191,NumpadDivide:111,Semicolon:186,Equal:187,OSLeft:91,BracketLeft:219,OSRight:91,Backslash:220,BracketRight:221,ContextMenu:93,Backquote:192,NumLock:144,ScrollLock:145,Backspace:8,Tab:9,Enter:13,NumpadEnter:13,Escape:27,Delete:46,Home:36,PageUp:33,PageDown:34,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40,End:35,Insert:45,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,ShiftLeft:16,ShiftRight:16,ControlLeft:17,ControlRight:17,AltLeft:18,AltRight:18,MetaLeft:91,MetaRight:92,VolumeMute:181});var r=["ShiftRight","AltRight","ControlRight","Home","End","Insert","Delete","PageUp","PageDown","NumpadDivide","NumpadEnter","NumLock","Pause"];function C(e,t,n){var o=Date.now();return"number"==typeof n?(g.recordedSize+=n,g.shortToStr(e)+g.shortToStr(t)+g.intToStr(n)+g.intToStr(o>>32)+g.intToStr(32&o)):(g.recordedSize+=n.length,g.shortToStr(e)+g.shortToStr(t)+g.intToStr(n.length)+g.intToStr(o>>32)+g.intToStr(32&o)+n)}return g.SendKeyMsg=function(e,t){var n,o;null!=e&&(t=t||window.event,n=!1,0==(n=(g.UseExtendedKeyFlag||1==urlargs.extkeys)&&"string"==typeof t.code&&(t.code.startsWith("Arrow")||0<=r.indexOf(t.code))?!0:n)&&t.code&&0==t.code.startsWith("NumPad")&&0==g.localKeyMap?null!=(o=(o=t).code.startsWith("Key")&&4==o.code.length?o.code.charCodeAt(3):o.code.startsWith("Digit")&&6==o.code.length?o.code.charCodeAt(5):o.code.startsWith("Numpad")&&7==o.code.length?o.code.charCodeAt(6)+48:a[o.code])&&g.SendKeyMsgKC(e,o,n):(59==(o=t.keyCode)?o=186:173==o?o=189:61==o&&(o=187),g.SendKeyMsgKC(e,o,n)))},g.SendRemoteInputLock=function(e){g.send(String.fromCharCode(0,87,0,5,e))},g.SendMessage=function(e){3==g.State&&g.send(String.fromCharCode(0,17)+g.shortToStr(4+e.length)+e)},g.SendKeyMsgKC=function(e,t,n){if(3==g.State)if("object"==typeof e)for(var o in e)g.SendKeyMsgKC(e[o][0],e[o][1],e[o][2]);else{1==e?-1==g.pressedKeys.indexOf(t)&&g.pressedKeys.unshift(t):2==e&&-1!=(o=g.pressedKeys.indexOf(t))&&g.pressedKeys.splice(o,1),0<g.debugmode&&console.log("Sending Key "+t+", action "+e);var a=e-1;n&&(a=1==a?3:4),g.send(String.fromCharCode(0,g.InputType.KEY,0,6,a,t))}},g.SendStringUnicode=function(e){if(3==g.State)for(var t=0;t<e.length;t++)g.send(String.fromCharCode(0,g.InputType.KEYUNICODE,0,7,0)+ShortToStr(e.charCodeAt(t))),g.send(String.fromCharCode(0,g.InputType.KEYUNICODE,0,7,1)+ShortToStr(e.charCodeAt(t)))},g.SendKeyUnicode=function(e,t){3==g.State&&(0<g.debugmode&&console.log("Sending UnicodeKey "+t),g.send(String.fromCharCode(0,g.InputType.KEYUNICODE,0,7,e-1)+ShortToStr(t)))},g.sendcad=function(){g.SendCtrlAltDelMsg()},g.SendCtrlAltDelMsg=function(){3==g.State&&g.send(String.fromCharCode(0,g.InputType.CTRLALTDEL,0,4))},g.SendEscKey=function(){3==g.State&&g.send(String.fromCharCode(0,g.InputType.KEY,0,6,0,27,0,g.InputType.KEY,0,6,1,27))},g.SendStartMsg=function(){g.SendKeyMsgKC(g.KeyAction.EXDOWN,91),g.SendKeyMsgKC(g.KeyAction.EXUP,91)},g.SendCharmsMsg=function(){g.SendKeyMsgKC(g.KeyAction.EXDOWN,91),g.SendKeyMsgKC(g.KeyAction.DOWN,67),g.SendKeyMsgKC(g.KeyAction.UP,67),g.SendKeyMsgKC(g.KeyAction.EXUP,91)},g.SendTouchMsg1=function(e,t,n,o){3==g.State&&g.send(String.fromCharCode(0,g.InputType.TOUCH)+g.shortToStr(14)+String.fromCharCode(1,e)+g.intToStr(t)+g.shortToStr(n)+g.shortToStr(o))},g.SendTouchMsg2=function(e,t){var n,o,a="";for(o in g.TouchArray)o==e?n=t:1==g.TouchArray[o].f?(n=65542,g.TouchArray[o].f=3,0):2==g.TouchArray[o].f?(n=262144,0):n=131078,a+=String.fromCharCode(o)+g.intToStr(n)+g.shortToStr(g.TouchArray[o].x)+g.shortToStr(g.TouchArray[o].y),2==g.TouchArray[o].f&&delete g.TouchArray[o];3==g.State&&g.send(String.fromCharCode(0,g.InputType.TOUCH)+g.shortToStr(5+a.length)+String.fromCharCode(2)+a),0==Object.keys(g.TouchArray).length&&null!=g.touchtimer&&(clearInterval(g.touchtimer),g.touchtimer=null)},g.SendMouseMsg=function(e,t){var n,o,a,r,s,i;3==g.State&&null!=e&&null!=g.Canvas&&(t=t||window.event,a=g.Canvas.canvas.height/g.CanvasId.clientHeight,n=g.Canvas.canvas.width/g.CanvasId.clientWidth,o=g.GetPositionOfControl(g.Canvas.canvas),n=(t.pageX-o[0])*n,o=(t.pageY-o[1])*a,t.addx&&(n+=t.addx),t.addy&&(o+=t.addy),0<=n)&&n<=g.Canvas.canvas.width&&0<=o&&o<=g.Canvas.canvas.height&&(r=a=0,e==g.KeyAction.UP||e==g.KeyAction.DOWN?t.which?a=1==t.which?g.MouseButton.LEFT:2==t.which?g.MouseButton.MIDDLE:g.MouseButton.RIGHT:t.button&&(a=0==t.button?g.MouseButton.LEFT:1==t.button?g.MouseButton.MIDDLE:g.MouseButton.RIGHT):e==g.KeyAction.SCROLL&&(t.detail?r=120*t.detail*-1:t.wheelDelta&&(r=3*t.wheelDelta)),!0===g.SwapMouse&&(a==g.MouseButton.LEFT?a=g.MouseButton.RIGHT:a==g.MouseButton.RIGHT&&(a=g.MouseButton.LEFT)),g.ReverseMouseWheel&&(r*=-1),t="",t=e==g.KeyAction.DBLCLICK?String.fromCharCode(0,g.InputType.MOUSE,0,10,0,136,n/256&255,255&n,o/256&255,255&o):e==g.KeyAction.SCROLL?(i=r<(i=s=0)?(s=255-(Math.abs(r)>>8),255-(255&Math.abs(r))):(s=r>>8,255&r),String.fromCharCode(0,g.InputType.MOUSE,0,12,0,0,n/256&255,255&n,o/256&255,255&o,s,i)):String.fromCharCode(0,g.InputType.MOUSE,0,10,0,e==g.KeyAction.DOWN?a:2*a&255,n/256&255,255&n,o/256&255,255&o),g.Action==g.KeyAction.NONE?0==g.Alternate||g.ipad?(g.send(t),g.Alternate=1):g.Alternate=0:g.send(t))},g.GetDisplayNumbers=function(){g.send(String.fromCharCode(0,11,0,4))},g.SetDisplay=function(e){g.send(String.fromCharCode(0,12,0,6,e>>8,255&e))},g.intToStr=function(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,255&e)},g.shortToStr=function(e){return String.fromCharCode(e>>8&255,255&e)},g.onResize=function(){0==g.ScreenWidth||0==g.ScreenHeight||g.Canvas.canvas.width==g.ScreenWidth&&g.Canvas.canvas.height==g.ScreenHeight||(g.FirstDraw&&(g.Canvas.canvas.width=g.ScreenWidth,g.Canvas.canvas.height=g.ScreenHeight,g.Canvas.fillRect(0,0,g.ScreenWidth,g.ScreenHeight),null!=g.onScreenSizeChange)&&g.onScreenSizeChange(g,g.ScreenWidth,g.ScreenHeight,g.CanvasId),g.FirstDraw=!1,1<g.debugmode&&console.log("onResize: "+g.ScreenWidth+" x "+g.ScreenHeight))},g.xxMouseInputGrab=!1,g.xxKeyInputGrab=!1,g.xxMouseMove=function(e){return 3==g.State&&g.SendMouseMsg(g.KeyAction.NONE,e),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.xxMouseUp=function(e){return 3==g.State&&g.SendMouseMsg(g.KeyAction.UP,e),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.xxMouseDown=function(e){return 3==g.State&&g.SendMouseMsg(g.KeyAction.DOWN,e),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.xxMouseDblClick=function(e){return 3==g.State&&g.SendMouseMsg(g.KeyAction.DBLCLICK,e),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.xxDOMMouseScroll=function(e){return 3!=g.State||(g.SendMouseMsg(g.KeyAction.SCROLL,e),!1)},g.xxMouseWheel=function(e){return 3!=g.State||(g.SendMouseMsg(g.KeyAction.SCROLL,e),!1)},g.xxKeyUp=function(e){return"Dead"!=e.key&&3==g.State&&("string"==typeof e.key&&1==e.key.length&&1!=e.ctrlKey&&1!=e.altKey&&0==g.remoteKeyMap?g.SendKeyUnicode(g.KeyAction.UP,e.key.charCodeAt(0)):g.SendKeyMsg(g.KeyAction.UP,e)),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.xxKeyDown=function(e){if("Dead"!=e.key&&3==g.State&&("string"!=typeof e.key||1!=e.key.length||1==e.ctrlKey||1==e.altKey||0!=g.remoteKeyMap))return g.SendKeyMsg(g.KeyAction.DOWN,e),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.xxKeyPress=function(e){return"Dead"!=e.key&&3==g.State&&"string"==typeof e.key&&1==e.key.length&&1!=e.ctrlKey&&1!=e.altKey&&0==g.remoteKeyMap&&g.SendKeyUnicode(g.KeyAction.DOWN,e.key.charCodeAt(0)),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g.handleKeys=function(e){return 1!=g.stopInput&&3==desktop.State&&g.xxKeyPress(e)},g.handleKeyUp=function(e){var t;return 1!=g.stopInput&&3==desktop.State&&(g.firstUpKeys.length<5&&(g.firstUpKeys.push(e.keyCode),5!=g.firstUpKeys.length||"16,17,91,91,16"!=(t=g.firstUpKeys.join(","))&&"16,17,18,91,92"!=t||(g.stopInput=!0)),g.xxKeyUp(e))},g.handleKeyDown=function(e){return 1!=g.stopInput&&3==desktop.State&&g.xxKeyDown(e)},g.handleReleaseKeys=function(){var e,t=JSON.parse(JSON.stringify(g.pressedKeys));for(e in t)g.SendKeyMsgKC(g.KeyAction.UP,t[e])},g.mousedblclick=function(e){return 1!=g.stopInput&&g.xxMouseDblClick(e)},g.mousedown=function(e){return 1!=g.stopInput&&g.xxMouseDown(e)},g.mouseup=function(e){return 1!=g.stopInput&&g.xxMouseUp(e)},g.mousemove=function(e){return 1!=g.stopInput&&g.xxMouseMove(e)},g.mousewheel=function(e){return 1!=g.stopInput&&g.xxMouseWheel(e)},g.xxMsTouchEvent=function(e){var t,n,o,a;if(4!=e.originalEvent.pointerType)return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),"MSPointerDown"==e.type||"MSPointerMove"==e.type||"MSPointerUp"==e.type?(t=0,n=e.originalEvent.pointerId%256,o=e.offsetX*(Canvas.canvas.width/g.CanvasId.clientWidth),a=e.offsetY*(Canvas.canvas.height/g.CanvasId.clientHeight),"MSPointerDown"==e.type?t=65542:"MSPointerMove"==e.type?t=131078:"MSPointerUp"==e.type&&(t=262144),g.TouchArray[n]||(g.TouchArray[n]={x:o,y:a}),g.SendTouchMsg2(n,t),"MSPointerUp"==e.type&&delete g.TouchArray[n]):alert(e.type),!0},g.xxTouchStart=function(e){if(3==g.State)if(e.preventDefault&&e.preventDefault(),0==g.touchenabled||1==g.touchenabled){var t;1<e.originalEvent.touches.length||(t=e.originalEvent.touches[0],e.which=1,g.LastX=e.pageX=t.pageX,g.LastY=e.pageY=t.pageY,g.SendMouseMsg(KeyAction.DOWN,e))}else{var n,o,a=g.GetPositionOfControl(Canvas.canvas);for(n in e.originalEvent.changedTouches)e.originalEvent.changedTouches[n].identifier&&(o=e.originalEvent.changedTouches[n].identifier%256,g.TouchArray[o]||(g.TouchArray[o]={x:(e.originalEvent.touches[n].pageX-a[0])*(Canvas.canvas.width/g.CanvasId.clientWidth),y:(e.originalEvent.touches[n].pageY-a[1])*(Canvas.canvas.height/g.CanvasId.clientHeight),f:1}));0<Object.keys(g.TouchArray).length&&null==touchtimer&&(g.touchtimer=setInterval(function(){g.SendTouchMsg2(256,0)},50))}},g.xxTouchMove=function(e){if(3==g.State)if(e.preventDefault&&e.preventDefault(),0==g.touchenabled||1==g.touchenabled){var t;1<e.originalEvent.touches.length||(t=e.originalEvent.touches[0],e.which=1,g.LastX=e.pageX=t.pageX,g.LastY=e.pageY=t.pageY,g.SendMouseMsg(g.KeyAction.NONE,e))}else{var n,o,a=g.GetPositionOfControl(Canvas.canvas);for(n in e.originalEvent.changedTouches)e.originalEvent.changedTouches[n].identifier&&(o=e.originalEvent.changedTouches[n].identifier%256,g.TouchArray[o])&&(g.TouchArray[o].x=(e.originalEvent.touches[n].pageX-a[0])*(g.Canvas.canvas.width/g.CanvasId.clientWidth),g.TouchArray[o].y=(e.originalEvent.touches[n].pageY-a[1])*(g.Canvas.canvas.height/g.CanvasId.clientHeight))}},g.xxTouchEnd=function(e){if(3==g.State)if(e.preventDefault&&e.preventDefault(),0==g.touchenabled||1==g.touchenabled)1<e.originalEvent.touches.length||(e.which=1,e.pageX=LastX,e.pageY=LastY,g.SendMouseMsg(KeyAction.UP,e));else for(var t in e.originalEvent.changedTouches)e.originalEvent.changedTouches[t].identifier&&(t=e.originalEvent.changedTouches[t].identifier%256,g.TouchArray[t])&&(g.TouchArray[t].f=2)},g.GrabMouseInput=function(){var e;1!=g.xxMouseInputGrab&&((e=g.CanvasId).onmousemove=g.xxMouseMove,e.onmouseup=g.xxMouseUp,e.onmousedown=g.xxMouseDown,e.touchstart=g.xxTouchStart,e.touchmove=g.xxTouchMove,e.touchend=g.xxTouchEnd,e.MSPointerDown=g.xxMsTouchEvent,e.MSPointerMove=g.xxMsTouchEvent,e.MSPointerUp=g.xxMsTouchEvent,navigator.userAgent.match(/mozilla/i)?e.DOMMouseScroll=g.xxDOMMouseScroll:e.onmousewheel=g.xxMouseWheel,g.xxMouseInputGrab=!0)},g.UnGrabMouseInput=function(){var e;0!=g.xxMouseInputGrab&&((e=g.CanvasId).onmousemove=null,e.onmouseup=null,e.onmousedown=null,e.touchstart=null,e.touchmove=null,e.touchend=null,e.MSPointerDown=null,e.MSPointerMove=null,e.MSPointerUp=null,navigator.userAgent.match(/mozilla/i)?e.DOMMouseScroll=null:e.onmousewheel=null,g.xxMouseInputGrab=!1)},g.GrabKeyInput=function(){1!=g.xxKeyInputGrab&&(document.onkeyup=g.xxKeyUp,document.onkeydown=g.xxKeyDown,document.onkeypress=g.xxKeyPress,c,g.xxKeyInputGrab=!0)},g.UnGrabKeyInput=function(){0!=g.xxKeyInputGrab&&(document.onkeyup=null,document.onkeydown=null,document.onkeypress=null,g.xxKeyInputGrab=!1)},g.GetPositionOfControl=function(e){var t=Array(2);for(t[0]=t[1]=0;e;)t[0]+=e.offsetLeft,t[1]+=e.offsetTop,e=e.offsetParent;return t},g.crotX=function(e,t){return 0==g.rotation?e:1==g.rotation?t:2==g.rotation?g.Canvas.canvas.width-e:3==g.rotation?g.Canvas.canvas.height-t:void 0},g.crotY=function(e,t){return 0==g.rotation?t:1==g.rotation?g.Canvas.canvas.width-e:2==g.rotation?g.Canvas.canvas.height-t:3==g.rotation?e:void 0},g.rotX=function(e,t){return 0==g.rotation||1==g.rotation?e:2==g.rotation?e-g.Canvas.canvas.width:3==g.rotation?e-g.Canvas.canvas.height:void 0},g.rotY=function(e,t){return 0==g.rotation||3==g.rotation?t:1==g.rotation?t-g.Canvas.canvas.width:2==g.rotation?t-g.Canvas.canvas.height:void 0},g.tcanvas=null,g.setRotation=function(e){for(;e<0;)e+=4;var t,n,o,a=e%4;return a!=g.rotation&&(t=g.Canvas.canvas.width,n=g.Canvas.canvas.height,1!=g.rotation&&3!=g.rotation||(t=g.Canvas.canvas.height,n=g.Canvas.canvas.width),null==g.tcanvas&&(g.tcanvas=document.createElement("canvas")),(o=g.tcanvas.getContext("2d")).setTransform(1,0,0,1,0,0),o.canvas.width=t,o.canvas.height=n,o.rotate(-90*g.rotation*Math.PI/180),0==g.rotation&&o.drawImage(g.Canvas.canvas,0,0),1==g.rotation&&o.drawImage(g.Canvas.canvas,-g.Canvas.canvas.width,0),2==g.rotation&&o.drawImage(g.Canvas.canvas,-g.Canvas.canvas.width,-g.Canvas.canvas.height),3==g.rotation&&o.drawImage(g.Canvas.canvas,0,-g.Canvas.canvas.height),0!=g.rotation&&2!=g.rotation||(g.Canvas.canvas.height=t,g.Canvas.canvas.width=n),1!=g.rotation&&3!=g.rotation||(g.Canvas.canvas.height=n,g.Canvas.canvas.width=t),g.Canvas.setTransform(1,0,0,1,0,0),g.Canvas.rotate(90*a*Math.PI/180),g.rotation=a,g.Canvas.drawImage(g.tcanvas,g.rotX(0,0),g.rotY(0,0)),g.ScreenWidth=g.Canvas.canvas.width,g.ScreenHeight=g.Canvas.canvas.height,null!=g.onScreenSizeChange)&&(console.log("s4",g.ScreenWidth,g.ScreenHeight),g.onScreenSizeChange(g,g.ScreenWidth,g.ScreenHeight,g.CanvasId)),!0},g.StartRecording=function(){null==g.recordedData&&g.CanvasId.toBlob(function(e){var s=new FileReader;s.readAsArrayBuffer(e),s.onload=function(e){for(var t="",n=new Uint8Array(s.result),o=n.byteLength,a=0;a<o;a++)t+=String.fromCharCode(n[a]);g.recordedData=[],g.recordedStart=Date.now(),g.recordedSize=0,g.recordedData.push(C(1,0,JSON.stringify({magic:"MeshCentralRelaySession",ver:1,time:(new Date).toLocaleString(),protocol:2}))),g.recordedData.push(C(2,1,g.shortToStr(7)+g.shortToStr(8)+g.shortToStr(g.ScreenWidth)+g.shortToStr(g.ScreenHeight)));var r=8+t.length;65e3<r?g.recordedData.push(C(2,1,g.shortToStr(27)+g.shortToStr(8)+g.intToStr(r)+g.shortToStr(3)+g.shortToStr(0)+g.shortToStr(0)+g.shortToStr(0)+t)):g.recordedData.push(C(2,1,g.shortToStr(3)+g.shortToStr(r)+g.shortToStr(0)+g.shortToStr(0)+t))}})},g.StopRecording=function(){var e;if(null!=g.recordedData)return(e=g.recordedData).push(C(3,0,"MeshCentralMCREC")),delete g.recordedData,delete g.recordedStart,delete g.recordedSize,e},g.MuchTheSame=function(e,t){return Math.abs(e-t)<4},g.Debug=function(e){console.log(e)},g.getIEVersion=function(){var e,t=-1;return t="Microsoft Internet Explorer"==navigator.appName&&(e=navigator.userAgent,null!=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(e))?parseFloat(RegExp.$1):t},g.haltEvent=function(e){return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},g}