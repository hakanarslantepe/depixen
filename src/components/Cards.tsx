"use client";

import { useState, useRef, useEffect } from "react";
import { db, storage } from "@/db/firebase";
import { ref as dbRef, set, onValue } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";
import Card from "./Card";
import CustomButton from "./Button";

const Cards: React.FC = () => {
  const [title, setTitle] = useState("New title"); // Başlık state'i
  const [description, setDescription] = useState("New Description"); // Açıklama state'i
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Seçilen resim state'i
  const imageRef = useRef<HTMLInputElement>(null); // Resim giriş alanı referansı
  const [file, setFile] = useState<File | null>(null); // Yüklenen dosya state'i
  const [loading, setLoading] = useState(false); // Yükleme durumu state'i
  const [cards, setCards] = useState<any[]>([]); // Kartlar state'i

  // Firebase'den kart verilerini almak için useEffect kullanımı
  useEffect(() => {
    const cardsRef = dbRef(db, "cards");
    onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      const cardsArray = data ? Object.values(data) : [];
      setCards(cardsArray);
    });
  }, []);

  // Formu gönderme fonksiyonu
  const handleSubmit = async () => {
    if (file) {
      setLoading(true);
      try {
        const storageReference = storageRef(
          storage,
          `images/${new Date().getTime()}_${file.name}`
        );
        await uploadBytes(storageReference, file);

        const imageUrl = await getDownloadURL(storageReference);

        const newCardRef = dbRef(db, "cards/" + new Date().getTime());
        const newCard = {
          title: title,
          description: description,
          imageUrl: imageUrl,
        };
        await set(newCardRef, newCard);
        resetForm();
        console.log("Data and image saved successfully!");
      } catch (error) {
        console.error("Error saving data or image: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No image file selected!");
    }
  };

  // Formu sıfırlama fonksiyonu
  const resetForm = () => {
    setTitle("New title");
    setDescription("New Description");
    setSelectedImage(null);
    setFile(null);
  };

  // Resim ekleme fonksiyonu
  const handleAddImage = (): void => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  // Dosya yükleme fonksiyonu
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const selectedImage = e.target?.result as string;
        setSelectedImage(selectedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const isButtonEnabled = selectedImage && title && description && !loading;

  return (
    <div className="max-w-[1440px] flex flex-wrap mx-auto gap-x-8 gap-y-8 my-8 justify-center app">
      <div className="flex flex-col justify-between w-[500px] h-[700px] p-4 border-2 border-black rounded-lg">
        <div className="flex flex-col gap-y-1">
          {/* Kart başlığı */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="text-2xl font-medium text-red-600 focus:outline-none"
          />
          {/* Kart açıklaması */}
          <textarea
            rows={9}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="focus:outline-none focus:border-2 focus:rounded focus:border-black resize-none text-lg leading-5"
          />
        </div>
        <div>
          <div className="bg-red-200 h-[400px] flex justify-center items-center">
            {selectedImage ? (
              // Seçili resim varsa göster
              <Image
                src={selectedImage}
                alt="Image"
                width={464}
                height={400}
                objectFit="cover"
                className="w-[464px] h-[400px] bg-white"
              />
            ) : (
              // Seçili resim yoksa resim ekleme butonu göster
              <>
                <button
                  onClick={handleAddImage}
                  className="text-9xl font-light"
                >
                  +
                </button>
                <input
                  type="file"
                  ref={imageRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
        {/* Resetleme ve Dataya Kaydetme Butonları */}
        <div className="flex justify-between items-center">
          <CustomButton onClick={resetForm} color="error">
            X
          </CustomButton>
          <CustomButton
            onClick={handleSubmit}
            disabled={!isButtonEnabled}
            loading={loading}
            color="success"
          >
            OK
          </CustomButton>
        </div>
      </div>
      {/* Kartları liste olarak gösterilmesi */}
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default Cards;
