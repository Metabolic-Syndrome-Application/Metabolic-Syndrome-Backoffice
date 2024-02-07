type FormCardProps = {
  heading: string;
  children: React.ReactNode;
};

const FormCard = ({ heading, children }: FormCardProps) => {
  return (
    <div className='h-fit rounded-lg border p-6'>
      <h1 className='bg-background rounded px-4 py-2 font-semibold'>
        {heading}
      </h1>
      <div>{children}</div>
    </div>
  );
};

export default FormCard;
