import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

//Card Props'unun tipini belirlemek için bir interface tanımlaması.

interface CustomCardProps {
  card: {
    title: string;
    description: string;
    imageUrl: string;
  };
}

const CustomCard: React.FC<CustomCardProps> = ({ card }) => {
  return (
    <Card
      sx={{
        //Card component ının stillendirmesi
        width: 500,
        height: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: 2,
        borderColor: "black",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
        <Typography //Başlık Kısmı ve stillendirmesi
          variant="h5"
          component="div"
          className="text-red-600"
          sx={{ fontWeight: 500 }}
        >
          {card?.title}
        </Typography>
        <Typography //Açıklama Kısmı ve stillendirmesi
          className="h-[215px] overflow-y-auto"
          variant="h6"
          component="div"
          sx={{
            fontWeight: 400,
            lineHeight: 1.25,
            textAlign: "justify",
            fontSize: 18,
          }}
        >
          {card?.description}
        </Typography>
      </CardContent>
      <CardMedia //Fotoğraf Kısmı ve stillendirmesi
        component="img"
        image={card?.imageUrl}
        alt="Image"
        sx={{ objectFit: "cover", width: 464, height: 400 }}
      />
    </Card>
  );
};

export default CustomCard;
