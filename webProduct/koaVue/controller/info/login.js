let user =  require("./model/user.js");
const loginController = {
      
      login(name, password){
         if(name === "王根基" && password === 123456){
            return user;
         } 
      }
}