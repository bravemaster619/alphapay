import { CurrencyType, ChannelType } from "./global";

export namespace OnlinePay {
  export interface RequestInterface {
    description: string,
    price: number,
    currency?: CurrencyType,
    channel?: ChannelType.ALIPAY | ChannelType.UNION_PAY,
    notify_url?: string,
    operator?: string
  }
  export enum ResultCodeType {
    SUCCESS = "SUCCESS",
    EXISTS = "EXISTS"
  }
  export enum ErrorCodeType {
    ORDER_MISMATCH = "ORDER_MISMATCH",
    ORDER_PAID = "ORDER_PAID",
    SYSTEMERROR = "SYSTEMERROR",
    INVALID_SHORT_ID = "INVALID_SHORT_ID",
    SIGN_TIMEOUT = "SIGN_TIMEOUT",
    INVALID_SIGN = "INVALID_SIGN",
    PARAM_INVALID = "PARAM_INVALID",
    NOT_PERMITTED = "NOT_PERMITTED"
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
    code_url: string;
    pay_url: string;
  }
  export interface ErrorResponseInterface {
    return_code: string;
    return_msg: string;
  }
  export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
}