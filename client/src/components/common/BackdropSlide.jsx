import { Box } from "@mui/system";
import React from "react";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {[...backdrops].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                item.file_path
              )})`,
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
