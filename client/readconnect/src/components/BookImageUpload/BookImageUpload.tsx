// @ts-nocheck
import React from 'react'
import Image from "next/image";

import PropTypes from 'prop-types'
import { Button } from '@/mui-components/Button/Button'

const BookImageUpload = ({ files, setFile }) => {
    const { useState } = React;

  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };
  return (
    <>
     <div>
      <div className="">
        <div className="">
          <div className="">
            <span className="">
              {message}
            </span>
            <div className="">
              <label className="">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="">
                    Select a photo
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFile}
                  className="opacity-0"
                  multiple={true}
                  name="files[]"
                />
              </label>
            </div>
            <div className="">
              {files.map((file, key) => {
                return (
                  <div key={key} className="">
                    <i
                      onClick={() => {
                        removeImage(file.name);
                      }}
                      className=""
                    >
                      X
                    </i>
                    <div className="r">
                      <Image src={URL.createObjectURL(file)} fill alt="Gigs" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

BookImageUpload.propTypes = {}

export default BookImageUpload;




