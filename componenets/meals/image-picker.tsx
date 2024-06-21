'use client';

import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

type ImagePickerProps = {
  label: string;
  name: string;
};

export default function ImagePicker({label, name}: ImagePickerProps) {
  const pickerRef = useRef<HTMLInputElement>(null);

  const [imageSelected, setImageSelected] = useState(null as any);

  const handlePickImageClick = () => {
    pickerRef.current?.click();
  }

  const imageChangeHandler = (event: any) => {
    const file = event.target.files[0]; 
    if (!file) {
      return;
    }
    setImageSelected(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageSelected(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor="image">{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!imageSelected ? <p>No image picked.</p> : <Image src={imageSelected} alt="Picked image" fill />}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={pickerRef}
          onChange={imageChangeHandler}
          required
        />
        <button className={styles.button} type="button" onClick={handlePickImageClick}>
          Pick Image
        </button>
      </div>
    </div>
  );
}
