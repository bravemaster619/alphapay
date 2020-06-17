import { expect } from "chai";
import Alphapay from "../alphapay";
import { QRCode } from "../types/qrcode";
import { getRandomString } from "../helper/helper";
import { CurrencyType, ChannelType, SystemType } from "../../src/types/global";
import { OnlinePay } from "../../src/types/online-pay";
import { JSAPI } from "../../src/types/jsapi";
import { NativeJSAPI } from "../../src/types/native-jsapi";
import { SDK } from "../../src/types/sdk";
import { Miniprogram } from "../../src/types/miniprogram";
import { Retail } from "../../src/types/retail";

let alphapay = new Alphapay("ZZZ6", "pQ5Jc9eoTcsxqPY5uQ3p2WmvSy0zEYeP");

describe("Alphapay", () => {
  describe("getSignatureUrl", () => {
    it("should generate a string", () => {
      const sign = alphapay.getSignatureUrl();
      expect(sign).to.be.a("string");
      expect(sign).to.be.not.empty;
    });
  });
  describe("createQRCodePayment", () => {
    it("should return correct response", async () => {
      const request: QRCode.CreatePayment.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "channel": ChannelType.WECHAT,
        "notify_url": "www.alphapay.com/success.php",
        "operator": "dev01"
      };
      const orderId = getRandomString();
      const response = await alphapay.createQRCodePayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getQRCodePaymentPageUrl", () => {
    it("should return url", () => {
      const pageUrl = alphapay.getQRCodePaymentPageUrl("ZZZ620200303140443", "http://localhost/AlphaPay_PHP/example/success.php?order_id=ZZZ620200303140443");
      expect(pageUrl).to.be.a("string");
      expect(pageUrl).to.be.not.empty;
    });
  });
  describe("createOnlinePayment", () => {
    it("should return correct response", async () => {
      const request: OnlinePay.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "channel": ChannelType.ALIPAY,
        "notify_url": "www.alphapay.com/success.php",
        "operator": "dev01"
      };
      const orderId = getRandomString();
      const response = await alphapay.createOnlinePayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("createJSAPIPayment", () => {
    it("should return correct response", async () => {
      const request: JSAPI.CreatePayment.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "channel": ChannelType.WECHAT,
        "notify_url": "www.alphapay.com/success.php",
        "operator": "dev01"
      };
      const orderId = getRandomString();
      const response = await alphapay.createJSAPIPayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getWechatJSAPIPaymentPageUrl", () => {
    it("should return url", () => {
      const pageUrl = alphapay.getWechatJSAPIPaymentPageUrl("ZZZ620200303133410", "https://www.alphapay.com/success", true);
      expect(pageUrl).to.be.a("string");
    });
  });
  describe("getAlipayJSAPIPaymentPageUrl", () => {
    it("should return url", () => {
      const pageUrl = alphapay.getAlipayJSAPIPaymentPageUrl("ZZZ620200303133410", "https://www.alphapay.com/success", true);
      expect(pageUrl).to.be.a("string");
    });
  });
  describe("createNativeJSAPIPayment", () => {
    it("should return correct response", async () => {
      const request: NativeJSAPI.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "operator": "dev01",
        "channel": ChannelType.ALIPAY,
        "customer_id": "2080000000000001",
        "notify_url": "www.alphapay.com/success.php",
      };
      const orderId = "ZZZ620200303133415";
      const response = await alphapay.createNativeJSAPIPayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getH5PaymentPage", () => {
    it("should return url", () => {
      const pageUrl = alphapay.getH5PaymentPage("ZZZ620200303170626", "https://www.alphapay.com/success");
      expect(pageUrl).to.be.a("string");
    });
  });
  describe("createSDKPayment", () => {
    it("should return correct response", async () => {
      const request: SDK.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "operator": "dev01",
        "channel": ChannelType.ALIPAY,
        "notify_url": "www.alphapay.com/success.php",
        "system": SystemType.ANDROID,
        "version": "1.0",
        "appid": "wx0000000000000001"
      };
      const orderId = "ZZZ620200304093950";
      const response = await alphapay.createSDKPayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("createMiniprogramPayment", () => {
    it("should return correct response", async () => {
      const request: Miniprogram.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "operator": "dev01",
        "channel": ChannelType.ALIPAY,
        "notify_url": "www.alphapay.com/success.php",
        "appid": "wx0000000000000001",
        "customer_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      };
      const orderId = "ZZZ620200304144418";
      const response = await alphapay.createMiniprogramPayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("createRetailPassivePayment", () => {
    it("should return correct response", async () => {
      const request: Retail.Passive.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "notify_url": "www.alphapay.com/success.php",
        "device_id": "00000000001",
        "auth_code": "000000000000000001"
      };
      const orderId = "ZZZ620200304151231";
      const response = await alphapay.createRetailPassivePayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("createRetailActivePayment", () => {
    it("should return correct response", async () => {
      const request: Retail.Active.RequestInterface = {
        "description": "DEVELOPER TEST",
        "price": 1,
        "currency": CurrencyType.CAD,
        "notify_url": "www.alphapay.com/success.php",
        "device_id": "00000000001",
        "operator": "dev01"
      };
      const orderId = "ZZZ620200304153159";
      const response = await alphapay.createRetailAcitvePayment(orderId, request);
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getCurrentExchangeRate", () => {
    it("should return correct response", async () => {
      const response = await alphapay.getCurrentExchangeRate();
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getOrderStatus", () => {
    it("should return correct response", async () => {
      const response = await alphapay.getOrderStatus("ZZZ620200304151231");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("applyRefund", () => {
    it("should return correct response", async () => {
      const response = await alphapay.applyRefund("ZZZ620200304151231", "ZZZ620200304151231");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getRefundStatus", () => {
    it("should return correct response", async () => {
      const response = await alphapay.getRefundStatus("ZZZ620200304151231", "ZZZ620200304151231");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getOrders", () => {
    it("should return correct response", async () => {
      const response = await alphapay.getOrders();
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getTransactions", () => {
    it("should return correct response", async () => {
      const response = await alphapay.getTransactions("2020-05-26");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("getSettlements", () => {
    it("should return correct response", async () => {
      const response = await alphapay.getSettlements("2020-05-26");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("suspendSettlement", () => {
    it("should return correct response", async () => {
      const response = await alphapay.suspendSettlement("ZZZ620200304151231");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe("releaseSuspendedSettlement", () => {
    it("should return correct response", async () => {
      const response = await alphapay.releaseSuspendSettlement("ZZZ620200304151231");
      expect(response).to.be.not.empty;
      expect(response.return_code).to.be.not.empty;
    });
  });
  describe('isNotificationValid', () => {
    it("should return true if notification is valid; false otherwise", () => {
      const signatureUrl = alphapay.getSignatureUrl();
      const time = signatureUrl.split("&")[0].replace("?time=", "");
      const nonce = signatureUrl.split("&")[1].replace("nonce_str=", "");
      const sign = signatureUrl.split("&")[2].replace("sign=", "");
      const notification = {
        time, nonce_str: nonce, sign
      };
      // @ts-ignore
      expect(alphapay.isNotificationValid(notification)).to.eq(true);
      let invalidNotification = {
        time: Number(time) - 1,
        nonce_str: nonce,
        sign
      };
      // @ts-ignore
      expect(alphapay.isNotificationValid(invalidNotification)).to.eq(false);
    });
  });
});