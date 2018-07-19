const id = () => Math.random();
const date1 = new Date();
const date = date1.getHours()+ ':' + date1.getMinutes();
export default [
  {
    id: id(),
    title: "Groceries",
    created: date,
    items: [
      {
        id: id(),
        todo: "Ice-Cream",
        done: false,

      },
      {
        id: id(),
        todo: "Carrot",
        done: true,
       
      }
    ]
  },

  {
    id: id(),
    title: "Assignments",
    created: date,
    items: [
      {
        id: id(),
        todo: "CS",
        done: false,
       
      },
      {
        id: id(),
        todo: "Math",
        done: true,
     
      }
    ]
  },
];
