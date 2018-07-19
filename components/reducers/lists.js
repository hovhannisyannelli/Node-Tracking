import Data from "./Data";
import { List, Detail, Initialize } from "../actions/constants";

export default (state = [] , action) => {
  switch (action.type) {
    case Initialize.INITIALIZE: 
      return action.payload.lists;
    case List.CREATE_LIST:
      return [...state, action.payload];
    case List.DELETE_LIST:
      return state.filter(list => list.id !== action.payload.id);
    case List.EDIT_TITLE:
      return state.map(
        list =>
          list.id === action.payload.id
            ? { ...list, title: action.payload.title }
            : list
      );
    case Detail.CREATE_DETAIl:
      return state.map(
        list =>
          list.id === action.payload.parentId
            ? { ...list, items: [...list.items, action.payload] }
            : list
      );
    case Detail.DELETE_DETAIl:
      return state.map(
        list =>
          list.id === action.payload.parentId
            ? {
                ...list,
                items: list.items.filter(item => item.id !== action.payload.id)
              }
            : list
      );


    case Detail.EDIT_DETAIL:
      return state.map(
        list =>
          list.id === action.payload.parentId
            ? {
                ...list,
                items: list.items.map(
                  item =>
                    item.id === action.payload.id
                      ? { ...item, todo: action.payload.todo }
                      : item
                )
              }
            : list
      );
    case Detail.TOGGLE_DONE:
      return state.map(
        list =>
          list.id === action.payload.parentId
            ? {
                ...list,
                items: list.items.map(
                  item =>
                    item.id === action.payload.id
                      ? { ...item, done: !item.done }
                      : item
                )
              }
            : list
      );
    default:
      return state;
  }
};