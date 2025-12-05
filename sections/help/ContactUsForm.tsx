"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { createRequest } from "@/lib/actions/request.actions";
import { isActionError, showToast } from "@/lib/utils";

import CustomFormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { contactSchema } from "@/constants/schemas";

interface ContactUsFormProps {
  onSubmitCallback?: () => void;
}

const ContactUsForm = ({ onSubmitCallback }: ContactUsFormProps) => {
  const { user } = useUser();

  const form = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: `${user?.firstName || ""} ${user?.lastName || ""}`,
      email: user?.emailAddresses[0].emailAddress!,
      message: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: yup.InferType<typeof contactSchema>) => {
    setLoading(true);
    try {
      const { message, name, email } = data;

      const response = await createRequest({
        message,
        name,
        email,
      });

      if (!response || isActionError(response)) {
        showToast(response?.error || "Something went wrong. Please try again.", {
          variant: "destructive",
        });
        return;
      } else {
        showToast("Thanks! Your request has been submitted.", {
          variant: "success",
        });

        form.reset();
        onSubmitCallback && onSubmitCallback();
      }
    } catch (error: any) {
      showToast(error.message || "We couldn’t send your request. Try again later.", {
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="space-y-4"
      >
        <CustomFormField
          name="name"
          label="Full Name"
          required
        >
          <Input placeholder="Full Name" />
        </CustomFormField>

        <CustomFormField
          name="email"
          label="Email Address"
          required
        >
          <Input placeholder="Email Address" />
        </CustomFormField>

        <CustomFormField
          name="message"
          label="Message"
        >
          <Textarea
            rows={6}
            placeholder=""
          />
        </CustomFormField>

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactUsForm;

