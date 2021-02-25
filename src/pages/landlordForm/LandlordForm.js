import React, { useState, useEffect, useContext, useCallback } from "react";
import "./LandlordForm.css";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { APIBASE } from "../../utility/api-base";
import { useAuth0 } from "@auth0/auth0-react";
import { LandlordContext } from "../../landlordContext";

export const LandlordForm = () => {
  const context = useContext(LandlordContext);
  const { token, isTokenSet, setToken } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [landlordNumber, setLandlordNumber] = useState("");
  const [description, setDescription] = useState("");
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [newLandlord, setNewLandlord] = useState(null);

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
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        landlordEmail: landlordEmail,
        landlordName: landlordName,
        landlordNumber: landlordNumber,
        description: description,
        reviewRatings: []
      })
    };
    console.log("request options: " + requestOptions.body);

    await fetch(APIBASE + "landlord", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === "success") {
          setNewLandlord(true);
        }
      });
    console.log("Landlords form submitted");
    setReadyToSubmit(false);
    // var url = "https://master.d2foc06eaqufr.amplifyapp.com/houses/" + slug;
    // var url = "http://localhost:3000/houses/" + slug;
    // window.location.replace(url);
  }

  Survey.StylesManager.applyTheme("winterstone");

  let json = {
    title: "Make a landlord entry",
    pages: [
      {
        name: "page1",
        navigationTitle: "Who is the landlord?",
        navigationDescription: "Landlord info",
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
                      },
                      {
                        type: "text",
                        name: "landlord_number",
                        title: "Landlord Number",
                        isRequired: false,
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
                name: "description",
                title: "Description",
                isRequired: false,
                inputType: "text"
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
    setLandlordName(result.data.landlord_name);
    setLandlordEmail(result.data.landlord_email);
    setLandlordNumber(result.data.landlord_number);
    setDescription(result.data.description);

    setReadyToSubmit(true);
  });

  useEffect(() => {
    fetchToken();
    if (readyToSubmit) {
      handleSubmit();
    }
  }, [fetchToken, readyToSubmit]);

  // survey.onUploadFiles.add(function(survey, options) {
  //   // Add files to the temporary storage
  //   if (temporaryFilesStorage[options.name] !== undefined) {
  //     temporaryFilesStorage[options.name].concat(options.files);
  //   } else {
  //     temporaryFilesStorage[options.name] = options.files;
  //   }

  //   // Load previews in base64. Until survey not completed files are loaded temporary as base64 in order to get previews
  //   var question = survey.getQuestionByName(options.name);
  //   var content = [];
  //   options.files.forEach(function(file) {
  //     let fileReader = new FileReader();
  //     fileReader.onload = function(e) {
  //       content = content.concat([
  //         {
  //           name: file.name,
  //           type: file.type,
  //           content: fileReader.result,
  //           file: file
  //         }
  //       ]);
  //       if (content.length === options.files.length) {
  //         //question.value = (question.value || []).concat(content);
  //         options.callback(
  //           "success",
  //           content.map(function(fileContent) {
  //             return { file: fileContent.file, content: fileContent.content };
  //           })
  //         );
  //       }
  //     };
  //     fileReader.readAsDataURL(file);
  //   });
  //   console.log("in func" + temporaryFilesStorage);
  // });

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
