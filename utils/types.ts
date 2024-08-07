export type InitialFormState = {
  message: string;
};

export type FormAction = (
  prevState: InitialFormState,
  formData: FormData
) => Promise<{ message: string }>;

export type ReviewCardProps = {
  reviewInfo: {
    type: "user" | "product";
    title: string;
    rating: number;
    comment: string;
    image: string;
    productID?: string;
  };
  children?: React.ReactNode;
};
