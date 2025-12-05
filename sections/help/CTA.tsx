"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import ContactUsForm from "./ContactUsForm";

const CTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-lg shadow-primary/10 mt-20 p-10 rounded-xl border border-gray-600 dark:bg-black">
      <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
      <p className="mb-10">Need more help? Start a thread or contact us to connect with the community.</p>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button variant="secondary">Submit Request</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle className="mb-4 font-bold text-xl">Contact Us</DialogTitle>
          </DialogHeader>
          <ContactUsForm onSubmitCallback={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CTA;

