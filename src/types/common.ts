import { ChannelType, CurrencyType } from "./global";

export namespace Common {
  export namespace ExchangeRate {
    export interface SuccessResponseInterface {
      wechat_rate: number,
      alipay_retail_rate: number,
      alipay_online_rate: number,
      return_code: string
    }
    export enum ErrorCodeType {
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
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace OrderStatus {
    export enum ResultCodeType {
      PAYING,
      CREATE_FAIL,
      CLOSED,
      PAY_FAIL,
      PAY_SUCCESS,
      PARTIAL_REFUND,
      FULL_REFUND
    }
    export interface SuccessResponseInterface {
      create_time: string, // yyyy-MM-dd HH:mm:ss, UTC-8
      real_fee: number,
      order_description: string,
      channel: ChannelType,
      channel_order_id: string,
      pay_time: string, // yyyy-MM-dd HH:mm:ss, UTC-8
      partner_order_id: string,
      input_fee: number,
      rate: number,
      total_fee: number,
      result_code: ResultCodeType,
      currency: CurrencyType,
      customer_id: string,
      return_code: string,
      order_id: string
    }
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
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace ApplyRefund {
    export interface RequestInterface {
      fee: number
    }
    export enum ResultCodeType {
      WAITING,
      CREATE_FAILED,
      SUCCESS,
      FAILED,
      FINISHED,
      CHANGE
    }
    export enum ErrorCodeType {
      ORDER_NOT_EXIST,
      ORDER_MISMATCH,
      ORDER_NOT_PAID,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface SuccessResponseInterface {
      amount: number,
      channel_refund_id: string,
      channel: ChannelType,
      currency: CurrencyType,
      result_code: ResultCodeType,
      refund_id: string,
      partner_refund_id: string,
      return_code: string
    }
    export interface ErrorResponseInterface {
      return_code: ErrorCodeType,
      return_msg: string
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace RefundOrderStatus {
    export enum ResultCodeType {
      WAITING,
      CREATE_FAILED,
      SUCCESS,
      FAILED,
      FINISHED,
      CHANGE
    }
    export enum ErrorCodeType {
      ORDER_NOT_EXIST,
      ORDER_MISMATCH,
      ORDER_NOT_PAID,
      REFUND_NOT_EXIST,
      REFUND_MISMATCH,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface SuccessResponseInterface {
      amount: number,
      channel_refund_id: string,
      channel: ChannelType,
      currency: CurrencyType,
      result_code: ResultCodeType,
      refund_id: string,
      partner_refund_id: string,
      return_code: string
    }
    export interface ErrorResponseInterface {
      return_code: ErrorCodeType,
      return_msg: string
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace CheckOrders {
    export interface QueryParamInterface {
      date?: string, // 'yyyyMMdd' ,UTC-8
      status?: "ALL"|"PAID"|"REFUNDED",
      page?: number,
      limit?: number,
    }
    export interface PaginationInterface {
      page: number,
      limit: number,
      totalCount: number,
      totalPages: number
    }
    export enum OrderStatus {
      SUBMITTING,
      SUBMIT_FAIL,
      WAITING_PAYMENT,
      CLOSED,
      PAYMENT_FAIL,
      SUCCESS,
      PARTIAL_REFUND,
      FULL_REFUND
    }
    export interface OrderInterface {
      create_time: string, // 'yyyyMMdd' ,UTC-8
      real_fee: number,
      partner_name: string,
      channel: ChannelType,
      partner_order_id: string,
      pre_authorization: boolean,
      total_fee: number,
      refund_fee: number,
      tip_amount: number,
      currency: CurrencyType,
      partner_code: string,
      order_id: string,
      order_body: string,
      pay_time: string, // 'yyyy-MM-dd HH:mm:ss', UTC-8
      gateway: string,
      status: string,
      channel_error_message: string
    }
    export interface AnalysisInterface {
      order_count: number,
      total_fee: number,
      real_fee: number
    }
    export interface SuccessResponseInterface {
      pagination: PaginationInterface,
      data: Array<OrderInterface>,
      analysis: AnalysisInterface,
      return_code: string
    }
    export interface ErrorCodeType {
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
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace DailyTransactions {
    export interface QueryParamInterface {
      date: string // 'yyyyMMdd', UTC-8
    }
    export enum GatewayType {
      OFFLINE_CUSTOMER_DEVICE = 0,
      OFFLINE_POS_SCREEN = 1,
      MERCHANT_QRCODE_1 = 2,
      QRCODE = 3,
      JSAPI = 4,
      OFFLINE_PAYMENT_1 = 5,
      OFFLINE_PAYMENT_2 = 6,
      MERCHANT_QRCODE_2 = 7,
      MOBILE_H5 = 8,
      THIRD_PARTY = 9,
      APP_SDK = 10,
      SHARE_CODE = 11,
      MINIPROGRAM = 12,
      NATIVE = 13,
      SHARE_LINK = 14
    }
    export interface TransactionInterface {
      exchange_rate: number,
      customer_payment_amount: number,
      channel: ChannelType,
      remark: string,
      channel_order_id: string,
      type: "Credit"|"Debit",
      refund_id: string,
      total_surchage: number,
      partner_order_id: string,
      input_amount: number,
      total_amount: number,
      settle_amount: number,
      transaction_time: string, // yyyyMMddHHmmss, UTC-8
      currency: CurrencyType,
      order_id: string,
      partner_refund_id: string,
      gateway: GatewayType,
      surcharge_rate: number
    }
    export interface SuccessResponseInterface {
      order_count: number,
      transaction_count: number,
      result_code: string,
      transactions: Array<TransactionInterface>,
      refund_count: number,
      return_code: string
    }
    export enum ErrorCodeType {
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
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace Settlement {
    export interface SuccessResponseInterface {
      order_count: number,
      total_credit: number,
      transaction_count: number,
      total_transfer: number,
      total_debit: number,
      transactions: Array<Common.DailyTransactions.TransactionInterface>,
      settle_days: string,
      total_surcharge: number,
      settle_to: string, // yyyyMMdd
      result_code: string,
      settle_from: string // yyyyMMdd
      refund_count: number,
      return_code: string
    }
    export enum ErrorCodeType {
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
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace SuspendSettlement {
    export enum ResultCodeType {
      WAITING,
      CREATE_FAILED,
      SUCCESS,
      FAILED,
      FINISHED,
      CHANGE
    }
    export enum ErrorCodeType {
      ORDER_NOT_EXIST,
      ORDER_MISMATCH,
      ORDER_NOT_PAID,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface SuccessResponseInterface {
      result_code: ResultCodeType,
      return_code: string
    }
    export interface ErrorResponseInterface {
      return_code: ErrorCodeType,
      return_msg: string
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
  export namespace ReleaseSuspendedSettlement {
    export enum ResultCodeType {
      WAITING,
      CREATE_FAILED,
      SUCCESS,
      FAILED,
      FINISHED,
      CHANGE
    }
    export enum ErrorCodeType {
      ORDER_NOT_EXIST,
      ORDER_MISMATCH,
      ORDER_NOT_PAID,
      SYSTEMERROR,
      INVALID_SHORT_ID,
      SIGN_TIMEOUT,
      INVALID_SIGN,
      PARAM_INVALID,
      NOT_PERMITTED,
      INVALID_CHANNEL
    }
    export interface SuccessResponseInterface {
      result_code: ResultCodeType,
      return_code: string
    }
    export interface ErrorResponseInterface {
      return_code: ErrorCodeType,
      return_msg: string
    }
    export type ResponseType = SuccessResponseInterface | ErrorResponseInterface;
  }
}