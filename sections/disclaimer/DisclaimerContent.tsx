import { Dot } from "lucide-react";

import { INFO } from "@/constants";

const DisclaimerContent = () => {
  return (
    <section className="padding-y">
      <div className="container-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-5">Disclaimer</h1>
          <p className="mb-6">
            The information provided on {INFO.WEBSITE_URL} ("the Site") by {INFO.BUSINESS_NAME} ("we," "us," or "our")
            is for general informational purposes only. All content is provided in good faith, however, we make no
            representations or warranties of any kind, express or implied, regarding the accuracy, adequacy, validity,
            reliability, or completeness of any information on the Site.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">No Professional Advice</h3>
          <p className="mb-4">
            The Site may contain user-generated content, commentary, or opinions. These are for entertainment and
            discussion purposes only and do not constitute legal, marketing, or professional advice of any kind.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">External Links Disclaimer</h3>
          <p className="mb-4">
            The Site may contain links to other websites or content belonging to third parties. We do not investigate,
            monitor, or guarantee the accuracy or reliability of third-party information linked through our platform.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">User-Generated Content</h3>
          <p className="mb-4">
            Content posted by users, including opinions, links, and video submissions, reflects the views of the
            individual authors and not necessarily those of {INFO.BUSINESS_NAME}. We do not verify or endorse any
            user-submitted content.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Limitation of Liability</h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              "We are not responsible for any loss or damage resulting from reliance on information presented on the Site.",
              "Your use of the Site and its content is solely at your own risk.",
              "We do not guarantee uninterrupted or error-free access to the Site.",
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

          <h3 className="text-xl md:text-2xl font-medium mb-2">Content Changes and Updates</h3>
          <p className="mb-4">
            We may update the Site content at any time without prior notice. However, we are under no obligation to
            ensure the content is current or complete.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Contact Us</h3>
          <p className="mb-4">If you have any questions or concerns about this Disclaimer, feel free to contact us:</p>

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

export default DisclaimerContent;

