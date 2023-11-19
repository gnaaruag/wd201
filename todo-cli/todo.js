const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    return all.filter(
      (element) => element.dueDate < new Date().toISOString().slice(0, 10),
    );
  };
  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.  const todayCompare = new Date().toISOString().slice(0,10)
    return all.filter(
      (element) => element.dueDate === new Date().toISOString().slice(0, 10),
    );
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    return all.filter(
      (element) => element.dueDate > new Date().toISOString().slice(0, 10),
    );
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    return list.map(
      (element) =>
        `${element.completed ? "[x]" : "[ ]"} ${element.title} ${
          element.dueDate === new Date().toISOString()
        }`,
    );
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;

// // ####################################### #
// // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// // ####################################### #

// const todos = todoList()

// const formattedDate = d => {
//   return d.toISOString().split('T')[0]
// }

// const dateToday = new Date()
// const today = formattedDate(dateToday)
// const yesterday = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() - 1))
// )
// const tomorrow = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() + 1))
// )

// todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
// todos.add({ title: 'Pay rent', dueDate: today, completed: true })
// todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
// todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
// todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

// console.log('My Todo-list\n')

// console.log('Overdue')
// const overdues = todos.overdue()
// // console.log(overdues)
// const formattedOverdues = todos.toDisplayableList(overdues)
// console.log(formattedOverdues)
// console.log('\n')

// console.log('Due Today')
// const itemsDueToday = todos.dueToday()
// // console.log(itemsDueToday)
// const formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
// console.log(formattedItemsDueToday)
// console.log('\n')

// console.log('Due Later')
// const itemsDueLater = todos.dueLater()
// // console.log(itemsDueLater)
// const formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
// console.log(formattedItemsDueLater)
// console.log('\n\n')
