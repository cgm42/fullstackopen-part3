(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(2),c=t.n(a),o=t(14),i=t.n(o),r=(t(19),t(3)),u=t(0),s=function(e){var n=e.person,t=e.handleDelButton;e.key;return Object(u.jsxs)("div",{children:[n.name," ",n.number,Object(u.jsx)("button",{value:n.name,"data-mssg":n.id,onClick:t,children:"delete"})]})},l=function(e){var n=e.addPerson,t=e.name,a=e.handleNumberChange,c=e.newNumber,o=e.handleNameChange;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:t,onChange:o}),"number: ",Object(u.jsx)("input",{value:c,onChange:a})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.newFilter,t=e.handleFilter;return Object(u.jsxs)("div",{children:["filter shown with",Object(u.jsx)("input",{value:n,onChange:t})]})},b=t(4),j=t.n(b),h=function(e){var n=e.notification;return null===n?null:Object(u.jsx)("div",{className:"notification",children:n})},f=function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),i=Object(r.a)(o,2),b=i[0],f=i[1],m=Object(a.useState)(""),O=Object(r.a)(m,2),p=O[0],v=O[1],x=Object(a.useState)(""),g=Object(r.a)(x,2),w=g[0],C=g[1],k=Object(a.useState)(!1),N=Object(r.a)(k,2),S=N[0],y=N[1],F=Object(a.useState)(null),D=Object(r.a)(F,2),T=D[0],B=D[1];Object(a.useEffect)((function(){j.a.get("/api/persons").then((function(e){console.log("response :>> ",e),c(e.data),y(!1)}))}),[S]),console.log("newFilter :>> ",w);var P=function(e){window.confirm("Delete ".concat(e.target.value,"?"))&&j.a.delete("/".concat(e.target.dataset.mssg)).then((function(e){console.log("response :>> ",e),y(!0)})).catch((function(n){B("".concat(e.target.value," is already deleted from the database :(")),setTimeout((function(){B(null)}),5e3),f(""),v("")}))},E=w?t.filter((function(e){return!!e.name.toLowerCase().includes(w.toLowerCase())})):t;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(h,{notification:T}),Object(u.jsx)(d,{handleFilter:function(e){C(e.target.value)},newFilter:w}),Object(u.jsx)("h3",{children:"add a new"}),Object(u.jsx)(l,{addPerson:function(e){if(e.preventDefault(),t.find((function(e){return e.name===b}))){window.confirm("".concat(b," is already added to phonebook,replace the old number with a new one?"));var n=t.filter((function(e){return e.name===b}))[0].id,a={name:b,number:p};j.a.put("/".concat(n),a).then((function(e){c(t.map((function(t){return t.id!==n?t:e.data}))),f(""),v(""),B("Updated ".concat(a.name)),setTimeout((function(){B(null)}),5e3)})).catch((function(e){B("".concat(a.name," is already deleted from the database :(")),setTimeout((function(){B(null)}),5e3),f(""),v("")}))}else{var o={name:b,number:p};j.a.post("/api/persons",o).then((function(e){c(t.concat(o)),f(""),v(""),B("Added ".concat(o.name)),setTimeout((function(){B(null)}),5e3)}))}},name:b,handleNameChange:function(e){f(e.target.value)},newNumber:p,handleNumberChange:function(e){v(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),E.map((function(e,n){return Object(u.jsx)(s,{person:e,handleDelButton:P},n)}))]})};i.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(f,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.e0b0e729.chunk.js.map