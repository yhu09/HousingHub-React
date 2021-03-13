import React, { useState, useEffect, useContext, useCallback } from "react";
import "./HouseForm.css";
import { uploadFile } from "../../utility/s3-upload";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { APIBASE } from "../../utility/api-base";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../../context";

const defaultCoord = {
  lat: 42.4085,
  lng: -71.1183
};

export const HouseForm = () => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, getHouse } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ZIP, setZIP] = useState("");
  const [unitLevel, setUnitLevel] = useState("lower");
  const [laundry, setLaundry] = useState(false);
  const [basement, setBasement] = useState(false);
  const [yard, setYard] = useState(false);
  const [parking, setParking] = useState(false);
  const [porch, setPorch] = useState(false);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [rent, setRent] = useState(875);
  const [files, setFiles] = useState([]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [newHouse, setNewHouse] = useState(null);
  const [connectedHouse, setConnectedHouse] = useState("");
  const [description, setDescription] = useState("");

  const APIKey = process.env.REACT_APP_GoogleMapsAPIKey;

  var temporaryFilesStorage = {};

  const fetchToken = useCallback(async () => {
    if (!isTokenSet()) {
      try {
        if (isAuthenticated) {
          let tempToken = await getAccessTokenSilently({
            audience: APIBASE
          });
          setToken(tempToken);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isTokenSet, setToken, isAuthenticated, getAccessTokenSilently]);

  async function getCoordinates() {
    let coord = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        houseAddress +
        "," +
        city +
        "," +
        state +
        "&key=" +
        APIKey
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK") {
          console.log("GOOD");
          let coord = data.results[0].geometry.location;
          return [coord.lat, coord.lng];
        } else {
          console.log("WRONG");
          alert("The address you have entered is invalid");
          window.location.replace("http://localhost:3000/houseform");
          //return [defaultCoord.lat, defaultCoord.lng];
        }
      });
    return coord;
  }

  async function handleSubmit() {
    let coord = await getCoordinates();
    let latitude = coord[0];
    let longitude = coord[1];

    let slug = houseAddress.split(" ").join("-");
    let path = slug + "/";

    for (var file of files) {
      uploadFile(path, file);
    }

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        landlordEmail: landlordEmail,
        landlordName: landlordName,
        houseAddress: houseAddress,
        stateName: state,
        city: city,
        ZIP: ZIP,
        rent: rent,
        unitLevel: unitLevel,
        laundry: laundry,
        basement: basement,
        yard: yard,
        parking: parking,
        porch: porch,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        reviewRatings: [],
        description: description,
        connectedHouse: connectedHouse,
        latitude: latitude,
        longitude: longitude
      })
    };
    console.log("request options: " + requestOptions.body);

    var requestGet = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    
    var duplicateHouse = false;
    try {
      await fetch(APIBASE + "houses/houseAddress/?houseAddress=" + houseAddress, requestGet)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          duplicateHouse = true;
          console.log("NO POSTING ALLOWED");
          alert("This house is already in the database! Taking you to the posting.")
        } else {
          duplicateHouse = false;
          console.log("POSTING ALLOWED");
        }
      });
    } catch(err) {
      console.log("Error");
    }

    if (!duplicateHouse) {
      try {
        await fetch(APIBASE + "houses", requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              setNewHouse(true);
            }
          });
      }
      catch(err) {
        console.log("ERROR")
      }
      console.log("House form submitted");
      setReadyToSubmit(false);
      // var url = "https://master.d2foc06eaqufr.amplifyapp.com/houses/" + slug;
    }
    var url = "http://localhost:3000/houses/" + slug;
    window.location.replace(url);
  }

  Survey.StylesManager.applyTheme("winterstone");

  let json = {
    title: "Make a house entry",
    pages: [
      {
        name: "page1",
        navigationTitle: "Where Is It?",
        navigationDescription: "House info",
        elements: [
          {
            type: "image",
            name: "first_page_image",
            imageLink:
              "https://pinehallbrick.com/wp-content/uploads/2020/05/lb_tufts_gso2.jpg",
            imageFit: "none",
            imageHeight: 726,
            imageWidth: 500,
            width: "600px"
          },
          {
            type: "panel",
            name: "first_page_container_panel",
            elements: [
              {
                type: "panel",
                name: "house_information",
                isRequired: true,
                elements: [
                  {
                    type: "text",
                    name: "house_address",
                    isRequired: true,
                    title: "House address"
                  },
                  {
                    type: "text",
                    name: "city",
                    isRequired: true,
                    title: "City"
                  },
                  {
                    type: "dropdown",
                    name: "state",
                    title: "State",
                    isRequired: true,
                    choicesByUrl: {
                      url:
                        "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json",
                      valueName: "name"
                    }
                  },
                  {
                    type: "text",
                    name: "zip_code",
                    title: "Zip Code",
                    isRequired: true,
                    inputType: "text"
                  },
                  {
                    type: "text",
                    name: "rent",
                    title: "Rent per person",
                    isRequired: true,
                    inputType: "number"
                  }
                ],
                title: "House Information",
                showNumber: true,
                showQuestionNumbers: "off"
              }
            ],
            startWithNewLine: false
          }
        ]
      },
      {
        name: "page2",
        navigationTitle: "Who Owns It?",
        navigationDescription: "Landlord info",
        elements: [
          {
            type: "panel",
            name: "first_page_container_panel",
            isRequired: true,
            elements: [
              {
                type: "panel",
                name: "landlord_information",
                isRequired: true,
                elements: [
                  {
                    type: "text",
                    name: "landlord_name",
                    isRequired: true,
                    title: "Landlord Name"
                  },
                  {
                    type: "text",
                    name: "landlord_email",
                    title: "Landlord Email",
                    isRequired: false,
                    inputType: "email"
                  }
                ],
                title: "House Information",
                showNumber: true,
                showQuestionNumbers: "off"
              }
            ],
            startWithNewLine: false
          }
        ]
      },
      {
        name: "page3",
        navigationTitle: "Tell Us More!",
        navigationDescription: "Detailed House Info",
        elements: [
          {
            type: "panel",
            name: "detailed_house_info",
            elements: [
              {
                type: "boolean",
                name: "Laundry",
                labelTrue: "Yes",
                labelFalse: "No",
                isRequired: true,
                hideNumber: true
              },
              {
                type: "boolean",
                name: "Basement",
                labelTrue: "Yes",
                labelFalse: "No",
                isRequired: true,
                hideNumber: true
              },
              {
                type: "boolean",
                name: "Yard",
                labelTrue: "Yes",
                labelFalse: "No",
                isRequired: true,
                hideNumber: true
              },
              {
                type: "boolean",
                name: "Parking",
                labelTrue: "Yes",
                labelFalse: "No",
                isRequired: true,
                hideNumber: true
              },
              {
                type: "boolean",
                name: "Porch",
                labelTrue: "Yes",
                labelFalse: "No",
                isRequired: true,
                hideNumber: true
              },
              {
                type: "text",
                name: "bedrooms",
                title: "Number of Bedrooms",
                isRequired: true,
                inputType: "number"
              },
              {
                type: "text",
                name: "bathrooms",
                title: "Number of Bathrooms",
                isRequired: true,
                inputType: "number"
              },
              {
                type: "dropdown",
                name: "unit",
                title: "Unit level",
                isRequired: true,
                colCount: 0,
                choices: ["upper", "lower", "entire house"]
              },
              {
                type: "text",
                name: "connectedHouse",
                title: "Connected House (Street Address. Ex. 355 Boston Ave)",
                isRequired: false,
                inputType: "text"
              },
              {
                type: "text",
                name: "description",
                title: "Description",
                isRequired: false,
                inputType: "text"
              },
              {
                type: "file",
                title: "Do you have photos?",
                name: "Files",
                storeDataAsText: false,
                allowMultiple: true,
                showPreview: true
              }
            ],
            title: "Basic Info",
            showNumber: true
          }
        ]
      }
    ],
    showProgressBar: "top",
    progressBarType: "buttons"
  };
  var survey = new Survey.Model(json);

  survey.onComplete.add(function(result) {
    console.log(result.data);
    setHouseAddress(result.data.house_address);
    setLandlordName(result.data.landlord_name);
    setLandlordEmail(result.data.landlord_email);
    setState(result.data.state);
    setCity(result.data.city);
    setZIP(result.data.zip_code);
    setLaundry(result.data.Laundry);
    setBasement(result.data.Basement);
    setYard(result.data.Yard);
    setParking(result.data.Parking);
    setPorch(result.data.Porch);
    setBedrooms(result.data.bedrooms);
    setBathrooms(result.data.bathrooms);
    setRent(result.data.rent);
    setUnitLevel(result.data.unit);
    setConnectedHouse(result.data.connectedHouse);
    setDescription(result.data.description);

    if (temporaryFilesStorage.Files != null) {
      console.log(temporaryFilesStorage.Files);

      setFiles([...temporaryFilesStorage.Files]);
    }
    console.log(files);

    setReadyToSubmit(true);
  });

  useEffect(() => {
    fetchToken();
    if (readyToSubmit) {
      handleSubmit();
    }
  }, [fetchToken, readyToSubmit]);

  survey.onUploadFiles.add(function(survey, options) {
    // Add files to the temporary storage
    if (temporaryFilesStorage[options.name] !== undefined) {
      temporaryFilesStorage[options.name].concat(options.files);
    } else {
      temporaryFilesStorage[options.name] = options.files;
    }

    // Load previews in base64. Until survey not completed files are loaded temporary as base64 in order to get previews
    var question = survey.getQuestionByName(options.name);
    var content = [];
    options.files.forEach(function(file) {
      let fileReader = new FileReader();
      fileReader.onload = function(e) {
        content = content.concat([
          {
            name: file.name,
            type: file.type,
            content: fileReader.result,
            file: file
          }
        ]);
        if (content.length === options.files.length) {
          //question.value = (question.value || []).concat(content);
          options.callback(
            "success",
            content.map(function(fileContent) {
              return { file: fileContent.file, content: fileContent.content };
            })
          );
        }
      };
      fileReader.readAsDataURL(file);
    });
    console.log("in func" + temporaryFilesStorage);
  });

  if (isAuthenticated) {
    return (
      <div align="left">
        <h1></h1>
        <h1></h1>
        <Survey.Survey
          model={survey}
          showCompletedPage={true}
          allowImagesPreview={true}
        />
      </div>
    );
  } else {
    return (
      <div className="no-entry">
        <br></br>
        <br></br>
        <br></br>
        <h1>Please log in to make a house entry</h1>;
      </div>
    );
  }
};
