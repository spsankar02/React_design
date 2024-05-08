import axios from "axios";

const BILLING_API_BASE_URL = "http://localhost:8080/api/v1";

const BillingService={
    createBilling:function(billing) {
        return axios.post(BILLING_API_BASE_URL +"/createuser", billing);
      } 
}
export default BillingService