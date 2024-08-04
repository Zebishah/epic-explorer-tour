import { useEffect, useState } from "react";
import Footer from "./Footer";
import image from "../image/Family Packages (24).png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { showBlogs } from "../Redux/Slices/showAccommodationsSlice";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import SingleNavbar from "./SingleNavbar";
import { ToastContainer } from "react-toastify";
const Blogs = () => {
  const [Blogs, setBlogs] = useState([]);
  // const [FamilyTours, setFamilyTours] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.showAccommodations);

  useEffect(() => {
    dispatch(showBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blogs) {
      if (blogs.blogs) {
        setBlogs(blogs.blogs);
        console.log(Blogs);
      }
    }
  }, [blogs]);
  // const seeMore = () => {
  //   navigate(`/AllTourPackages`);
  // };
  const viewBlog = (id) => {
    navigate(`/ViewBlog?id=${encodeURIComponent(id)}`);
  };
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
  return (
    <>
      {" "}
      <ToastContainer />
      <div
        className="z-10 flex flex-col w-full h-full gap-y-24" /* Lower z-index for the banner */
        style={{
          backgroundImage: `url(${image2})`,
        }}
      >
        <SingleNavbar />

        <div className="relative font-sans pointer-events-none before:absolute before:w-full before:h-full before:inset-0 before:opacity-90 before:z-10">
          <img
            src={image}
            alt=".."
            className="absolute inset-0 object-cover w-full h-full "
          />

          <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6"></div>
        </div>
        <section className="py-24 ">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="p-3 text-4xl font-bold text-center text-white bg-blue-700 shadow-lg rounded-xl font-manrope mb-14">
              Our popular blogs
            </h2>
            <div className="flex flex-wrap justify-center mb-14 gap-y-10 lg:gap-y-10 lg:flex-row lg:justify-between lg:gap-x-8 ">
              {Blogs.map((blog, index) => (
                <div
                  className="group flex flex-col gap-y-4 cursor-pointer w-full max-lg:max-w-xl lg:w-[30%] border bg-white shadow-lg shadow-fade-black border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600 ease-out hover:shadow-black hover:scale-110"
                  key={index}
                  onClick={() => viewBlog(blog._id)}
                >
                  <div className="flex items-center">
                    <img
                      src={blog.pic}
                      alt="Alexa image"
                      className="w-full h-56 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-y-5">
                    <h4 className="text-gray-900 font-radios">
                      A Majestic Journey of {blog.name}
                    </h4>
                    <h4 className="text-sm text-gray-900 line-clamp-4 text-start">
                      {blog.words}
                    </h4>
                    <button
                      className="p-3 text-white transition-all duration-300 ease-out bg-blue-600 rounded-lg shadow-lg hover:shadow-black hover:scale-110 "
                      onClick={() => viewBlog(blog._id)}
                    >
                      View Blog
                    </button>
                    <div className="flex items-center justify-between font-medium">
                      <h6 className="text-sm text-gray-500">{blog.writer}</h6>
                      <span className="text-sm text-indigo-600">
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Blogs;
