import { Box } from "@mui/material";

const DocumentCard = ({ document }) => {
  return (
    <Box
      sx={{
        width: 210,
        height: 340,
        backgroundColor: "#FFFFFF",
        border: "1px solid #DEE1E5",
        borderRadius: "4px",
        "&:hover": {
          cursor: "pointer",
          border: "1px solid #4284F3",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Box>{document?.text}</Box>
    </Box>
  );
};

export default DocumentCard;
