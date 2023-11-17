import { TodoList } from 'Src/widgets/TodoList/TodoList';
import { Header } from 'Widgets/Header/Header';

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
