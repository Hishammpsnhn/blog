import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { AuthContext } from "./AuthProvider";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ id, title, desc, author, image, handleDelete }) {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <Card variant="outlined" sx={{ width: 220 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={image} loading="lazy" alt="Blog Image" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{title}</Typography>
        <Typography level="body-sm">{desc}</Typography>
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
          {author === user.id && (
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
              <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="edit" size="small" onClick={()=> navigate(`${id}/edit`)}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
