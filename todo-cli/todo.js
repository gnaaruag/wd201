const todoList = () => {
    all = []
    overdueArray = []
    dueTodayArray = []
    dueLaterArray = []
    let todayCompare = new Date().toISOString().slice(0, 10);

    const add = (todoItem) => {
        all.push(todoItem)
    }
    const markAsComplete = (index) => {
        all[index].completed = true
    }

    const overdue = () => {
        // Write the date check condition here and return the array
        // of overdue items accordingly.
        
        all.forEach(element => {
            if (element.dueDate < todayCompare) {
                overdueArray.push(element);
            }
        });
        return overdueArray;
    }

    const dueToday = () => {
        // Write the date check condition here and return the array
        // of todo items that are due today accordingly.  let todayCompare = new Date().toISOString().slice(0,10); 
        
        all.forEach(element => {
            if (element.dueDate == todayCompare) {
                dueTodayArray.push(element);
            }
        });
        return dueTodayArray;

    }

    const dueLater = () => {
        // Write the date check condition here and return the array
        // of todo items that are due later accordingly.
        
        all.forEach(element => {
            if (element.dueDate > todayCompare) {
                dueLaterArray.push(element);
            }
        });
        return dueLaterArray;
    }

    const toDisplayableList = (list) => {
        // Format the To-Do list here, and return the output string
        // as per the format given above.
        let returnString = [];

        list.forEach(element => {
            if (element.dueDate == todayCompare) {
                if (element.completed) {
                    returnString.push("[x] " + element.title);
                }
                else {
                    returnString.push("[ ] " + element.title);
                }
            }
            else {
                if (element.completed) {
                    returnString.push("[x] " + element.title + " " + element.dueDate);
                }
                else {
                    returnString.push("[ ] " + element.title + " " + element.dueDate);
                }
            }
        });

        return returnString.join('\n');
        
    }

    return {
        all,
        add,
        markAsComplete,
        overdue,
        dueToday,
        dueLater,
        toDisplayableList
    };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
    return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
// console.log(overdues);
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
// console.log(itemsDueToday);
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
// console.log(itemsDueLater);
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")