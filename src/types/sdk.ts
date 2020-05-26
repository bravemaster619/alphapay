import { CurrencyType, ChannelType, SystemType } from "./global";

export namespace SDK {
  export interface RequestInterface {
    description: string,
    price: number,
    currency?: CurrencyType,
    channel?: ChannelType,
    notify_url?: string,
    operator?: string,
    system?: SystemType,
    version?: string,
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