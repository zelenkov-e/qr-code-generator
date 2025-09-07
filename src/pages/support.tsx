import MainLayout from "@/components/MainLoyout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";
import qrCodeImage from "../../public/imgs/qr-code-payments.png";
import Separator from "@/components/common/Separator";


const HeaderProps = {
  title: "Поддержать Info4cars — Помогите развитию проекта",
  description:
    "Поддержите проект Info4cars. Ваши пожертвования помогают нам улучшать сервис, развивать функциональность и обеспечивать доступ к важной информации для всех пользователей.",
  keywords: "пожертвование Info4cars, поддержать проект, E-POS, помощь проекту, финансирование, Info4cars донат, поддержка сайта",
};

export default function SupportUsPage() {

  return (
    <MainLayout {...HeaderProps}>
      <main className={`${styles.main}`}>
        <h3>
          <b>Поддержка проекта</b>
        </h3>

        <div>
          <div>
            - Пожертвования являются добровольными и не являются обязательными для пользователей сайта. Вы можете поддержать сайт, но это не влияет на
            доступ к контенту или сервисам
          </div>
          <div>
            - Пожертвования идут на поддержание работы приложения, улучшение пользовательского опыта и на продвижение контента, который является
            важным для нашей аудитории.
          </div>
        </div>

        <div>
          <div>
            <b>Оплата по л/с через сервис E-POS</b>

            <div>
              Для оплаты клиенту необходимо в приложении банка выбрать: ЕРИП / сервис E-POS / внести лицевой счет: <b>30916-1-1</b>
            </div>
          </div>
        </div>

        <div>
          <b>Отсканируйте Qr-code для оплаты</b>
        </div>

        <Image alt="logo" src={qrCodeImage} />
        <Separator size="large" />
      </main>
    </MainLayout>
  );
}
