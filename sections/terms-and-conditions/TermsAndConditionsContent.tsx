import { Dot } from "lucide-react";

import { INFO } from "@/constants";

const TermsAndConditionsContent = () => {
  return (
    <section className="padding-y">
      <div className="container-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-5">Terms & Conditions</h1>
          <p className="mb-6">
            These Terms and Conditions ("Terms") govern your use of {INFO.WEBSITE_URL} (the "Site") and the services
            provided by {INFO.BUSINESS_NAME} ("we," "us," or "our"). By accessing or using our Site, you agree to be
            bound by these Terms.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Use of the Website</h3>
          <p className="mb-4">
            You agree to use the Site in a manner consistent with all applicable laws and regulations. You must not
            misuse the Site by knowingly introducing viruses, trojans, or other malicious content.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">User Content</h3>
          <p className="mb-4">
            Users may post content such as comments or links. By posting, you grant us a non-exclusive, royalty-free,
            perpetual license to use, modify, and display your content. We reserve the right to remove any content that
            violates these Terms or is deemed inappropriate.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Intellectual Property</h3>
          <p className="mb-4">
            All content on the Site, including logos, text, graphics, and layout, is the property of{" "}
            {INFO.BUSINESS_NAME} or its licensors and is protected by copyright and other intellectual property laws.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Prohibited Conduct</h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              "Impersonating any person or entity.",
              "Posting offensive, harmful, or misleading content.",
              "Attempting to gain unauthorized access to the Site or its users.",
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

          <h3 className="text-xl md:text-2xl font-medium mb-2">Termination</h3>
          <p className="mb-4">
            We may terminate or suspend your access to the Site without prior notice if you violate these Terms or
            engage in conduct we deem harmful to the community or our operations.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Limitation of Liability</h3>
          <p className="mb-4">
            We are not liable for any indirect, incidental, or consequential damages arising from your use of the Site.
            We do not guarantee that the Site will be secure or free from bugs or viruses.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Changes to These Terms</h3>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting on the Site.
            Continued use of the Site after changes means you accept the revised Terms.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Governing Law</h3>
          <p className="mb-4">
            These Terms are governed by and construed in accordance with the laws of your applicable jurisdiction.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Contact Us</h3>
          <p className="mb-4">If you have questions or concerns about these Terms, you can contact us at:</p>

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

export default TermsAndConditionsContent;

