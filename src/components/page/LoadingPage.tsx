import Spinner from "@/components/Spinner";

const LoadingPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center -translate-y-16">
      <Spinner size={45} />
    </div>
  );
};

export default LoadingPage;
