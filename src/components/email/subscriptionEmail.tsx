import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface Learn404WelcomeEmailProps {
  name?: string;
}

const baseUrl = process.env.AUTH_URL
  ? `https://${process.env.AUTH_URL}`
  : "";

export const SubscriptionEmail = ({
  name = "Cher Membre",
}: Learn404WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Bienvenue sur Learn404</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#4c51bf",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src={`${baseUrl}/img/logo.png`}
            width="184"
            height="75"
            alt="Learn404"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Bienvenue sur Learn404, {name} !
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Félicitations ! Tu viens de t'abonner à Learn404, la
                  plateforme qui va permettre d'améliorer tes compétences en
                  développement web.
                </Text>

                <Text className="text-base mt-4">
                  Voici comment commencer :
                </Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-20">
                <strong>Explore les vidéos de cours.</strong> Parcours notre
                vaste bibliothèque de vidéos pour tous les niveaux.
              </li>
              <li className="mb-20">
                <strong>Rejoins la communauté.</strong> Participe au Discord
                pour poser des questions et discuter avec d'autres membres.
              </li>
              <li className="mb-20">
                <strong>Accède à ton tableau de bord.</strong> Gère tes cours,
                suis ta progression et bien plus encore.
              </li>
            </ul>

            <Section className="text-center">
              <Button
                className="bg-brand text-white rounded-lg py-3 px-[18px]"
                onClick={() => {
                  window.location.href = `${baseUrl}dashboard`;
                }}
              >
                Accéder à ton tableau de bord
              </Button>
            </Section>

            <Section className="mt-45">
              <Row>
                <Column className="text-center">
                  <Link className="text-black underline font-bold">
                    Besoin d'aide ? Contacte-nous
                  </Link>
                </Column>
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="text-right px-20">
                  <Link href={`${baseUrl}api/email/unsubscribe`}>Se désabonner</Link>
                </Column>
                <Column className="text-left">
                  <Link href={`${baseUrl}settings`}>Gérer les préférences</Link>
                </Column>
              </Row>
            </Section>
            <Text className="text-center text-gray-400 mb-45">
              Learn404, Paris, France
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SubscriptionEmail;
