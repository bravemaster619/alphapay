import https from "https";
import crypto from "crypto";
import { QRCode } from "./types/qrcode";
import { OnlinePay } from "./types/online-pay";
import { getRandomString } from "./helper/helper";
import { JSAPI } from "./types/jsapi";
import { NativeJSAPI } from "./types/native-jsapi";
import { H5 } from "./types/h5";
import { SDK } from "./types/sdk";
import { Miniprogram } from "./types/miniprogram";
import { Retail } from "./types/retail";
import { Common } from "./types/common";

export default class Alphapay {

  constructor(private partnerCode: string, private credentialCode: string) {
    
  }

  /**
   * Sign messages are required in each request for validation.
   * Sign parameters are all attached to URL as query params, and the order is irrelevant.
   * 
   */
  getSignString() {
    const nonce = getRandomString();
    const time = `${(new Date()).getTime()}`;
    const validString = [
      this.partnerCode,
      time,
      nonce,
      this.credentialCode
    ].join("&");
    const sign = crypto.createHash('sha256').update(validString).digest('hex').toLowerCase();
    return `?time=${time}&nonce_str=${nonce}&sign=${sign}`;
  }

  /**
   * QR Code Payment is used for webpage/application on PC or mobile. Customers use WeChat,
   *  Alipay or UnionPay app to scan the QR Code generated when creating order and finish the payment.
   */
  createQRCodePayment(orderId: String, data: QRCode.CreatePayment.RequestInterface): Promise<QRCode.CreatePayment.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * This page must be called after the payment order has been created.
   * When jumping to redirect Page, it is recommended to call 
   * the Order Query API to make sure the payment has succeeded.
   */
  getQRCodePaymentPageUrl(orderId: string, redirect: string): string {
    return `https://pay.alphapay.ca/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}/pay${this.getSignString()}&redirect=${encodeURIComponent(redirect)}`;
  }

  /**
   * Use for UnionPay and Alipay Payment in PC Website.
   * After creating the order, redirect to the pay_url
   * returned and attach sign params and redirect param.
   * Then enter the UnionPay/Alipay page to finish the payment.
   * Only available for UnionPay and Alipay channel.
   */
  createOnlinePayment(orderId: string, data: OnlinePay.RequestInterface): Promise<OnlinePay.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/web_gateway/partners/${this.partnerCode}/orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * JSAPI Payment is used to pay on the webpage which was opened in WeChat or Alipay app. If customers enter this
   * page from WeChat Official Account, this Official Account is required to be authorized. Customers will jump to 
   * AlphaPay order page and call WeChat or Alipay Payment Board to finish payment.
   */
  createJSAPIPayment(orderId: string, data: JSAPI.CreatePayment.RequestInterface): Promise<JSAPI.CreatePayment.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/jsapi_gateway/partners/${this.partnerCode}/orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * This page must be called after the payment order has been created. 
   * The actual URL shall be referencing to pay_url param from order creation. 
   * When jumping to the redirect page, it is recommended to call the Order Query API 
   * to make sure the payment has succeeded.
   */
  getWechatJSAPIPaymentPageUrl(orderId: string, redirect: string, directpay: boolean = false) {
    return `https://pay.alphapay.ca/api/v1.0/wechat_jsapi_gateway/partners/${this.partnerCode}_order_${orderId}${this.getSignString()}&directpay=${directpay}&redirect=${redirect}`;
  }

  /**
   * This page must be called after the payment order has been created. 
   * The actual URL shall be referencing to pay_url param from order creation. 
   * When jumping to the redirect page, it is recommended to call the Order Query API 
   * to make sure the payment has succeeded.
   */
  getAlipayJSAPIPaymentPageUrl(orderId: string, redirect: string, directpay: boolean = false) {
    return `https://pay.alphapay.ca/api/v1.0/gateway/alipay/partners/${this.partnerCode}/orders/${orderId}/app_pay${this.getSignString()}&directpay=${directpay}&redirect=${redirect}`;
  }

  /**
   * You need to complete the principal authentication and bind the appid 
   * through AlphaPay before you can use the Native JSAPI. 
   * JSAPI parameters that use to initiate JSAPI can be returned directly 
   * when you use Native JSAPI. When you create an order through the AlphaPay platform, 
   * you can directly initiate payment through the official JS SDK.
   */
  createNativeJSAPIPayment(orderId: string, data: NativeJSAPI.RequestInterface): Promise<NativeJSAPI.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/native_jsapi/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * Warning：WeChat Pay does not support H5 Payment. 
   * H5 Payment is used for Mobile App or Mobile browser. 
   * The browser would redirect to a webpage from UnionPay/Alipay 
   * and call UnionPay/Alipay App to finish the payment.
   */
  createH5Payment(orderId: string, data: H5.CreatePayment.RequestInterface): Promise<H5.CreatePayment.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/h5_payment/partners/${this.partnerCode}/orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * This page must be called after the payment order has been created. When jumping to the redirect page,
   * it is recommended to call the Order Query API to make sure the payment has succeeded.
   */
  getH5PaymentPage(orderId: string, redirect: string): string {
    return `https://pay.alphapay.ca/api/v1.0/h5_payment/partners/${this.partnerCode}/orders/${orderId}/pay${this.getSignString()}&redirect=${redirect}`;
  }

  /**
   * Used for mobile Apps calling WeChat/Alipay/UnionPay payment with 
   * WeChat/Alipay/UnionPay SDK. Call this API to create order and get a param string.
   * Call SDK API with the param to start payment and get payment results from 
   * WeChat/Alipay/UnionPay app. It is recommended to call the Order Query API 
   * to make sure the payment has succeeded.
   */
  createSDKPayment(orderId: string, data: SDK.RequestInterface): Promise<SDK.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/app_orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * Use for WeChat or Alipay miniprogram payment. After creating order, get returned data and redirect param.
   */
  createMiniprogramPayment(orderId: string, data: Miniprogram.RequestInterface): Promise<Miniprogram.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/microapp_orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * Retail Passive Payment is used for cashier terminals that can scan Barcode or QR Code.
   * The cashier inputs the payment amount and asks customers for their payment code,
   * then the system sends price and payment code to the server and finishes the payment.
   * Retail Passive Payment now supports Alipay, WeChat, and UnionPay.
   */
  createRetailPassivePayment(orderId: string, data: Retail.Passive.RequestInterface): Promise<Retail.Passive.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/micropay/partners/${this.partnerCode}/orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * Retail Active Payment is used for cashier terminals which cannot scan Barcode or QR Code.
   * Get the code URL after creating the order, convert this URL to a QR Code 
   * and ask customers to use their app to scan this QR Code then finish the payment.
   * Retail Active Payment now support Alipay, WeChat.
   */
  createRetailAcitvePayment(orderId: string, data: Retail.Active.RequestInterface): Promise<Retail.Active.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/retail_qrcode/partners/${this.partnerCode}/orders/${orderId}${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, data);
  }

  /**
   * Get the current exchange rate from CAD to CNY provided by WeChat(CAD 1=CNY ?) and Alipay(CAD 1=CNY ?).
   * This exchange rate shown is for reference only, please refer to the real-time exchange rate
   * when processing the actual transaction.
   */
  getCurrentExchangeRate(): Promise<Common.ExchangeRate.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/channel_exchange_rate${this.getSignString()}`,
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
  }

  /**
   * Including QR Code orders, JSAPI orders and Retail orders.
   */

  getOrderStatus(orderId: string): Promise<Common.OrderStatus.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}/${this.getSignString()}`,
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
  }

  /**
   * One payment order can create more than one refund order.
   * The total amount of all refund orders must be less than or equal to the actual paid amount,
   * and the currency of the refund order is the same as the payment order.
   */
  applyRefund(orderId: string, refundId: string): Promise<Common.ApplyRefund.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}/refunds/${refundId}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  getRefundStatus(orderId: string, refundId: string): Promise<Common.RefundOrderStatus.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}/refunds/${refundId}`,
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
  }

  getOrders(date?: string, status?: string, page?: number, limit?: number): Promise<Common.CheckOrders.ResponseType> {
    let path = `/api/v1.0/gateway/partners/${this.partnerCode}/orders${this.getSignString()}`;
    const queryParam = { date, status, page, limit };
    for (var key in queryParam) {
      if (queryParam[key]) {
        path += `&${key}=${queryParam[key]}`;
      }
    }
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  getTransactions(date: string): Promise<Common.DailyTransactions.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/transactions${this.getSignString()}&date=${date}`,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  getSettlements(date: string): Promise<Common.Settlement.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/settlements${this.getSignString()}&date=${date}`,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  suspendSettlement(orderId: string): Promise<Common.SuspendSettlement.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}/settle_lock${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  releaseSuspendSettlement(orderId: string): Promise<Common.ReleaseSuspendedSettlement.ResponseType> {
    return this.sendRequest({
      hostname: "pay.alphapay.ca",
      port: 443,
      path: `/api/v1.0/gateway/partners/${this.partnerCode}/orders/${orderId}/release_settle_lock${this.getSignString()}`,
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  protected sendRequest(option: https.RequestOptions, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let response = "";
      const req = https.request(option, (res) => {
        res.on("data", (d) => {
          response += d;
        });
        res.on("end", () => {
          resolve(JSON.parse(response));
        });
      });
      req.on('error', (e) => {
        reject(e);
      });
      if (data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    });
  }
}