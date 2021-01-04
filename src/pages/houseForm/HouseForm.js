import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import "./HouseForm.css";
import { uploadFile, getFile } from "../../utility/s3-upload";
import * as Survey from "survey-react";
import $ from 'jquery';
import "survey-react/survey.css";


export const HouseForm = () => {
  const [landlordEmail, setLandlordEmail] = useState("");
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
  const [mainPhotoFile, setMainPhotoFile] = useState([]);
  const [photoKeys, setPhotoKeys] = useState([]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const history = useHistory();
  const [newHouse, setNewHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  var temporaryFilesStorage = {};

  async function handleSubmit() {
    let slug = houseAddress.split(" ").join("-");
    let path = slug + "/";

    // other images
    var imagePathKey;
    for (var file of files) {
      let key = uploadFile(path, file);
      imagePathKey = path + key;
      setPhotoKeys(photoKeys.push(imagePathKey));
    } 

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        landlordEmail: landlordEmail,
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
        mainPhotoKey: "",
        photoKeys: photoKeys
      })
    };
    console.log("request options: " + requestOptions.body);


    await fetch("http://localhost:3002/houses", requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          setNewHouse(true);
        }
      });
    console.log("House form submitted");
    setReadyToSubmit(false)
  }

  function fileSelectedHandler(e) {
    setFiles([...files, ...e.target.files]);
  }

  function frontPhotoSelectedHandler(e) {
    setMainPhotoFile([...e.target.files]);
  }

  function renderNewHouseStatus() {
    return <div>Successful</div>;
  }


  Survey.StylesManager.applyTheme("winterstone");

  let json = {
    "title": "Create a House",
    "pages": [
      {
        "name": "page1",
        "navigationTitle": "Where Is It?",
        "navigationDescription": "House info",
        "elements": [
          {
            "type": "image",
            "name": "first_page_image",
            "imageLink": "https://pinehallbrick.com/wp-content/uploads/2020/05/lb_tufts_gso2.jpg",
            "imageFit": "none",
            "imageHeight": 726,
            "imageWidth": 500,
            "width": "600px"
          }, {
            "type": "panel",
            "name": "first_page_container_panel",
            "elements": [
              {
                "type": "panel",
                "name": "house_information",
                "isRequired": true,
                "elements": [
                  {
                    "type": "text",
                    "name": "house_address",
                    "isRequired": true,
                    "title": "House address"
                  }, {
                    "type": "text",
                    "name": "city",
                    "title": "City"
                  }, {
                    "type": "dropdown",
                    "name": "state",
                    "title": "State",
                    "isRequired": true,
                    "choicesByUrl": {
                      "url": "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json",
                      "valueName": "name"
                    }
                  }, {
                    "type": "text",
                    "name": "zip_code",
                    "title": "Zip Code",
                    "isRequired": true,
                    "inputType": "number"
                  }, {
                    "type": "text",
                    "name": "email",
                    "title": "Email",
                    "isRequired": true,
                    "inputType": "email"
                  }, {
                    "type": "text",
                    "name": "rent",
                    "title": "Rent",
                    "isRequired": true,
                    "inputType": "number"
                  }
                ],
                "title": "House Information",
                "showNumber": true,
                "showQuestionNumbers": "off"
              }
            ],
            "startWithNewLine": false
          }
        ]
      }, {
        "name": "page2",
        "navigationTitle": "Who Owns It?",
        "navigationDescription": "Landlord info",
        "elements": [
          {
            "type": "panel",
            "name": "first_page_container_panel",
            "isRequired": true,
            "elements": [
              {
                "type": "panel",
                "name": "landlord_information",
                "isRequired": true,
                "elements": [
                  {
                    "type": "text",
                    "name": "landlord_name",
                    "isRequired": true,
                    "title": "Landlord Name"
                  }, {
                    "type": "text",
                    "name": "landlord_email",
                    "title": "Landlord Email",
                    "isRequired": true,
                    "inputType": "email"
                  }, {
                    "type": "text",
                    "name": "landlord_number",
                    "title": "Landlord Number",
                    "isRequired": true,
                    "inputType": "number"
                  }
                ],
                "title": "House Information",
                "showNumber": true,
                "showQuestionNumbers": "off"
              }
            ],
            "startWithNewLine": false
          }
        ]
      }, {
        "name": "page3",
        "navigationTitle": "Tell Us More!",
        "navigationDescription": "Detailed House Info",
        "elements": [
          {
            "type": "panel",
            "name": "detailed_house_info",
            "elements": [{
              "type": "boolean",
              "name": "Laundry",
              "labelTrue": "Yes",
              "labelFalse": "No",
              "isRequired": true,
              "hideNumber": true
            }, {
              "type": "boolean",
              "name": "Basement",
              "labelTrue": "Yes",
              "labelFalse": "No",
              "isRequired": true,
              "hideNumber": true
            }, {
              "type": "boolean",
              "name": "Yard",
              "labelTrue": "Yes",
              "labelFalse": "No",
              "isRequired": true,
              "hideNumber": true
            }, {
              "type": "boolean",
              "name": "Parking",
              "labelTrue": "Yes",
              "labelFalse": "No",
              "isRequired": true,
              "hideNumber": true
            }, {
              "type": "boolean",
              "name": "Porch",
              "labelTrue": "Yes",
              "labelFalse": "No",
              "isRequired": true,
              "hideNumber": true
            }, {
              "type": "text",
              "name": "bedrooms",
              "title": "Number of Bedroom",
              "isRequired": true,
              "inputType": "number"
            }, {
              "type": "text",
              "name": "bathrooms",
              "title": "Number of Bathrooms",
              "isRequired": true,
              "inputType": "number"
            }, {
              "type": "dropdown",
              "name": "unit",
              "title": "Unit level",
              "isRequired": true,
              "colCount": 0,
              "choices": [
                "upper",
                "lower",
                "Entire House"
              ]
            }, {
              "type": "file",
              "title": "Do you have photos?",
              "name": "Files",
              "storeDataAsText": false,
              "allowMultiple": true,
              "showPreview": true
            }
            ],
            "title": "Basic Info",
            "showNumber": true
          }]
      }
    ],
    "showProgressBar": "top",
    "progressBarType": "buttons"

  };
  var survey = new Survey.Model(json);

  survey.onComplete.add(function (result) {
    console.log(result.data)
    setHouseAddress(result.data.house_address);
    setLandlordEmail(result.data.email);
    setState(result.data.state)
    setCity(result.data.city)
    setZIP(result.data.zip_code)
    setLaundry(result.data.Laundry)
    setBasement(result.data.Basement)
    setYard(result.data.Yard)
    setParking(result.data.Parking)
    setPorch(result.data.Porch)
    setBedrooms(result.data.bedrooms)
    setBathrooms(result.data.bathrooms)
    setRent(result.data.rent)
    setUnitLevel(result.data.unit)
    setReadyToSubmit(true)
    if (temporaryFilesStorage.files != null) {
      setFiles([...temporaryFilesStorage.files])
    }
  });

  useEffect(() => {
    if (readyToSubmit) {
      console.log(houseAddress)
      handleSubmit()
    }
  }, [readyToSubmit]);

  survey
    .onUploadFiles
    .add(function (survey, options) {
      // Add files to the temporary storage
      if (temporaryFilesStorage[options.name] !== undefined) {
        temporaryFilesStorage[options.name].concat(options.files);
      } else {
        temporaryFilesStorage[options.name] = options.files;
      }

      // Load previews in base64. Until survey not completed files are loaded temporary as base64 in order to get previews
      var question = survey.getQuestionByName(options.name);
      var content = [];
      options
        .files
        .forEach(function (file) {
          let fileReader = new FileReader();
          fileReader.onload = function (e) {
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
              options.callback("success", content.map(function (fileContent) {
                return { file: fileContent.file, content: fileContent.content };
              }));
            }
          };
          fileReader.readAsDataURL(file);
        });
      console.log("in func" + temporaryFilesStorage);
    });

  return (
    <div align="left">
      <h1></h1>
      <h1></h1>
      <Survey.Survey model={survey} showCompletedPage={true} allowImagesPreview={true} />
    </div>
  );
};
