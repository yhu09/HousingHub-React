import React, { useState, useEffect, useContext, useCallback } from "react";
import "./SubletForm.css";
import { uploadFile } from "../../utility/s3-upload";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { APIBASE } from "../../utility/api-base";
import { useAuth0 } from "@auth0/auth0-react";
import { SubletContext } from "../../subletContext";

import "jquery-ui-dist/jquery-ui.css";
import * as widgets from "surveyjs-widgets";

const defaultCoord = {
  lat: 42.4085,
  lng: -71.1183
};

export const SubletForm = () => {
  const context = useContext(SubletContext);
  const { token, isTokenSet, setToken } = context;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [houseAddress, setHouseAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ZIP, setZIP] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [rent, setRent] = useState(875);
  const [files, setFiles] = useState([]);
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [description, setDescription] = useState();

  const APIKey = process.env.REACT_APP_GoogleMapsAPIKey;

  widgets.jqueryuidatepicker(Survey);

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

  async function checkPrevPost () {
    console.log(user.email);
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await fetch(APIBASE + "subletters/email/?email=" + user.email, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          console.log("NO POSTING ALLOWED");
          alert("You have a subletting post active!")
          window.location.replace("http://localhost:3000");
        } else {
          console.log("POSTING ALLOWED");
        }
      });
  }

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
          let coord = data.results[0].geometry.location;
          return [coord.lat, coord.lng];
        } else {
          return [defaultCoord.lat, defaultCoord.lng];
        }
      });
    return coord;
  }

  async function handleSubmit() {
    let coord = await getCoordinates();
    let latitude = coord[0];
    let longitude = coord[1];

    let slug = houseAddress.split(" ").join("-");
    let author = user.given_name + " " + user.family_name;
    let path = "sublet/" + author + "/" + slug + "/";

    for (var file of files) {
      uploadFile(path, file);
    }

    console.log(user);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        houseAddress: houseAddress,
        stateName: state,
        city: city,
        ZIP: ZIP,
        rent: rent,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        beginDate: beginDate,
        endDate: endDate,
        expireDate: expireDate,
        tenant: user.given_name + " " + user.family_name,
        tenantEmail: user.name,
        preferredGender: preferredGender,
        description: description,
        latitude: latitude,
        longitude: longitude
      })
    };
    console.log("request options: " + requestOptions.body);

    await fetch(APIBASE + "subletter", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("House form submitted");
    setReadyToSubmit(false);
    // var url = "https://master.d2foc06eaqufr.amplifyapp.com/houses/" + slug;
    // var url = "http://localhost:3000/houses/" + slug;
    // window.location.replace(url);
  }

  Survey.StylesManager.applyTheme("default");

  let json = {
    title: "Sublet your room!",
    pages: [
      {
        name: "page1",
        navigationTitle: "Where Is It?",
        navigationDescription: "Sublet House Info",
        elements: [
          {
            type: "image",
            name: "first_page_image",
            imageLink:
              "https://zumpermedia.s3.amazonaws.com/blog/wp-content/uploads/2019/02/26112330/chic-bedroom.jpg",
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
                    title: "City",
                    isRequired: true
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
                    title: "Rent",
                    isRequired: true,
                    inputType: "number"
                  },
                  {
                    name: "begin_date",
                    type: "datepicker",
                    inputType: "date",
                    title: "Sublet available from",
                    dateFormat: "mm/dd/yy",
                    isRequired: true
                  },
                  {
                    name: "end_date",
                    type: "datepicker",
                    inputType: "date",
                    title: "Sublet available to",
                    dateFormat: "mm/dd/yy",
                    isRequired: true
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
        navigationTitle: "Tell Us More!",
        navigationDescription: "Detailed House Info",
        elements: [
          {
            type: "panel",
            name: "detailed_house_info",
            elements: [
              {
                type: "text",
                name: "bedrooms",
                title: "Number of Other Tenants",
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
                name: "preferred_gender",
                title: "Preferred gender of subtenant",
                isRequired: true,
                colCount: 0,
                choices: ["female", "male", "no preference"]
              },
              {
                name: "expire_date",
                type: "datepicker",
                inputType: "date",
                title: "This posting will automatically delete on",
                dateFormat: "mm/dd/yy",
                isRequired: true
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
    setState(result.data.state);
    setCity(result.data.city);
    setZIP(result.data.zip_code);
    setBedrooms(result.data.bedrooms);
    setBathrooms(result.data.bathrooms);
    setRent(result.data.rent);
    setBeginDate(result.data.begin_date);
    setEndDate(result.data.end_date);
    setExpireDate(result.data.expire_date);
    setPreferredGender(result.data.preferred_gender);
    setDescription(result.data.description);
    console.log(result.data.begin_date);

    if (temporaryFilesStorage.Files != null) {
      console.log(temporaryFilesStorage.Files);

      setFiles([...temporaryFilesStorage.Files]);
    }
    console.log(files);

    setReadyToSubmit(true);
  });

  useEffect(() => {
    fetchToken();
    if (user != undefined && token != "") {
      checkPrevPost();
    }
    if (readyToSubmit) {
      handleSubmit();
    }
  }, [token, fetchToken, readyToSubmit]);

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
        <h1>Please log in to access create house</h1>;
      </div>
    );
  }
};
