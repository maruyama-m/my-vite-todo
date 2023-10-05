import { ref } from 'vue';
export const useTodoList = (id) => {
  //ローカルストレージにtodoListが存在していれば、parseし、
  //なければundefinedになるため空白列をセットする。
  const ls = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = ls ? JSON.parse(ls) : [];

  const todo = todoListRef.value.find((todo) => todo.id === id);
  const idx = todoListRef.value.findIndex((todo) => todo.id === id);

  //retunすることでtodoとidxを外部から使うことができる
  return { todo, idx };
};
