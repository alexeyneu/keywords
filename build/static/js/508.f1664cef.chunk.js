(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[508],{80834:function(r,n,e){"use strict";e.r(n),e.d(n,{getED25519Key:function(){return i}});var a=e(93433),t=e(80889),f=e.n(t),c=e(40918).Buffer,o=f().lowlevel;function i(r){var n;n="string"===typeof r?c.from(r,"hex"):r;var e=new Uint8Array(64),t=[o.gf(),o.gf(),o.gf(),o.gf()],f=new Uint8Array([].concat((0,a.Z)(new Uint8Array(n)),(0,a.Z)(new Uint8Array(32)))),i=new Uint8Array(32);o.crypto_hash(e,f,32),e[0]&=248,e[31]&=127,e[31]|=64,o.scalarbase(t,e),o.pack(i,t);for(var p=0;p<32;p+=1)f[p+32]=i[p];return{sk:c.from(f),pk:c.from(i)}}},78848:function(){}}]);