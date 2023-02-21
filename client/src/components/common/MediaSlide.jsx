import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SwiperSlide, Swiper } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  useEffect(() => {
    (async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    })();
  }, [mediaType, mediaCategory]);
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", sm: "35%", md: "25%", lg: "20.5%" },
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MediaSlide;
