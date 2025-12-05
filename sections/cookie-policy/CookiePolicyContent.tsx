import { Dot } from "lucide-react";

import { INFO } from "@/constants";

const CookiePolicyContent = () => {
  return (
    <section className="padding-y">
      <div className="container-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-5">Cookie Policy</h1>
          <p className="mb-6">
            This Cookie Policy explains how {INFO.BUSINESS_NAME} ("we," "us," or "our") uses cookies and similar
            technologies when you visit {INFO.WEBSITE_URL} ("the Site"). By continuing to browse the Site, you agree to
            our use of cookies as described in this policy.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">What Are Cookies?</h3>
          <p className="mb-4">
            Cookies are small text files stored on your device by your browser when you visit a website. They help the
            Site remember your preferences, enhance functionality, and gather usage data to improve performance.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Types of Cookies We Use</h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              "Essential Cookies – Necessary for the website to function properly (e.g., login, security).",
              "Performance Cookies – Help us understand how visitors use our website by collecting anonymous information.",
              "Functional Cookies – Remember your preferences and choices to improve your experience.",
              "Analytics Cookies – Provide data on how users interact with our content so we can make improvements.",
            ].map((item) => (
              <li
                key={item}
                className="flex"
              >
                <Dot className="flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Third-Party Cookies</h3>
          <p className="mb-4">
            We may use third-party services like Google Analytics or embedded media (e.g., YouTube) that set their own
            cookies to track engagement or provide additional features. These cookies are subject to their own privacy
            and cookie policies.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Managing Cookies</h3>
          <p className="mb-4">
            Most web browsers allow you to manage or disable cookies through their settings. Please note that disabling
            cookies may affect the functionality of the Site and limit your user experience.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Updates to This Policy</h3>
          <p className="mb-4">
            We may update this Cookie Policy periodically to reflect changes in legal requirements or how we use
            cookies. We encourage you to review this page regularly for the latest information.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Contact Us</h3>
          <p className="mb-4">
            If you have any questions or concerns about our use of cookies, feel free to contact us:
          </p>

          <ul className="flex flex-col gap-2">
            <li className="flex gap-2">
              <b>Phone:</b> {INFO.PHONE_NUMBER}
            </li>
            <li className="flex gap-2">
              <b>Email:</b> {INFO.EMAIL_ADDRESS}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicyContent;

