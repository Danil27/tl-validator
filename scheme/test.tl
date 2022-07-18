---types---

boolFalse#bc799737 = Bool;
boolTru1e#997275b5 = Bool;
//123123
true#3fedd339 = True;

error#c4b9f9bb code:int text:string = Error;

null#56730bcc = Null;

inputPeerEmpty#7f3b18ea = InputPeer;
inputPeerSelf#7da07ec9 = InputPeer;

---functions---

auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
/*auth.signUp#1b067634 phone_number:string phone_code_hash:string phone_code:string first_name:string last_name:string = auth.Authorization;*/
auth.signIn#bcd51581 phone_number:string phone_code_hash:string phone_code:string = auth.Authorization;
auth.logOut#5717da40 = Bool;
/*auth.resetAuthorizations#9fab0d1a = Bool;
auth.logOut#5717da40 = Bool;
auth.resetAuthorizations#9fab0d1a = Bool;auth.logOut#5717da40 = Bool;
auth.resetAuthorizations#9fab0d1a = Bool;*/