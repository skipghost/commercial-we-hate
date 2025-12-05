import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createReport } from "@/lib/actions/report.actions";
import { cn, isActionError, showToast } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import reportReasons from "@/constants/reportReasons";

import { ReportsReasonEnum, ReportsStatusEnum } from "@/types/enums";
import { PostDTOPopulatedUser } from "@/types/post.types";

// Zod schema
const FormSchema = z.object({
  reason: z.enum(reportReasons.map((item) => item.value) as [string, ...string[]], {
    required_error: "Please select a reason.",
  }),
});
interface ReportReasonFormProps {
  username: string;
  post: PostDTOPopulatedUser;
  onSubmitCallback?: () => void;
  loading?: boolean;
  setLoading?: (val: boolean) => void;
}

const ReportReasonForm = ({ post, onSubmitCallback, loading = false, setLoading }: ReportReasonFormProps) => {
  const { user } = useUser();
  const [reason, setReason] = useState<ReportsReasonEnum | "">("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const userId = user?.publicMetadata?.userId as string;

  const handleReportPost = async (data: z.infer<typeof FormSchema>) => {
    if (!userId) {
      showToast("You must be logged in to report the post.", { variant: "destructive" });
      return;
    }

    if (setLoading) setLoading(true);

    try {
      const result = await createReport({
        postId: post._id,
        reporterId: userId,
        reason: data.reason,
        status: ReportsStatusEnum.PENDING,
      });

      if (isActionError(result)) {
        showToast(result.error || "Failed to report the post.", { variant: "destructive" });
        return;
      }

      // showToast("Post reported successfully!", { variant: "success" });
      if (onSubmitCallback) onSubmitCallback();
    } catch (error) {
      console.error(error);
      showToast("Failed to report the post.", { variant: "destructive" });
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
  }, [post]);

  return (
    <div>
      <p className="mb-4 text-sm text-text-title">
        Please select a reason for reporting this post. This will notify moderators for review.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleReportPost)}
          className="space-y-6 mt-4"
        >
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => {
                      field.onChange(val);
                      setReason(val as ReportsReasonEnum);
                    }}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-x-4 gap-y-2"
                  >
                    {reportReasons.map((type) => (
                      <FormItem
                        key={type.value}
                        className="relative"
                      >
                        <FormLabel
                          className={cn(
                            "cursor-pointer w-full flex flex-col items-center text-center rounded-md border border-gray-300 px-4 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-gray-400 transition-all duration-200",
                            field.value === type.value && "!border-primary !shadow-md"
                          )}
                        >
                          <h3
                            className={cn(
                              "text-sm font-medium text-text-title",
                              field.value === type.value && "text-primary"
                            )}
                          >
                            {type.label}
                          </h3>
                        </FormLabel>
                        <FormControl className="absolute inset-0 opacity-0">
                          <RadioGroupItem value={type.value} />
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              className="min-w-[10rem]"
              loading={loading}
            >
              Report
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReportReasonForm;

