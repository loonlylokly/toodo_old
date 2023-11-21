import { TodoList } from 'widgets/todoList/todoList';
import { Header } from 'widgets/header/header';

export function MainPage() {
  return (
    <>
      <Header />
      <main>
        <TodoList />
      </main>
    </>
  )
}
