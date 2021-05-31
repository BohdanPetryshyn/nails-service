import { Transform } from 'class-transformer';

export default function TransformDate() {
  const toPlain = Transform((params) => (params.value as Date).toISOString(), {
    toPlainOnly: true,
  });

  const toClass = Transform((params) => new Date(params.value), {
    toClassOnly: true,
  });

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
}
