import {
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  toast,
} from '@crowdcareaid-frontend/next-components';
import { ImageUploader } from './ImageUploader';
import { StepperFormActions } from './StepperActions';

interface SecondStepProps {
  form: any;
  images: { url: string; file: File }[];
  setImages: () => void;
}

export function SecondStepForm({ form, images, setImages }: SecondStepProps) {
  const today = new Date();
  function onSubmit(data: z.infer<typeof Schema.CreateCampaignSchema>) {
    toast({ title: 'Second step submitted!' });
  }

  return (
    <div className="py-5 w-full flex justify-center items-center">
      <div className="w-2/3 flex flex-col justify-start items-start">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex flex-row justify-between items-center w-full space-x-5">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <DatePicker
                        options={{ mode: 'range', minDate: today }}
                        value={value}
                        onChange={onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ImageUploader images={images} setImages={setImages} />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-xl text-black">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter some information about campaign"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <StepperFormActions />
          </form>
        </Form>
      </div>
    </div>
  );
}
