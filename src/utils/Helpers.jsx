export const userAuthentication = () => {
    let token = sessionStorage.getItem("token");
    if(token){
        return true;
    }else{
        return false;
    }
}