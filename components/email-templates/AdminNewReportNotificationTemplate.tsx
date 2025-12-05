import {
  Body,
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
} from "@react-email/components";

import { INFO } from "@/constants";
import reportReasons from "@/constants/reportReasons";

interface Props {
  postTitle: string;
  reportUrl: string;
  reason: string;
  reporter: string;
}

const AdminNewReportNotificationTemplate = ({ postTitle, reportUrl, reason, reporter }: Props) => {
  const reasonLabel = reportReasons.find((item) => item.value === reason)?.label;

  return (
    <Html>
      <Head />
      <Preview>
        New report on the post – {postTitle} – {INFO.BUSINESS_NAME}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/commercials-we-hate.png`}
              width="100"
              alt={`${INFO.BUSINESS_NAME} Logo`}
            />
          </Section>

          <Heading style={h1}></Heading>

          <Section style={content}>
            <Text style={paragraph}>Hi there,</Text>

            <Text style={paragraph}>
              <b>{reporter}</b> just reported the post "<b>{postTitle}</b>" for the reason of:
            </Text>

            <Text style={commentBox}>{reasonLabel || "-"}</Text>

            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}${reportUrl}`}
              target="_blank"
              style={{ ...paragraph, textDecoration: "underline" }}
            >
              View Report
            </Link>

            <Text style={paragraph}>
              Best regards,
              <br />
              {INFO.BUSINESS_NAME} Team
            </Text>
          </Section>

          <Section>
            <Row style={footerLogos}>
              <Column style={{ width: "66%" }}>
                <Img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/commercials-we-hate.png`}
                  width="60"
                  alt={`${INFO.BUSINESS_NAME} Logo`}
                />
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNewReportNotificationTemplate;

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const commentBox = {
  ...paragraph,
  padding: "16px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
  whiteSpace: "pre-wrap",
  marginBottom: "10px",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
  width: "580px",
  maxWidth: "100%",
};

const logoContainer = {
  marginTop: "12px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "24px",
  fontWeight: "700",
  margin: "20px 0 0",
  padding: "0",
  lineHeight: "30px",
};

