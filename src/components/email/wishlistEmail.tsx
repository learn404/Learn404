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

interface WishlistEmailProps {
  name?: string;
}

const baseUrl = process.env.AUTH_URL ? `${process.env.AUTH_URL}` : "";

export const WishlistEmail = ({
  name = "Cher Membre",
}: WishlistEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation d'inscription à la Wishlist</Preview>
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
              Bienvenue dans la Wishlist, {name} !
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Merci de vous être inscrit à notre wishlist sur Learn404 ! 
                  Vous recevrez des mises à jour sur les cours et ressources que vous souhaitez découvrir.
                </Text>

                <Text className="text-base mt-4">
                  Voici quelques avantages d'être inscrit :
                </Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-20">
                <strong>Restez informé.</strong> Soyez le premier à connaître les nouvelles offres et cours.
              </li>
              <li className="mb-20">
                <strong>Profitez d'offres exclusives.</strong> Accédez à des promotions réservées aux membres de la wishlist.
              </li>
              <li className="mb-20">
                <strong>Participez à des événements.</strong> Recevez des invitations à nos webinars et événements en ligne.
              </li>
            </ul>

            <Section className="text-center">
              <Button
                className="bg-brand text-white rounded-lg py-3 px-[18px]"
                href="https://discord.gg/w3mKH2e2Jt"
              >
                Explorer le discord
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
                  <Link href={`${baseUrl}/api/email/unsubscribe`}>Se désabonner</Link>
                </Column>
                <Column className="text-left">
                  <Link href={`${baseUrl}/settings`}>Gérer les préférences</Link>
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

export default WishlistEmail;