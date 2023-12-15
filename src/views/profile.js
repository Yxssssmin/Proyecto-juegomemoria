export { Profile };

import { getProfile, updateProfile } from "../services/users.js";
import { getFileRequest } from "../services/PeticionesApi.js";
import { router } from "../router/router.js";
import "../assets/scss/profile.css";

class Profile {
  constructor() {}

  generateProfile() {
    let divLogin = document.querySelector("#principal");
    divLogin.classList.add("formulari_centrat");

    getProfile().then((dataProfile) => {
      if (dataProfile && dataProfile.length > 0) {
        dataProfile = dataProfile[0];
        console.log(dataProfile);
      } else {
        console.error(
          "No se encontraron datos del perfil o el perfil está vacío."
        );
        dataProfile = {}; // Establecer un objeto vacío para evitar problemas con la desestructuración
      }

      divLogin.innerHTML = `
        <form action="action_page.php" id="formProfile" style="border: 1px solid #ccc">
        
        <div class="container">
            <h1>Profile</h1>
      
            <br/>

            <label for="email"><b>Email</b></label>
            <input id="signupemail" type="text" placeholder="Enter Email" name="email" required readonly
                value="${localStorage.getItem("email")}"/>

            <label for="psw"><b>Password</b></label>
            <input type="password" id="signuppassword" placeholder="Enter Password" name="psw" required />

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" required />
            <button type="button" class="signupbtn login" id="chgpass">Change Password</button>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="user name" name="username" id = "username" value = "${dataProfile.username}" />

            <label for="fullname"><b>Full Name</b></label>
            <input type="text" placeholder="fullname" name="full_name" value = "${dataProfile.full_name}" />


            <label for="web"><b>Web Site</b></label>
            <input type="text" placeholder="web" name="website" value = "${dataProfile.website}" />
            <div>
                <img class="avatar_profile" style="max-width: 200px" id="avatar_prev" src="${
                  dataProfile.avatar_blob ? dataProfile.avatar_blob : ""
                }"/>
            </div>

            <label for="avatar"><b>Avatar</b></label>
            <input type="file" id="avatar" name="avatar" />
  
            <div class="clearfix">

                <button type="button" class="signupbtn login" id="update">Update Profile</button>
            </div>
        </div>
  </form>
  
  `;

      divLogin.querySelector("#update").addEventListener("click", async () => {
        const formData = new FormData(divLogin.querySelector("#formProfile"));
        const { username, full_name, website, avatar } =
          Object.fromEntries(formData);
        console.log({ username, full_name, website, avatar });

        const dataUpdate = await updateProfile({
          username,
          full_name,
          website,
          avatar,
        });

        router("#/profile");
      });

      function encodeImageFileAsURL(element) {
        const file = element.files[0];
        if (file) {
          divLogin.querySelector("#avatar_prev").src =
            URL.createObjectURL(file);
        }
      }

      divLogin.querySelector("#avatar").addEventListener("change", function () {
        encodeImageFileAsURL(this);
      });
    });
  }
}
