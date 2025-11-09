import DefaultLayout from "@/layouts/default";
import DynamicCarousel from "@/components/Carousel";

function index() {
  return (
    <>
      <DefaultLayout>
        {/* <h1>Hi 👻</h1> */}
        <DynamicCarousel />

      </DefaultLayout>
    </>
  );
}

export default index;
