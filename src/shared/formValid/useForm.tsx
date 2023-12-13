import { EStatusEditTask } from 'types/task';
import { ValidationType } from 'types/validationType';
import { Validation } from './validation';

type Refs = Record<string, React.MutableRefObject<HTMLInputElement>>;

type Props = {
  refs: Refs;
  validation?: ValidationType;
};

export function useForm(props: Props) {
  let errors: Record<string, string> = {};
  let status: EStatusEditTask = EStatusEditTask.success;
  const { validate } = Validation(props.validation);

  const handleSubmit = (event: React.FormEvent) => {
    const data: Record<string, string> = {};
    errors = {};
    status = EStatusEditTask.success;
    return (
      callback: (
        data: Record<string, string>,
        status: EStatusEditTask,
        event: React.FormEvent
      ) => void
    ) => {
      Object.keys(props.refs).forEach((key) => {
        const validResult = validate(props.refs[key].current.value, key);
        if (validResult[key].length) {
          errors[key] = validResult[key];
          status = EStatusEditTask.error;
        } else {
          data[key] = props.refs[key].current.value;
        }
      });
      return callback(data, status, event);
    };
  };

  return { handleSubmit, errors };
}
