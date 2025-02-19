import { IMAGES } from '@crowdcareaid-frontend/assets';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  toast,
} from '@crowdcareaid-frontend/next-components';
import Image from 'next/image';
import { StepperFormActions } from './StepperActions';

interface CategoryOption {
  _id: string;
  name: string;
}

interface FirstStepFormProps {
  categoryData: CategoryOption[];
  form: any;
}

export function FirstStepForm({ categoryData, form }: FirstStepFormProps) {
  function onSubmit(data: z.infer<typeof Schema.CreateCampaignSchema>) {
    toast({ title: 'First step submitted!' });
  }

  return (
    <div className="py-5 w-full flex justify-center items-center">
      <div className="w-2/3 flex flex-col justify-start items-start">
        <div className="relative w-full rounded-lg h-64 bg-cover bg-center flex items-center justify-center">
          <Image
            src={IMAGES.CrowdScreenBG}
            layout="fill"
            objectFit="cover"
            alt="Background"
            className="rounded-lg"
          />
          <div className="absolute bottom-8 left-10 z-10 flex flex-col justify-start items-start">
            <Text variant={'primary'} className="text-brownOrange">
              Empower Change
            </Text>
            <Text className="text-white">Contribute to Our Cause Today</Text>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 py-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Enter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          className="font-poppins text-sm text-black font-bold"
                          placeholder="Select Your Category"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryData.map((option) => (
                          <SelectItem key={option._id} value={option._id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Location"
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
