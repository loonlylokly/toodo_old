import { Input } from 'shared/ui/input/input';
import { EStatusEditTask, TFormTask } from 'types/task';

type Props = {
  errors: Record<string, string[]>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  task: TFormTask;
  // eslint-disable-next-line react/require-default-props
  cachedDatetime?: string;
  validator: {
    validate: (data: Record<string, string>) => {
      status: EStatusEditTask;
      errors: Record<string, string[]>;
    };
  };
  setTask: (
    cb: (prev: TFormTask) => {
      datetime: string;
      text: string;
    },
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export function FieldsFormTask({
  validator,
  cachedDatetime,
  task,
  errors,
  setTask,
  setErrors,
}: Props) {
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { errors } = validator.validate({
      text: e.target.value,
    });
    setTask((prev) => ({ ...prev, text: e.target.value }), e);
    setErrors((prev) => ({ ...prev, text: errors.text }));
  };

  const handleChangeDatetime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { errors } = validator.validate({
      datetime: e.target.value,
    });
    setTask((prev) => ({ ...prev, datetime: e.target.value }), e);
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
