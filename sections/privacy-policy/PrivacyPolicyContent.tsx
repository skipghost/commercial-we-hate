import { Dot } from "lucide-react";

import { INFO } from "@/constants";

const PrivacyPolicyContent = () => {
  return (
    <>
      <section className="padding-y">
        <div className="container-2">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-5">Privacy Policy</h1>
            <p className="mb-6">
              {INFO.BUSINESS_NAME} ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy
              outlines how we collect, use, disclose, and safeguard your information when you visit our website{" "}
              {INFO.WEBSITE_URL} or engage with our services. By using our website and services, you consent to the
              practices described in this policy.
            </p>

            <h3 className="text-xl md:text-2xl font-medium mb-2">SMS and Electronic Signature Consent</h3>
            <p className="mb-4">
              By providing your phone number, you are expressly authorizing {INFO.BUSINESS_NAME} to contact you via text
              or phone at the home or mobile phone number provided. We may use SMS to confirm your appointment, send
              updates, or manage details of your job. You understand that messaging and data rates may apply. You may
              opt out of receiving updates at any time by replying STOP to any text message.
            </p>

            <h3 className="text-xl md:text-2xl font-medium mb-2">Information We Collect</h3>
            <p className="mb-4">
              We collect various types of information in connection with the services we provide, including:
            </p>
            <ul className="flex flex-col gap-4 mb-6">
              <ol className="flex gap-2">
                <p className="text-lg md:text-xl font-medium">1.</p>
                <div>
                  <h4 className="mb-1 text-xl font-medium">Personal Information</h4>
                  <p>
                    We may collect personal information that you provide to us, including but not limited to your name,
                    phone number, email address, and any other information you provide through our contact forms,
                    booking requests, or services.
                  </p>
                </div>
              </ol>

              <ol className="flex gap-2">
                <p className="text-lg md:text-xl font-medium">2.</p>
                <div>
                  <h4 className="mb-1 text-xl font-medium">Usage Data</h4>
                  <p>
                    We may collect information about your interactions with our website, including your IP address,
                    browser type, operating system, pages visited, and the date and time of your visit.
                  </p>
                </div>
              </ol>
            </ul>

            <h3 className="text-xl md:text-2xl font-medium mb-2">How We Use Your Information</h3>
            <p className="mb-4">We use the information we collect for the following purposes:</p>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                "To Provide Services: To process and manage your requests, respond to your inquiries, and provide you with the services you request.",
                "To Improve Our Services: To analyze and improve our website and services based on your feedback and usage data.",
                "To Communicate with You: To send you updates, promotional offers, and other information related to our services. You can opt out of receiving these communications at any time.",
              ].map((item) => (
                <li
                  className="flex"
                  key={item}
                >
                  <Dot className="flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-xl md:text-2xl font-medium mb-2">Data Sharing and Disclosure</h3>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                "We do not sell or rent your personal information to third parties for marketing purposes.",
                "We may share your information with trusted partners to help facilitate your service request or appointment.",
              ].map((item) => (
                <li
                  className="flex"
                  key={item}
                >
                  <Dot className="flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-xl md:text-2xl font-medium mb-2">Security of Your Information</h3>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, loss, or disclosure. However, no method of transmission over the internet or
              electronic storage is completely secure, so we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl md:text-2xl font-medium mb-2">Your Rights</h3>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information that we hold. If you would like
              to exercise these rights, please contact us using the information provided below.
            </p>

            <h3 className="text-xl md:text-2xl font-medium mb-2">Changes to This Privacy Policy</h3>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal
              requirements. We will notify you of any significant changes by posting the updated policy on our website.
              Your continued use of our website and services after such changes indicates your acceptance of the updated
              Privacy Policy.
            </p>

            <h3 className="text-xl md:text-2xl font-medium mb-2">Contact Us</h3>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
              at:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2">
                <b>Phone:</b>
                {INFO.PHONE_NUMBER}
              </li>

              <li className="flex gap-2">
                <b>Email:</b>
                {INFO.EMAIL_ADDRESS}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyContent;

