import image1 from "../images/full-shot-man-carrying-baggage.jpg";
const RelatedHotels = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center p-8 space-y-14">
      <h1 className="text-5xl text-yellows font-joining ">Related Transport</h1>
      <div className="flex flex-row bg-light-black gap-x-10 md:mt-0 sssm:mt-72 gap-y-4 md:flex-nowrap sssm:flex-wrap">
        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <img src={image1} className="w-full" />
          <div className="px-4 py-6 border-2 border-t-0 border-yellows ">
            <div className="flex flex-row justify-between">
              <h3 className="text-xl text-yellows font-radios">Heading</h3>
              <h3 className="text-xl text-yellows font-radios">10,000 pkr</h3>
            </div>

            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <img src={image1} className="w-full" />
          <div className="px-4 py-6 border-2 border-t-0 border-yellows">
            <div className="flex flex-row justify-between">
              <h3 className="text-xl text-yellows font-radios">Heading</h3>
              <h3 className="text-xl text-yellows font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="px-6 py-2.5 rounded text-[14px] font-radios border-none outline-none bg-yellows text-black"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <img src={image1} className="w-full" />
          <div className="px-4 py-6 border-2 border-t-0 border-yellows">
            <div className="flex flex-row justify-between">
              <h3 className="text-xl text-yellows font-radios">Heading</h3>
              <h3 className="text-xl text-yellows font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="px-6 py-2.5 rounded text-[14px] tracking-wider font-radios border-none outline-none bg-yellows text-black"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="p-2 text-black rounded-lg bg-yellows">
        See More
      </button>
    </div>
  );
};

export default RelatedHotels;
