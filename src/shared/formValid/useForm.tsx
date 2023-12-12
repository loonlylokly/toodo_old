import { statusEditTask } from 'types/task';
import { Validation, ValidationType } from './validation';

type Refs = Record<string, React.MutableRefObject<HTMLInputElement>>;

type Props = {
  refs: Refs;
  validation?: ValidationType;
};

export function useForm(props: Props) {
  let errors: Record<string, string> = {};
  let status: statusEditTask = statusEditTask.success;
  const { validate } = Validation(props.validation);

  const handleSubmit = (event: React.FormEvent) => {
    const data: Record<string, string> = {};
    errors = {};
    status = statusEditTask.success;
    return (
      callback: (
        data: Record<string, string>,
        status: statusEditTask,
        event: React.FormEvent
      ) => void
    ) => {
      Object.keys(props.refs).forEach((key) => {
        const validResult = validate(props.refs[key].current.value, key);
        if (validResult[key].length) {
          errors[key] = validResult[key];
          status = statusEditTask.error;
        } else {
          data[key] = props.refs[key].current.value;
        }
      });
      return callback(data, status, event);
    };
  };

  return { handleSubmit, errors };
}
