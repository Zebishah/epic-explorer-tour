import {
  faBriefcase,
  faEdit,
  faMap,
  faMapLocationDot,
  faUserGroup,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhyEpicExplorer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto landing-page md:mt-0 ">
      <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-4 rounded-lg shadow-lg shadow-fade-black">
        Why Epic Explorer
      </h1>
      <section className="benefits-container grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16 w-[80%]">
        <div className="benefit-card bg-[#206eff] rounded-md shadow-lg shadow-fade-black  text-white p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="items-center text-4xl text-white"
          ></FontAwesomeIcon>
          <div className="flex flex-col items-center justify-center gap-y-0">
            <h3 className="mb-2 text-xl font-semibold text-white ">
              Explore & Discover
            </h3>
            <p className="text-center text-white ">
              Uncover hidden gems and cultural wonders with our curated
              exploration tours.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-[#206eff] rounded-md shadow-lg shadow-fade-black text-white p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faVanShuttle}
            className="items-center text-4xl text-white"
          ></FontAwesomeIcon>
          <div className="flex flex-col items-center justify-center gap-y-0">
            <h3 className="mb-2 text-xl font-semibold text-center text-white">
              Luxury Escapes
            </h3>
            <p className="text-center text-white">
              Indulge in opulence with our exclusive range of luxury travel
              experiences worldwide.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-[#206eff] rounded-md shadow-lg shadow-fade-black text-white p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            className="items-center text-4xl text-white"
          ></FontAwesomeIcon>
          <div className="flex flex-col items-center justify-center gap-y-0">
            <h3 className="mb-2 text-xl font-semibold text-center text-white">
              Adventure Expeditions
            </h3>
            <p className="text-center text-white">
              Thrilling adventures await! Join us for adrenaline-pumping
              journeys.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-[#206eff] rounded-md shadow-lg shadow-fade-black text-white p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faEdit}
            className="items-center text-4xl text-white"
          ></FontAwesomeIcon>
          <div className="flex flex-col items-center justify-center gap-y-0">
            <h3 className="mb-2 text-xl font-semibold text-center text-white">
              Customized Trips
            </h3>
            <p className="text-center text-white">
              Tailor-made travel packages designed to match your unique
              preferences and desires.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-[#206eff] rounded-md shadow-lg shadow-fade-black text-white p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="items-center text-4xl text-white"
          ></FontAwesomeIcon>
          <div className="flex flex-col items-center justify-center gap-y-0">
            <h3 className="mb-2 text-xl font-semibold text-center text-white">
              Group Retreats
            </h3>
            <p className="text-center text-white">
              Connect with like-minded travelers on group retreats to exciting
              destinations.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-[#206eff] rounded-md shadow-lg shadow-fade-black text-white p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faBriefcase}
            className="items-center text-4xl text-white"
          ></FontAwesomeIcon>
          <div className="flex flex-col items-center justify-center gap-y-0">
            <h3 className="mb-2 text-xl font-semibold text-center text-white">
              Wellness Retreats
            </h3>
            <p className="text-center text-white">
              Rejuvenate mind and body with our wellness retreats, combining
              relaxation and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Add other sections here */}
    </div>
  );
};

export default WhyEpicExplorer;
