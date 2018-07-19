import { Detail as actionTypes } from "./constants";

export const createDetail = ({ parentId, todo }) => {
  const id = Math.random();
  const done = false;
  return {
    type: actionTypes.CREATE_DETAIl,
    payload: { parentId, todo, id, done }
  };
};

export const deleteDetail = ({ parentId, id }) => {
  return { type: actionTypes.DELETE_DETAIl, 
           payload: { parentId, id } };
};

export const toggleDetail = ({ parentId, id }) => {
  return { type: actionTypes.TOGGLE_DONE, 
           payload: { parentId, id } };
};