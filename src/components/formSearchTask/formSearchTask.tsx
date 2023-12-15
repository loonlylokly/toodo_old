import { Input } from 'shared/ui/input/input';
import { Form } from 'shared/ui/form/form';
import styles from './formSearchTask.module.css';

type Props = {
  setSearch: (text: string) => void;
};

export function FormSearchTask({ setSearch }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form}>
        <Input onChange={handleChange} />
      </Form>
    </div>
  );
}
