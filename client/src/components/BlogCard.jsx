import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import image from '../assets/image.png'

export default function BlogCard() {
  return (
    <Card variant="outlined" sx={{ width: 220 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={image} loading="lazy" alt="image" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{"title"}</Typography>
        <Typography level="body-sm">{"location"}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ fontWeight: "md" }}
          >
            0 views
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ fontWeight: "md" }}
          >
            {/* {getTimeDifference(createdAt)} */}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
