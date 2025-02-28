const HotelServices = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 pl-20 pr-20 mt-16 space-y-6 xl:flex-row bg-light-black md:space-y-0 md:space-x-6">
      {/* Form Section */}

      <div className="bg-dark p-8 min-h-screen flex flex-col gap-y-4 items-center justify-center overflow-hidden w-[100%]">
        <div className="px-4 py-4 mb-8 text-center rounded bg-yellows">
          <h1 className="text-2xl font-bold font-radios">
            Services and Itineraries of Hotel
          </h1>
        </div>
        <div className="flex flex-col items-center bg-fade-black p-8 rounded-lg shadow-lg border-2 border-yellows xl:w-[50%] sssm:w-[90%] h-[80%]">
          <h2 className="mb-4 text-lg font-bold text-yellows">Room details:</h2>
          <div className="flex flex-row justify-between w-full gap-6 ">
            <ul className="flex flex-col list-disc list-inside font-radios text-yellows gap-y-8">
              <li>Room Type:</li>
              <li>Max People:</li>
              <li>Door Count:</li>
              <li>Transmission:</li>
              <li>Air-conditioned:</li>
              <li>Seats:</li>
              <li>Hybrid:</li>
              <li>Condition:</li>
              <li>Available:</li>
              <li>Fault:</li>
            </ul>
            <ul className="flex flex-col text-white list-none font-radios gap-y-8">
              <li>Honda civic reborn</li>
              <li>Max People will be 6</li>
              <li>Door Count are 4</li>
              <li>Transmission is manual</li>
              <li>Yes it is Air-conditioned</li>
              <li>Seats are 6</li>
              <li>Yes it is Hybrid</li>
              <li>Condition is fully new</li>
              <li>Yes it is Available</li>
              <li>No there is no Fault</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 w-full md:w-[80%] lg:w-[30%] p-4">
        <div className="flex flex-col items-center justify-center flex-1 p-6 border-2 rounded-lg shadow-lg bg-fade-black border-yellows">
          <h2 className="mb-4 text-lg font-bold text-yellows font-radios">
            For Enquiry
          </h2>
          <p className="text-center text-white font-radios">
            Call us on +92-51-5739027 for individual, tailored advice for your
            perfect stay or send us a message with your hotel booking query.
          </p>
          <p className="mt-4 text-yellows font-radios">
            Email: zebhaider123@gmail.com
          </p>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-6 space-y-4 border-2 rounded-lg shadow-lg bg-fade-black border-yellows">
          <h2 className="mb-4 text-lg font-bold text-yellows font-radios">
            Weather updates for Skardu
          </h2>

          <div className="text-center">
            <p className="text-2xl text-yellows font-radios">Sunny Day</p>
            <p className="text-white font-radios">30% temp | 30% percep</p>
            <p className="text-white font-radios">
              Its a sunny and hot day in Skardu
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-6 border-2 rounded-lg shadow-lg bg-fade-black border-yellows">
          <h2 className="mb-4 text-lg font-bold text-yellows font-radios">
            For Enquiry
          </h2>
          <p className="text-center text-white font-radios">
            Call us on +92-51-5739027 for individual, tailored advice for your
            perfect stay or send us a message with your hotel booking query.
          </p>
          <p className="mt-4 text-yellows font-radios">
            Email: zebhaider123@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelServices;
