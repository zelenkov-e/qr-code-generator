import MainLayout from "@/components/MainLoyout";
import { getI18nProps } from "@/lib/withTranslations";
import { useTranslation } from "next-i18next";
import styles from "./../styles/Home.module.scss";
import Input from "@/components/common/Input";
import { useContext, useState } from "react";
import Button from "@/components/common/Button";
import { InputField } from "@/common/types";
import { FormInputs, Inputs, Types } from "@/common/constant";
import { checkIsValidateMail, isEmtyField, minLength, renderRequredWarningMessage } from "@/services/Utils";
import { notCorrectEmail } from "@/services/messages/errors";
import TextArea from "@/components/common/TextArea";
import { ToastContext } from "@/context/ToastContext";
import { sendContactUsquestion } from "@/services/messages/success";
import { useRouter } from "next/router";
import Link from "next/link";
import Checkbox from "@/components/common/Checkbox";
import Separator from "@/components/common/Separator";
import Text from "@/components/common/Text";
import Wrapper from "@/components/common/Wrapper";
import { getHeaderProps } from "@/lib/getHeaderProps";

const InputsGroupFields: InputField[] = [
  { name: FormInputs.name, placeholder: Inputs.name },
  { name: FormInputs.phone, placeholder: Inputs.phone },
  { name: FormInputs.email, placeholder: Inputs.email },
];

function ContactPage() {
  const { t } = useTranslation("page");
  const HeaderProps = getHeaderProps(t, "contactUs");

  const router = useRouter();
  const toast = useContext(ToastContext);
  const [contacts, setContacts] = useState<{ [key: string]: string }>({ Name: "", Phone: "", Email: "" });
  const [isAllowAgreement, setIsAllowAgreement] = useState(false);
  const [note, setNote] = useState<string>("");
  const [loadingForm, setLoadingForm] = useState(false);

  const NAMEMINLENGTH = 5;
  const PHONEMINLENGTH = 6;
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const checkisRequiredFieldsAreFilledIn = () => {
    let required: string[] = [];

    (isEmtyField(contacts.Name) || (!isEmtyField(contacts.Name) && contacts.Name.length < NAMEMINLENGTH)) && required.push(Inputs.name);

    isEmtyField(contacts.Phone) && isEmtyField(contacts.Email) && required.push(`${Inputs.phone} или ${Inputs.email}`);

    ((!isEmtyField(contacts.Phone) && contacts.Phone.length < PHONEMINLENGTH) ||
      (!isEmtyField(contacts.Email) && !checkIsValidateMail(contacts.Email))) &&
      required.push(`${Inputs.phone} или ${Inputs.email}`);

    isEmtyField(note) && required.push(Inputs.note);

    isAllowAgreement === false && required.push("Согласие на использование данных");

    return required;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const requiredNotFilledIn = checkisRequiredFieldsAreFilledIn();

    requiredNotFilledIn.length > 0 && toast?.showToast(renderRequredWarningMessage(requiredNotFilledIn), "error", "topRight");

    if (requiredNotFilledIn.length === 0) {
      const data = { ...contacts, Question: note };

      try {
        await fetch(`${Base_URL}/connect/contactUs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        toast?.showToast(sendContactUsquestion(), "success", "topRight");
        setLoadingForm(false);
        router.push("/");
      } catch (error) {
        console.log("error", error);
        setLoadingForm(false);
      }
    }
  };

  const handleChange = (e: any, id?: string) => {
    const val = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).name;

    if (id === FormInputs.note) {
      setNote(val);
    } else {
      setContacts({ ...contacts, [name]: val });
    }
  };

  return (
    <MainLayout {...HeaderProps}>
      <div className={styles.describtion}>
        <h1>{t("contactUs.title")}</h1>
        <p>{t("contactUs.description")}</p>

        <form onSubmit={handleSubmit}>
          {InputsGroupFields.map((field, indx) => {
            const { name, placeholder } = field;
            return (
              <div key={indx}>
                <Input type="text" placeholder={placeholder} name={name} value={contacts[name]} handleChange={handleChange} />
                {name === FormInputs.name && !isEmtyField(contacts[name]) && contacts[name].length < NAMEMINLENGTH && (
                  <div color={Types.danger}>{minLength(NAMEMINLENGTH)}</div>
                )}
                <Separator size="small" />
                {name === FormInputs.phone && !isEmtyField(contacts[name]) && contacts[name].length < PHONEMINLENGTH && (
                  <div color={Types.danger}>{minLength(PHONEMINLENGTH)}</div>
                )}
                <Separator size="small" />
                {name === FormInputs.email && !isEmtyField(contacts[name]) && !checkIsValidateMail(contacts[name] as string) && (
                  <div color={Types.danger}>{notCorrectEmail()}</div>
                )}
              </div>
            );
          })}

          <TextArea placeholder={Inputs.note} name={note} value={note} handleChange={(e) => handleChange(e, FormInputs.note)} />
          {!isEmtyField(note) && note.length < NAMEMINLENGTH && <div color={Types.danger}>{minLength(NAMEMINLENGTH)}</div>}
          <Wrapper gap="1rem">
            <Checkbox name="contact-us" checked={isAllowAgreement} onChange={() => setIsAllowAgreement(!isAllowAgreement)} />
            <Text size="small">
              {t("contactUs.agreement")} <Link href="/policy">{t("contactUs.privacyPolicy")}</Link>
            </Text>
          </Wrapper>
          <Separator />
          <Button disabled={loadingForm} type="submit">
            send
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}

export const getStaticProps = getI18nProps(["page"]);
export default ContactPage;
