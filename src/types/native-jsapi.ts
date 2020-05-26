import { CurrencyType, ChannelType } from "./global";

export namespace NativeJSAPI {
  export interface RequestInterface {
    description: string,
    price: number,
    customer_id: string,
    currency?: CurrencyType,
    operator?: string,
    channel?: ChannelType.ALIPAY | ChannelType.UNION_PAY,
    notify_url?: string,
    appid?: string
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
    partner_name: string,
    channel: ChannelType.ALIPAY | ChannelType.UNION_PAY,
    trade_no: string,
    sdk_params: object,
    result_code: ResultCodeType,
    partner_code: string,
    order_id: string,
    return_code: ResultCodeType,
    pay_url: string
  }
  export interface ErrorResponseInterface {
    return_code: string,
    return_msg: string
  }
  export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
}