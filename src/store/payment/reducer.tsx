import {PaymentTypeOptions, PaymentResponseType, PaymentStatus} from './types';

import {ReducerActionType} from '../types';

export const initialState = (): PaymentResponseType => {
  return {
    payment: {
      isCurrencyLocked: false,
      sourceAddressInformation: [],
      customerDetails: {
        email: '',
        fullName: '',
        phoneNumber: '',
      },
      customer: '',
      totalDue: 0,
      transactionFees: 0,
      currencies: [''],
      baseCurrency: '',
      baseAmount: 0,
      sourceDetails: {},
      description: '',
      status: PaymentStatus.Null,
      _id: '',
      id: '',
    },
  };
};
export const paymentReducer = (
  state = initialState(),
  action: ReducerActionType<PaymentTypeOptions, Record<string, any>>,
): PaymentResponseType => {
  switch (action.type) {
    case PaymentTypeOptions.UPDATE:
      const updatedState: PaymentResponseType = {
        ...state,
        payment: {...state.payment, ...action.payload},
      };
      return updatedState;

    case PaymentTypeOptions.CREATE:
      const newState = {...state, ...action.payload};
      return newState;

    case PaymentTypeOptions.CLEAR:
      return initialState();
    default:
      return state;
  }
};
