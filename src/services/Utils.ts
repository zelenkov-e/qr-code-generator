export const isEmtyField = (input: string | null) => input?.trim().length === 0;

export const minLength = (num: number) => `Не менее ${num} символов`;
export const maxlength = (num: number) => `Не более ${num} символов`;

export const checkIsValidateMail = (value: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

export const renderRequredWarningMessage = (errorItems: string[]) => {
  let message = errorItems.map((item) => `${item}`).join("; ");
  return `Пожалуйста, добавьте:\n${message}`;
};
