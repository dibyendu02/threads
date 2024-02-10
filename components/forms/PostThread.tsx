"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userValidation } from "@/lib/validations/user";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { threadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

const PostThread = ({userId}:{userId: string}) => {


  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThread({
        text: values.thread,
        author: userId,
        communityId: "",
        path: pathname
    });

    router.push('/');
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-light-2 md:mt-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder=""
                  {...field}
                  className="account-form_image-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-blue">
          Post Thread
        </Button>
      </form>
    </Form>
  )
}

export default PostThread