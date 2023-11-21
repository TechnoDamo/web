/*global document*/
/*global window*/
/*global localStorage*/
/*global history*/
/*global XMLHttpRequest*/
/*global FormData*/
/*global console*/
/*global location*/
/*global setTimeout*/
/*global $*/

$(document).ready(function () {
    var formData = new FormData();
    const form = document.getElementById("feedbackForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const orgInput = document.getElementById("organization");
    const messageInput = document.getElementById("message");
    const agreeCheckbox = document.getElementById("agree");
  
    const formDataLoad = JSON.parse(localStorage.getItem("formData"));
    var formDataSave;
    var popUp = document.getElementById("popUp");
  
    const Url = "#popUp";
    
    function closepopUp(event) {
        if (!popUp.contains(event.target) && event.target) {
          if (event.target.id !== "someId") {
            popUp.style.display = "none";
            window.removeEventListener("click", closepopUp);
            history.back();
          }
        }
      }
    
    function loadFormData() {
        if (formDataLoad) {
          fullNameInput.value = formDataLoad.fullName;
          emailInput.value = formDataLoad.email;
          phoneInput.value = formDataLoad.phone;
          organizationInput.value = formDataLoad.organization;
          messageInput.value = formDataLoad.message;
          agreeCheckbox.checked = formDataLoad.agree;
        }
      }

    function saveFormData() {
        formDataSave = {
          agree: agreeCheckbox.checked,
          email: emailInput.value,
          fullName: fullNameInput.value,
          message: messageInput.value,
          organization: organizationInput.value,
          phone: phoneInput.value
        };
        localStorage.setItem("formData", JSON.stringify(formDataSave));
      }

    function openpopUp() {
        document.getElementById("popUp").style.display = "block";
        history.pushState({popUpOpen: true}, "", Url);
        window.addEventListener("click", closepopUp);
    }

    function clearFormData() {
        localStorage.removeItem("formData");
    }


    form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        formData.append("fullName", fullNameInput.value);
        formData.append("email", emailInput.value);
        formData.append("phone", phoneInput.value);
        formData.append("organization", orgInput.value);
        formData.append("message", messageInput.value);
        formData.append("agree", agreeCheckbox.checked);
    
        fetch("https://formcarry.com/s/1KJSc78bDf", {
          body: formData,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        }).then(function (response) {
          if (response.ok) {
            document.getElementById("result").innerHTML =
            "Данные формы успешно отправлены на сервер";
            clearFormData();
          } else {
            document.getElementById("result").innerHTML =
            "Ошибка при отправке данных формы на сервер";
          }
        }).catch(function (error) {
          document.getElementById("result").innerHTML = "Произошла ошибка:" + error;
        });
    
        document.getElementById("feedbackForm").reset();
      });
      

      document.getElementById("someId").addEventListener("click", openpopUp);

      loadFormData();
    window.addEventListener("popstate", function (event) {
        if (event.state !== null && event.state.popUpOpen) {
        openpopUp();
        } else {
        popUp.style.display = "none";
        window.removeEventListener("click", closepopUp);
        }
    });

    fullNameInput.addEventListener("blur", saveFormData);
    emailInput.addEventListener("blur", saveFormData);
    phoneInput.addEventListener("blur", saveFormData);
    orgInput.addEventListener("blur", saveFormData);
    messageInput.addEventListener("blur", saveFormData);
    agreeCheckbox.addEventListener("change", saveFormData);
    });
    
