import { Box } from "@mui/material";

const Screenshot = ({ src, alt, maxWidth, maxHeight, width = "100%" }) => {
  return (
    <Box maxWidth={maxWidth} maxHeight={maxHeight} width={width}>
      <img
        src={src}
        style={{
          objectFit: "cover",
          display: "block",
          height: "100%",
          width: "100%",
          borderRadius: "12px",
        }}
        alt={alt}
      />
    </Box>
  );
};

export default Screenshot;
