Object.defineProperty(e,"__esModule",{value:!0}),e.setSelectedContact=e.selectedContactSilce=e.default=void 0;var t=(0,r(d[0]).createSlice)({name:"selectedContactSilce",initialState:{contact:{ewalletId:null,username:null,image:null,name:null}},reducers:{setSelectedContact:function(t,l){var c,n,o,u,s;t.contact.ewalletId=null==(c=l.payload)?void 0:c.ewalletId,t.contact.username=null==(n=l.payload)?void 0:n.username,t.contact.image=null==(o=l.payload)?void 0:o.profileURL,t.contact.name=(null==(u=l.payload)?void 0:u.firstName)+" "+(null==(s=l.payload)?void 0:s.lastName)}}});e.selectedContactSilce=t;var l=t.actions.setSelectedContact;e.setSelectedContact=l;var c=t.reducer;e.default=c