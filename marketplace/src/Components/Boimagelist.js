import React from "react";
import { useState, useEffect } from "react";

const Boimagelist = ({index, selectedproduct, setImages, setPreviews, images, previews}) => {
  let imagedefault = "./image/imageicon.png";
  const [changeimage, setChangeimage] = useState(Number(1));
  const [suppressbtn, setSuppressbtn] = useState(false);
    const [myimagechoice, setMyimagechoice] = useState(imagedefault);

  // Gérer la suppression d'image dans le formulaire ("images" et/ou "previews")
    const suppressimage = (index) => {
        const tempsuppress = [...images];
        const temppreviews = [...previews];
        tempsuppress[index] = "";
        temppreviews[index] = "";
        setImages(tempsuppress);
        setPreviews(temppreviews);
        console.log(images);
        console.log(previews);
        
        changeimage > 1
        ? setChangeimage(changeimage - 1)
        : setChangeimage(changeimage + 1);
    };

    useEffect(() => {
// console.log(images);

    }, [])
  // Faire sortir la bonne image => return myimagechoice;
  const imagechoice = (index) => {
    if (selectedproduct) {
      if (selectedproduct?.[`image0${index + 1}`]) {
        if (images[index] && previews[index] == null) {
          setMyimagechoice(
            "http://localhost:8080/uploads/" +
              selectedproduct?.[`image0${index + 1}`]
          );
            setSuppressbtn(true);
        } else if (changeimage && previews[index] == '') {
          setMyimagechoice(imagedefault);
          setSuppressbtn(false);
          // console.log(changeimage);
        } else if (changeimage && previews[index]) {
            if (selectedproduct?.[`image0${index + 1}`] == previews[index]) {
                setMyimagechoice(
                    "http://localhost:8080/uploads/" +
                      selectedproduct?.[`image0${index + 1}`])
            } else {
                setMyimagechoice(previews[index]);
            }
          setSuppressbtn(true);
        } else {
          setMyimagechoice(
            "http://localhost:8080/uploads/" +
              selectedproduct?.[`image0${index + 1}`]
          );
          setSuppressbtn(true);
        }
      } else if (changeimage && previews[index]) {
        setMyimagechoice(previews[index]);
        setSuppressbtn(true);
      } else {
        setMyimagechoice(imagedefault);
        setSuppressbtn(false);
      }
    } else {
      if (changeimage && previews[index]) {
        setMyimagechoice(previews[index]);
        setSuppressbtn(true);
      } else {
        setMyimagechoice(imagedefault);
        setSuppressbtn(false);
      }
    }
    return myimagechoice;
  };

  // Gérer le changement d'image dans le formulaire ("images" et/ou "previews")
  const handleImageChange = (e, i) => {
    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = [...images];
      const newPreviews = [...previews];

      newImages[i] = files[0];
      newPreviews[i] = URL.createObjectURL(files[0]);

      setImages(newImages);
      setPreviews(newPreviews);

      // Afficher le Preview de l'image
      changeimage > 1
        ? setChangeimage(changeimage - 1)
        : setChangeimage(changeimage + 1);
        console.log(images);
    }
    // console.log(changeimage);
  };

  // Générer l'image
  useEffect(() => {
    imagechoice(index)
  }, [images, changeimage]);
    // previews,
    // malistedephotos

  return (
    <div key={index} className="blockbrick">
      <div>
        <img src={myimagechoice} alt={myimagechoice} />
            {suppressbtn && (
                <span onClick={() => suppressimage(index)} className="todeleteme" ></span>
            )}
      </div>
      <input className="imginput" type="file" onChange={(e) => handleImageChange(e, index)} />
    </div>
  );
};

export default Boimagelist;
