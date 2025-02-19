type SignUpPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type ResetPayload = {
  email: string;
};

type VerifyOTPPayload = {
  email: string;
  otp: string;
};

type NewPassword = {
  email: string;
  newPassword: string;
};

type UserDataPayload = {
  firstName: string;
  lastName: string;
  aboutMe: string;
  phone: string;
  country: string;
  region?: string;
  dob: string;
  gender: string;
};

type ResetPasswordResponse = {
  success: boolean;
  data: { message: string };
};
type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  region?: string;
  dob: Date;
  gender: string;
  aboutMe: string;
  phone: string;
  profileImageUrl?: string;
};

type UploadImagesPayload = {
  images: File[];
};

type CreateCampaignPayload = {
  title: string;
  location: string;
  category: string;
  amount: string;
  duration: [Date, ...Date[]];
  description: string;
  images: string[];
};

type Category = {
  _id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Address = {
  name: string;
  formattedAddress: string;
  _id: string;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  otp: string | null;
  otpExpiry: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  aboutMe: string;
  country: string;
  dob: string;
  gender: string;
  phone: string;
};

type CampaignData = {
  _id: string;
  title: string;
  description: string;
  amount: string;
  duration: string;
  category: Category;
  address: Address;
  images: string[];
  createdBy: User;
  raisedAmount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rating: number;
};

type Country = {
  country_name: string;
  country_short_name: string;
};

type StepperFormProps = {
  categoryData: Category[];
  countriesData: Country[];
};
type CategoryItem = {
  _id: string;
  name: string;
  logo: string;
};
type ApiResponse = {
  data: CategoryItem[];
  message: string;
  status: number;
};
type TransformCategoryData = {
  id: string;
  title: string;
  img: string;
};
type CategoriesData = TransformCategoryData[];
