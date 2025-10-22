import { useNavigate } from "react-router-dom";
const NotFind = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FCFEFD] relative  h-screen w-full  ">
      <div className="md:flex block absolute left-0 right-0 top-20 md:top-1/4 bo max-w-3xl w-fit justify-around  mx-auto">
        {/* <img
          src={QM}
          alt=""
          className="  rounded-lg  w-[250px] h-[250px] mb-8  mx-auto "
        /> */}
        <div className=" w-60 mx-auto ">
          <h1 className="font-bold">صفحه ای یافت نشد </h1>
          <p className="mt-4 text-justify">
            متاسفیم که صفحه مورد نظر شما یافت نشد. ممکن است آدرس صفحه را اشتباه
            وارد کرده باشید یا صفحه مورد نظر به دلایلی حذف شده باشد. برای یافتن
            اطلاعات مورد نظر خود، می‌توانید از نوار جستجو استفاده کنید یا به
            صفحه اصلی برگردید. تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات
            شما است.
          </p>
          <button
            className={`text-nowrap bg-blue-500 text-white w-full mx-auto h-12  block mt-10 rounded-[10px]  `}
            onClick={() => navigate("/")}
          >
            برگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFind;
