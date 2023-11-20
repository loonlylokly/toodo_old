import { TodoList } from 'widgets/TodoList/TodoList';
import { Header } from 'widgets/Header/Header';

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
