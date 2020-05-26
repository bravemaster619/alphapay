import { CurrencyType, ChannelType } from "./global";

export namespace Miniprogram {
  export interface RequestInterface {
    description: string,
    price: number,
    currency?: CurrencyType,
    notify_url?: string,
    operator?: string,
    channel?: ChannelType.ALIPAY | ChannelType.WECHAT,
    appid?: string,
    customer_id?: string
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
    channel: string,
    sdk_params: object,
    result_code: ResultCodeType,
    partner_code: string,
    order_id: string,
    return_code: ResultCodeType;
  }
  export interface ErrorResponseInterface {
    return_code: string;
    return_msg: string;
  }
  export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
}