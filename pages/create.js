import Link from "next/link";
import { useState } from "react";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";

const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaUrl = await imageUpload();
    const res = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        mediaUrl,
        description,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      M.toast({ html: "Product created successfully", classes: "#00c853 green accent-4" });
    }
    } catch (error) {
      console.log(error);
    }
    
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "krishiconnect");
    data.append("cloud_name", "dgjuzwpcp");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgjuzwpcp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    return res2.url;
  };
  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setMedia(e.target.files[0]);
            }}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <img
        className="responsive-img"
        src={media ? URL.createObjectURL(media) : ""}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="materialize-textarea"
      ></textarea>
      <button
        className="btn waves-effect waves-light #00c853 green accent-4"
        type="submit"
      >
        Submit
        <i className="material-icons right">send</i>
      </button>
    </form>
  );

};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end;
  }

  return {
    props: {},
  };
}

export default Create;
