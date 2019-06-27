class user{
    
    constructor(){
        this._id = 0;
        this._name = "王根基";
        this._password = "123456";
        this._adress = "长沙";
    }

    get name(){
        return this._name;
    }

    set name(val){
        this._name = val;
    }

    get id(){
        return this._id;
    }

    set id(val){
        this._id = val;
    }

    get adress(){
        return this._adress;
    }

    set adress(val){
        this._adress = val;
    }

    get password(){
        return this._password;
    }

    set password(val){
        this._adr_passwordess = val;
    }

}

moudule.exports = user;