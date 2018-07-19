import { List as actionTypes } from "./constants";

export const createList = ({ title, icon }) => {
  const date1 = new Date();
  const date = date1.getHours()+ ':' + date1.getMinutes();
  const id = Math.random();
  return {
    type: actionTypes.CREATE_LIST,
    payload: {
      title,
      date,
      id, 
      items: [],
      icon
    }
  };
};


export const deleteList = ({ id }) => {
  return { type: actionTypes.DELETE_LIST, 
           payload: { id } };
};

export const editTitle = ({ id, newone }) => {
  return {
    type: actionTypes.EDIT_TITLE,
    payload: { id, title: newone }
  };
};