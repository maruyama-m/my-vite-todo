import { ref } from 'vue';
export const useTodoList = (id) => {
  //ローカルストレージにtodoListが存在していれば、parseし、
  //なければundefinedになるため空白列をセットする。
  const ls = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = ls ? JSON.parse(ls) : [];

  //追加処理
  const add = (task) => {
    //IDを簡易的にミリ秒で登録する
    const id = new Date().getTime();

    //配列に入力TODOを格納
    todoListRef.value.push({ id: id, task: task });

    //ローカルストレージに登録
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };
  //retunすることで外部から使うことができる
  return { todoListRef };
};

//編集対象となるTODOを取得
const findByld = (id) => {
  return todoListRef.value.find((todo) => todo.id === id);
};
//TODOリストから編集対象のインデックスを取得
const findIndexByld = (id) => {
  return todoListRef.value.findIndex((todo) => todo.id === id);
};

//編集
const editId = ref(-1);
const show = (id) => {
  const todo = findByld(id);
  editId.value = id;
  return todo.task;
};

//変更
const edit = (task) => {
  const todo = findByld(editId.value);
  const idx = findIndexByld(editId.value);
  todo.task = task;
  todoListRef.value.splice(idx, 1, todo);
  localStorage.todoList = JSON.stringify(todoListRef.value);
  editId.value = -1;
};

//削除
const del = (id) => {
  const todo = findByld(id);
  const delMsg = '「' + todo.task + '」を削除しますか？';
  if (!confirm(delMsg)) return;

  const idx = findIndexByld(id);
  todoListRef.value.splice(idx, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
};

//チェックボックスが押された時の処理
const check = (id) => {
  const todo = findByld(id);
  const idx = findIndexByld(id);
  todo.checked = !todo.checked;
  todoListRef.value.splice(idx, 1, todo);
  localStorage.todoList = JSON.stringify(todoListRef.value);
};

return { todoListRef, add, show, edit, del, check };
