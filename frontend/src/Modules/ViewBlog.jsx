import { useLocation } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { showBlogsById } from "../Redux/Slices/showAccommodationsSlice";
import { useEffect, useState } from "react";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";

const ViewBlog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [Blogs, setBlogs] = useState({});

  const dispatch = useDispatch();
  const { Blog } = useSelector((state) => state.showAccommodations);

  useEffect(() => {
    dispatch(showBlogsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Blog && Blog.blogs) {
      setBlogs(Blog.blogs);
    }
  }, [Blog]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  return (
    <div
      className="flex flex-col min-h-screen gap-y-44"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />

      <div className="p-4 px-4 mx-auto text-white bg-blue-600 rounded-lg shadow-lg max-w-7xl sm:px-6 lg:px-8 shadow-fade-black">
        <div className="max-w-3xl mx-auto">
          <div className="py-8">
            <h1 className="mb-2 text-3xl font-bold text-white">
              A Majestic Journey of {Blogs.name}
            </h1>
            <p className="text-sm text-white">
              Published on{" "}
              <time dateTime={Blogs.createdAt ? Blogs.createdAt : ""}>
                {formatDate(Blogs.createdAt)}
              </time>
            </p>
          </div>
          <img
            src={Blogs.pic}
            alt="Featured image"
            className="w-full h-auto mb-8"
          />
          <div className="mx-auto prose-sm prose sm:prose lg:prose-lg xl:prose-xl">
            <p>{Blogs.words}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewBlog;
