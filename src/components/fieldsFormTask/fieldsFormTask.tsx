import { Input } from 'shared/ui/input/input';
import { EStatusEditTask, TFormTask } from 'types/task';

type Props = {
  validator: {
    validate: (data: Record<string, string>) => {
      status: EStatusEditTask;
      errors: Record<string, string[]>;
    };
  };
  task: TFormTask;
  setTask: React.Dispatch<React.SetStateAction<TFormTask>>;
  errors: Record<string, string[]>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line react/require-default-props
  cachedDatetime?: string;
};

export function FieldsFormTask({
  validator,
  task,
  setTask,
  setDisabled,
  errors,
  setErrors,
  cachedDatetime = '',
}: Props) {
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { errors } = validator.validate({
      text: e.target.value,
    });
    setTask((prev) => ({ ...prev, text: e.target.value }));
    setDisabled(() => !e.target.value.length && !task.datetime.length);
    setErrors((prev) => ({ ...prev, text: errors.text }));
  };

  const handleChangeDatetime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { errors } = validator.validate({
      datetime: e.target.value,
    });
    setTask((prev) => ({ ...prev, datetime: e.target.value }));
    setDisabled(() => !e.target.value.length && !task.datetime.length);
    setErrors((prev) => ({ ...prev, datetime: errors.datetime }));
  };

  return (
    <>
      <Input
        type="text"
        label="Text Task"
        defaultValue={task.text}
        handleChange={handleChangeText}
        debounced
        debounceTime={600}
        errors={errors.text}
      />
      <Input
        type="datetime-local"
        label="Datetime Task"
        defaultValue={cachedDatetime}
        handleChange={handleChangeDatetime}
        errors={errors.datetime}
      />
    </>
  );
}
