const UserBooking = () => {
  const bookingsData = [
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },

    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },

    // Add more bookings as needed
  ];

  return (
    <div className="bg-light-black min-h-screen flex flex-col justify-center items-center w-[100%]">
      <h1 className="my-10 text-4xl font-bold text-yellows">Bookings</h1>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {bookingsData.map((booking, index) => (
          <div
            key={index}
            className="bg-fade-black shadow-lg text-white p-4 rounded-lg flex flex-col smd:flex-row justify-between items-center space-x-4 w-[70%]"
          >
            <div className="flex flex-col items-center justify-between flex-1 md:flex-row md:space-x-4">
              <span className="font-bold text-yellows">{booking.id}</span>
              <span className="font-radios ">{booking.tour}</span>
              <span className="font-radios ">{booking.name}</span>
              <span className="font-radios ">{booking.email}</span>
              <span className="font-radios ">{booking.date}</span>
            </div>
            <button className="px-4 py-2 text-gray-900 rounded-lg bg-yellows">
              Details
            </button>
          </div>
        ))}
      </div>
      <button className="px-6 py-2 mt-10 text-gray-900 rounded-lg bg-yellows">
        See More
      </button>
    </div>
  );
};

export default UserBooking;
