import { ref } from 'vue';

const editId = ref(-1);

export const useTodoList = () => {
  const todoListRef = ref([]);

  // ローカルストレージからTODOリストを読み込む
  const ls = localStorage.todoList;
  if (ls) {
    todoListRef.value = JSON.parse(ls);
  }

  // 新しいTODOを追加する関数
  const add = (task) => {
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: task });
    // ローカルストレージにTODOリストを保存する
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // IDに基づいてTODOを検索する関数
  const findByld = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  // IDに基づいてTODOのインデックスを検索する関数
  const findIndexByld = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  // 編集対象のTODOの情報を表示する関数
  const show = (id) => {
    const todo = findByld(id);
    editId.value = id;
    return todo.task;
  };

  // TODOを変更する関数
  const edit = (task) => {
    const todo = findByld(editId.value);
    const idx = findIndexByld(editId.value);
    todo.task = task;
    todoListRef.value.splice(idx, 1, todo);
    // ローカルストレージにTODOリストを保存する
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId.value = -1;
  };
  //削除ボタンの処理
  const del = (id) => {
    const todo = findByld(id);
    const delMsg = '「' + todo.task + '」を削除しますか？';
    if (!window.confirm(delMsg)) return; // "window." を追加

    const idx = findIndexByld(id);
    todoListRef.value.splice(idx, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // チェックボックスがクリックされたときの処理
  const check = (id) => {
    const todo = findByld(id);
    const idx = findIndexByld(id);
    todo.checked = !todo.checked;
    todoListRef.value.splice(idx, 1, todo);
    // ローカルストレージにTODOリストを保存する
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  return { todoListRef, add, show, edit, del, check };
};
