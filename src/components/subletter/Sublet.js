import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../../images/house-2.png";
import PropTypes from "prop-types";
import { listFilesInFolder, imageLinkURL } from "../../utility/s3-upload";
import ImageGallery from "react-image-gallery";
import noimage from "../../images/noimage.jpg";
import { useAuth0 } from "@auth0/auth0-react";


const Sublet = ({ sublet }) => {
  const [imageLinks, setImageLink] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const calendar = {
    "01": "January",
    "02": "Feburary",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  const {
    houseaddress,
    slug,
    rent,
    bedrooms,
    bathrooms,
    preferredgender,
    begindate,
    enddate
  } = sublet;
  useEffect(() => {
    async function loadPictures() {
      if (!loaded) {
        let author = sublet.tenant;
        let pictures = await listFilesInFolder("sublet/" + author + "/" + slug);
        let imageContents = pictures.Contents;
        if (imageContents.length === 0) {
          imageLinks.push({ original: noimage, thumbnail: noimage });
        } else {
          for (let imageContent of imageContents) {
            let source = imageLinkURL(imageContent.Key);
            imageLinks.push({ original: source, thumbnail: source });
          }
        }
        setLoaded(true);
      }
    }
    function parseDate(date) {
      let dateForm = date;
      let begindateForm = dateForm.split("T")[0];
      let array = begindateForm.split("-");
      let month = array[1];
      let year = array[0];
      let monthAlph = calendar[month];
      return monthAlph + " " + year;
    }
    loadPictures();
    let begin = parseDate(begindate);
    let end = parseDate(enddate);
    setBeginDate(begin);
    setEndDate(end);

  }, []);

  return (
    <div className="box">
      <div className="thumbnail">
        <ImageGallery
          items={imageLinks}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          showNav={false}
          disableKeyDown={true}
        />
      </div>
      <div className="price-top">
        <h6> ${rent}</h6>
        <p>per month</p>
      </div>
      <div className="sublet-info">
        <div className="sublet-info-address">{houseaddress}</div>
        <div className="sublet-info-button">
        {/* /${sublet.tenant.split(" ").join("-")} */}
          <Link to={`/sublet/${slug}` + "/" + sublet.tenant.split(" ").join("-")} className="btn-primary">
            {" "}
            Link{" "}
          </Link>
        </div>
        <div className="sublet-info-info">
          Bedrooms: {bedrooms} <br></br>
          Bathrooms: {bathrooms} <br></br>
          Preferred Gender: {preferredgender}
        </div>
        <div className="sublet-dates">
          Begin Date: {beginDate} <br></br>
          End Date: {endDate}
        </div>
      </div>
    </div>
  );
};
export default Sublet;

Sublet.propTypes = {
  sublet: PropTypes.shape({
    houseaddress: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    rent: PropTypes.number.isRequired
  })
};
