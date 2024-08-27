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

const baseUrl = process.env.AUTH_URL ? `${process.env.AUTH_URL}` : "";

export const WelcomeEmail = ({
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
           src={`/static/logo.png`}
            width="184"
            height="184"
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
                  Félicitations ! Tu viens de t'inscrire sur Learn404 et à la Newsletter Learn404.
                  Pour commencer à apprendre, il te suffit de prendre la formation maintenant ! 
                </Text>

                <Text className="text-base mt-4">
                  Mais si tu n'es pas encore prêt, voici quelques étapes pour te convaincre :
                </Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-20">
                <strong>Découvre les contenus gratuit</strong> Explore nos articles de blog pour découvrir la forme de nos cours ! 
              </li>
              <li className="mb-20">
                <strong>Rejoins la communauté.</strong> Rejoins le Discord de Learn404 pour échanger avec d'autres développeurs et poser tes questions.
              </li>
              <li className="mb-20">
                <strong>Envisage de t'abonner.</strong> Débloque l'accès à
                l'ensemble de notre contenu pour seulement 20€ à vie pour commencer à développer tes compétences.
              </li>
            </ul>

            <Section className="text-center">
              <Button
                className="bg-brand text-white rounded-lg py-3 px-[18px]"
                href={`${baseUrl}`}
              >
                Découvrir la formation
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

export default WelcomeEmail;