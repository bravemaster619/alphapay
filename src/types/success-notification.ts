import { CurrencyType, ChannelType } from "./global";

export type SuccessNotification = {
  time: number,
  nonce_str: string,
  sign: string,
  partner_order_id: string,
  order_id: string,
  total_fee: string,
  real_fee: string,
  rate: number,
  currency: CurrencyType,
  channel: ChannelType,
  create_time: string, // yyyy-MM-dd HH:mm:ss, UTC-8
  pay_time: string, // yyyy-MM-dd HH:mm:ss, UTC-8
}
