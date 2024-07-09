"use client";

import { useState } from "react";
import { uploadFile } from "./api/upload";
import { useAuth } from "@/contexts/authentication";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [profile_picture, setProfilePicture] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let profilePictureUrl;
    for (let key in profile_picture) {
      profilePictureUrl = profile_picture[key];
    }

    const result = await uploadFile(
      profilePictureUrl,
      "user_uploads",
      `profile_pictures/${username}.jpg`
    );

    const imageUrl = result.data.data.publicUrl;
    setImageUrl(imageUrl);

    const data = {
      username,
      password,
      email,
      full_name,
      id_number,
      date_of_birth,
      country,
      profile_picture: imageUrl,
    };

    register(data);
  };

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setProfilePicture({ [uniqueId]: event.target.files[0] });
  };

  const handleRemoveImage = (event, key) => {
    event.preventDefault();
    delete profile_picture[key];
    setProfilePicture({ ...profile_picture });
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <img src={imageUrl} />
        <h1>Register Form</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            email
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email here"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Full Name
            <input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Enter full name here"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              value={full_name}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Date of Birth
            <input
              id="date_of_birth"
              name="date_of_birth"
              type="text"
              placeholder="Enter date of birth here"
              onChange={(event) => {
                setDateOfBirth(event.target.value);
              }}
              value={date_of_birth}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            id number
            <input
              id="id_number"
              name="id_number"
              type="text"
              placeholder="Enter id number here"
              onChange={(event) => {
                setIdNumber(event.target.value);
              }}
              value={id_number}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            country
            <input
              id="country"
              name="country"
              type="text"
              placeholder="Enter country here"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
              value={country}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            profile_picture
            <input
              id="profile_picture"
              name="profile_picture"
              type="file"
              placeholder="Enter here"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="image-list-preview-container">
          {Object.keys(profile_picture).map((key) => {
            const file = profile_picture[key];
            return (
              <div key={key} className="image-preview-container">
                <img
                  className="image-preview"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <button
                  className="image-remove-button"
                  onClick={(event) => handleRemoveImage(event, key)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
