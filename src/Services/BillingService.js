import axios from "axios";

const BILLING_API_BASE_URL = "http://localhost:8080/api/v1";

const BillingService = {
  createBilling: function (billing) {
    return axios.post(BILLING_API_BASE_URL + "/createuser", billing);
  },

  getalluser: function () {
    return axios.get(BILLING_API_BASE_URL + "/getalluserslist");
  },

  getuserbyid: function (id) {
    return axios.get(BILLING_API_BASE_URL + "/getuserbyid/" + id)
  },

  deleteuser: function (data) {
    return axios.post(BILLING_API_BASE_URL + "/deleteuser/", data)
  },

  updateuser: function (user) {
    return axios.post(BILLING_API_BASE_URL + "/updateuser/" ,user)
  },

  createproduct: function(data){
    return axios.post(BILLING_API_BASE_URL+"/addproductdetails",data)
  },

  getallproduct: function(){
    return axios.get(BILLING_API_BASE_URL+"/retrieveproductdetails")
  },
  deleteproduct: function(data){
    return axios.post(BILLING_API_BASE_URL+"/deleteproductdetails/",data)
  },
  getProductById: function(data){
    return axios.get(BILLING_API_BASE_URL+"/getproductbyid/"+data)
  },
  updateproduct: function(data){
    return axios.post(BILLING_API_BASE_URL+"/updateproductdetails/",data)
  },
  createinvoice: function(data){
    return axios.post(BILLING_API_BASE_URL+"/createinvoice/",data)
  },
  getallinvoice: function(){
    return axios.get(BILLING_API_BASE_URL+"/retrieveinvoicedetails")
  }
}
export default BillingService