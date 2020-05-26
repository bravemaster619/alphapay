import { CurrencyType, ChannelType } from "./global";

export namespace Retail {
  export namespace Passive {
    export interface RequestInterface {
      description: string,
      price: number,
      currency?: CurrencyType,
      notify_url?: string,
      device_id: string,
      auth_code: string
    }
    export enum ResultCodeType {
      PAYING,
      CREATE_FAIL,
      CLOSED,
      PAY_FAIL,
      PAY_SUCCESS
    }
    export enum ErrorCodeType {
      ORDER_MISMATCH,
      ORDER_PAID,
      AUTHCODEEXPIRE,
      NOTENOUGH,
      NOTSUPORTCARD,
      AUTH_CODE_ERROR,
      AUTH_CODE_INVALID,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface SuccessResponseInterface {
      partner_order_id: string,
      input_fee: number,
      create_time: string, // yyyy-MM-dd HH:mm:ss, UTC-8
      real_fee: number,
      total_fee: number,
      order_description: string,
      channel: ChannelType,
      result_code: ResultCodeType,
      currency: CurrencyType,
      customer_id: string,
      return_code: string,
      order_id: string
    }
    export interface ErrorResponseInterface {
      return_code: ErrorCodeType,
      return_msg: string
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace Active {
    export interface RequestInterface {
      description: string,
      price: number,
      currency?: CurrencyType,
      notify_url?: string,
      device_id: string,
      operator?: string
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
      partner_order_id: string,
      full_name: string,
      code_url: string,
      partner_name: string,
      result_code: ResultCodeType,
      partner_code: string,
      order_id: string,
      return_code: ResultCodeType,
      qrcode_img: string
    }
    export interface ErrorResponseInterface {
      return_code: string,
      return_msg: string
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
}