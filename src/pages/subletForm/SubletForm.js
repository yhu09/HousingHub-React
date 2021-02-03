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
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

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

  async function handleSubmit() {
    let slug = houseAddress.split(" ").join("-");
    let path = "sublet/" + slug + "/";

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
                isRequired: false,
                elements: [
                  {
                    type: "text",
                    name: "house_address",
                    isRequired: false,
                    title: "House address"
                  },
                  {
                    type: "text",
                    name: "city",
                    title: "City"
                  },
                  {
                    type: "dropdown",
                    name: "state",
                    title: "State",
                    isRequired: false,
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
                    isRequired: false,
                    inputType: "text"
                  },
                  {
                    type: "text",
                    name: "rent",
                    title: "Rent",
                    isRequired: false,
                    inputType: "number"
                  },
                  {
                    name: "begin_date",
                    type: "datepicker",
                    inputType: "date",
                    title: "Sublet available from",
                    dateFormat: "mm/dd/yy",
                    isRequired: false
                  },
                  {
                    name: "end_date",
                    type: "datepicker",
                    inputType: "date",
                    title: "Sublet available to",
                    dateFormat: "mm/dd/yy",
                    isRequired: false
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
                title: "Number of Bedroom",
                isRequired: false,
                inputType: "number"
              },
              {
                type: "text",
                name: "bathrooms",
                title: "Number of Bathrooms",
                isRequired: false,
                inputType: "number"
              },
              {
                type: "dropdown",
                name: "preferred_gender",
                title: "Preferred Gender",
                isRequired: false,
                colCount: 0,
                choices: ["female", "male", "no preference"]
              },
              {
                name: "expire_date",
                type: "datepicker",
                inputType: "date",
                title: "Sublet info expires on",
                dateFormat: "mm/dd/yy",
                isRequired: false
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
        <h1>Please log in to access create house</h1>;
      </div>
    );
  }
};
