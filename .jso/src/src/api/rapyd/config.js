var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,l,u,s,o,f,c=t(r(d[1])),_=r(d[2]),v=null==(n=c.default.manifest)?void 0:null==(l=n.extra)?void 0:l.rapyd_access_key,y=null==(u=c.default.manifest)?void 0:null==(s=u.extra)?void 0:s.rapyd_secret_key,p="",b="",x={getSignature:function(t,n,l){p=(Math.floor((new Date).getTime()/1e3)-10).toString(),b=_.lib.WordArray.random(12);var u=(t||"")+(n||"")+b+p+v+y+(l||""),s=_.enc.Hex.stringify(_.HmacSHA256(u,y));return s=_.enc.Base64.stringify(_.enc.Utf8.parse(s)),{salt:b,timeStamp:p,signature:s}},base_uri:null==(o=c.default.manifest)?void 0:null==(f=o.extra)?void 0:f.rapyd_base_uri,access_key:v};e.default=x