import { Validation, ValidationType } from './validation';

type Refs = Record<string, React.MutableRefObject<HTMLInputElement>>;

type Props = {
  refs: Refs;
  validation?: ValidationType;
};

export function useForm(props: Props) {
  let errors: Record<string, string> = {};
  let status: 'error' | 'success' = 'success';
  const { validate } = Validation(props.validation);

  const handleSubmit = (event: React.FormEvent) => {
    const data: Record<string, string> = {};
    errors = {};
    status = 'success';
    return (
      callback: (
        data: Record<string, string>,
        status: 'error' | 'success',
        event: React.FormEvent
      ) => void
    ) => {
      Object.keys(props.refs).forEach((key) => {
        const validResult = validate(props.refs[key].current.value, key);
        if (validResult[key].length) {
          errors[key] = validResult[key];
          status = 'error';
        } else {
          data[key] = props.refs[key].current.value;
        }
      });
      return callback(data, status, event);
    };
  };

  return { handleSubmit, errors };
}
