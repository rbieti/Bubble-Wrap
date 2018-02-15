import { GET_USER_ITEMS_LIST } from './types';

export const getItemList = ({ prop, value }) => {
  return {
    type: GET_USER_ITEMS_LIST,
    payload: { prop, value }
  };
};
