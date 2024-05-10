import axios from "axios";

const BILLING_API_BASE_URL = "http://localhost:8080/api/v1";

const BillingService={
    createBilling:function(billing) {
        return axios.post(BILLING_API_BASE_URL +"/createuser", billing);
      } ,

    getalluser:function(){
      return axios.get(BILLING_API_BASE_URL +"/getalluserslist");
    },

    getuserbyid:function(id){
      return axios.get(BILLING_API_BASE_URL+"/getuserbyid/"+id)
    },

    deleteuser:function(data){
      return axios.post(BILLING_API_BASE_URL +"/deleteuser/", data)
    },

    updateuser:function(user,userid){
      return axios.post(BILLING_API_BASE_URL+"/updateuser/",userid,user)
    }
}
export default BillingService