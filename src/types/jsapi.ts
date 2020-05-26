import { CurrencyType, ChannelType } from "./global";

export namespace JSAPI {
  export namespace CreatePayment {
    export interface RequestInterface {
      description: string,
      price: number,
      currency?: CurrencyType,
      operator?: string,
      channel?: ChannelType.ALIPAY | ChannelType.WECHAT,
      notify_url?: string,
    }
    export enum ResultCodeType {
      SUCCESS,
      EXISTS
    }
    export enum ErrorCodeType {
      ORDER_MISMATCH,
      ORDER_PAID,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface SuccessResponseInterface {
      partner_order_id: string;
      full_name: string;
      partner_name: string;
      channel: string;
      result_code: ResultCodeType,
      partner_code: string;
      order_id: string;
      return_code: ResultCodeType;
      pay_url: string;
    }
    export interface ErrorResponseInterface {
      return_code: string;
      return_msg: string;
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace PaymentPage {
    export enum ErrorCodeType {
      ORDER_NOT_EXIST,
      ORDER_MISMATCH,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface ErrorResponseInterface {
      return_code: ErrorCodeType,
      return_msg: string
    }
  }
}